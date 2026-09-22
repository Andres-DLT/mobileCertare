// node scripts/migrate-product-store.js             -> inspect only
// node scripts/migrate-product-store.js --copy      -> backup, copy, verify
// node scripts/migrate-product-store.js --delete-source -> verify, delete old data
const admin = require('firebase-admin');
const fs = require('node:fs');
const path = require('node:path');
const { isDeepStrictEqual } = require('node:util');
const serviceAccount = require('../serviceAccountKey.json');

const projectId = 'smartfoodie-dda27';
if (serviceAccount.project_id !== projectId) throw new Error('Unexpected Firebase project');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount), projectId });
const db = admin.firestore();
const source = 'cloth-store';
const target = 'product-store';

async function scan(collection) {
  const result = [];
  for (const ref of await collection.listDocuments()) {
    const doc = await ref.get();
    if (doc.exists) result.push(doc);
    for (const child of await ref.listCollections()) result.push(...await scan(child));
  }
  return result;
}

function destination(doc) {
  return db.doc(target + doc.ref.path.slice(source.length));
}

// Tagged values keep Firestore types intact in the offline backup.
function encode(value) {
  if (value instanceof admin.firestore.Timestamp) return { type: 'timestamp', seconds: value.seconds, nanoseconds: value.nanoseconds };
  if (value instanceof admin.firestore.GeoPoint) return { type: 'geopoint', latitude: value.latitude, longitude: value.longitude };
  if (value instanceof admin.firestore.DocumentReference) return { type: 'reference', path: value.path };
  if (Buffer.isBuffer(value)) return { type: 'bytes', base64: value.toString('base64') };
  if (typeof value === 'number' && !Number.isFinite(value)) return { type: 'number', value: String(value) };
  if (Array.isArray(value)) return { type: 'array', value: value.map(encode) };
  if (value !== null && typeof value === 'object') return { type: 'map', value: Object.fromEntries(Object.entries(value).map(([k, v]) => [k, encode(v)])) };
  return { type: typeof value, value };
}

function equal(a, b) {
  return isDeepStrictEqual(encode(a), encode(b));
}

async function verify(docs) {
  for (const doc of docs) {
    const copied = await destination(doc).get();
    if (!copied.exists || !equal(doc.data(), copied.data())) throw new Error(`Copy mismatch: ${doc.ref.path}`);
  }
  console.log(`Verified ${docs.length} documents: same IDs, fields and Firestore types.`);
}

async function main() {
  const docs = await scan(db.collection(source));
  const existing = await scan(db.collection(target));
  console.log(JSON.stringify({ projectId, sourceDocuments: docs.length, targetDocuments: existing.length,
    sourceTitles: docs.filter(d => d.ref.parent.id === source).map(d => ({ id: d.id, title: d.data().title, price: d.data().price })) }, null, 2));

  if (process.argv.includes('--copy')) {
    if (!docs.length) throw new Error('Source empty; no migration performed');
    // Check all conflicts before writing anything.
    for (const doc of docs) {
      const current = await destination(doc).get();
      if (current.exists && !equal(current.data(), doc.data())) throw new Error(`Destination conflict: ${current.ref.path}`);
    }
    const backupDir = path.join(__dirname, '..', 'tmp');
    fs.mkdirSync(backupDir, { recursive: true });
    const backupPath = path.join(backupDir, `cloth-store-backup-${Date.now()}.json`);
    fs.writeFileSync(backupPath, JSON.stringify({ projectId, source, target, createdAt: new Date().toISOString(),
      documents: docs.map(d => ({ path: d.ref.path, data: encode(d.data()) })) }, null, 2), { flag: 'wx' });
    console.log(`Backup: ${backupPath}`);
    for (const doc of docs) {
      await db.runTransaction(async tx => {
        const [currentSource, currentTarget] = await tx.getAll(doc.ref, destination(doc));
        if (!currentSource.exists || !equal(currentSource.data(), doc.data())) throw new Error('Source changed during copy');
        if (currentTarget.exists) {
          if (!equal(currentTarget.data(), doc.data())) throw new Error('Target changed during copy');
        } else tx.create(destination(doc), doc.data());
      });
    }
    await verify(docs);
  } else if (process.argv.includes('--delete-source')) {
    await verify(docs);
    // Each deletion atomically verifies the live copy; children are removed first.
    for (const doc of docs.sort((a, b) => b.ref.path.split('/').length - a.ref.path.split('/').length)) {
      await db.runTransaction(async tx => {
        const [currentSource, currentTarget] = await tx.getAll(doc.ref, destination(doc));
        if (!currentSource.exists) return;
        if (!currentTarget.exists || !equal(currentSource.data(), currentTarget.data())) throw new Error(`Changed data: ${doc.ref.path}`);
        tx.delete(doc.ref);
      });
    }
    const remaining = await scan(db.collection(source));
    if (remaining.length) throw new Error('Source still contains documents');
    console.log(`Removed ${docs.length} verified source documents. Source is empty.`);
  }
}

main().catch(e => { console.error(e.message); process.exitCode = 1; }).finally(() => admin.app().delete());

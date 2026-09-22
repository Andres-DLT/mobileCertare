require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

async function clear() {
  const col = db.collection('product-store');
  const snap = await col.listDocuments();
  await Promise.all(snap.map(doc => doc.delete()));
  console.log('🗑️  collection cleared');
  process.exit(0);
}

clear();

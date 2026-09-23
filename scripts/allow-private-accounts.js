// Admin-only: provision specific existing Firebase Auth UIDs for private access.
// Usage: node scripts/allow-private-accounts.js <uid> [uid...]
const admin = require('firebase-admin');
const key = require('../serviceAccountKey.json');
if (key.project_id !== 'smartfoodie-dda27') throw new Error('Unexpected project');
if (!process.argv.slice(2).length) throw new Error('Pass explicit existing UIDs');
const app = admin.initializeApp({ credential: admin.credential.cert(key) });
async function main() {
  for (const uid of process.argv.slice(2)) {
    await admin.auth().getUser(uid); // no auto-creation
    const ref = admin.firestore().doc('access-allowlist/' + uid);
    const current = await ref.get();
    if (current.exists && current.data().enabled !== true) throw new Error('Existing access setting must be reviewed manually: ' + uid);
    if (!current.exists) await ref.create({ enabled: true, grantedAt: admin.firestore.FieldValue.serverTimestamp() });
    console.log('Authorized existing account:', uid);
  }
}
main().catch(e => { console.error(e.message); process.exitCode = 1; }).finally(() => app.delete());

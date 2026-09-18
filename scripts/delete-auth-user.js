require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: node scripts/delete-auth-user.js <email>');
    process.exit(1);
  }

  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().deleteUser(user.uid);
    console.log(`🗑️  Deleted auth user: ${email} (uid ${user.uid})`);
    process.exit(0);
  } catch (e) {
    console.error(`❌ Error deleting user:`, e.message || e);
    process.exit(1);
  }
}

main();
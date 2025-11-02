import { writeFile } from 'fs';
import { config } from 'dotenv';

config(); // Carga variables desde .env

const envConfig = `
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: '${process.env['NG_APP_FIREBASE_API_KEY']}',
    authDomain: '${process.env['NG_APP_FIREBASE_AUTH_DOMAIN']}',
    projectId: '${process.env['NG_APP_FIREBASE_PROJECT_ID']}',
    storageBucket: '${process.env['NG_APP_FIREBASE_STORAGE_BUCKET']}',
    messagingSenderId: '${process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID']}',
    appId: '${process.env['NG_APP_FIREBASE_APP_ID']}',
    measurementId: '${process.env['NG_APP_FIREBASE_MEASUREMENT_ID']}'
  }
};
`;

writeFile('./src/environments/environment.ts', envConfig, (err) => {
  if (err) {
    console.error('❌ Error writing environment.ts file', err);
  } else {
    console.log('✅ environment.ts generated successfully.');
  }
});

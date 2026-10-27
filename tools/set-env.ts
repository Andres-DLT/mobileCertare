import { writeFile } from 'fs';
import { config } from 'dotenv';

config(); // Carga variables desde .env

const envConfig = `
export const environment = {
  production: false,
  release: 'dev',
  siteUrl: ${JSON.stringify(process.env['NG_APP_SITE_URL'] || "https://certare.web.app")},
  scheduleUrl: ${JSON.stringify(process.env['NG_APP_SCHEDULE_URL'] || "")},
  contact: {
    email: ${JSON.stringify(process.env['NG_APP_CONTACT_EMAIL'] || '')},
    phone: ${JSON.stringify(process.env['NG_APP_CONTACT_PHONE'] || '')},
    whatsapp: ${JSON.stringify(process.env['NG_APP_WHATSAPP'] || '')},
    linkedin: ${JSON.stringify(process.env['NG_APP_LINKEDIN'] || '')},
    location: ${JSON.stringify(process.env['NG_APP_LOCATION'] || 'Mexico · working with teams across LATAM, US and Europe')},
  },
  legal: {
    entityName: ${JSON.stringify(process.env['NG_APP_LEGAL_ENTITY'] || '')},
    address: ${JSON.stringify(process.env['NG_APP_LEGAL_ADDRESS'] || '')},
    email: ${JSON.stringify(process.env['NG_APP_LEGAL_EMAIL'] || '')},
    lastUpdated: ${JSON.stringify(process.env['NG_APP_LEGAL_UPDATED'] || '2026-10-22')},
  },
  paymentsEnabled: false,
  paypalClientId: ${JSON.stringify(process.env['NG_APP_PAYPAL_CLIENT_ID'] || "")},
  firebaseConfig: {
    apiKey: ${JSON.stringify(process.env['NG_APP_FIREBASE_API_KEY'] || '')},
    authDomain: ${JSON.stringify(process.env['NG_APP_FIREBASE_AUTH_DOMAIN'] || '')},
    projectId: ${JSON.stringify(process.env['NG_APP_FIREBASE_PROJECT_ID'] || '')},
    storageBucket: ${JSON.stringify(process.env['NG_APP_FIREBASE_STORAGE_BUCKET'] || '')},
    messagingSenderId: ${JSON.stringify(process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'] || '')},
    appId: ${JSON.stringify(process.env['NG_APP_FIREBASE_APP_ID'] || '')},
    measurementId: ${JSON.stringify(process.env['NG_APP_FIREBASE_MEASUREMENT_ID'] || '')}
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

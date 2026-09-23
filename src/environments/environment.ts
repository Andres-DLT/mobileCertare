export const environment = {
  production: true,
  // Bump on every production deploy so users can confirm the version they see.
  release: '2026-09-23.2',
  // Canonical public URL of the agency site (update when the paid domain lands).
  siteUrl: 'https://certare.web.app',
  // Google Calendar Appointment Schedule link for discovery calls.
  // Create it in Google Calendar: Create -> Appointment schedule -> copy the booking link.
  scheduleUrl: '',
  // Checkout remains hidden until a payment provider is configured.
  paymentsEnabled: false,
  paypalClientId: '',
  firebaseConfig: {
    apiKey: 'AIzaSyAPuh9YGxn4KA7HPy2yoRuomPuOtDXIfY8',
    authDomain: 'smartfoodie-dda27.firebaseapp.com',
    projectId: 'smartfoodie-dda27',
    storageBucket: 'smartfoodie-dda27.firebasestorage.app',
    messagingSenderId: '626578601404',
    appId: '1:626578601404:web:1de784bee9aac0581e27b9',
    measurementId: "G-8KYNQVMBBF",
  },
};

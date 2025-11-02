"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Carga variables desde .env
var envConfig = "\nexport const environment = {\n  production: false,\n  firebaseConfig: {\n    apiKey: '".concat(process.env['NG_APP_FIREBASE_API_KEY'], "',\n    authDomain: '").concat(process.env['NG_APP_FIREBASE_AUTH_DOMAIN'], "',\n    projectId: '").concat(process.env['NG_APP_FIREBASE_PROJECT_ID'], "',\n    storageBucket: '").concat(process.env['NG_APP_FIREBASE_STORAGE_BUCKET'], "',\n    messagingSenderId: '").concat(process.env['NG_APP_FIREBASE_MESSAGING_SENDER_ID'], "',\n    appId: '").concat(process.env['NG_APP_FIREBASE_APP_ID'], "',\n    measurementId: '").concat(process.env['NG_APP_FIREBASE_MEASUREMENT_ID'], "'\n  }\n};\n");
(0, fs_1.writeFile)('./src/environments/environment.ts', envConfig, function (err) {
    if (err) {
        console.error('❌ Error writing environment.ts file', err);
    }
    else {
        console.log('✅ environment.ts generated successfully.');
    }
});

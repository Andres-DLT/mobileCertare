```sh
npm install firebase @angular/fire
```

```sh
export const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};
```

```sh
npm install dotenv
npm install --save-dev @types/node
```

Create environment variables

```sh
npx tsc tools/set-env.ts
npm install --save-dev ts-node typescript
node tools/set-env.js
```

If triggering error

```sh
 Remove-Item -Recurse -Force .\node_modules\typescript
 ```

 Adding the Firebase Admin to be able to update the Firebase DB created in Firebase Dashboard

```sh
 npm install --save-dev firebase-admin ts-node dotenv
```

## Deployment App in Firebase

Install Firebase Global

```sh
npm install -g firebase-tools
```

Firebase authentication

```sh
firebase login
```
Hosting Initiation

```sh
firebase init hosting
```

Deploy the application inside Firebase

```sh
firebase deploy
```

### Test before deployment

```sh
firebase serve --only hosting
```

## Trigger Seed Product Generation

```sh
node scripts/seed-products.js
```
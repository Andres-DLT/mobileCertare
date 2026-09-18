import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getApp } from 'firebase/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from '../../environments/firebase-config';

function createApp() {
  try {
    return initializeApp(firebaseConfig);
  } catch {
    return getApp();
  }
}

export const testProviders = [
  provideRouter([]),
  provideFirebaseApp(createApp),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore())
];
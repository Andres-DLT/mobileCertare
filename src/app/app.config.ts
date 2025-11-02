import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter} from '@angular/router';
// Firebase configuration imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../environments/firebase-config';
import { routes } from './app.routes';
// Fire store imports
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideRouter(routes),
    //Firebase configuration
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    //Firestore configuration
    provideFirestore(() => getFirestore())
  ]
};

import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  collectionData,
  serverTimestamp,
  DocumentReference,
} from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

export interface DiscoveryRequest {
  id?: string;
  uid?: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'contacted' | 'proposal' | 'closed';
  createdAt?: unknown;
}

export interface NewDiscoveryRequest {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class DiscoveryService {
  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private injector: EnvironmentInjector
  ) {}

  /** Visitors can create a request. Only signed-in owners can read theirs. */
  createRequest(input: NewDiscoveryRequest): Promise<DocumentReference> {
    const user = this.auth.currentUser;
    const payload = {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      message: input.message.trim(),
      status: 'new' as const,
      createdAt: serverTimestamp(),
      ...(user ? { uid: user.uid } : {}),
    };
    return runInInjectionContext(this.injector, () =>
      addDoc(collection(this.firestore, 'discovery-requests'), payload)
    );
  }

  /** Lists the current user's requests, newest first. */
  listMyRequests(): Observable<DiscoveryRequest[]> {
    const user = this.auth.currentUser;
    if (!user) return of([]);
    const ref = collection(this.firestore, 'discovery-requests');
    const q = query(ref, where('uid', '==', user.uid), orderBy('createdAt', 'desc'));
    return runInInjectionContext(this.injector, () =>
      collectionData(q, { idField: 'id' })
    ) as Observable<DiscoveryRequest[]>;
  }
}

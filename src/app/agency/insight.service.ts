import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

export interface Insight {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  tags: string[];
  readingTime: number;
  relatedServices: string[];
  order: number;
}

@Injectable({ providedIn: 'root' })
export class InsightService {
  constructor(
    private firestore: Firestore,
    private injector: EnvironmentInjector
  ) {}

  /** Published insights, ordered. */
  getInsights(): Observable<Insight[]> {
    return (
      runInInjectionContext(this.injector, () => {
        const ref = collection(this.firestore, 'insights');
        return collectionData(ref, { idField: 'id' }) as Observable<Insight[]>;
      }) as Observable<Insight[]>
    ).pipe(map((items) => [...(items ?? [])].sort((a, b) => a.order - b.order)));
  }
}

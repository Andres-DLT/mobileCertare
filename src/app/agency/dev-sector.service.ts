import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

export interface DevStage {
  id: string;
  title: string;
  description: string;
  phase: string;
  order: number;
  deliverables: string[];
  tags?: string[];
}

export type DevSector = 'mobile' | 'web' | 'ai' | 'training';

const COLLECTIONS: Record<DevSector, string> = {
  mobile: 'mobile-services',
  web: 'web-services',
  ai: 'ai-services',
  training: 'training-services',
};

@Injectable({ providedIn: 'root' })
export class DevSectorService {
  constructor(
    private firestore: Firestore,
    private injector: EnvironmentInjector
  ) {}

  /** Lifecycle stages of a sector, ordered by `order`. */
  getStages(sector: DevSector): Observable<DevStage[]> {
    return (
      runInInjectionContext(this.injector, () => {
        const ref = collection(this.firestore, COLLECTIONS[sector]);
        return collectionData(ref, { idField: 'id' }) as Observable<DevStage[]>;
      }) as Observable<DevStage[]>
    ).pipe(map((stages) => [...(stages ?? [])].sort((a, b) => a.order - b.order)));
  }
}

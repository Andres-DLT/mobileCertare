import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
import { Observable, combineLatest, from, map, of } from 'rxjs';
import { COLLECTIONS, CollectionConfig } from '../collections/collection-config';

export type CatalogSector = 'testing' | 'mobile' | 'web' | 'ai' | 'training';

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  /** Null when the offering is quoted per scope. */
  price: number | null;
  /** Category (testing) or lifecycle phase (other sectors). */
  group: string;
  sector: CatalogSector;
  sectorLabel: string;
  tags?: string[];
  deliverables?: string[];
}

interface RawDoc {
  docId?: string;
  id?: string;
  title: string;
  description: string;
  price?: number;
  category?: string;
  phase?: string;
  tags?: string[];
  deliverables?: string[];
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(
    private firestore: Firestore,
    private injector: EnvironmentInjector
  ) {}

  /** Unified catalog across all five Firestore collections. */
  getCatalog(): Observable<CatalogItem[]> {
    return combineLatest(COLLECTIONS.map(config => this.getCollection(config.key)))
      .pipe(map(groups => groups.flat()));
  }

  /** One Firestore listener for the requested discipline. */
  getCollection(sector: CatalogSector): Observable<CatalogItem[]> {
    const config = COLLECTIONS.find(item => item.key === sector);
    if (!config) return of([]);
    return runInInjectionContext(this.injector, () =>
      collectionData(collection(this.firestore, config.collection), { idField: 'docId' }) as Observable<RawDoc[]>
    ).pipe(map(docs => (docs ?? []).map(raw => this.normalize(raw, config))));
  }

  getService(sector: CatalogSector, id: string): Observable<CatalogItem | null> {
    const config = COLLECTIONS.find(item => item.key === sector);
    if (!config) return of(null);
    return from(runInInjectionContext(this.injector, () =>
      getDoc(doc(this.firestore, config.collection, id))
    )).pipe(map(snapshot => snapshot.exists()
      ? this.normalize({ ...(snapshot.data() as RawDoc), docId: snapshot.id }, config)
      : null));
  }

  private normalize(raw: RawDoc, config: CollectionConfig): CatalogItem {
    return {
      id: raw.docId ?? raw.id ?? '',
      title: raw.title,
      description: raw.description,
      price: typeof raw.price === 'number' ? raw.price : null,
      group: raw.category ?? raw.phase ?? 'Service',
      sector: config.key,
      sectorLabel: config.label,
      tags: raw.tags,
      deliverables: raw.deliverables,
    };
  }
}

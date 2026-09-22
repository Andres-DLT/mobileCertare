import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, combineLatest, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  'image-front': string;
  'image-back': string;
  category: string;
  tags?: string[];
}

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
}

export const CATALOG_SECTORS: { key: CatalogSector | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'testing', label: 'Testing' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'web', label: 'Web' },
  { key: 'ai', label: 'AI' },
  { key: 'training', label: 'Training' },
];

const SECTOR_COLLECTIONS: { sector: CatalogSector; label: string; collection: string }[] = [
  { sector: 'testing', label: 'Testing', collection: 'product-store' },
  { sector: 'mobile', label: 'Mobile', collection: 'mobile-services' },
  { sector: 'web', label: 'Web', collection: 'web-services' },
  { sector: 'ai', label: 'AI', collection: 'ai-services' },
  { sector: 'training', label: 'Training', collection: 'training-services' },
];

interface RawDoc {
  docId?: string;
  id?: string;
  title: string;
  description: string;
  price?: number;
  category?: string;
  phase?: string;
  tags?: string[];
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly collectionName = environment.productsCollection;

  constructor(
    private firestore: Firestore,
    private injector: EnvironmentInjector
  ) {}

  getProducts(): Observable<Product[]> {
    return runInInjectionContext(this.injector, () => {
      const ref = collection(this.firestore, this.collectionName);
      return collectionData(ref, { idField: 'id' }) as Observable<Product[]>;
    });
  }

  /** Unified catalog across all five Firestore collections. */
  getCatalog(): Observable<CatalogItem[]> {
    const streams = SECTOR_COLLECTIONS.map(({ sector, label, collection: name }) =>
      runInInjectionContext(this.injector, () => {
        const ref = collection(this.firestore, name);
        return collectionData(ref, { idField: 'docId' }) as Observable<RawDoc[]>;
      }).pipe(
        map((docs) =>
          (docs ?? []).map((d) => ({
            id: d.docId ?? d.id ?? '',
            title: d.title,
            description: d.description,
            price: typeof d.price === 'number' ? d.price : null,
            group: d.category ?? d.phase ?? 'Service',
            sector,
            sectorLabel: label,
            tags: d.tags,
          }) as CatalogItem)
        )
      )
    );
    return combineLatest(streams).pipe(map((groups) => groups.flat()));
  }
}

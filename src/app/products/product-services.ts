import { Injectable, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
}

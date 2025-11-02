import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  'image-front': string;
  'image-back': string;
  size_s: string;
  size_m: string;
  size_l: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private firestore: Firestore) {}

  getProducts(): Observable<Product[]> {
    const productsRef = collection(this.firestore, 'cloth-store');
    return collectionData(productsRef, { idField: 'docId' }) as Observable<Product[]>;
  }
}

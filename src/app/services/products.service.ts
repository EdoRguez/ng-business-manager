import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { product } from '../models/product';
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dbPath = '/products';

  productsRef: AngularFireList<Product> = null;

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
  }

  createProduct(product: Product): void {
    this.productsRef.push(product);
  }

  updateProduct(key: string, value: any): Promise<void> {
    return this.productsRef.update(key, value);
  }

  deleteProduct(key: string): Promise<void> {
    return this.productsRef.remove(key);
  }

  getProductsList(): AngularFireList<Product> {
    return this.productsRef;
  }
}

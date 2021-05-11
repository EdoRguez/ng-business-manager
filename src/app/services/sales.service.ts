import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Sale } from '../models/sale-model';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private dbPath = '/sales';

  salesRef: AngularFireList<Sale> = null;

  constructor(private db: AngularFireDatabase) {
    this.salesRef = db.list(this.dbPath);
  }

  createSale(salef: Sale): void {
    this.salesRef.push(salef);
  }

  updateSale(key: string, value: any): Promise<void> {
    return this.salesRef.update(key, value);
  }

  deleteSale(key: string): Promise<void> {
    return this.salesRef.remove(key);
  }

  getSalesList(): AngularFireList<Sale> {
    return this.salesRef;
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Order } from '../models/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private dbPath = '/orders';

  ordersRef: AngularFireList<Order> = null;

  constructor(private db: AngularFireDatabase) {
    this.ordersRef = db.list(this.dbPath);
  }

  createOrder(orderf: Order): void {
    this.ordersRef.push(orderf);
  }

  updateOrder(key: string, value: any): Promise<void> {
    return this.ordersRef.update(key, value);
  }

  deleteOrder(key: string): Promise<void> {
    return this.ordersRef.remove(key);
  }

  getOrdersList(): AngularFireList<Order> {
    return this.ordersRef;
  }
}

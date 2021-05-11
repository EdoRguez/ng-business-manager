import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[];
  isLoading: boolean = true;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getOrdersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((orders) => {
      this.isLoading = false;
      this.orders = orders;
    });
  }

}

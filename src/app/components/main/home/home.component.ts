import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoading: boolean = true;
  orders: any[];

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
      console.log(orders);
    });
  }

}

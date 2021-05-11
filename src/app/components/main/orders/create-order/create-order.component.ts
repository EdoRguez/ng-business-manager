import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  idToUpdate: string;

  formOrders1: FormGroup = new FormGroup({
    serie: new FormControl(null, [Validators.required, Validators.maxLength(3), Validators.max(999)]),
    initialDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required])  
  });

  formOrders2: FormGroup = new FormGroup({
    productName: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]) ,
    deliveryPrice: new FormControl(null, [Validators.required])
  });

  productList: any[];

  constructor(private productService: ProductsService,
              private orderService: OrdersService,
              private router: Router,
              private route: ActivatedRoute,
              public alertConfig: NgbAlertConfig) { 
    alertConfig.dismissible = false;
    alertConfig.type = 'success';

    this.idToUpdate =this.route.snapshot.params['key'];

    this.productService.getProductsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((products) => {
      this.productList = products;
    });
  }

  ngOnInit(): void {
    if(this.idToUpdate) {
      this.orderService.getOrdersList().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe((orders) => {

          const filteredOrders = orders.filter(x => x.key === this.idToUpdate);
          const order = filteredOrders[0];

          this.formOrders1.get('serie').setValue(order.serie);
          this.formOrders1.get('initialDate').setValue(new Date(order.initialDate));
          this.formOrders1.get('endDate').setValue(new Date(order.endDate));
          this.formOrders1.get('country').setValue(order.country);

          this.formOrders2.get('productName').setValue(order.productName);
          this.formOrders2.get('price').setValue(order.price);
          this.formOrders2.get('quantity').setValue(order.quantity);
          this.formOrders2.get('deliveryPrice').setValue(order.deliveryPrice);
      });
    }
  }

  validateQuantities() : boolean {
    if(this.formOrders2.get('price').value && this.formOrders2.get('quantity').value && this.formOrders2.get('deliveryPrice').value) {
      return true;
    }
    
    return false;
  }

  onSaveForm() {
    if(this.formOrders1.valid && this.formOrders2.valid) {

      const newOrder = {
        ...this.formOrders1.value,
        ...this.formOrders2.value
      };

      newOrder.initialDate = newOrder.initialDate.toString();
      newOrder.endDate = newOrder.endDate.toString();

      if(this.idToUpdate) {
        this.orderService.updateOrder(this.idToUpdate, newOrder);  
      } else {
        this.orderService.createOrder(newOrder);
      }

      this.router.navigate(['/main/orders']);
    }
  }

}

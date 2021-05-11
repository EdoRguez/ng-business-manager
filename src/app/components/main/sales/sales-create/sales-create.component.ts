import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/products.service';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.css']
})
export class SalesCreateComponent implements OnInit {

  idToUpdate: string;
  productList: any[];

  formSales: FormGroup = new FormGroup({
    product: new FormControl(null, [Validators.required]),
    deliveryDate: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required, Validators.maxLength(3)]),
    isDelivery: new FormControl(false, [Validators.required]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    description: new FormControl("", [Validators.maxLength(200)]),
    type: new FormControl(null, [Validators.required])
  });

  constructor(private productService: ProductsService,
              private salesService: SalesService,
              private route: ActivatedRoute,
              private router: Router,
              public alertConfig: NgbAlertConfig) { 
    alertConfig.dismissible = false;
    alertConfig.type = 'success';

    this.idToUpdate = this.route.snapshot.params['key'];
    
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
      this.salesService.getSalesList().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe((orders) => {
        const filteredOrders = orders.filter(x => x.key === this.idToUpdate);
        const oldOrder = filteredOrders[0];

        this.formSales.get('product').setValue(oldOrder.product);
        this.formSales.get('deliveryDate').setValue(new Date(oldOrder.deliveryDate));
        this.formSales.get('price').setValue(oldOrder.price);
        this.formSales.get('quantity').setValue(oldOrder.quantity);
        this.formSales.get('isDelivery').setValue(oldOrder.isDelivery);
        this.formSales.get('address').setValue(oldOrder.address);
        this.formSales.get('description').setValue(oldOrder.description);
        this.formSales.get('type').setValue(oldOrder.type);

      });
    }
  }

  validateQuantities() : boolean {
    if(this.formSales.get('price').value && this.formSales.get('quantity').value) {
      return true;
    }
    
    return false;
  }

  onSubmitForm() {
    if(this.formSales.valid) {
      const newOrder = {
        ...this.formSales.value
      }

      newOrder.deliveryDate = newOrder.deliveryDate.toString();

      if(this.idToUpdate) {
        this.salesService.updateSale(this.idToUpdate, newOrder);
      } else {
        this.salesService.createSale(newOrder);
      }

      this.router.navigate(['/main/sales']);
    }
  }

}

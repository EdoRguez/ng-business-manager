import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { order } from 'src/app/models/order';
import { product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  selectedValue: product = null;
  products: order[];
  isLoading: boolean = true;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProductsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((products: any[]) => {
      this.isLoading = false;
      this.products = products;
    });

  }

  sendSelectedValue(value: product) {
    this.selectedValue = value;
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { product } from 'src/app/models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  @Output() onSelectedValue = new EventEmitter<product>();
  @Input() products: product[];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionChange(event: any) {
    const result = event.option._value.split('|');
    this.onSelectedValue.emit({ key: result[0], name: result[1] });
  }

}

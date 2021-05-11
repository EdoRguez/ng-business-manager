import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-home-table',
  templateUrl: './home-table.component.html',
  styleUrls: ['./home-table.component.css']
})
export class HomeTableComponent implements OnInit, AfterViewInit {

  @Input() ordersList: order[];

  displayedColumns: string[] = ['serie', 
                                'productName', 
                                'price', 
                                'quantity', 
                                'priceMultiQuantity', 
                                'deliveryPrice', 
                                'unitDeliveryPrice',
                                'deliveryPlusTotal', 
                                'sellingPrice', 
                                'unitGain', 
                                'totalGain'];

  dataSource: MatTableDataSource<order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ordersService: OrdersService,
              private router: Router) {
    this.ordersService.getOrdersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((orders) => {
      this.dataSource = new MatTableDataSource(orders.reverse());
    });
    
  }

  ngOnInit(): void {
    if(this.dataSource) {

    }
   }

  ngAfterViewInit() {
    if(this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;   
    }
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

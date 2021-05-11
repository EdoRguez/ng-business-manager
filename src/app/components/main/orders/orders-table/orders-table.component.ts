import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { OrdersModalDeleteComponent } from './orders-modal-delete/orders-modal-delete.component';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent implements OnInit, AfterViewInit {

  @Input() ordersList: order[];

  displayedColumns: string[] = ['serie', 'productName', 'country', 'initialDate', 'endDate', 'price', 'quantity', 'deliveryPrice', 'total', 'options'];
  dataSource: MatTableDataSource<order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private ordersService: OrdersService,
              private modalService: NgbModal,
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

    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.serie.toString().includes(filter) || 
             data.productName.toLowerCase().includes(filter) || 
             data.country.toLowerCase().includes(filter) ||
            //  data.initialDate.toString().toLowerCase().includes(filter) || 
            //  data.endDate.toString().toLowerCase().includes(filter) || 
             data.price.toString().includes(filter) || 
             data.quantity.toString().includes(filter) ||
             data.deliveryPrice.toString().includes(filter);
      };

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEditOrder(order: order) {
    this.router.navigate(['/main/orders/create', order.key]);
  }

  open(key: string) {
    const modalRef = this.modalService.open(OrdersModalDeleteComponent);
    modalRef.componentInstance.key = key;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  salesList: any[];
  isLoading: boolean = true;

  constructor(private salesService: SalesService) {
    this.salesService.getSalesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe((sales) => {
      this.isLoading = false;
      this.salesList = sales;
    });
   }

  ngOnInit(): void {
  }

}

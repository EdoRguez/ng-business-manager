import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesModalDeleteComponent } from './sales-modal-delete/sales-modal-delete.component';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent implements OnInit {

  @Input() sales: any[];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(key: string) {
    const modalRef = this.modalService.open(SalesModalDeleteComponent);
    modalRef.componentInstance.key = key;
  }

}

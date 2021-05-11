import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-options-orders',
  templateUrl: './options-orders.component.html',
  styleUrls: ['./options-orders.component.css']
})
export class OptionsOrdersComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

}

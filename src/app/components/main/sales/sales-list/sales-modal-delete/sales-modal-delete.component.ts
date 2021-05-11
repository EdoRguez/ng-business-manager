import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SalesService } from "src/app/services/sales.service";

@Component({
    selector: 'ngb-sales-modal-delete',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">Elminar Venta</h4>
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p>¿Estás seguro que deseas eliminar esta venta?</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" (click)="onDeleteSale()">Borrar</button>
        </div>
    `
})
export class SalesModalDeleteComponent implements OnInit {
    
    @Input() key;

    constructor(public activeModal: NgbActiveModal,
                private salesService: SalesService) {}

    ngOnInit(): void {}

    onDeleteSale() {
        this.salesService.deleteSale(this.key);
        this.activeModal.close();
    }

}
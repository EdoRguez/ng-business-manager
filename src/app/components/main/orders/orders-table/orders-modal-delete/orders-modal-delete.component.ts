import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { OrdersService } from "src/app/services/orders.service";

@Component({
    selector: 'ngb-orders-modal-delete',
    template: `
        <div class="modal-header">
            <h4 class="modal-title">Elminar Pedido</h4>
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p>¿Estás seguro que deseas eliminar este pedido?</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" (click)="onDeleteOrder()">Borrar</button>
        </div>
    `
})
export class OrdersModalDeleteComponent implements OnInit {
    
    @Input() key;

    constructor(public activeModal: NgbActiveModal,
                private ordersService: OrdersService) {}

    ngOnInit(): void {}

    onDeleteOrder() {
        this.ordersService.deleteOrder(this.key);
        this.activeModal.close();
    }

}
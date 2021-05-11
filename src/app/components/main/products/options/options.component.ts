import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { product } from 'src/app/models/product';
import { Product } from 'src/app/models/product-model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @Input() selectedValue: product = null;

  closeResult = '';

  productForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(50)])
  });

  constructor(private modalService: NgbModal,
              private productService: ProductsService) { }

  ngOnInit(): void { }

  onSaveFormSubmit() {
    if(this.productForm.valid) {
      const product: Product = new Product();
      product.name = this.productForm.get('name').value; 
      this.productService.createProduct(product);   

      this.productForm.get('name').setValue(null);
    } else {
      console.log('Invalid create product form')
    }
  }

  onEditFormSubmit() {
    if(this.productForm.valid) {
      const product: Product = new Product();
      product.name = this.productForm.get('name').value; 
      this.productService.updateProduct(this.selectedValue.key, product);   

      
    } else {
      console.log('Invalid edit product form')
    }
  }

  onDeleteFormSubmit() {
    this.productService.deleteProduct(this.selectedValue.key);   
  }
  
  open(content) {

    if(content._declarationTContainer.localNames[0] === 'addModal') {
      this.productForm.get('name').setValue(null);
    } else {
      this.productForm.get('name').setValue(this.selectedValue.name);
    }

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

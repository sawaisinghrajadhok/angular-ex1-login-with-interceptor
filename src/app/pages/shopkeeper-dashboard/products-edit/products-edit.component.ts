import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../../../providers/products/product.service';


@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {

  @Input() data: any;
  @Output() dataRefractEmitters: EventEmitter<{}> = new EventEmitter();
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private productService: ProductService) { }

  ngOnInit() {
  }

  editProductForm = this.fb.group({
    name: ['', [Validators.required]],
    quantity:['', [Validators.required]],
    description:[''],
    price:['', [Validators.required]],
    productType:['OTHER'],
    customerType:['BOTH']
  });

  openEditModal(modal) {
    this.editProductForm.get('name').setValue(this.data.name);
    this.editProductForm.get('quantity').setValue(this.data.quantity);
    this.editProductForm.get('description').setValue(this.data.description);
    this.editProductForm.get('price').setValue(this.data.price);
    this.editProductForm.get('productType').setValue(this.data.productType);
    this.editProductForm.get('customerType').setValue(this.data.customerType);
    console.log(this.data.customerType);
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateProduct() {
    var productJson = {
      'name': this.editProductForm.value.name,
      'price': this.editProductForm.value.price,
      'quantity': this.editProductForm.value.quantity,
      'description': this.editProductForm.value.description,
      'productType': this.editProductForm.value.productType,
      'customerType': this.editProductForm.value.customerType
    }
    this.productService.updateProduct(this.data._id, productJson)
      .subscribe(result=> {
        this.modalService.dismissAll();
        this.dataRefractEmitters.emit();
      })
  }
}

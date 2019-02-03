import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../providers/products/product.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Form, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }

  products: any;
  productId: any;
  
  ngOnInit() {
    this.getAllProducts();
  }

  editProductForm = this.fb.group({
    name: ['', [Validators.required]],
    quantity:['', [Validators.required]],
    description:[''],
    price:['', [Validators.required]],
    productType:['OTHER'],
    customerType:['ALL']
  });

  
  getAllProducts() {
    this.productService.getAllProductsForShopkeeper()
    .subscribe(result=> {
      this.products = result.body;
    }, error=> {
      alert(error.message);
    });
  }

  deleteProduct(productId) {
    this.productService.deleteProduct(productId)
      .subscribe(result=> {
        this.products = this.getAllProducts();
      }, error=> {
      });
  }

  editProductPopup(edit, product) {
    this.productId = product._id;
    this.editProductForm.get('name').setValue(product.name);
    this.editProductForm.get('price').setValue(product.price);
    this.editProductForm.get('quantity').setValue(product.quantity);
    this.editProductForm.get('customerType').setValue(product.customerType);
    this.editProductForm.get('productType').setValue(product.productType);
    this.editProductForm.get('description').setValue(product.description);
    
    this.modalService.open(edit, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
    this.productService.updateProduct(this.productId, productJson)
      .subscribe(result=> {
        this.modalService.dismissAll();
        this.getAllProducts();
      })
  }
}


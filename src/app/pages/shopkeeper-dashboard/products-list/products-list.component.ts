import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../providers/products/product.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Form, Validators } from '@angular/forms';
declare var $: any;

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

  realoadAllProducts() {
    this.getAllProducts();
  }

  openAddProductModal() {
    $('#addproductmodal').modal('show');
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../providers/products/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) { }
  ngOnInit() {
  }

  searchProductForm = this.fb.group({
    productType: ['ALL'],
    customerType: ['ALL'],
    startPrice: ['', [Validators.min(0)]],
    endPrice: ['', [Validators.min(0)]],
    name: ['']
  });

  search() {
    var customerType = this.searchProductForm.value.customerType;
    var productType = this.searchProductForm.value.productType;
    var startPrice = this.searchProductForm.value.startPrice;
    var endPrice = this.searchProductForm.value.endPrice;
    var name = this.searchProductForm.value.name;

    console.log(customerType);
    console.log(productType);
    console.log(startPrice);
    console.log(endPrice);
    console.log(name);

    if (productType == 'ALL') {
      productType = "";
    }

    this.productService.searchProduct(customerType, productType, startPrice, endPrice, name)
    .subscribe(result=> {
      console.log('search result success ' + result);
    }, 
    error=> {
      console.log('search result failed ' + error);
    })
  }
}



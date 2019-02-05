import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../providers/products/product.service';
import { Router } from '@angular/router';
declare var $ :any;

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']

})
export class AddProductComponent {
  
  @Output() dataRefractEmitter: EventEmitter<{}> = new EventEmitter();
  closeResult: string;

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private router: Router) {}

  addProductForm = this.fb.group({
    name: ['', [Validators.required]],
    quantity:['', [Validators.required, Validators.min(1), Validators.max(5000)]],
    description:[''],
    price:['', [Validators.required, Validators.min(0), Validators.max(2147483647)]],
    productType:['OTHER'],
    customerType:['BOTH']
  });

  addProduct() {
    var name = this.addProductForm.value.name;
    var quantity = this.addProductForm.value.quantity;
    var description = this.addProductForm.value.description;
    var price = this.addProductForm.value.price;
    var productType = this.addProductForm.value.productType;
    var customerType = this.addProductForm.value.customerType;

    var requestJson = {
      'name': name,
      'price': price,
      'description': description,
      'quantity': quantity,
      'customerType': customerType,
      'productType': productType
    };
    this.productService.addProduct(requestJson)
    .subscribe(result=> {
      $('#addproductmodal').modal('hide');
      this.dataRefractEmitter.emit();
    }, error=> {
      console.log('product adding failed');
    }); 
  }
}

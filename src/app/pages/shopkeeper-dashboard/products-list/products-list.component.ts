import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../providers/products/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(private productService: ProductService) { }

  products: any;
  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProductsForShopkeeper()
    .subscribe(result=> {
      this.products = result.body;
    }, error=> {
      alert(error);
    });
  }
}

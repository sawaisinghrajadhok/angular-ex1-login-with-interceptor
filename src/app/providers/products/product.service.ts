import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from '../../constant';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAllProductsForShopkeeper(): Observable<any> {
    return this.httpClient.get(AppConstants.BASE_SERVER_API_URL + '/products/by-shopkeeper/'+ localStorage.getItem(AppConstants.LOGGEDIN_USER_ID_STORATE_NAME), {observe: 'response'});
  }

  addProduct(requestJson): Observable<any> {
    return this.httpClient.post(AppConstants.BASE_SERVER_API_URL + '/products', requestJson, {observe: 'response'});
  }

  deleteProduct(productId) {
    return this.httpClient.delete(AppConstants.BASE_SERVER_API_URL + '/products/' + productId, {observe: 'response'});
  }

  updateProduct(productId, product): Observable<any> {
    return this.httpClient.put(AppConstants.BASE_SERVER_API_URL + '/products/' + productId, product, {observe: 'response'});
  }

  searchProduct(customerType, productType, startPrice, endPrice, name) {
    var url = AppConstants.BASE_SERVER_API_URL + '/products?customerType=' + customerType + '&productType=' + productType + '&name=' + name + '&startPrice=' + startPrice + '&endPrice=' + endPrice;
    console.log('url ' + url);
    return this.httpClient.get(url, {observe: 'response'}); 
  }
}

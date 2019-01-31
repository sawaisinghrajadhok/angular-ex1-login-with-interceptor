import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../../constant';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getAllProductsForShopkeeper(): Observable<any> {
    return this.httpClient.get(AppConstants.BASE_SERVER_API_URL + '/products/by-shopkeeper/'+ localStorage.getItem(AppConstants.LOGGEDIN_USER_ID_STORATE_NAME), {observe: 'response'});
  }
}


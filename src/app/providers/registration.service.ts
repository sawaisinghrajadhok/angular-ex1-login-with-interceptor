import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  
  constructor(
    private httpClient: HttpClient
  ) { }

  registerCustomer(customer) {

  }

  registerShopkeeper(shopkeeper): Observable<any> {
    return this.httpClient.post(AppConstants.BASE_SERVER_API_URL + '/shopkeepers', shopkeeper, {observe: 'response'})
  }
}

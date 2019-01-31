import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../constant';

@Injectable({
  providedIn: 'root'
})
export class ShopkeeperService {

  constructor(private httpClient: HttpClient) { }

  getLoggedinShopkeeperProfile(): Observable<any> {
    return this.httpClient.get(AppConstants.BASE_SERVER_API_URL + '/shopkeepers/loggedin', {observe: 'response'});
  }
}

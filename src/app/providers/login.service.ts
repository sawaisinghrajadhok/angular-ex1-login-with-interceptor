import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  
  login(username, password, usertype): Observable<any> {
    var httpHeader = new HttpHeaders();
    httpHeader = httpHeader.set('Authorization', 'Basic '+ btoa(username + ':' + password))
                .set('x-role', usertype);  
    return this.httpClient.post(AppConstants.BASE_SERVER_API_URL + '/login', {}, {headers: httpHeader, observe: 'response'});
  }
}

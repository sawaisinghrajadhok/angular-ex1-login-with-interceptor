import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor() {}
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var basicAuth = request.headers.get('Authorization');
        console.log('Comming with basic auth : ' + basicAuth);
        if (basicAuth == null) {
            let token = localStorage.getItem('jwt-token');
            if (token) {
                console.log('inside token not null');
                request = request.clone({
                    setHeaders : {Authorization: 'Bearer ' + token}  
                });
            } else {
                console.log('Please re-direct to login page. Because no jwt-token or basic auth.');
            }
        }
        return next.handle(request);
    }
}

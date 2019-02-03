import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppConstants } from '../constant';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var basicAuth = request.headers.get('Authorization');
        console.log('Comming with basic auth : ' + basicAuth);
        if (request.url.indexOf('login') < 0) {
            let token = localStorage.getItem(AppConstants.JWT_TOKEN_STORAGE_NAME);
            if (token) {
                console.log('inside token not null');
                request = request.clone({
                    setHeaders : {Authorization: 'Bearer ' + token}  
                });
            } else {
                console.log('Please re-direct to login page. Because no jwt-token or basic auth.');
            }
        }
        return next.handle(request)
            .pipe(map((event: HttpEvent<any>)=> {
                return event;
            }), catchError((error: HttpErrorResponse)=> {
                console.log('error status ' + error.status);
                if (error.status == 401) {
                    this.router.navigate(['/login']);
                } else {
                    alert('Opps something goes wrong: ' + error.message);
                }
                return throwError(error);  
            }));
    }
}

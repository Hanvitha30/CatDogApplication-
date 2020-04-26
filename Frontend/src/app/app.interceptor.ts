import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiService } from './shared/api.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private authService: ApiService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		
		console.log('Interceptorr');
		
        const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser && currentUser.token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + currentUser.token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
		
		console.log('Interceptorr req', request);
		
		return next.handle(request).pipe(catchError(err => {
			console.log('Error: ', err);
            alert('Error in processing your request. Please try again.'); 
           return throwError(err);
		}));
		
		 return next.handle(request);
		
	}
}
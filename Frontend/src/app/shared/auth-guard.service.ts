import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { ApiService } from './api.service';

@Injectable()

export class AuthGuardService implements CanActivate {

  constructor(public auth: ApiService, public router: Router) {}
  
  canActivate(): boolean {
	  
	let user = JSON.parse(localStorage.getItem('currentUser')); 
	console.log(user);
    if (user === null && !user) {
		console.log(2);
		this.router.navigate(['/auth/login']); 
		return false;
	} 
    return true; 
	
  }
  
}
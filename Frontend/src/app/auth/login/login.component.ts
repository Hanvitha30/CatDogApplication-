import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

import { ApiService } from './../../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	
  emailId: string = "";
  
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
		let user = JSON.parse(localStorage.getItem('currentUser'));  
		if (user && user.token) { 
			this.router.navigate(['/dashboard'])
		} 
  }
  
  login() {
	  
	this.api.login(this.emailId).subscribe( (success) => {
		
		console.log(success);
		
		this.router.navigate(['/dashboard']);
		
	},
	
	(error) => {
		
		console.log(error);
		
	});
	  
  }

}

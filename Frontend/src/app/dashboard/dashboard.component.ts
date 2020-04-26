import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../shared/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard: any = [];

  constructor(private api: ApiService, private router : Router) { }

  ngOnInit() { 
  
	this.getDashboardDetails();
  
  }
  
  logout() {
	localStorage.removeItem('currentUser');  
	this.router.navigate(['/auth/login']); 
  }
  
  getDashboardDetails(){ 
  
	this.api.getResults().subscribe((success) => {
		
		this.dashboard = success.data;
		console.log('Game Success response: ', success);
				
	},
		
	(error) => {
			 
		console.log('Game Success response: ', error);
			
	});
	 
  }

}

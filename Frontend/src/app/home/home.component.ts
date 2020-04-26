import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
	
  user: string = '';
  
  constructor(private router: Router) { }

  ngOnInit() {
	  
	let user = JSON.parse(localStorage.getItem('currentUser'));  
	if (user && user.token) { 
		this.user = user.email;	 
	}   
	  
  }

}

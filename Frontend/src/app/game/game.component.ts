import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './../shared/api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  gameInput: string = '';
  
  systemGenInput: string = '1234';
  
  displayMessage: string = '';
  errorMessage: string = '';
  
  constructor(private api: ApiService, private router : Router) { }

  ngOnInit() {
  }
  
  submitInput() { 
  
    let result: {'cat': number, 'dog': number} = {'cat': 0, 'dog': 0}
	
	let system = this.systemGenInput.split('');
	
	let input = this.gameInput.split('');
	
	input.forEach(function(value, key){
		system.forEach(function(value1, key1){
			if (value === value1 && value === (key+1).toString()) {
				result['cat']++;
		
			} else if (value === value1) {
				result['dog']++; 
			}
		})
	})
	 
	this.api.save(result).subscribe( (success) => {
		
		this.displayMessage = result.cat + ' CATS ' + result.dog + ' DOGS';
	
		if (result.cat === 4) {
			this.errorMessage 	= '';
			this.displayMessage += '\n You Won the Game';
			
			console.log('Won Game');
			
			// this.router.navigate(['dashboard']);
			
		} else {
			
			this.errorMessage = 'You lost the game. Please try again';
			
			console.log('Try again');
			
		}
			
	},
	
	(error) => {
		this.errorMessage = 'Something went wrong. Please try again later.';
		console.log('Game Success response: ', error);
		
	});
	
	console.log(result);
	
  }

}

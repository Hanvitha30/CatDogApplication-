import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api/';
  
   
  
  constructor(private http: HttpClient) { }
  
  login(email: string) {
        return this.http.post<any>(this.apiUrl+'login', {'email':email})
            .pipe(map(user => { 
                if (user && user.token) { 
                    localStorage.setItem('currentUser', JSON.stringify({'email': user.email, 'token': user.token, 'user_id': user.user_id})); 
                } 
                return user;
        }));
    }
  
   save(data) {
		let obj 	=	{win: 0, lose: 0, userId: ''};
		if(data.cat === 4){
			obj.win = 1;
		} else {
			obj.lose = 1;
		}
		obj.userId = (JSON.parse(localStorage.getItem('currentUser'))).user_id; 
        return this.http.post<any>(this.apiUrl+'play', obj);
    }
	
	
	getResults() {
        return this.http.get<any>(this.apiUrl+'dashboard' );
    }
	
  
}

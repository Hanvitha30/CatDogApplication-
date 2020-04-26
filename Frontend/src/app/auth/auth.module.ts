import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule  } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component'; 

@NgModule({
  imports: [
    CommonModule,
	FormsModule, 
    AuthRoutingModule 
  ],
  declarations: [AuthComponent, LoginComponent]
})
export class AuthModule { }

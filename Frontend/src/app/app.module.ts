import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor} from './app.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './shared/api.service';
import { AppComponent } from './app.component'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }, ApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

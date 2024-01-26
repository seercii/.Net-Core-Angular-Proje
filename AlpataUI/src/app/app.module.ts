// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddMeetComponent } from './add-meet/add-meet.component';
import { DatePipe } from '@angular/common';  // Import DatePipe


//burada neleri import declarations edeceğimizi yazdık

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddMeetComponent,
    

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

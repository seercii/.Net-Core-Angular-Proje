import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../models/register-model';
import { LoginModel } from '../models/login-model';
import { Observable } from 'rxjs';
import { MeetModel } from '../models/meet-model';
@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor( private http: HttpClient) { 
  }  

  getUser(){
   return this.http
     .get<RegisterModel[]>(environment.apiUrl + '/User');      
 }

 login(loginModel: LoginModel): Observable<any> {
  return this.http.post(environment.apiUrl + '/User/login',loginModel);
}

register(registerModel: RegisterModel): Observable<any> {
  return this.http.post(environment.apiUrl + '/User',registerModel);
}

getMeet(){
  return this.http
    .get<MeetModel[]>(environment.apiUrl + '/Meet');      
}

createMeet(meetModel: MeetModel): Observable<any> {
  return this.http.post(environment.apiUrl + '/Meet',meetModel);
}
}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterModel } from '../models/register-model';
import { LoginModel } from '../models/login-model';
import { Observable } from 'rxjs';
import { MeetModel } from '../models/meet-model';
@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) {
  }

  getUser() {
    return this.http
      .get<RegisterModel[]>(environment.apiUrl + '/User');
  }

  getUserById(id: number): Observable<RegisterModel> {
    return this.http.get<RegisterModel>(environment.apiUrl + '/User/' + id);
  }
  updateUser(id: number, user: FormData): Observable<RegisterModel> {
    return this.http.put(`${environment.apiUrl}/User/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/User/${id}`);
  }

  login(loginModel: LoginModel): Observable<any> {
    return this.http.post(environment.apiUrl + '/User/login', loginModel);
  }

  register(registerModel: FormData): Observable<RegisterModel> {
    return this.http.post(environment.apiUrl + '/User', registerModel);
  }

  getMeet() {
    return this.http
      .get<MeetModel[]>(environment.apiUrl + '/Meet');
  }

  createMeet(meetModel: FormData): Observable<MeetModel> {
    return this.http.post(environment.apiUrl + '/Meet', meetModel);
  }
  getMeetById(id: number): Observable<RegisterModel> {
    return this.http.get<MeetModel>(environment.apiUrl + '/Meet/' + id);
  }
  updateMeet(id: number, meet: FormData): Observable<MeetModel> {
    return this.http.put(`${environment.apiUrl}/Meet/${id}`, meet);
  }

  deleteMeet(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/Meet/${id}`);
  }

}



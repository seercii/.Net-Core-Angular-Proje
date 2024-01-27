import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = 'accessToken';//localstrogeda kullanılacak token
  private token: string | null = null;//servis içinde tutulan token

  getAccessToken(): string | null {//local strogedan tokenı alır
    return localStorage.getItem(this.accessTokenKey);
  }

  setAccessToken(token: string): void {//local storega tokenı kaydeder
    localStorage.setItem(this.accessTokenKey, token);
  }

  removeAccessToken(): void {//local storegdan tokenı kaldırır
    localStorage.removeItem(this.accessTokenKey);
  }

  isAuthenticated(): boolean {//kullanıcnın oturum durumunu kontrol eder 
    return !!localStorage.getItem('accessToken');
  }
}

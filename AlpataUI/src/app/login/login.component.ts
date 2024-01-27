import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { LoginModel } from '../models/login-model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel: LoginModel = { Email: '', Password: '' };

  constructor(private accountService: AccountService, private router: Router, private authService: AuthService
  ) { }

  login() {
    this.accountService.login(this.loginModel).subscribe(
      (response) => {
        this.authService.setAccessToken(response.token); // Token'ı localStorage'a ekle
        console.log(response);
        this.router.navigate(['/user']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  logout() {
    // Token'ı temizle
    localStorage.removeItem('accessToken');

    // Kullanıcıyı giriş sayfasına yönlendir
    this.router.navigate(['/login']);
  }
}

import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { LoginModel } from '../models/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel: LoginModel = { Email: '', Password: '' };

  constructor(private accountService: AccountService) {}

  login() {
    this.accountService.login(this.loginModel).subscribe(
      (response) => {
        // Başarılı giriş durumu
        console.log(response);
      },
      (error) => {
        // Hata durumu
        console.error(error);
      }
    );
  }
}

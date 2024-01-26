import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { LoginModel } from '../models/login-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel: LoginModel = { Email: '', Password: '' };

  constructor(private accountService: AccountService,    private router: Router,
    ) {}

  login() {
    this.accountService.login(this.loginModel).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/user']);

      },
      (error) => {
        console.error(error);
      }
    );
  }
}

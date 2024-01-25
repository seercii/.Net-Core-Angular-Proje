// register.component.ts

import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { RegisterModel } from '../models/register-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerModel: RegisterModel = { name: '', surName: '', email: '', phone: '', password: '', photoImage: '' };

  constructor(private accountService: AccountService) {}

  register() {
    this.accountService.register(this.registerModel).subscribe(
      (response) => {
        // Başarılı kayıt durumu
        console.log(response);
      },
      (error) => {
        // Hata durumu
        console.error(error);
      }
    );
  }
}

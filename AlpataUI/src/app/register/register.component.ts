// register.component.ts

import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { RegisterModel } from '../models/register-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerModel: RegisterModel = { name: '', surName: '', email: '', phone: '', password: '', photoImage: '' };
  selectedFile: File | null = null;
  selectedFilePreview: string | null = null; // Resmin önizlemesinin veri URL'si
  constructor(private accountService: AccountService,private router: Router) {}

  register() {
    const formData = new FormData();
    formData.append('name', this.registerModel.name || '');
    formData.append('surName', this.registerModel.surName || '');
    formData.append('email', this.registerModel.email || '');
    formData.append('phone', this.registerModel.phone || '');
    formData.append('password', this.registerModel.password || '') ;
    formData.append('PhotoImageFile', this.selectedFile || '');
  
    
    this.accountService.register(formData).subscribe(
      (response) => {
        // Başarılı kayıt durumu
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        // Hata durumu
        console.error(error);
      }
    );
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFilePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { RegisterModel } from '../models/register-model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {
  registerModel: RegisterModel = { //kullanıcı kayıt verileri
    name: '',
    surName: '',
    email: '', phone: '',
    password: '',
    photoImage: ''
  };
  selectedFile: File | null = null;
  selectedFilePreview: string | null = null; // Resmin önizlemesinin veri URL'si
  form!: FormGroup;//formgroup nesnesi kayıt için
  constructor(private accountService: AccountService, private router: Router, private fb: FormBuilder) {//fb form gruplarını olsuturmak ve yonetmek ıcın kullanılır

  }
  ngOnInit(): void {

  }

  register() {
    const formData = new FormData();//formdata nesnesi olusturulur
    formData.append('name', this.registerModel.name || '');//registermodel içindeki verileri formdataya ekleriz sunucuya göndeririz
    formData.append('surName', this.registerModel.surName || '');
    formData.append('email', this.registerModel.email || '');
    formData.append('phone', this.registerModel.phone || '');
    formData.append('password', this.registerModel.password || '');
    formData.append('PhotoImageFile', this.selectedFile || '');


    this.accountService.register(formData).subscribe(//accountservice üzerinden register çağrılır kullanıcı kaydı gerçekleşir
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
    //seçilen dosyayı event ile alıyoruz
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {//dosya seçilmişse buranın içine giriyoruz
      const reader = new FileReader();//bu nesneyi olusturuyoruz
      reader.onload = (e: any) => {
        this.selectedFilePreview = e.target.result;//dosyanın url sini atıyoruz
      };
      reader.readAsDataURL(this.selectedFile);//dosyayı verı urlsine donusturuyoruz
    }
  }
}

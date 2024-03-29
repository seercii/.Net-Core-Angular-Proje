import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../services/account.service';
import { RegisterModel } from '../models/register-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass, RouterLink, CommonModule, FormsModule]
})
export class UpdateUserComponent implements OnInit {
  user: RegisterModel = { // register modelini burada başlangıç değeri olarak tanımladık
    id: 0,
    name: '',
    surName: '',
    email: '',
    phone: '',
    password: '',
    photoImage: ''
  };
  userId!: number;
  selectedFile: File | null = null;
  selectedFilePreview: string | null = null; // Resmin önizlemesinin veri URL'si
  imageUrlPrefix: string = 'https://localhost:7190/images/'; // Resimlerin bulunduğu dizin

  constructor(private route: ActivatedRoute, private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];//id değerini alır kullaıcının
      this.loadUserDetails(id);//ve başlangıçta o id değerine sahip kullanıcının bilgilerini getirir
    });
  }

  loadUserDetails(id: number): void {//kullanıcının id üzerinden accountservice ile kullanıcı detaylarını yükler
    this.accountService.getUserById(id).subscribe(//getUserById yi çağırır kullanıcı detayları için
      (users) => {
        this.user = users;
      },
      (error) => {
        console.error('hatalı kullanıcı detaylar: ', error);
      }
    );
  }

  onSubmit() {
    if (this.user && this.user.id) {// Eğer kullanıcı ve kullanıcı ID'si varsa devam
      const formData = new FormData();//burda form verilerini formdata ile ekliyoruz
      formData.append('Name', this.user.name || '');//registermodel içindeki verileri formdataya ekleriz sunucuya göndeririz
      formData.append('Email', this.user.email || '');
      formData.append('Password', this.user.password || '');
      formData.append('Phone', this.user.phone || '');
      formData.append('SurName', this.user.surName || '');

      formData.append('photoImageFile', this.selectedFile || '');

      this.accountService.updateUser(this.user.id, formData).subscribe(() => {//accountservice üzeirnden updateuser çağırılır ve kullanıcı güncellenir
        this.router.navigate(['/user']);
      });
    } else {
      console.error('Kullanıcı bilgileri eksik. Güncelleme yapılamıyor.');
    }
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
  getImageUrl(imagePath: string | undefined): string {
    if (imagePath) {
      // Eğer imagePath tanımlı ise, gerçek resim URL'sini döndür
      return this.imageUrlPrefix + imagePath;
    } else {
      // Eğer imagePath tanımlı değilse,  (boş string)
      return '';
    }
  }
}

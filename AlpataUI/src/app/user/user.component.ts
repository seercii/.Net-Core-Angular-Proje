import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { RegisterModel } from '../models/register-model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, FormsModule, CommonModule]
})
export class UserComponent implements OnInit {
  users: RegisterModel[] = [];
  imageUrlPrefix: string = 'https://localhost:7190/images/'; // Resimlerin bulunduğu yer

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.accountService.getUser().subscribe(
      (data: RegisterModel[]) => {
        this.users = data;
      },
      (error) => {
        console.error('kullanıcı yüklenirken hata: ', error);
      }
    );
  }

  deleteUser(id: number | undefined): void {
    if (id !== undefined) {
      this.accountService.deleteUser(id).subscribe(
        () => {
          console.log('kullanıcı başarıyla silindi');
          this.loadUsers();
        },
        (error) => {
          console.error('kullanıcı silinirken hata: ', error);
        }
      );
    } else {
      console.error('geçersiz kullanıcı');
    }
  }
  getImageUrl(imagePath: string | undefined): string {
    if (imagePath) {
      // Eğer imagePath tanımlı ise, gerçek resim URL'sini döndür
      return this.imageUrlPrefix + imagePath;
    } else {
      // Eğer imagePath tanımlı değilse, (boş string)
      return '';
    }
  }


}

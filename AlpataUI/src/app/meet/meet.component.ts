import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MeetModel } from '../models/meet-model';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css'],
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, FormsModule, CommonModule]
})
export class MeetComponent implements OnInit {
  meets: MeetModel[] = [];
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadMeets();
  }
  loadMeets(): void {
    this.accountService.getMeet().subscribe(
      (data: MeetModel[]) => {
        this.meets = data;
      },
      (error) => {
        console.error('meets hatalı yüklendi: ', error);
      }
    );
  }
  deleteMeet(id: number | undefined): void {
    if (id !== undefined) {
      this.accountService.deleteMeet(id).subscribe(
        () => {
          console.log('meet başarıyla silindi');
          this.loadMeets();
        },
        (error) => {
          console.error('meets silinemedi: ', error);
        }
      );
    } else {
      console.error('yanlış meets');
    }
  }
}

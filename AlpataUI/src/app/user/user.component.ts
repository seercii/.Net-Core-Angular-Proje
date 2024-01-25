import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { RegisterModel } from '../models/register-model';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [NgFor, NgIf]
})
export class UserComponent implements OnInit {
  users: RegisterModel[] = [];

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
        console.error('Error loading users: ', error);
      }
    );
  }
}

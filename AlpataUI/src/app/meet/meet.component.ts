import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { NgFor, NgIf } from '@angular/common';
import { MeetModel } from '../models/meet-model';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css'],
  standalone: true,
  imports: [NgFor, NgIf]
})
export class MeetComponent  implements OnInit{
  meets:MeetModel[]=[];
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
        console.error('Error loading meets: ', error);
      }
    );
  }
}

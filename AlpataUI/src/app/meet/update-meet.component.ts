import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../services/account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { MeetModel } from '../models/meet-model';

@Component({
  selector: 'app-update-meet',
  templateUrl: './update-meet.component.html',
  styleUrls: ['./meet.component.css'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgClass, RouterLink, CommonModule, FormsModule]
})
export class UpdateMeetComponent implements OnInit {
  meet: MeetModel = {
    id: 0,
    meetName: '',
    startDate: new Date,
    finishDate: new Date,
    description: '',
    fileUpload: '',
  };
  meetId!: number;
  selectedFile: File | null = null;
  selectedFilePreview: string | null = null; // Resmin önizlemesinin veri URL'si
  selectedFileName: string | null = null;
  constructor(private route: ActivatedRoute, private accountService: AccountService,
    private router: Router

  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadMeetDetails(id);
    });
  }

  loadMeetDetails(id: number): void {
    this.accountService.getMeetById(id).subscribe(
      (meets) => {
        this.meet = meets;
      },
      (error) => {
        console.error('meets bilgileri yüklenemedi: ', error);
      }
    );
  }
  onSubmit() {
    if (this.meet && this.meet.id) {
      const formData = new FormData();
      formData.append('meetName', this.meet.meetName || '');
      formData.append('startDate', this.meet.startDate!.toString());



      formData.append('finishDate', this.meet.finishDate!.toString());
      formData.append('description', this.meet.description || '');
      formData.append('uploadFile', this.selectedFile || '');
      this.accountService.updateMeet(this.meet.id, formData).subscribe(() => {
        this.router.navigate(['/meet']);
      });
    } else {
      console.error('Kullanıcı bilgileri eksik. Güncelleme yapılamıyor.');
    }
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.selectedFileName = this.selectedFile.name; 
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFilePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
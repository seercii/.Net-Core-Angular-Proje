import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { MeetModel } from '../models/meet-model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-meet',
  templateUrl: './add-meet.component.html',
  styleUrls: ['./add-meet.component.css']
})
export class AddMeetComponent {
  meetModel: MeetModel = { meetName: "", description: "", startDate: new Date(), finishDate: new Date(), fileUpload: "" };
  selectedFile: File | null = null;
  selectedFilePreview: string | null = null; // dosyanın önizlemesinin veri URL'si
  constructor(private accountService: AccountService, private router: Router, private datePipe: DatePipe) { }

  create() {
    const formData = new FormData();
    formData.append('meetName', this.meetModel.meetName || '');
    formData.append('description', this.meetModel.description || '');
    formData.append('startDate', this.meetModel.startDate!.toString());
    formData.append('finishDate', this.meetModel.finishDate!.toString());
    formData.append('UploadFile', this.selectedFile || '');
    this.accountService.createMeet(formData).subscribe(
      (response) => {
        // Başarılı kayıt durumu
        console.log(response);
        this.router.navigate(['/meet']);

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

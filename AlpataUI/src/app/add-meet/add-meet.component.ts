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
  meetModel: MeetModel = { // meet modelini burada başlangıç değeri olarak tanımladık
    meetName: "",
    description: "",
    startDate: new Date(),
    finishDate: new Date(),
    fileUpload: ""
  };
  selectedFile: File | null = null;
  selectedFilePreview: string | null = null; // dosyanın önizlemesinin veri URL'si
  constructor(private accountService: AccountService, private router: Router, private datePipe: DatePipe) { }

  create() {
    const formData = new FormData();//burda form verilerini formdata ile ekliyoruz
    formData.append('meetName', this.meetModel.meetName || '');//meet içindeki verileri formdataya ekleriz sunucuya göndeririz
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
    //seçilen dosyayı event ile alıyoruz
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {//dosya seçilmişse buranın içine giriyoruz
      const reader = new FileReader();//nesneyi olusturuyoruz
      reader.onload = (e: any) => {
        this.selectedFilePreview = e.target.result;//dosyanın url sini atıyoruz
      };
      reader.readAsDataURL(this.selectedFile);//dosyayı verı urlsine donusturuyoruz
    }
  }
}

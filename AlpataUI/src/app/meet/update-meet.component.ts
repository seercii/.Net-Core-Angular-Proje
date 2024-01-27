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
  meet: MeetModel = {// meet modelini burada başlangıç değeri olarak tanımladık
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
      const id = params['id'];//id değerini alır meetin
      this.loadMeetDetails(id);//ve başlangıçta o id değerine sahip meetin bilgilerini getirir
    });
  }

  loadMeetDetails(id: number): void {//meetin id üzerinden accountservice ile meet detaylarını yükler
    this.accountService.getMeetById(id).subscribe(//getMeetById yi çağırır meet detayları için
      (meets) => {
        this.meet = meets;
      },
      (error) => {
        console.error('meets bilgileri yüklenemedi: ', error);
      }
    );
  }
  onSubmit() {
    if (this.meet && this.meet.id) {// Eğer meet ve meet id'si varsa devam
      const formData = new FormData();//burda form verilerini formdata ile ekliyoruz
      formData.append('meetName', this.meet.meetName || '');//meet içindeki verileri formdataya ekleriz sunucuya göndeririz
      formData.append('startDate', this.meet.startDate!.toString());



      formData.append('finishDate', this.meet.finishDate!.toString());
      formData.append('description', this.meet.description || '');
      formData.append('uploadFile', this.selectedFile || '');
      this.accountService.updateMeet(this.meet.id, formData).subscribe(() => {//accountservice üzeirnden updateMeet çağırılır ve meet güncellenir
        this.router.navigate(['/meet']);
      });
    } else {
      console.error('Kullanıcı bilgileri eksik. Güncelleme yapılamıyor.');
    }
  }
  onFileChange(event: any) {
    //seçilen dosyayı event ile alıyoruz
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {//dosya seçilmişse buranın içine giriyoruz
      this.selectedFileName = this.selectedFile.name; // Seçilen dosyanın adını alarak selectedFileName değişkenine atıyoruz
      const reader = new FileReader();//nesneyi olusturuyoruz
      reader.onload = (e: any) => {
        this.selectedFilePreview = e.target.result;//dosyanın url sini atıyoruz
      };
      reader.readAsDataURL(this.selectedFile);//dosyayı verı urlsine donusturuyoruz
    }
  }
}
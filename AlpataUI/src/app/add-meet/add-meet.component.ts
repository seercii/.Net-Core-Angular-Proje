import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { MeetModel } from '../models/meet-model';

@Component({
  selector: 'app-add-meet',
  templateUrl: './add-meet.component.html',
  styleUrls: ['./add-meet.component.css']
})
export class AddMeetComponent {
meetModel:MeetModel={meetName:"",description:"",startDate:new Date(),finishDate:new Date(),fileUpload:""};

constructor(private accountService: AccountService) {}

create() {
  
  this.accountService.createMeet(this.meetModel).subscribe(
    (response) => {
      // Başarılı kayıt durumu
      console.log(response);
    },
    (error) => {
      // Hata durumu
      console.error(error);
    }
  );
}
}

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { MeetComponent } from './meet/meet.component';
import { AddMeetComponent } from './add-meet/add-meet.component';



export const routes: Routes = [
    {path:'', component:AppComponent},
    {path: 'login', component:LoginComponent}  ,
    {path:'register',component:RegisterComponent},
    {path:'user',component:UserComponent},
    {path:'meet',component:MeetComponent},
    {path:'addmeet',component:AddMeetComponent},





  
];

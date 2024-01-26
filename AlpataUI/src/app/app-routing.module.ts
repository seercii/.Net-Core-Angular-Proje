
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { MeetComponent } from './meet/meet.component';
import { AddMeetComponent } from './add-meet/add-meet.component';
import { UpdateUserComponent } from './user/update-user.component';
import { UpdateMeetComponent } from './meet/update-meet.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'meet', component: MeetComponent },
  { path: 'addmeet', component: AddMeetComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  {path:'update-meet/:id',component:UpdateMeetComponent}


//burda route işlemlerini yaptık

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

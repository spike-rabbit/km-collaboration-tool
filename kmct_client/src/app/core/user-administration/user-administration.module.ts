import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClassComponent } from './manage-class/manage-class.component';
import {UserAdministrationService} from "./user-administration.service";
import {FormsModule} from "@angular/forms";
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [UserAdministrationService],
  declarations: [ManageClassComponent, EditProfileComponent]
})
export class UserAdministrationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClassComponent } from './manage-class/manage-class.component';
import {UserAdministrationService} from "./user-administration.service";
import {FormsModule} from "@angular/forms";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ManageClassesComponent } from './manage-classes/manage-classes.component';
import {ModalModule} from "ng2-bootstrap";
import { CreateClassComponent } from './create-class/create-class.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [UserAdministrationService],
  declarations: [ManageClassComponent, EditProfileComponent, ManageClassesComponent, CreateClassComponent]
})
export class UserAdministrationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClassComponent } from './manage-class/manage-class.component';
import {UserAdministrationService} from "./user-administration.service";
import {FormsModule} from "@angular/forms";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ManageClassesComponent } from './manage-classes/manage-classes.component';
import {ModalModule} from "ng2-bootstrap";
import { CreateClassComponent } from './create-class/create-class.component';
import { ManageCompaniesComponent } from './manage-companies/manage-companies.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import {RouterModule} from "@angular/router";
import {FileUploadModule} from "ng2-file-upload";
import { ManageUsersComponent } from './manage-users/manage-users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ModalModule.forRoot(),
    FileUploadModule // prot
  ],
  providers: [UserAdministrationService],
  declarations: [ManageClassComponent, EditProfileComponent, ManageClassesComponent, CreateClassComponent, ManageCompaniesComponent, EditCompanyComponent, ManageUsersComponent]
})
export class UserAdministrationModule { }

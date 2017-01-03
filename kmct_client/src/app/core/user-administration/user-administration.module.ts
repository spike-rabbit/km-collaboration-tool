import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClassComponent } from './manage-class/manage-class.component';
import {UserAdministrationService} from "./user-administration.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [UserAdministrationService],
  declarations: [ManageClassComponent]
})
export class UserAdministrationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClassComponent } from './manage-class/manage-class.component';
import {UserAdministrationService} from "./user-administration.service";
import {ModalModule} from "ng2-bootstrap";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [UserAdministrationService],
  declarations: [ManageClassComponent]
})
export class UserAdministrationModule { }

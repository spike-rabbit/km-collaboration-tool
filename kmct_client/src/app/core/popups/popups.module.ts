import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteInvitationComponent } from './confirm-delete-invitation/confirm-delete-invitation.component';
import {PopupsService} from "./popups.service";
import {ModalModule} from "ng2-bootstrap";
import { ConfirmDeleteUserComponent } from './confirm-delete-user/confirm-delete-user.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [ConfirmDeleteInvitationComponent, ConfirmDeleteUserComponent],
  providers: [PopupsService],
  declarations: [ConfirmDeleteInvitationComponent, ConfirmDeleteUserComponent]
})
export class PopupsModule { }

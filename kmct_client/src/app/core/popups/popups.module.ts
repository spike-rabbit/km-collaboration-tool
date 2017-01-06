import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteInvitationComponent } from './confirm-delete-invitation/confirm-delete-invitation.component';
import {PopupsService} from "./popups.service";
import {ModalModule} from "ng2-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [ConfirmDeleteInvitationComponent],
  providers: [PopupsService],
  entryComponents: [ConfirmDeleteInvitationComponent],
  declarations: [ConfirmDeleteInvitationComponent]
})
export class PopupsModule { }

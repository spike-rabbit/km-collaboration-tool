import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {PopupsService} from "../popups.service";
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-confirm-delete-invitation',
  templateUrl: './confirm-delete-invitation.component.html',
  styleUrls: ['./confirm-delete-invitation.component.css']
})
export class ConfirmDeleteInvitationComponent  {

  constructor(private popupsService: PopupsService) { }

  @ViewChild("lgModal")
  sModal: ModalDirective;

  ngOnInit() {
    this.popupsService.confirmDeleteInvitation = {element: this.sModal};
  }

  onDelete() {
    if(this.popupsService.confirmDeleteInvitation.onDelete) {
      this.popupsService.confirmDeleteInvitation.onDelete(this.sModal);
    }
  }

}

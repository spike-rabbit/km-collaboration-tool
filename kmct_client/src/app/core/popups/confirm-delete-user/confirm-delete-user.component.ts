import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ng2-bootstrap";
import {PopupsService} from "../popups.service";

@Component({
  selector: 'app-confirm-delete-user',
  templateUrl: './confirm-delete-user.component.html',
  styleUrls: ['./confirm-delete-user.component.css']
})
export class ConfirmDeleteUserComponent implements OnInit {

  @ViewChild("lgModal")
  sModal: ModalDirective;

  constructor(private popupsService: PopupsService) { }

  ngOnInit() {
    this.popupsService.confirmDeleteUser = {element: this.sModal};
  }

  onDelete() {
    if(this.popupsService.confirmDeleteUser.onDelete) {
      this.popupsService.confirmDeleteUser.onDelete(this.sModal);
    }
  }

}

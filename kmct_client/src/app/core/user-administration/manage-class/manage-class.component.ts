import {Component, OnInit} from "@angular/core";
import {UserAdministrationService} from "../user-administration.service";

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css']
})
export class ManageClassComponent implements OnInit {

  constructor(private userAdminService: UserAdministrationService) {
  }

  invitationList: any[];
  memberList: any[];

  ngOnInit() {
    this.userAdminService.loadInvitations().subscribe(inviteList => this.invitationList = inviteList);
    this.userAdminService.loadClassMembers().subscribe(memberList => this.memberList = memberList);
  }

}

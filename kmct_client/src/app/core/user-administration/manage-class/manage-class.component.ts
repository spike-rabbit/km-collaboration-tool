import {Component, OnInit, HostBinding} from "@angular/core";
import {UserAdministrationService} from "../user-administration.service";
import {slideInOutAnimation} from "../../router-animations";
import {PopupsService} from "../../popups/popups.service";
import {ROLES} from "../../../../../../kmct_server/models/data-types";

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css'],
  animations: [slideInOutAnimation]
})
export class ManageClassComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  constructor(private userAdminService: UserAdministrationService, private popupsService: PopupsService) {
  }

  invitationList: any[];
  memberList: any[];
  focusedInvitation: any = {};
  editMode = false;

  ngOnInit() {
    this.userAdminService.loadInvitations().subscribe(inviteList => this.invitationList = inviteList);
    this.userAdminService.loadClassMembers().subscribe(memberList => this.memberList = memberList);
  }


  onDelete(invitation: any) {
    this.popupsService.confirmDeleteInvitation.onDelete = popup => {
      if (invitation) {
        this.userAdminService.deleteInvitation(invitation.uuid).subscribe(res => {
          this.invitationList.splice(this.invitationList.indexOf(invitation), 1);
          popup.hide();
        }, error => {
          //TODO print error
          popup.hide();
        });
      } else {
        popup.hide();
      }
    };
    this.popupsService.confirmDeleteInvitation.element.show();
  }

  addRole(user: any, role: string) {
    this.userAdminService.addRole(user.id, role).subscribe(() => {
      switch (role) {
        case ROLES.knc:
          user.knc = true;
          break;
        case ROLES.xcc:
          user.xcc = true
      }
    });
  }

  revokeRole(user: any, role: string) {
    this.userAdminService.removeRole(user.id, role).subscribe(() => {
      switch (role) {
        case ROLES.knc:
          user.knc = false;
          break;
        case ROLES.xcc:
          user.xcc = false
      }
    });
  }

  onAdd() {
    this.focusedInvitation.targetRole = ROLES.ksmem;
    if (this.editMode) {
      this.userAdminService.addInvitation(this.focusedInvitation).subscribe(res => {
        this.invitationList.push(res);
        this.editMode = false;
        this.focusedInvitation = {};
      });
    }
  }
}

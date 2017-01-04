import {Component, OnInit, HostBinding} from "@angular/core";
import {UserAdministrationService} from "../user-administration.service";
import {slideInOutAnimation} from "../../router-animations";

@Component({
  selector: 'app-manage-class',
  templateUrl: './manage-class.component.html',
  styleUrls: ['./manage-class.component.css'],
  animations: [slideInOutAnimation]
})
export class ManageClassComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  constructor(private userAdminService: UserAdministrationService) {
  }

  invitationList: any[];
  memberList: any[];
  focussedInvitation: any = {};
  editMode = false;

  ngOnInit() {
    this.userAdminService.loadInvitations().subscribe(inviteList => this.invitationList = inviteList);
    this.userAdminService.loadClassMembers().subscribe(memberList => this.memberList = memberList);
  }

  onDelete(popup: any) {
    if (this.focussedInvitation) {
      this.userAdminService.deleteInvitation(this.focussedInvitation.uuid).subscribe(res => {
        this.invitationList.splice(this.invitationList.indexOf(this.focussedInvitation), 1);
        popup.hide();
      }, error => {
        //TODO print error
        popup.hide();
      });
    } else {
      popup.hide();
    }
  }

  onAdd() {
    if(this.editMode) {
      this.userAdminService.addInvitation(this.focussedInvitation).subscribe(res => {
        this.invitationList.push(res);
        this.editMode = false;
      });
    }
  }

}

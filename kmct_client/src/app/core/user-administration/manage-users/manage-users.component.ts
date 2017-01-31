import {Component, OnInit, HostBinding} from '@angular/core';
import {User} from "../../../../../../kmct_server/models/data-types";
import {UserAdministrationService} from "../user-administration.service";
import {PopupsService} from "../../popups/popups.service";
import {slideInOutAnimation} from "../../router-animations";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  animations: [slideInOutAnimation]
})
export class ManageUsersComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  users: User[];

  constructor(private uasService: UserAdministrationService, private popupsService: PopupsService) { }

  ngOnInit() {
    this.uasService.loadUsers().subscribe(users => this.users = users);
  }

  delete(user: User) {
    this.popupsService.confirmDeleteUser.onDelete = popup => {
      if (user) {
        this.uasService.deleteUser(user.id).subscribe(res => {
          this.users.splice(this.users.indexOf(user),1);
          popup.hide();
        }, error => {
          //TODO print error
          popup.hide();
        });
      } else {
        popup.hide();
      }
    };
    this.popupsService.confirmDeleteUser.element.show();
  }

}

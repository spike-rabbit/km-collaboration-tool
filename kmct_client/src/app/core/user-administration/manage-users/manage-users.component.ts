import { Component, OnInit } from '@angular/core';
import {User} from "../../../../../../kmct_server/models/data-types";
import {UserAdministrationService} from "../user-administration.service";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: User[];

  constructor(private uasService: UserAdministrationService) { }

  ngOnInit() {
    this.uasService.loadUsers().subscribe(users => this.users = users);
  }

}

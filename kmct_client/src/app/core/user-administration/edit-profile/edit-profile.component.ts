import {Component, OnInit, HostBinding} from "@angular/core";
import {slideInOutAnimation} from "../../router-animations";
import {SigninStateService} from "../../../global-services/signin-state.service";
import {Company} from "../../../../../../kmct_server/models/data-types";
import {UserAdministrationService} from "../user-administration.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  animations: [slideInOutAnimation]
})
export class EditProfileComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  constructor(private signInService: SigninStateService, private uasService: UserAdministrationService) {
  }

  name: string;
  firstname: string;
  companies:Company[];
  workinghours:number;

  ngOnInit() {
    this.signInService.user.subscribe(user => {
      this.name = user.name;
      this.firstname = user.firstname;
    });
    this.uasService.loadCompanies().subscribe(companies => {
      this.companies = companies;
    });
    this.workinghours = 35;
  }

  onSubmit() {
    this.uasService.applyUserChanges(this.name, this.firstname).subscribe(user => {
      //TODO
      // this.signInService.user.name = user.name;
      // this.signInService.user.firstname = user.firstname;
    });
  }

  onReset() {
    //TODO
    // this.name = this.signInService.user.name;
    // this.firstname = this.signInService.user.firstname;
  }

}

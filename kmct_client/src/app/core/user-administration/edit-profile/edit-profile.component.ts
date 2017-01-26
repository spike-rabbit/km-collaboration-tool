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
  company: number;
  companies: Company[];
  workinghours: number;
  success = false;

  ngOnInit() {
    this.uasService.loadCompanies().subscribe(companies => {
      this.companies = companies;
      this.signInService.user.subscribe(user => {
        this.name = user.name;
        this.firstname = user.firstname;
        this.company = user.companyId;
        this.workinghours = user.workingHours;
      });
    });
  }

  onSubmit() {
    this.uasService.applyUserChanges(this.name, this.firstname, this.company, this.workinghours).subscribe(user => {
      this.success = true;
    });
  }

  onReset() {
    //TODO
    // this.name = this.signInService.user.name;
    // this.firstname = this.signInService.user.firstname;
  }

}

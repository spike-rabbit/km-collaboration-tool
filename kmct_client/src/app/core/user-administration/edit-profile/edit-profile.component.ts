import {Component, OnInit, HostBinding} from "@angular/core";
import {slideInOutAnimation} from "../../router-animations";
import {SigninStateService} from "../../../global-services/signin-state.service";
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

  private name: string;
  private firstname: string;

  ngOnInit() {
    this.name = this.signInService.user.name;
    this.firstname = this.signInService.user.firstname;
  }

  onSubmit() {
    this.uasService.applyUserChanges(this.name, this.firstname).subscribe(user => {
      this.signInService.user.name = user.name;
      this.signInService.user.firstname = user.firstname;
    });
  }

  onReset() {
    this.name = this.signInService.user.name;
    this.firstname = this.signInService.user.firstname;
  }

}

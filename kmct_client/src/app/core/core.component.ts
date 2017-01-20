import {Component, OnInit} from "@angular/core";
import {User} from "../../data-definitions";
import {SigninStateService} from "../global-services/signin-state.service";

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
})
export class CoreComponent implements OnInit {

  constructor(private signInService: SigninStateService) {
  }

  user: User;


  ngOnInit() {
    this.signInService.user.subscribe(user => this.user = user);
  }

}

import {Component, OnInit, HostBinding} from '@angular/core';
import {slideInOutAnimation} from "../../router-animations";
import {SigninStateService} from "../../../global-services/signin-state.service";
import {ROLES} from "../../../../../../kmct_server/models/data-types";

@Component({
  selector: 'app-journal-editor',
  templateUrl: './journal-editor.component.html',
  styleUrls: ['./journal-editor.component.css'],
  animations: [slideInOutAnimation]
})
export class JournalEditorComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  constructor(private signInService: SigninStateService) { }

  ngOnInit() {
    this.signInService.user.isUserInRole(ROLES.ksspr);
  }

}

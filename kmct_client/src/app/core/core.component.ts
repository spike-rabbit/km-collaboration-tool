import {Component, OnInit} from "@angular/core";
import {User} from "../../data-definitions";
import {SigninStateService} from "../global-services/signin-state.service";
import {LocalizerService} from "../global-services/localizer.service";
import {CoreService} from "./core.service";

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
})
export class CoreComponent implements OnInit {

  constructor(private signInService: SigninStateService, private localizer: LocalizerService, private coreService: CoreService) {
  }

  user: User;
  notifications: any[] = [];

  ngOnInit() {
    this.signInService.user.subscribe(user => this.user = user);
    this.coreService.loadNotifications().subscribe(res => this.notifications = res);
  }

  onLocaleSwitch() {
    this.localizer.switchLocale();
  }

  onDelete(notification) {
    this.coreService.deleteNotification(notification.id).subscribe(
      () => this.notifications.splice(this.notifications.indexOf(notification), 1));
  }
}

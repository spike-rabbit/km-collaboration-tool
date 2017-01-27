import {Component, OnInit, HostBinding} from "@angular/core";
import {slideInOutAnimation} from "../router-animations";
import {CoreService} from "../core.service";
import * as $ from "jquery";
import {Options} from "fullcalendar";

@Component({
  selector: 'app-overview',
  template: `
<h3 i18n>Herzlich willkommen im KM Collaboration Tool!</h3>
  <a routerLink="xcc" routerLinkActive="active" i18n>Hier geht's zu den Ausbildungsnachweisen</a>
  <br>
  <a routerLink="xcm" routerLinkActive="active" i18n>Hier geht's zum Exchange Market</a>
  <br>
  <a routerLink="knc" routerLinkActive="active" i18n>Hier geht's zum Forum</a>
  <app-full-calender></app-full-calender>
`,
  styleUrls: ['./overview.component.css'],
  animations: [slideInOutAnimation]
})
export class OverviewComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';


}

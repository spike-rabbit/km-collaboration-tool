import {Component, OnInit, HostBinding} from "@angular/core";
import {slideInOutAnimation} from "../router-animations";
import {CoreService} from "../core.service";
import * as $ from "jquery";
import {Options} from "fullcalendar";

@Component({
  selector: 'app-overview',
  template: `
<h1 i18n>Herzlich willkommen im KM Collaboration Tool!</h1>
<p>Hier könnte eine Beschreibung stehen, was das Tool macht.</p>
  <br/>
  <br/>
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

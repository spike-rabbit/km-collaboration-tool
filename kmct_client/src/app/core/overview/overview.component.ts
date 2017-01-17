import {Component, OnInit, HostBinding} from "@angular/core";
import {slideInOutAnimation} from "../router-animations";
import {CoreService} from "../core.service";
import * as $ from "jquery";
import {Options} from "fullcalendar";

@Component({
  selector: 'app-overview',
  template: `
    <div class="container">
    <h3>Herzlich willkommen im KM Collaboration Tool!</h3>
    <a routerLink="xcc" routerLinkActive="active">Hier geht's zu den Ausbildungsnachweisen</a>
    <br>
    <a routerLink="xcm" routerLinkActive="active">Hier geht's zum Exchange Market</a>
    <br>
    <a routerLink="knc" routerLinkActive="active">Hier geht's zum Forum</a>
    <app-full-calender></app-full-calender>
    </div>
`,
  styleUrls: ['./overview.component.css'],
  animations: [slideInOutAnimation]
})
export class OverviewComponent {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';


}

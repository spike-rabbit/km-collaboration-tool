import {Component, OnInit, HostBinding} from "@angular/core";
import {slideInOutAnimation} from "../router-animations";

@Component({
  selector: 'app-overview',
  template: `
<h3>Herzlich willkommen im KM Collaboration Tool!</h3>
<br>
<a routerLink="xcc" routerLinkActive="active">Hier geht's zu den Ausbildungsnachweisen</a>
<br>
<a routerLink="xcm" routerLinkActive="active">Hier geh't zum Exchange Market</a>
<br>
<a routerLink="knc" routerLinkActive="active">Hier geht's zum Forum</a>
`,
  styleUrls: ['./overview.component.css'],
  animations: [slideInOutAnimation]
})
export class OverviewComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';
  constructor() {
  }

  ngOnInit() {
  }

}

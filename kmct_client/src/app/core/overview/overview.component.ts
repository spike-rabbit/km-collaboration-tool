import {Component, OnInit, HostBinding} from "@angular/core";
import {slideInOutAnimation} from "../router-animations";

@Component({
  selector: 'app-overview',
  template: `
<p>
  overview works!
</p>
<a routerLink="xcc" routerLinkActive="active">XChange Center</a>
<a routerLink="xcm" routerLinkActive="active">XChange Market</a>
<a routerLink="knc" routerLinkActive="active">Knowledge Center</a>
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

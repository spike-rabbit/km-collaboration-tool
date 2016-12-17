import {Component, OnInit} from "@angular/core";

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
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

import {Component, OnInit, HostBinding} from "@angular/core";
import {slideInOutAnimation} from "../router-animations";
import {CoreService} from "../core.service";
import * as $ from "jquery";

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

<div id="full-calender"></div>
`,
  styleUrls: ['./overview.component.css'],
  animations: [slideInOutAnimation]
})
export class OverviewComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  calendarOptions: any = {
    height: 'parent',
    fixedWeekCount: false,
    defaultDate: '2016-02-12',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: []
  };


  constructor(private coreService: CoreService) {
  }

  ngOnInit() {
    this.coreService.loadAppointments().subscribe(appointments => {
      if (appointments)
        this.calendarOptions.events = appointments.map(app => {
          return {
            id: app.id,
            title: app.name,
            start: app.start.toString(),
            end: app.end.toString()
          };
        });
      let co = this.calendarOptions;
      $("#full-calender").fullCalendar(co);
    });
  }
}

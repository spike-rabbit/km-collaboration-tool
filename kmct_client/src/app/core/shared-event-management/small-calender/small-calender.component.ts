import {Component, OnInit} from "@angular/core";
import {Options} from "fullcalendar";
import {SharedEventManagementService} from "../shared-event-management.service";
import * as moment from "moment";
import {UrlStoreService} from "../../../global-services/url-store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-small-calender',
  templateUrl: './small-calender.component.html',
  styleUrls: ['./small-calender.component.css']
})
export class SmallCalenderComponent implements OnInit {

  calendarOptions: Options = {
    defaultDate: moment(new Date()).format("YYYY-MM-DD"),
    weekNumbers: true,
    editable: false,
    defaultView: "listWeek",
    eventLimit: true, // allow "more" link when too many events
    events: (start, end, timezone, callback) => {
      this.loadAppointments(callback)
    },
    header: {left: "title", center: "", right: "today prev,next, prevYear,nextYear"},
    eventClick: (calEvent) => {
      this.urlStore.storedUrl = "/home";
      this.router.navigate(["/home/sem/events", calEvent.id]);
    }
  };


  constructor(private semService: SharedEventManagementService, private urlStore: UrlStoreService, private router: Router) {
  }

  ngOnInit() {

    let co = this.calendarOptions;
    $("#small-calender").fullCalendar(co);
    this.semService.reloadAppointments.subscribe(() => {
      $("#small-calender").fullCalendar('refetchEvents');
    });

  }

  private loadAppointments(callback: any) {
    this.semService.loadAppointments().subscribe(appointments => {
      if (appointments)
        callback(appointments.map(app => {
          return {
            id: app.id,
            title: app.name,
            start: app.start.toString(),
            end: app.end.toString()
          };
        }));
    });
  }

}

import {Component, OnInit} from "@angular/core";
import {Options} from "fullcalendar";
import {Router} from "@angular/router";
import {SharedEventManagementService} from "../shared-event-management.service";
import {UrlStoreService} from "../../../global-services/url-store.service";
import * as moment from "moment";

@Component({
  selector: 'app-full-calender',
  templateUrl: './full-calender.component.html',
  styleUrls: ['./full-calender.component.css']
})
export class FullCalenderComponent implements OnInit {

  calendarOptions: Options = {
    defaultDate: moment(new Date()).format("YYYY-MM-DD"),
    weekNumbers: true,
    editable: false,
    eventLimit: true, // allow "more" link when too many events
    events: (start, end, timezone, callback) => {
      this.semService.loadAppointmentsWithCallback(callback)
    },
    header: {left: "title", center: "addBtn", right: "today prev,next, prevYear,nextYear"},
    eventClick: (calEvent) => {
      this.urlStore.storedUrl = "/home";
      this.router.navigate(["/home/sem/events", calEvent.id]);
    },
    customButtons: {
      addBtn: {
        text: "Neuer Termin",
        click: () => {
          this.urlStore.storedUrl = "/home";
          this.router.navigate(["/home/sem/create-event"]);
        }
      }
    }
  };


  constructor(private semService: SharedEventManagementService, private router: Router, private urlStore: UrlStoreService) {
  }

  ngOnInit() {
    let co = this.calendarOptions;
    $("#full-calender").fullCalendar(co);
  }

}

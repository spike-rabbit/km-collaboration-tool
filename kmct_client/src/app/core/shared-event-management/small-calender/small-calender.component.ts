import { Component, OnInit } from '@angular/core';
import {Options} from "fullcalendar";
import {CoreService} from "../../core.service";

@Component({
  selector: 'app-small-calender',
  templateUrl: './small-calender.component.html',
  styleUrls: ['./small-calender.component.css']
})
export class SmallCalenderComponent implements OnInit {

  calendarOptions: Options = {
    defaultDate: '2016-02-12',
    weekNumbers: true,
    editable: false,
    defaultView: "listWeek",
    eventLimit: true, // allow "more" link when too many events
    events: [],
    header: {left: "title", center: "", right: "today prev,next, prevYear,nextYear"}
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
      $("#small-calender").fullCalendar(co);
    });
  }

}

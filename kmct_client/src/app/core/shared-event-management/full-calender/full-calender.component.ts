import { Component, OnInit } from '@angular/core';
import {CoreService} from "../../core.service";
import {Options} from "fullcalendar";

@Component({
  selector: 'app-full-calender',
  templateUrl: './full-calender.component.html',
  styleUrls: ['./full-calender.component.css']
})
export class FullCalenderComponent implements OnInit {

  calendarOptions: Options = {
    defaultDate: '2016-02-12',
    weekNumbers: true,
    editable: false,
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
      $("#full-calender").fullCalendar(co);
    });
  }

}

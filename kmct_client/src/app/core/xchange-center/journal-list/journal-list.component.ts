import { Component, OnInit } from '@angular/core';
import {Journal} from "../journal";
import {Router} from "@angular/router";
import {XchangeCenterService} from "../xchange-center.service";

@Component({
  selector: 'app-journals-list',
  templateUrl: './journal-list.component.html',
  styleUrls: ['./journal-list.component.css']
})
export class JournalListComponent implements OnInit {

  journals: Journal[];

  onSelect(journal: Journal): void {

    this.router.navigate(['/home/xcc/journal', journal.workingweek]);

  }

  constructor(private router: Router, private xccService: XchangeCenterService) {

  }

  ngOnInit() {
    //this.xccService.loadJournals().subscribe(journals => this.journals = journals);
    this.journals = this.xccService.journals;
  }
}

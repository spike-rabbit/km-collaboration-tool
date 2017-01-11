import { Component, OnInit } from '@angular/core';
import {Ausbildungsnachweis} from "../ausbildungsnachweis";
import {Router} from "@angular/router";
import {XchangeCenterService} from "../xchange-center.service";

@Component({
  selector: 'app-liste-ausbildungsnachweise',
  templateUrl: './liste-ausbildungsnachweise.component.html',
  styleUrls: ['./liste-ausbildungsnachweise.component.css']
})
export class ListeAusbildungsnachweiseComponent implements OnInit {

  ausbildungsnachweise: Ausbildungsnachweis[];

  onSelect(nachweis: Ausbildungsnachweis): void {

    this.router.navigate(['/home/xcc/ausbildungsnachweis', nachweis.ausbildungswoche]);

  }

  constructor(private router: Router, private xccService: XchangeCenterService) {

  }

  ngOnInit() {
    this.xccService.loadJournals().subscribe(nachweise => this.ausbildungsnachweise = nachweise);

  }

}

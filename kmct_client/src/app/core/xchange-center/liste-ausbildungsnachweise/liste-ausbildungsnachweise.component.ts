import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-ausbildungsnachweise',
  templateUrl: './liste-ausbildungsnachweise.component.html',
  styleUrls: ['./liste-ausbildungsnachweise.component.css'],
  inputs: ['ausbildungsnachweise']
})
export class ListeAusbildungsnachweiseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {Ausbildungsnachweis} from "../ausbildungsnachweis";

@Component({
  selector: 'app-liste-ausbildungsnachweise',
  templateUrl: './liste-ausbildungsnachweise.component.html',
  styleUrls: ['./liste-ausbildungsnachweise.component.css'],
  inputs: ['ausbildungsnachweise']
})
export class ListeAusbildungsnachweiseComponent implements OnInit {

  selectedNachweis: Ausbildungsnachweis;

  onSelect(nachweis: Ausbildungsnachweis): void {
    this.selectedNachweis = nachweis;
  }

  constructor() { }

  ngOnInit() {
  }

}

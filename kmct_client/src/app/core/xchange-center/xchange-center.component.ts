import { Component, OnInit } from '@angular/core';
import {Ausbildungsnachweis} from './ausbildungsnachweis';

@Component({
  selector: 'app-xchange-center',
  templateUrl: './xchange-center.component.html',

})

export class XchangeCenterComponent implements OnInit {

  ausbildungsnachweise:Array<Ausbildungsnachweis>;

  constructor() {
    this.ausbildungsnachweise = [
      new Ausbildungsnachweis(1, '12.1.17'),
      new Ausbildungsnachweis(2, '23.1.17')
    ]

  }

  ngOnInit() {
  }

}



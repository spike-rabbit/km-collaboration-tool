import {Component, OnInit, HostBinding} from '@angular/core';
import {Ausbildungsnachweis} from './ausbildungsnachweis';
import {slideInOutAnimation} from "../router-animations";

@Component({
  selector: 'app-xchange-center',
  templateUrl: './xchange-center.component.html',
  animations: [slideInOutAnimation]
})

export class XchangeCenterComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  ausbildungsnachweise:Array<Ausbildungsnachweis>;

  constructor() {
    this.ausbildungsnachweise = [
      new Ausbildungsnachweis(1, '12.1.17'),
      new Ausbildungsnachweis(2, '23.1.17'),
      new Ausbildungsnachweis(3, '15.2.17')
    ]

  }

  ngOnInit() {
  }

}



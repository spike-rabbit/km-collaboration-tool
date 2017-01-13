import {Component, OnInit, HostBinding} from '@angular/core';
import {Journal} from './journal';
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

  constructor() {

  }

  showAusbildungsnachweis(): void {

  }

  ngOnInit() {
  }

}



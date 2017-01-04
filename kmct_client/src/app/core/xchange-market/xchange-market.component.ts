import {Component, OnInit, HostBinding} from '@angular/core';
import {slideInOutAnimation} from "../router-animations";

@Component({
  selector: 'app-xchange-market',
  templateUrl: './xchange-market.component.html',
  styleUrls: ['./xchange-market.component.css'],
  animations: [slideInOutAnimation]
})
export class XchangeMarketComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  constructor() { }

  ngOnInit() {
  }

}

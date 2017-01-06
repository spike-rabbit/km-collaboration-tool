import {Component, OnInit, HostBinding} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ausbildungsnachweis } from '../ausbildungsnachweis';
import {XchangeCenterService} from "../xchange-center.service";
import {slideInOutAnimation} from "../../router-animations";

@Component({
  selector: 'app-ausbildungsnachweis',
  templateUrl: './ausbildungsnachweis.component.html',
  styleUrls: ['./ausbildungsnachweis.component.css'],
  animations: [slideInOutAnimation]
})
export class AusbildungsnachweisComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  nachweis: Ausbildungsnachweis;
  id: number;

  constructor(private route: ActivatedRoute, private xccService: XchangeCenterService) {
    this.id = route.snapshot.params['ausbildungsnachweis'];
    this.nachweis = this.xccService.ausbildungsnachweise[this.id - 1];
  }

  ngOnInit() {
  }

}

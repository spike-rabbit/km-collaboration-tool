import {Component, OnInit, HostBinding} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Journal} from "../journal";
import {XchangeCenterService} from "../xchange-center.service";
import {slideInOutAnimation} from "../../router-animations";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css'],
  animations: [slideInOutAnimation]
})
export class JournalComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  journal: Journal;
  id: number;

  constructor(private route: ActivatedRoute, private xccService: XchangeCenterService) {
    this.id = route.snapshot.params['journal'];
    this.journal = {
      id: this.id,
      friday: "",
      kw: 2,
      monday: "",
      spe: true,
      thursday: "",
      tuesday: "",
      wednesday: "",
      date: new Date()
    };
  }

  ngOnInit() {
  }

}

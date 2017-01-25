import {Component, OnInit, HostBinding} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
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

  journal: Journal = (<Journal>{});
  id: number;

  constructor(private route: ActivatedRoute, private xccService: XchangeCenterService, private router: Router) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['journal'];
    this.xccService.loadJournal(this.id).subscribe(journal => this.journal = journal);
  }

  onSubmit() {
    //TODO
  }

  download() {
    //TODO
  }

  activate() {
    this.xccService.setActivated(this.id).subscribe(activate => this.router.navigate(['/home/xcc']));
  }

}

import {Component, OnInit, HostBinding} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Journal} from "../journal";
import {XchangeCenterService} from "../xchange-center.service";
import {slideInOutAnimation} from "../../router-animations";
import {SigninStateService} from "../../../global-services/signin-state.service";
import {User} from "../../../../data-definitions";

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
  success = false;
  user: User;

  constructor(private route: ActivatedRoute, private xccService: XchangeCenterService, private router: Router, private signService: SigninStateService) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['journal'];
    this.xccService.loadJournal(this.id).subscribe(journal => this.journal = journal);
    this.user = this.signService.unsafeUser;
  }

  onSubmit() {
    this.xccService.patchJournal(this.journal).subscribe(() => {
      this.success = true;
    });
  }

  download() {
    //TODO
  }

  activate() {
    this.xccService.setActivated(this.id).subscribe(activate => this.router.navigate(['/home/xcc']));
  }

  alert() {

  }

}

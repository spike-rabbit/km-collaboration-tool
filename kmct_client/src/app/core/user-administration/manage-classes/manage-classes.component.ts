import {Component, OnInit, HostBinding} from "@angular/core";
import {slideInOutAnimation} from "../../router-animations";
import {UserAdministrationService} from "../user-administration.service";

@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css'],
  animations: [slideInOutAnimation]
})
export class ManageClassesComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  classes: any[];

  constructor(private uasService: UserAdministrationService) {
  }

  ngOnInit() {
    this.uasService.loadClasses().subscribe(classes => this.classes = classes);
  }

}

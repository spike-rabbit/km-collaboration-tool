import {Component, OnInit, HostBinding} from '@angular/core';
import {slideInOutAnimation} from "../../router-animations";
import {UserAdministrationService} from "../user-administration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css'],
  animations: [slideInOutAnimation]
})
export class CreateClassComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  className: string;
  classLeaderName: string;
  classLeaderFirstname: string;
  classLeaderEmail: string;

  constructor(private uasService: UserAdministrationService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.uasService.addClass(this.className, this.classLeaderName, this.classLeaderFirstname, this.classLeaderEmail).subscribe(invitation => {
      this.router.navigate(["/home/uas/manage-classes"]);
    });
  }

  onCancel() {
    this.router.navigate(["/home/uas/manage-classes"]);
  }

}

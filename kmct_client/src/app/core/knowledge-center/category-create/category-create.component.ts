import {Component, OnInit, HostBinding} from '@angular/core';
import {KnowledgeCenterService} from "../knowledge-center.service";
import {Router} from "@angular/router";
import {slideInOutAnimation} from "../../router-animations";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  animations: [slideInOutAnimation]
})
export class CategoryCreateComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  category: string;

  constructor(private kncService: KnowledgeCenterService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
      this.kncService.addCategory(this.category).subscribe( () => this.router.navigate(["home/knc/categories"]));
  }

}

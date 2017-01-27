import {Component, OnInit, HostBinding} from '@angular/core';
import {KnowledgeCenterService} from "../knowledge-center.service";
import {Category} from "../category";
import {Router} from "@angular/router";
import {slideInOutAnimation} from "../../router-animations";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  animations: [slideInOutAnimation]
})
export class CategoryListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  categories: Category[];

  constructor(private kncService: KnowledgeCenterService, private router: Router) { }

  ngOnInit() {
    this.kncService.loadCategories().subscribe(categories => this.categories = categories);
  }

  onSelect(category: Category) {
    this.router.navigate(["/home/knc/categories/edit", category.id]);
  }

}

import { Component, OnInit } from '@angular/core';
import {KnowledgeCenterService} from "../knowledge-center.service";
import {Category} from "../category";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];

  constructor(private kncService: KnowledgeCenterService, private router: Router) { }

  ngOnInit() {
    this.kncService.loadCategories().subscribe(categories => this.categories = categories);
  }

  onSelect(category: Category) {
    this.router.navigate(["/home/knc/categories/edit", category.id]);
  }

}

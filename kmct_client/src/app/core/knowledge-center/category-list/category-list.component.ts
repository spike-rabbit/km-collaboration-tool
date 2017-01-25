import { Component, OnInit } from '@angular/core';
import {KnowledgeCenterService} from "../knowledge-center.service";
import {Category} from "../category";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];

  constructor(private kncService: KnowledgeCenterService) { }

  ngOnInit() {
    this.kncService.loadCategories().subscribe(categories => this.categories = categories);
  }

  onSelect(category: Category) {
   //TODO?
  }

}

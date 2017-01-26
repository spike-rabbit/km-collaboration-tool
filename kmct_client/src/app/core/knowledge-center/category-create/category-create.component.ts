import { Component, OnInit } from '@angular/core';
import {KnowledgeCenterService} from "../knowledge-center.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category: string;

  constructor(private kncService: KnowledgeCenterService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
      this.kncService.addCategory(this.category).subscribe( () => this.router.navigate(["home/knc/categories"]));
  }

}

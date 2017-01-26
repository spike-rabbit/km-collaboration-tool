import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {KnowledgeCenterService} from "../knowledge-center.service";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  id: number;
  category: string;

  constructor(private route: ActivatedRoute, private router: Router, private kncService: KnowledgeCenterService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['category'];
    this.kncService.loadCategory(this.id).subscribe(category => this.category = category);
  }

  onSubmit() {
    this.kncService.patchCategory(this.category, this.id).subscribe(() => this.router.navigate(["/home/knc/categories"]));
  }

}

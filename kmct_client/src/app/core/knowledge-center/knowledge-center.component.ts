import {Component, OnInit, HostBinding} from "@angular/core";
import {slideInOutAnimation} from "../router-animations";

@Component({
  selector: 'app-knowledge-center',
  templateUrl: './knowledge-center.component.html',
  styleUrls: ['./knowledge-center.component.css'],
  animations: [slideInOutAnimation]
})
export class KnowledgeCenterComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';


  ngOnInit(): void {
  }
}

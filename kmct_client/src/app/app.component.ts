import {Component, OnInit} from "@angular/core";
import {SigninStateService} from "./global-services/signin-state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private signInService: SigninStateService) {
  }


  ngOnInit(): void {
  }

}

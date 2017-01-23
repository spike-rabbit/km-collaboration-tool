import {Component, OnInit} from "@angular/core";
import {LocalizerService} from "./global-services/localizer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private localizer: LocalizerService) {
  }


  ngOnInit(): void {
  }

  onLocaleSwitch() {
    this.localizer.switchLocale();
  }


}

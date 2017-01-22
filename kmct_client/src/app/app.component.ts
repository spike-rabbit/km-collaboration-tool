import {Component, OnInit} from "@angular/core";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private cookieService: CookieService) {
  }


  ngOnInit(): void {
  }

  onLocaleSwitch() {
    let clocale = this.cookieService.get("locale");
    if (!clocale) {
      clocale = navigator.language
    }
    switch (clocale) {
      case "de":
        this.cookieService.put("locale", "en");
        break;
      case "en":
        this.cookieService.put("locale", "de");
    }
    location.reload(true);
  }


}

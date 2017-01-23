import { Injectable } from '@angular/core';
import {CookieService} from "angular2-cookie/services/cookies.service";

@Injectable()
export class LocalizerService {

  constructor(private cookieService: CookieService) { }

  switchLocale() {
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

  getLocale() {
    let clocale = this.cookieService.get("locale");
    if (!clocale) {
      clocale = navigator.language
    }
    return clocale;
  }

}

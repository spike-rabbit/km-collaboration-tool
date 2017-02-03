import {Injectable} from "@angular/core";

@Injectable()
export class LocalizerService {

  // constructor(private cookieService: CookieService) { }

  switchLocale() {
    let clocale =  LocalizerService.getCookie("locale");
    if (!clocale) {
      clocale = navigator.language
    }
    switch (clocale) {
      case "de":
        document.cookie = "locale=en;";
        break;
      case "en":
        document.cookie = "locale=de;";
    }
    window.location.reload();
    // location.replace(window.location.pathname + window.location.search + window.location.hash);
  }

  getLocale() {
    let clocale = LocalizerService.getCookie("locale");
    if (clocale == "") {
      clocale = navigator.language
    }
    return clocale;
  }

  private static getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

}

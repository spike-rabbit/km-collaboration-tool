import {Component, OnInit, ApplicationRef} from "@angular/core";
import {Router} from "@angular/router";
import {SigninStateService} from "./global-services/signin-state.service";
import {UrlStoreService} from "./global-services/url-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private applicationRef: ApplicationRef, private router: Router, private signInService: SigninStateService, private urlStore: UrlStoreService) {
  }

  isSignedIn = false;

  ngOnInit(): void {
  }

  onLoginSuccess() {
    this.isSignedIn = true;
    this.signInService.isSignedIn = true;
    // Otherwise application will not update because method is called async from angular external script
    this.applicationRef.tick();
    if (this.urlStore.storedUrl && this.urlStore.storedUrl != '' && this.urlStore.storedUrl != '/') {
      this.router.navigate([this.urlStore.storedUrl])
    } else {
      this.router.navigate(['/home/']);
    }
  }
}

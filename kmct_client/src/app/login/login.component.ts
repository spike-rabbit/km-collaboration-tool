import {Component, AfterViewInit, EventEmitter, Output, ApplicationRef} from "@angular/core";
import {SigninStateService} from "../global-services/signin-state.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @Output()
  onLoginSuccess = new EventEmitter<void>();

  constructor(private applicationRef: ApplicationRef, private signinStateService: SigninStateService, private route: ActivatedRoute, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.initGoogleSignIn();
  }

  public onSignIn(googleUser) {
    this.route.params.subscribe(params => {
      this.signinStateService.processSignIn(googleUser.getAuthResponse().id_token, params['invitation']);
    });
  }

  public onFailure(error: any) {
    console.log(error);
  }

  private initGoogleSignIn() {
    gapi.signin2.render('my-signin', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'light',
        onsuccess: param => this.onSignIn(param),
        onfailure: param => this.onFailure(param)
      }
    );
  }
}

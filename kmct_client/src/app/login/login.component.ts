import {Component, AfterViewInit, NgZone} from "@angular/core";
import {SigninStateService} from "../global-services/signin-state.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  constructor(private signinStateService: SigninStateService, private route: ActivatedRoute, private zone: NgZone) {
  }

  ngAfterViewInit(): void {
    this.initGoogleSignIn();
  }

  public onSignIn(googleUser) {
    this.route.params.subscribe(params => {
      this.zone.run(() => {
        this.signinStateService.processSignIn(googleUser.getAuthResponse().id_token, params['invitation']);
      });
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

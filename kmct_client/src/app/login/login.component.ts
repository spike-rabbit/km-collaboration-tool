import {Component, AfterViewInit, EventEmitter, Output} from "@angular/core";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @Output()
  onLoginSuccess = new EventEmitter<void>();

  constructor(private loginService: LoginService) {
  }

  ngAfterViewInit(): void {
    this.initGoogleSignIn();
  }

  public onSignIn(googleUser) {
    this.onLoginSuccess.emit();
    // this.loginService.testLogin(googleUser.getAuthResponse().id_token).subscribe(value => this.onLoginSuccess.emit());
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

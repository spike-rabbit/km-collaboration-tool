import {Component, AfterViewInit} from "@angular/core";
import {LoginService} from "../login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  constructor(private loginService : LoginService) {
  }

  ngAfterViewInit(): void {
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

  public onSignIn(googleUser) {
    console.log(googleUser);
    console.log(googleUser.getAuthResponse().id_token);
    this.loginService.testLogin(googleUser.getAuthResponse().id_token).subscribe(value => console.log(value));
  }

  public onFailure(error: any) {
    console.log(error);
  }
}

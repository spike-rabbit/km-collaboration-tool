import {Component, OnInit, ApplicationRef} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isSignedIn: boolean;

  constructor(private applicationRef: ApplicationRef) {
  }

  ngOnInit(): void {
    this.isSignedIn = false;
  }

  onLoginSuccess() {
    this.isSignedIn = true;
    // Otherwise Application is not re-rendered
    this.applicationRef.tick();
  }
}

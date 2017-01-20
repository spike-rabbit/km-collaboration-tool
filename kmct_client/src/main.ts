import "./polyfills.ts";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";
import {environment} from "./environments/environment";
import {AppModule} from "./app/";

if (environment.production) {
  enableProdMode();
}

gapi.load("auth2", function () {
  gapi.auth2.init({}).then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule);
  }, (error) => {
    console.log(error);
  });
});

import {NgModule} from "@angular/core";
import {KmctHttpService} from "./kmct-http.service";
import {SigninStateService} from "./signin-state.service";
import {UrlStoreService} from "./url-store.service";
/**
 * Created by Maxi- PC on 11.01.2017.
 */

@NgModule({
    providers: [KmctHttpService, SigninStateService, UrlStoreService]
  }
)
export class GlobalServicesModule {
}

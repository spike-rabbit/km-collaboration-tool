import {URLSearchParams, Headers} from "@angular/http";
/**
 * Created by Maxi- PC on 16.12.2016.
 */
export interface KmctRequestOptions {
  search?: string | URLSearchParams;
  headers?: Headers;
  sendAuthToken? : boolean;
}

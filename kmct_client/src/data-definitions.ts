import {URLSearchParams, Headers} from "@angular/http";
/**
 * Created by Maxi- PC on 16.12.2016.
 */
export interface KmctRequestOptions {
  search?: string | URLSearchParams;
  headers?: Headers;
  sendAuthToken? : boolean;
}

export class User {
  constructor(private firstname:string, private name : string, private roles : string[]){}

  isUserInRole(role : string) {
    return this.roles.indexOf(role) >= 0;
  }
}

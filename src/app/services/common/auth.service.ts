import { Injectable } from '@angular/core';
import { SpinnerType } from "../../base/base.component";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) {
  }

  identityCheck(){
    let expired: boolean;
    let token: string | null = null;

    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem("accessToken");
    }

    try {
      expired = token ? this.jwtHelper.isTokenExpired(token) : true;
    } catch {
      expired = true;
    }

    _isAuthenticate = token != null && !expired;
  }

  get isAuthenticated(): boolean {
    return _isAuthenticate;
  }
}

export let _isAuthenticate: boolean;

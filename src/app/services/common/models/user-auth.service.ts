import { Injectable } from '@angular/core';
import {firstValueFrom, Observable} from "rxjs";
import {TokenResponse} from "../../../contracts/token/tokenResponse";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../ui/custom-toastr.service";
import {SocialUser} from "@abacritt/angularx-social-login";
import {HttpClientService} from "../http-client.service";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) {
  }

  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, {
      userNameOrEmail, password
    });

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    console.log(tokenResponse);
    console.log(tokenResponse.token.accessToken);

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("User logged in successfully", "Login successful", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopCenter
      })
    }

    callBackFunction();
  }

  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "Google-Login",
      controller: "auth",
    }, user);
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("User logged in successfully via Google Account", "Login successful", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopCenter
      })
    }
    callBackFunction();
  }

  async facebookLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "Facebook-Login",
      controller: "auth",
    }, user);
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("User logged in successfully via Facebook Account", "Login successful", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopCenter
      })
    }
    callBackFunction();
  }
}

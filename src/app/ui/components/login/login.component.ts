import {Component} from '@angular/core';
import {UserService} from "../../../services/common/models/user.service";
import {BaseComponent, SpinnerType} from "../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "../../../services/common/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SocialAuthService, SocialUser} from "@abacritt/angularx-social-login";
import {HttpClientService} from "../../../services/common/http-client.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  constructor(private userService: UserService, spinner: NgxSpinnerService, private authService: AuthService, private activatedRoute: ActivatedRoute,
              private router: Router, private socialAuthService: SocialAuthService, private httpClientService: HttpClientService) {
    super(spinner);
    socialAuthService.authState.subscribe((async ( user: SocialUser) => {
      console.log(user);
      this.showSpinner(SpinnerType.BallPulse);
      await userService.googleLogin(user, () =>
      {
        authService.identityCheck();
        this.hideSpinner(SpinnerType.BallPulse);
      });
    }))
  }

  async login(usernameOrEmail: string, password: string) {

    this.showSpinner(SpinnerType.BallPulse);
    await this.userService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
      });


      this.hideSpinner(SpinnerType.BallPulse);

    });
  }
}

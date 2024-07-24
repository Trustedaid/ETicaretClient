import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../services/ui/custom-toastr.service";
import {NgxSpinnerService} from "ngx-spinner";
import {SpinnerType} from "../../base/base.component";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);
  const toastrService = inject(CustomToastrService)
  const spinner = inject(NgxSpinnerService)
  const token = localStorage.getItem("accessToken");

  spinner.show(SpinnerType.BallPulse);


  //const decodeToken = jwtHelper.decodeToken(token);
  //const expirationDate = jwtHelper.getTokenExpirationDate(token);
  let expired: boolean;
  try {
    expired = jwtHelper.isTokenExpired(token);
  } catch {
    expired = true;
  }


  if (!token || expired) {

    router.navigate(["login"], {queryParams: {returnUrl: state.url}});

    toastrService.message("You need to login to access this page", "Unauthorized Access", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }


  spinner.hide(SpinnerType.BallPulse);
  return true;
}

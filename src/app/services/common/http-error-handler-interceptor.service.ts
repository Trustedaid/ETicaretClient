import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode} from "@angular/common/http";
import {catchError, Observable, of} from 'rxjs';
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../ui/custom-toastr.service";
import {UserAuthService} from "./models/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {

      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("You are not authorized to access this page", "401 Unauthorized", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.BottomFullWidth
          });
          console.log("401 401 401 abc");
          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data => {
          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Internal Server Error", "500 Internal Server Error", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.BottomFullWidth
          });
          console.log("Internal Server Error");
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Not Found", "404 Not Found", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.BottomFullWidth
          });
          console.log("Not Found");
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Bad Request", "400 Bad Request", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.BottomFullWidth
          });
          console.log("Bad Request");
          break;
        default:
          this.toastrService.message("Something went wrong", "Unknown Error", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.BottomFullWidth
          });
          console.log("Unknown Error");
          break;
      }


      return of(error);
    }));
  }
}

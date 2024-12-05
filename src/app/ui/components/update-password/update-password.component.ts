import {Component, OnInit} from '@angular/core';
import {BaseComponent, SpinnerType} from "../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {UserAuthService} from "../../../services/common/models/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertifyService, MessageType, Position} from "../../../services/admin/alertify.service";
import {UserService} from "../../../services/common/models/user.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService,
              private activatedRoute: ActivatedRoute, private alertifyService: AlertifyService, private userService: UserService, private router: Router) {
    super(spinner);
  }
  state: any;


  ngOnInit() {


    this.showSpinner(SpinnerType.BallPulse)
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        this.state = await this.userAuthService.verifyResetToken(resetToken, userId, () => {
          this.state = true;
          this.hideSpinner(SpinnerType.BallPulse);

        })
      }
    })
  }

  updatePassword(password: string, passwordConfirm: string) {
    this.showSpinner(SpinnerType.BallPulse)
    if (password != passwordConfirm) {
      this.alertifyService.message("Passwords do not match", {
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      this.hideSpinner(SpinnerType.BallPulse);
      return;

    }
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userService.updatePassword(userId, resetToken, password, passwordConfirm, () => {
            this.alertifyService.message("Password updated successfully", {
              messageType: MessageType.Success,
              position: Position.TopRight
            })
            this.router.navigate(["/login"]);
          },
          error => {
            console.log(error);

          });
        this.hideSpinner(SpinnerType.BallPulse);
      }
    })
  }
}

import {Component} from '@angular/core';
import {UserService} from "../../../services/common/models/user.service";
import {BaseComponent, SpinnerType} from "../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent{
  constructor(private userService: UserService,  spinner : NgxSpinnerService) {
    super(spinner);
  }
  async login(usernameOrEmail: string, password:string){

    this.showSpinner(SpinnerType.BallPulse);
   await this.userService.login(usernameOrEmail, password, () => this.hideSpinner(SpinnerType.BallPulse));
  }
}

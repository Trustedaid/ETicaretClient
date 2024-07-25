import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { MessageType } from './services/admin/alertify.service';
import {AuthService} from "./services/common/auth.service";
import {Router} from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(public authService: AuthService, private toastrService: CustomToastrService, private router: Router) {

authService.identityCheck();
  }
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("You have successfully logged out", "Signed out", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopCenter
    });

  }
  ngOnInit(): void {

  }
}









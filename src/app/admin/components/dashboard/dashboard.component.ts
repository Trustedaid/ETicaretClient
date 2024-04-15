import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(private alertify: AlertifyService, spinner : NgxSpinnerService) {
    super(spinner);
   }
  ngOnInit(): void {
    this.alertify.message("Welcome to Administration", { messageType: MessageType.Warning, position: Position.TopCenter, delay: 5, dismissOthers: true })
    this.showSpinner(SpinnerType.BallPulse)
  }

  w() {
    this.alertify.message("Hello Dashboard", {
      messageType: MessageType.Success,
      position: Position.BottomRight,
      delay: 5,
    })
  }

  d() {
    this.alertify.dismiss();
  }
}

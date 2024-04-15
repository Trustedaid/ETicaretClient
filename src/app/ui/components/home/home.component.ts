import { Component, OnInit } from '@angular/core';
import { extend } from 'jquery';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends BaseComponent implements OnInit {
  constructor(spinner : NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {    
    this.showSpinner(SpinnerType.BallPulse);
  }

}

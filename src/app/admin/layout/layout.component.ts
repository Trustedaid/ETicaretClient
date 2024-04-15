import { Component } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
declare var alertify: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  constructor(private alertify: AlertifyService) {
  }
  ngOnInit(): void {
    

    
  }


}
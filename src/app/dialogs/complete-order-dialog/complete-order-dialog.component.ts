import {Component, Inject, OnInit} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ShoppingCompleteState} from "../shopping-complete-dialog/shopping-complete-dialog.component";

@Component({
  selector: 'app-complete-order-dialog',
  templateUrl: './complete-order-dialog.component.html',
  styleUrl: './complete-order-dialog.component.scss'
})
export class CompleteOrderDialogComponent extends BaseDialog<CompleteOrderDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<CompleteOrderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CompleteOrderState) {
    super(dialogRef);
  }

  ngOnInit() {
  }

  completeOrder() {

  }

}

export enum CompleteOrderState {
  Yes,
  No
}

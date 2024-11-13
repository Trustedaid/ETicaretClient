import {Component, Inject, OnDestroy} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeleteState} from "../delete-dialog/delete-dialog.component";
declare var $: any;

@Component({
  selector: 'app-cart-item-remove',
  templateUrl: './cart-item-remove.component.html',
  styleUrl: './cart-item-remove.component.scss'
})
export class CartItemRemoveComponent extends BaseDialog<CartItemRemoveComponent> implements OnDestroy{
  constructor(dialogRef: MatDialogRef<CartItemRemoveComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CartItemDeleteState,) {
    super(dialogRef);
  }

  ngOnDestroy(): void {
$("#basketModal").modal("show");
    }

}

export enum CartItemDeleteState {
  Yes,
  No
}

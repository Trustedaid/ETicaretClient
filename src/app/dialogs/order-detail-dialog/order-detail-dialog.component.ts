import {Component, Inject, OnInit} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../services/common/models/order.service";
import {SingleOrder} from "../../contracts/order/single_order";
import {DialogService} from "../../services/common/dialog.service";
import {
  CompleteOrderDialogComponent,
  CompleteOrderState
} from "../complete-order-dialog/complete-order-dialog.component";
import {NgxSpinnerService} from "ngx-spinner";
import {SpinnerType} from "../../base/base.component";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../services/ui/custom-toastr.service";


@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.scss'
})
export class OrderDetailDialogComponent extends BaseDialog<OrderDetailDialogComponent> implements OnInit {
  constructor(
    dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    private orderService: OrderService, private dialogService: DialogService,
    private spinner: NgxSpinnerService, private toastrService: CustomToastrService
  ) {
    super(dialogRef);
  }

  singleOrder: SingleOrder;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'totalPrice'];
  dataSource = [];
  clickedRows = new Set<any>();
  totalPrice: number;

  async ngOnInit() {
    this.singleOrder = await this.orderService.getOrderById(this.data as string)
    this.dataSource = this.singleOrder.cartItems;
    this.totalPrice = this.singleOrder.cartItems.map((cartItem, index) => cartItem.price *
      cartItem.quantity).reduce((price, current) => price + current);

  }

  completeOrder() {
    this.dialogService.openDialog({
      componentType: CompleteOrderDialogComponent,
      data: CompleteOrderState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallSpinClockwise)
        await this.orderService.completeOrder(this.data as string);
        this.spinner.hide(SpinnerType.BallSpinClockwise)
        this.toastrService.message("Order completed successfully!", "Order Completed", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });

      }
    })
  }

}

export enum OrderDetailDialogState {
  Close, OrderComplete

}





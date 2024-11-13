import {Component, OnInit} from '@angular/core';
import {BaseComponent, SpinnerType} from '../../../base/base.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {BasketService} from "../../../services/common/models/basket.service";
import {ListCartItem} from "../../../contracts/basket/list-cart-item";
import {UpdateCartItem} from "../../../contracts/basket/update-cart-item";
import {OrderService} from "../../../services/common/models/order.service";
import {Create_Order} from "../../../contracts/order/create_order";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../../services/ui/custom-toastr.service";
import {Router} from "@angular/router";
import {DialogService} from "../../../services/common/dialog.service";
import {
  CartItemDeleteState,
  CartItemRemoveComponent
} from "../../../dialogs/cart-item-remove/cart-item-remove.component";
import {
  ShoppingCompleteDialogComponent, ShoppingCompleteState
} from "../../../dialogs/shopping-complete-dialog/shopping-complete-dialog.component";

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss'
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private cartService: BasketService,
              private orderService: OrderService,
              private toastrService: CustomToastrService,
              private router: Router,
              private dialogService: DialogService) {
    super(spinner);
  }


  cartItems: ListCartItem[] = [];

  async ngOnInit() {
    this.showSpinner(SpinnerType.BallPulse)
    this.cartItems = await this.cartService.get()
    console.log(this.cartItems)
    this.hideSpinner(SpinnerType.BallPulse)
  }

  async changeQuantity(object: any) {
    this.showSpinner(SpinnerType.BallPulse);
    const cartItemId: string = object.target.attributes["id"].value;
    const quantity: number = object.target.value;
    const cartItem: UpdateCartItem = new UpdateCartItem();
    cartItem.cartItemId = cartItemId;
    cartItem.quantity = quantity;

    await this.cartService.updateQuantity(cartItem);
    this.hideSpinner(SpinnerType.BallPulse);
  }

  removeCartItem(cartItemId: string) {
    $("#staticBackdrop").modal("hide");
    console.log('Removing cart item with ID: ', cartItemId);
    this.dialogService.openDialog({
      componentType: CartItemRemoveComponent,
      data: CartItemDeleteState.Yes,
      afterClosed: async () => {
        this.showSpinner(SpinnerType.BallPulse);

        await this.cartService.remove(cartItemId);
        $("." + cartItemId).fadeOut(500, () => this.hideSpinner(SpinnerType.BallPulse));
$("#staticBackdrop").modal("show");
      }
    });

  }

   processPayment() {
    $("#basketModal").modal("hide");

    this.dialogService.openDialog({
      componentType: ShoppingCompleteDialogComponent,
      data: ShoppingCompleteState.Yes,
      afterClosed: async () => {
    this.showSpinner(SpinnerType.BallSpinClockwise)
    const order: Create_Order = new Create_Order();
    order.address = "İstanbul 1234 street";
    order.description = "This is a test order";
    await this.orderService.create(order);
    this.hideSpinner(SpinnerType.BallSpinClockwise);
    this.toastrService.message("Order created successfully", "Success", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.BottomFullWidth
    });
    await this.router.navigate(["/"]);
      }
    });


  }


}

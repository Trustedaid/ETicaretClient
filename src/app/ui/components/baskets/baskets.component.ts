import {Component, OnInit} from '@angular/core';
import {BaseComponent, SpinnerType} from '../../../base/base.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {BasketService} from "../../../services/common/models/basket.service";
import {ListCartItem} from "../../../contracts/basket/list-cart-item";
import {UpdateCartItem} from "../../../contracts/basket/update-cart-item";

declare var $: any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrl: './baskets.component.scss'
})
export class BasketsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private cartService: BasketService) {
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

  async removeCartItem(cartItemId:string){
    this.showSpinner(SpinnerType.BallPulse);

    await this.cartService.remove(cartItemId);
    $("." + cartItemId).fadeOut(2000, () => this.hideSpinner(SpinnerType.BallPulse));


  }



}

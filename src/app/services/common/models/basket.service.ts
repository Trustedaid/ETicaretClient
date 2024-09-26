import {Injectable} from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {firstValueFrom, Observable} from "rxjs";
import {ListCartItem} from "../../../contracts/basket/list-cart-item";
import {CreateCartItem} from "../../../contracts/basket/create-cart-item";
import {UpdateCartItem} from "../../../contracts/basket/update-cart-item";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) {
  }

  async get() : Promise<ListCartItem[]> {
    const observable: Observable<ListCartItem[]> = this.httpClientService.get({
      controller: 'carts',
    });

    return await firstValueFrom(observable);
  }

  async add(cartItem: CreateCartItem) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: 'carts',
    }, cartItem);


    await firstValueFrom(observable);
  }

  async updateQuantity(cartItem: UpdateCartItem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.put({
      controller: 'carts',
    }, cartItem);

    await firstValueFrom(observable);
  }

  async remove(basketItemId: string) {
    const observable: Observable<any> = this.httpClientService.delete({
      controller: 'carts',
    }, basketItemId);
    await firstValueFrom(observable);
  }


}

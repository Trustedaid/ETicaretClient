import {Injectable} from '@angular/core';
import {HttpClientService} from "../http-client.service";
import {Create_Order} from "../../../contracts/order/create_order";
import {firstValueFrom, Observable} from "rxjs";
import {List_Order} from "../../../contracts/order/list_order";
import {List_Product} from "../../../contracts/list_product";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) {
  }

  async create(order: Create_Order): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "orders"
    }, order);
    await firstValueFrom(observable);

  }
  async getAllOrders(page: number = 0, size: number = 5,successCallBack: () => void = () => {},
  errorCallBack: (errorMessage: string) => void = () => {}): Promise<{totalOrderCount:number; orders: List_Order[]}> {
    const observable: Observable<{totalOrderCount: number; orders: List_Order[] } > = this.httpClientService.get({
      controller: "orders",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData =  firstValueFrom(observable);
    promiseData.then(then =>  successCallBack())
      .catch(error => errorCallBack(error));
    

    return await promiseData;

  }
}
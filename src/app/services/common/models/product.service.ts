import {Injectable} from '@angular/core';
import {HttpClientService} from '../http-client.service';
import {Create_Product} from '../../../contracts/create_product';
import {HttpErrorResponse} from "@angular/common/http";
import {List_Product} from "../../../contracts/list_product";
import {firstValueFrom, Observable} from "rxjs";
import {List_Product_Image} from "../../../contracts/list_product_image";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) {
  }

  create(product: Create_Product, successCallBack: any = () => {}, errorCallBack: (errorMessage: string) => void = () => {}) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      successCallBack();  // Callback varsa çağrılır, yoksa boş fonksiyon çağrılır
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
      let message = "";
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          message += `${_v}<br>`;
        });
      });
      errorCallBack(message);  // Hata callback'i çağrılır
    });
  }

  async read(page: number = 0, size: number = 5, successCallBack: () => void = () => {},
             errorCallBack: (errorMessage: string) => void = () => {}): Promise<{
    totalCount: number;
    products: List_Product[]
  }> {
    const promiseData: Promise<{ totalCount: number; products: List_Product[] }> = this.httpClientService.get<{
      totalCount: number;
      products: List_Product[]
    }>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d => successCallBack())  // Başarı callback'i çağrılır
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));  // Hata callback'i çağrılır

    return await promiseData;
  }


  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "products"
    }, id);

    await firstValueFrom(deleteObservable);
  }

  async readImages(id: string, successCallBack?: () => void): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "getProductImages",
      controller: "products",

    }, id);

    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack: () => void = () => {}) {
    const deleteObservable = this.httpClientService.delete({
      controller: "products",
      action: "deleteProductImage",
      queryString: `imageId=${imageId}`
    }, id);

    await firstValueFrom(deleteObservable);
    successCallBack();  // Callback varsa çağrılır
  }

  async setShowcaseImage(imageId: string, productId: string, successCallBack?: () => void) {
    const setShowcaseImageObservable = this.httpClientService.get({
      controller: "products",
      action: "SetShowcaseImage",
      queryString: `imageId=${imageId}&productId=${productId}`
    });
    await firstValueFrom(setShowcaseImageObservable);
    successCallBack();

  }
}

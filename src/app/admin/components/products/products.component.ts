import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {BaseComponent, SpinnerType} from '../../../base/base.component';
import {HttpClientService} from '../../../services/common/http-client.service';
import {Create_Product} from "../../../contracts/create_product";
import {ListComponent} from "./list/list.component";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);

  }

  ngOnInit(): void {
  }

  @ViewChild(ListComponent) listComponents: ListComponent;

  createdProduct(product: Create_Product) {
    this.listComponents.getProducts();

  }

}
























// this.showSpinner(SpinnerType.BallPulse);
// this.httpClientService.get<Create_Product[]>({
//   controller: "products"
// }).subscribe(data =>{
//   console.log(data);
// } );


/* POST TEST CODE
   this.httpClientService.post({
     controller: "products"

   }, {
     name: "Test Product 4",
     stock: 250,
     price: 122
   }).subscribe();
*/

// PUT TEST CODE
/*
this.httpClientService.put({
  controller: "products",
}, {
id : "a4a0fedf-6be3-4f58-8552-8545afd03e6e",
name: "Test Product 4 Update",
stock : 300,
price : 125
}).subscribe();
*/

/* DELETE TEST CODE
 this.httpClientService.delete({
  controller: "products"
}, "a4a0fedf-6be3-4f58-8552-8545afd03e6e").subscribe(); */


/* GET BASE URL TEST CODE
this.httpClientService.get({

  baseUrl : "https://jsonplaceholder.typicode.com",
  controller: "comments"
}).subscribe(data => console.log(data));
*/

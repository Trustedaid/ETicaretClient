import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../services/common/models/product.service";
import {List_Product} from "../../../../contracts/list_product";
import {ActivatedRoute} from "@angular/router";
import {FileService} from "../../../../services/common/models/file.service";
import {BaseUrl} from "../../../../contracts/base_url";
import {BasketService} from "../../../../services/common/models/basket.service";
import {BaseComponent, SpinnerType} from "../../../../base/base.component";
import {NgxSpinnerService} from "ngx-spinner";
import {CreateCartItem} from "../../../../contracts/basket/create-cart-item";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../../../services/ui/custom-toastr.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService,
              private cartService: BasketService, spinner: NgxSpinnerService, private toastrService: CustomToastrService) {
    super(spinner);
  }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  products: List_Product[];
  baseUrl: BaseUrl;

  async ngOnInit() {
    try {
      this.baseUrl = await this.fileService.getBaseStorageUrl();
      // console.log('Base URL:', this.baseUrl.url); // Base URL kontrolü için log

      this.activatedRoute.params.subscribe(async params => {
        this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      });

      const data = await this.productService.read(this.currentPageNo - 1, this.pageSize);
      this.products = data.products;


      this.products = this.products.map<List_Product>(p => {
        const imagePath = p.productImageFiles.length ? p.productImageFiles.find(img => img.showcase)?.path : "";
        // console.log('Image Path:', imagePath);  // imagePath kontrolü için log

        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: imagePath ? `${this.baseUrl.url}/${imagePath}` : "",  // Tam URL oluştur
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles
        };
        return listProduct;
      });

      this.totalProductCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
      this.pageList = [];

      if (this.currentPageNo - 3 <= 0) {
        for (let i = 1; i <= 7; i++) {
          this.pageList.push(i);
        }
      } else if (this.currentPageNo + 3 >= this.totalPageCount) {
        for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++) {
          this.pageList.push(i);
        }
      } else {
        for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
          this.pageList.push(i);
        }
      }
    } catch (error) {
      console.error("Hata oluştu:", error); // Hata yönetimi için log
    }
  }

  async addToCart(product: List_Product) {
    this.showSpinner(SpinnerType.BallPulse)
    let basketItem : CreateCartItem = new CreateCartItem();
    basketItem.productId = product.id;
    console.log(product.id);
    basketItem.quantity = 1;

    await this.cartService.add(basketItem);
    this.hideSpinner(SpinnerType.BallPulse);
    this.toastrService.message("Added to Cart Successfully", "Success",{
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.BottomCenter
    });
//50:13 video
  }
}

  // async ngOnInit() {
  //   try {
  //     this.baseUrl = await this.fileService.getBaseStorageUrl();
  //
  //     this.activatedRoute.params.subscribe(async params => {
  //       this.currentPageNo = parseInt(params["pageNo"] ?? 1);
  //       await this.loadProducts();  // Her sayfa değişikliğinde ürünleri yükle
  //     });
  //
  //   } catch (error) {
  //     console.error("Hata oluştu:", error); // Hata yönetimi için log
  //   }
  // }
  //
  // async loadProducts() {
  //   const data = await this.productService.read(this.currentPageNo - 1, this.pageSize);
  //   this.products = data.products;
  //
  //   this.products = this.products.map<List_Product>(p => {
  //     const imagePath = p.productImageFiles.length ? p.productImageFiles.find(img => img.showcase)?.path : "";
  //
  //     return {
  //       id: p.id,
  //       createdDate: p.createdDate,
  //       imagePath: imagePath ? `${this.baseUrl.url}/${imagePath}` : "",
  //       name: p.name,
  //       price: p.price,
  //       stock: p.stock,
  //       updatedDate: p.updatedDate,
  //       productImageFiles: p.productImageFiles
  //     };
  //   });
  //
  //   this.totalProductCount = data.totalCount;
  //   this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);
  //   this.updatePageList();
  // }
  //
  // updatePageList() {
  //   this.pageList = [];
  //   const maxPagesToShow = 7;  // Gösterilecek maksimum sayfa sayısı
  //
  //   // Sayfa sayısı küçükse, tüm sayfaları göster
  //   if (this.totalPageCount <= maxPagesToShow) {
  //     for (let i = 1; i <= this.totalPageCount; i++) {
  //       this.pageList.push(i);
  //     }
  //   } else {
  //     // İlk sayfalardaysa
  //     if (this.currentPageNo <= 4) {
  //       for (let i = 1; i <= maxPagesToShow; i++) {
  //         this.pageList.push(i);
  //       }
  //     }
  //     // Son sayfalardaysa
  //     else if (this.currentPageNo > this.totalPageCount - 4) {
  //       for (let i = this.totalPageCount - maxPagesToShow + 1; i <= this.totalPageCount; i++) {
  //         this.pageList.push(i);
  //       }
  //     }
  //     // Ortada bir sayfadaysa
  //     else {
  //       for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++) {
  //         this.pageList.push(i);
  //       }
  //     }
  //   }
  // }



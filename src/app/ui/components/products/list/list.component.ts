import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../services/common/models/product.service";
import {List_Product} from "../../../../contracts/list_product";
import {ActivatedRoute} from "@angular/router";
import {List_Product_Image} from "../../../../contracts/list_product_image";
import {FileService} from "../../../../services/common/models/file.service";
import {BaseUrl} from "../../../../contracts/base_url";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService) {
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
      console.log('Base URL:', this.baseUrl.url); // Base URL kontrolü için log

      this.activatedRoute.params.subscribe(async params => {
        this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      });

      const data = await this.productService.read(this.currentPageNo - 1, this.pageSize);
      this.products = data.products;

      // Ürünleri haritalarken hataları kontrol edin ve doğru bir şekilde URL oluşturun
      this.products = this.products.map<List_Product>(p => {
        const imagePath = p.productImageFiles.length ? p.productImageFiles.find(img => img.showcase)?.path : "";
        console.log('Image Path:', imagePath);  // imagePath kontrolü için log

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
}

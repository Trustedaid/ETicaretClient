import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {FileUploadDialogComponent} from "./file-upload-dialog/file-upload-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import {FileUploadModule} from "../services/common/file-upload/file-upload.module";
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from "@angular/forms";
import { CartItemRemoveComponent } from './cart-item-remove/cart-item-remove.component';
import { ShoppingCompleteDialogComponent } from './shopping-complete-dialog/shopping-complete-dialog.component';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import { CompleteOrderDialogComponent } from './complete-order-dialog/complete-order-dialog.component';
import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog/authorize-menu-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import { AuthorizeUserDialogComponent } from './authorize-user-dialog/authorize-user-dialog.component';
import { QrcodeDialogComponent } from './qrcode-dialog/qrcode-dialog.component';
import { QrcodeReadingDialogComponent } from './qrcode-reading-dialog/qrcode-reading-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxScannerQrcodeModule,} from "ngx-scanner-qrcode";


@NgModule({
  declarations: [DeleteDialogComponent,
  SelectProductImageDialogComponent,
  CartItemRemoveComponent,
  ShoppingCompleteDialogComponent,
  OrderDetailDialogComponent,
  CompleteOrderDialogComponent,
  AuthorizeMenuDialogComponent,
  AuthorizeUserDialogComponent,
  QrcodeDialogComponent,
  QrcodeReadingDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule, MatTableModule, MatToolbarModule,MatBadgeModule,
    FileUploadModule, MatListModule, MatFormFieldModule, MatInputModule,MatButtonModule, MatTableModule,
    FormsModule,
    NgxScannerQrcodeModule

  ]
})
export class DialogModule { }

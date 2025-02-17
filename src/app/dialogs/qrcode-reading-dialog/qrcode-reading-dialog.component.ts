import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {QrCodeService} from "../../services/common/qr-code.service";
import {NgxScannerQrcodeComponent} from "ngx-scanner-qrcode";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../services/ui/custom-toastr.service";
import {ProductService} from "../../services/common/models/product.service";
import {SpinnerType} from "../../base/base.component";

declare var $: any;


@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrl: './qrcode-reading-dialog.component.scss'
})
export class QrcodeReadingDialogComponent extends BaseDialog<QrcodeReadingDialogComponent> implements OnInit, OnDestroy {

  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    private productService: ProductService,
  ) {
    super(dialogRef);
  }

  @ViewChild("scanner", {static: true}) scanner: NgxScannerQrcodeComponent;
  @ViewChild("txtStock", {static: true}) txtStock: ElementRef;


  ngOnInit(): void {

    this.scanner.start();

  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  onEvent(e: any) {

    this.spinner.show(SpinnerType.BallPulse);
    const firstElement = e[0];
    const data: any = firstElement.value;

    if (data != null && data != "") {

      const jsonData = JSON.parse(data);
      const stockValue = (this.txtStock.nativeElement as HTMLInputElement).value;


      this.productService.updateStockQrCodeToProduct(jsonData.Id, parseInt(stockValue), () => {

        $("#btnClose").click();
        this.toastrService.message(` Stock Updated Successfully for ${jsonData.Name} `, `Quantity Updated with ${stockValue}`, {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopCenter
        });

        this.spinner.hide(SpinnerType.BallPulse);
      });

    }
  }
}

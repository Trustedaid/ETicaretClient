import {Component, Inject, OnInit} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {QrCodeService} from "../../services/common/qr-code.service";
import {DomSanitizer, SafeHtml, SafeUrl} from "@angular/platform-browser";
import {SpinnerType} from "../../base/base.component";

@Component({
  selector: 'app-qrcode-dialog',
  templateUrl: './qrcode-dialog.component.html',
  styleUrl: './qrcode-dialog.component.scss'
})
export class QrcodeDialogComponent extends BaseDialog<QrcodeDialogComponent> implements OnInit {

  constructor(
    dialogRef: MatDialogRef<QrcodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinner: NgxSpinnerService,
    private qrCodeService: QrCodeService,
    private domSanitizer: DomSanitizer)
  {
    super(dialogRef);
  }

  qrCodeSafeUrl: SafeUrl;

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallPulse)
    const qrCodeBlob: Blob = await this.qrCodeService.generateQrCode(this.data,)
    const url = URL.createObjectURL(qrCodeBlob);
    this.qrCodeSafeUrl = this.domSanitizer.bypassSecurityTrustUrl(url);
    this.spinner.hide(SpinnerType.BallPulse)
  }

}

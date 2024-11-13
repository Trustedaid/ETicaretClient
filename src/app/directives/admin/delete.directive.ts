import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { HttpClientService } from "../../services/common/http-client.service";
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerType } from "../../base/base.component";
import { MatDialog } from "@angular/material/dialog";
import { DeleteDialogComponent, DeleteState } from "../../dialogs/delete-dialog/delete-dialog.component";
import { AlertifyService, MessageType, Position } from "../../services/admin/alertify.service";
import { HttpErrorResponse } from "@angular/common/http";
import { DialogService } from "../../services/common/dialog.service";

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "assets/cross.png");
    img.setAttribute("style", "cursor: pointer");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() refresh: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        await this.spinner.show(SpinnerType.BallSpinClockwise);
        const td: HTMLTableCellElement = this.element.nativeElement;

        this.httpClientService.delete({
          controller: this.controller,
        }, this.id).subscribe(data => {
          $(td.parentElement).animate({
            opacity: 0,
            left: "+=50",
            height: "toggle"
          }, 750, () => {
            this.refresh.emit(); // refresh olayını tetikleyerek dışarıya bildiriyoruz.
            this.alertifyService.message("Product deleted successfully", {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            });
          });
        }, (errorResponse: HttpErrorResponse) => {
          this.spinner.hide(SpinnerType.BallSpinClockwise);
          this.alertifyService.message("An error occurred while deleting the product", {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          });
        });
      }
    });
  }
}

  // openDialog(afterClosed: any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '%25',
  //     height: `%25`,
  //     data: DeleteState.Yes,
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     if (result == DeleteState.Yes) {
  //       afterClosed();
  //
  //     }
  //   });
  // }



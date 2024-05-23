import {Component, Input} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {HttpClientService} from "../http-client.service";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {AlertifyService, MessageType, Position} from "../../admin/alertify.service";
import {CustomToastrService, ToastrMessageType, ToastrPosition} from "../../ui/custom-toastr.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private toasterService: CustomToastrService) {
  }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    console.log(files);
    this.files = files;
    const fileData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });

    }
    console.log(fileData);

    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({"responseType": "blob"})
    }, fileData).subscribe(data => {
        console.log(data);
          const message: string = "File uploaded successfully.";
          if (this.options.isAdminPage) {
            this.alertifyService.message(message,
              {
                dismissOthers: true,
                messageType: MessageType.Success,
                position: Position.TopRight
              }
            );
          } else {
            this.toasterService.message(message, "success", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            });
          }
        }
        , (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);

          const message: string = "File couldn't be uploaded. Please try again.";
          if (this.options.isAdminPage) {
            this.alertifyService.message(message,
              {
                dismissOthers: true,
                messageType: MessageType.Error,
                position: Position.TopCenter
              }
            );
          } else {
            this.toasterService.message(message, "Upload Failed !", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopCenter
            });
          }
        });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;


}



import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from '../../../../services/common/models/product.service';
import {Create_Product} from '../../../../contracts/create_product';
import {NgxSpinnerService} from 'ngx-spinner';
import {BaseComponent, SpinnerType} from '../../../../base/base.component';
import {AlertifyService, MessageType, Position} from '../../../../services/admin/alertify.service';
import {FileUploadOptions} from "../../../../services/common/file-upload/file-upload.component";
import {RoleService} from "../../../../services/common/models/role.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private roleService: RoleService, private alertify: AlertifyService) {
    super(spinner);
  }

  ngOnInit(): void {

  }
  @Output() createdRole : EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {

    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.BallPulse);
      this.alertify.message("Role Created Successfully", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdRole.emit(name.value);
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });

  }
}

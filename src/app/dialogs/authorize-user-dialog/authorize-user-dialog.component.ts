import {Component, Inject, OnInit} from '@angular/core';
import {BaseDialog} from "../base/base-dialog";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoleService} from "../../services/common/models/role.service";
import {AuthorizationEndpointService} from "../../services/common/models/authorization-endpoint.service";
import {NgxSpinnerService} from "ngx-spinner";

import {MatSelectionList} from "@angular/material/list";
import {SpinnerType} from "../../base/base.component";
import {UserService} from "../../services/common/models/user.service";
import {List_Role} from "../../contracts/role/List_Role";

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrl: './authorize-user-dialog.component.scss'
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private roleService: RoleService,
              private userService: UserService,
              private spinner: NgxSpinnerService) {
    super(dialogRef)
  }

  roles: { data: List_Role[], totalCount: number };
  assignedRoles: Array<string>;
  listRoles: { name: string, selected: boolean }[];

  async ngOnInit() {
     this.spinner.show(SpinnerType.BallPulse);
    this.assignedRoles = await this.userService.getRolesToUser(this.data, () =>
      this.spinner.hide(SpinnerType.BallPulse)
    );

    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.data.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1
      }
    });



  }

  assignRoles(rolesComponent: MatSelectionList) {

    console.log(rolesComponent.selectedOptions.selected.map(option => option._hostElement.innerText));
    const roles = rolesComponent.selectedOptions.selected.map(option => option._hostElement.innerText);
    this.spinner.show(SpinnerType.BallPulse);
    this.userService.assignRoleToUser(this.data, roles, () => {
        this.spinner.hide(SpinnerType.BallPulse);
      },
      error => {

      });
  }
}


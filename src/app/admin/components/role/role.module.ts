import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleComponent} from './role.component';
import {RouterModule} from "@angular/router";
import {FileUploadModule} from "../../../services/common/file-upload/file-upload.module";
import {MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import {DeleteModule} from "../../../directives/admin/delete.module";


@NgModule({
  declarations: [
    RoleComponent,
    CreateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {"path": "", "component": RoleComponent}
    ]),
    FileUploadModule,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    DeleteModule,
  ]
})
export class RoleModule {
}

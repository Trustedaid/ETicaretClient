import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BaseComponent } from './base/base.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DeleteDirective } from './directives/admin/delete.directive';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { FileUploadComponent } from './services/common/file-upload/file-upload.component';
import { FileUploadDialogComponent } from './dialogs/file-upload-dialog/file-upload-dialog.component';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {JwtModule} from "@auth0/angular-jwt";
import {LoginComponent} from "./ui/components/login/login.component";
import {
  FacebookLoginProvider,
  GoogleLoginProvider, GoogleSigninButtonModule,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "@abacritt/angularx-social-login";
import {HttpErrorHandlerInterceptorService} from "./services/common/http-error-handler-interceptor.service";
import {BasketsModule} from "./ui/components/baskets/baskets.module";
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DynamicLoadComponentDirective

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule, UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule, MatButton, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"),
        allowedDomains: ["localhost:7030"],

      }
    }),
    SocialLoginModule,
    GoogleSigninButtonModule,


  ],
  providers: [
    provideAnimationsAsync(),
    {provide: "baseUrl", useValue: "https://localhost:7030/api", multi: true},
    {provide: "baseSignalRUrl", useValue: "https://localhost:7030/", multi: true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '622372834950-f44qev133neei81frlgf69o22cu8a7kg.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('509559531586453')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptorService, multi: true},
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }

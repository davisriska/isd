import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgProgressModule} from "@ngx-progressbar/core";
import {NgProgressHttpModule} from "@ngx-progressbar/http";
import {NgProgressRouterModule} from "@ngx-progressbar/router";
import {APP_BASE_HREF} from "@angular/common";
import {AuthenticationService} from "./services/authentication.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {BaseComponent} from "./components/base/base.component";
import {
    MatButtonModule, MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBar,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {AuthComponent} from "./components/auth/auth.component";
import {EncryptComponent} from './components/encrypt/encrypt.component';
import {DecryptComponent} from './components/decrypt/decrypt.component';

@NgModule({
    declarations: [
        AppComponent,
        BaseComponent,
        AuthComponent,
        EncryptComponent,
        DecryptComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgProgressModule.withConfig({
            // https://github.com/MurhafSousli/ngx-progressbar/wiki/Global-config
        }),
        NgProgressHttpModule,
        NgProgressRouterModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatTabsModule,
        MatFormFieldModule,
        FormsModule,
        MatDialogModule,
        MatInputModule,
        MatSnackBarModule,
        MatCardModule
    ],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        MatSnackBar,
        AuthenticationService,
        {
            provide: APP_INITIALIZER,
            useFactory: (authenticationService: AuthenticationService) => {
                return () => authenticationService.me();
            },
            deps: [AuthenticationService,],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

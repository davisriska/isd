import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgProgressModule} from "@ngx-progressbar/core";
import {NgProgressHttpModule} from "@ngx-progressbar/http";
import {NgProgressRouterModule} from "@ngx-progressbar/router";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgProgressModule.withConfig({
            // trickleSpeed: 200,
            // min: 20,
            // meteor: false
            // https://github.com/MurhafSousli/ngx-progressbar/wiki/Global-config
        }),
        NgProgressHttpModule,
        NgProgressRouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

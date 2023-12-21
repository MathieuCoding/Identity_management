import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppMaterialModule } from './app-material.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryUsersService} from "./service/in-memory-users.service";
import { LoginComponent } from './security/login/login.component';
import {CommonModule} from "@angular/common";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {LdapManagementModule} from "./ldap-management/ldap-management.module";

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LoginComponent,
    ],
    imports: [
        //BrowserModule,
        CommonModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        LdapManagementModule,
        AppRoutingModule,
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

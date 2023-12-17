import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppMaterialModule } from './app-material.module';
import { NavbarComponent } from './ldap-management/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LdapManagementModule } from './ldap-management/ldap-management.module';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryUsersService} from "./service/in-memory-users.service";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    LdapManagementModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryUsersService, {dataEncapsulation: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

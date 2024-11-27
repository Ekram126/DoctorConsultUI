import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { HttpClientModule } from '@angular/common/http';
import { AppMenuitemComponent } from './sidebar/app.menuitem.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    AppMenuitemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LayoutRoutingModule,
    TranslateModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    LayoutComponent,
    AppMenuitemComponent
  ]
})
export class LayoutModule { }

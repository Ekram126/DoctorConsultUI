import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashpageComponent } from './dashpage/dashpage.component';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    DashpageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, 
    DashboardRoutingModule,
    LayoutModule,
    TranslateModule
  ],
  exports: [DashpageComponent,TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }

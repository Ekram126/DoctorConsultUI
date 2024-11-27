import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersRoutingModule } from './banners-routing.module';
import { DataViewModule } from 'primeng/dataview';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BannersRoutingModule,
    DataViewModule
  ]
})
export class BannersModule { }

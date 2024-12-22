import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersRoutingModule } from './banners-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BannersRoutingModule,
    DataViewModule,
    DropdownModule
  ]
})
export class BannersModule { }

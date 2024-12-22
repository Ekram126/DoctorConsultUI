import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { ListdoctorsComponent } from './listdoctors/listdoctors.component';
import { AdddoctorComponent } from './adddoctor/adddoctor.component';
import { EditdoctorComponent } from './editdoctor/editdoctor.component';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ViewdoctorComponent } from './viewdoctor/viewdoctor.component';
import { DataViewModule } from 'primeng/dataview';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ListdoctorsComponent,
    AdddoctorComponent,
    EditdoctorComponent,
    ViewdoctorComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TableModule,
    DialogModule,
    CalendarModule,
    DataViewModule,
    TooltipModule,
    DropdownModule
  ]
})
export class DoctorsModule { }

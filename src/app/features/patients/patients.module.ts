import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListpatientsComponent } from './listpatients/listpatients.component';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { EditpatientComponent } from './editpatient/editpatient.component';

import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    ListpatientsComponent,
    AddpatientComponent,
    EditpatientComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TableModule,
    DialogModule,
    CalendarModule
  ]
})
export class PatientsModule { }

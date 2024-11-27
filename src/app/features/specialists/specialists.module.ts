import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SpecialistsRoutingModule } from './specialists-routing.module';
import { ListspecialComponent } from './listspecial/listspecial.component';
import { AddspecialComponent } from './addspecial/addspecial.component';
import { EditspecialComponent } from './editspecial/editspecial.component';

import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewspecialComponent } from './viewspecial/viewspecial.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';



@NgModule({
  declarations: [
    ListspecialComponent,
    AddspecialComponent,
    EditspecialComponent,
    ViewspecialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpecialistsRoutingModule,
    TranslateModule,
    TableModule,
    DialogModule,
    TranslateModule,
    MatDialogModule,
    ConfirmDialogModule,
    AutoCompleteModule
  ]
})
export class SpecialistsModule { }

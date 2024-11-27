import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsRoutingModule } from './sections-routing.module';
import { ListsectionsComponent } from './listsections/listsections.component';
import { EditsectionComponent } from './editsection/editsection.component';
import { DataViewModule } from 'primeng/dataview';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddsectionComponent } from './addsection/addsection.component';


@NgModule({
  declarations: [
    ListsectionsComponent,
    EditsectionComponent,
    AddsectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SectionsRoutingModule,
    DataViewModule,
    TranslateModule,
    ConfirmDialogModule,
    DialogModule,
    AngularEditorModule
  ]
})
export class SectionsModule { }

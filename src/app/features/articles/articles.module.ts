import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';


import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { MatDialogModule } from "@angular/material/dialog";



import { ViewarticleComponent } from './viewarticle/viewarticle.component';
import { CheckboxModule } from 'primeng/checkbox';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { AddarticleComponent } from './addarticle/addarticle.component';
import { EditarticleComponent } from './editarticle/editarticle.component';
import { MessageService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { ListarticleComponent } from './listarticle/listarticle.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
@NgModule({
  declarations: [
    ListarticleComponent,
    ViewarticleComponent,
    AddarticleComponent,
    EditarticleComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,   
    DialogModule,
    CalendarModule,
    MatDialogModule,
    CheckboxModule,
    MatSnackBarModule,
    AngularEditorModule,
    TableModule,
    EditorModule,
    ConfirmDialogModule,
    DataViewModule,
    DropdownModule,
    TooltipModule
  ],
  providers:[MessageService]
})
export class ArticlesModule { }

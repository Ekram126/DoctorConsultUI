import { NgModule,CUSTOM_ELEMENTS_SCHEMA ,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { ListvideosComponent } from './listvideos/listvideos.component';
import { AddvideoComponent } from './addvideo/addvideo.component';
import { EditvideoComponent } from './editvideo/editvideo.component';



import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { MatDialogModule } from "@angular/material/dialog";
import { CheckboxModule } from 'primeng/checkbox';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewvideoComponent } from './viewvideo/viewvideo.component';
import { DataViewModule } from 'primeng/dataview';
import { SafeUrlPipe } from 'src/app/shared/safeUrlPipe.pipe';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [
    ListvideosComponent,
    AddvideoComponent,
    EditvideoComponent,
    ViewvideoComponent,
    SafeUrlPipe 
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TableModule,
    DialogModule,
    CalendarModule,
    MatDialogModule,
    CheckboxModule,
    MatSnackBarModule,
    DataViewModule ,
    YouTubePlayerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class VideosModule { }

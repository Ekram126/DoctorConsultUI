import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RequestsRoutingModule } from './requests-routing.module';
import { ListrequestsComponent } from './listrequests/listrequests.component';
import { AddrequestComponent } from './addrequest/addrequest.component';
import { EditrequestComponent } from './editrequest/editrequest.component';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { AssignrequestComponent } from './assignrequest/assignrequest.component';
import { ViewrequestComponent } from './viewrequest/viewrequest.component';
import { HttpClientModule } from '@angular/common/http';
import { DoctorreplyComponent } from './doctorreply/doctorreply.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { BadgeModule } from 'primeng/badge';
import { DataViewModule } from 'primeng/dataview';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerifyrequestComponent } from './verifyrequest/verifyrequest.component';


@NgModule({
  declarations: [
    ListrequestsComponent,
    AddrequestComponent,
    EditrequestComponent,
    AssignrequestComponent,
    ViewrequestComponent,
    DoctorreplyComponent,
    VerifyrequestComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RequestsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TableModule,
    CalendarModule,
    TranslateModule,
    DialogModule,
    RadioButtonModule,
     MatBadgeModule,
     MatButtonModule,
     BadgeModule,
     DataViewModule,
     TooltipModule,
     DropdownModule,
     DynamicDialogModule,
     ConfirmDialogModule,
     
  ],
  providers: [DynamicDialogRef,ConfirmationService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class RequestsModule { }

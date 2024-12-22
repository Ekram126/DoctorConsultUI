import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { DoctorsModule } from './features/doctors/doctors.module';
import { DoctorsRoutingModule } from './features/doctors/doctors-routing.module';
import { PatientsModule } from './features/patients/patients.module';
import { PatientsRoutingModule } from './features/patients/patients-routing.module';
import { SpecialistsModule } from './features/specialists/specialists.module';
import { SpecialistsRoutingModule } from './features/specialists/specialists-routing.module';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { AuthenticateRoutingModule } from './authenticate/authenticate-routing.module';
import { RequestsModule } from './features/requests/requests.module';
import { RequestsRoutingModule } from './features/requests/requests-routing.module';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataViewModule } from 'primeng/dataview';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatGridListModule } from '@angular/material/grid-list';
import { BadgeModule } from 'primeng/badge';
import { MatListModule } from '@angular/material/list';

import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeComponent } from './cdwebsite/default/home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CdspecialityComponent } from './cdwebsite/default/cdspeciality/cdspeciality.component';
import { CddoctorComponent } from './cdwebsite/default/cddoctor/cddoctor.component';
import { CdarticleComponent } from './cdwebsite/default/cdarticle/cdarticle.component';
import { CdfooterComponent } from './cdwebsite/default/cdfooter/cdfooter.component';
import { CdcontactComponent } from './cdwebsite/default/cdcontact/cdcontact.component';
import { CdcreatepatientComponent } from './cdwebsite/default/cdcreatepatient/cdcreatepatient.component';
import { CdmenuComponent } from './cdwebsite/default/cdmenu/cdmenu.component';
import { CdarticledetailComponent } from './cdwebsite/default/cdarticledetail/cdarticledetail.component';
import { CddoctordetailComponent } from './cdwebsite/default/cddoctordetail/cddoctordetail.component';
import { ArticlesModule } from './features/articles/articles.module';
import { ArticlesRoutingModule } from './features/articles/articles-routing.module';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { CdepartmentsmediaComponent } from './cdwebsite/default/cdepartmentsmedia/cdepartmentsmedia.component';
import { CdepartmentarticlesComponent } from './cdwebsite/default/cdepartmentarticles/cdepartmentarticles.component';
import { CdepartmentartvideosComponent } from './cdwebsite/default/cdepartmentartvideos/cdepartmentartvideos.component';
import { VideosModule } from './features/videos/videos.module';
import { VideosRoutingModule } from './features/videos/videos-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ListbannersComponent } from './features/banners/listbanners/listbanners.component';
import { AddbannerComponent } from './features/banners/addbanner/addbanner.component';
import { EditbannerComponent } from './features/banners/editbanner/editbanner.component';
import { CdbannerComponent } from './cdwebsite/default/cdbanner/cdbanner.component';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { GalleriaModule } from 'primeng/galleria';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdgalleryComponent } from './cdwebsite/default/cdgallery/cdgallery.component';
import { CdtermComponent } from './cdwebsite/default/cdterm/cdterm.component';
import { CdmissionComponent } from './cdwebsite/default/cdmission/cdmission.component';
import { CdvisionComponent } from './cdwebsite/default/cdvision/cdvision.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ButtonModule } from 'primeng/button';




@NgModule({
  declarations: [AppComponent, HomeComponent, CdspecialityComponent, CddoctorComponent, CdarticleComponent, CdfooterComponent, CdcontactComponent, CdcreatepatientComponent, CdmenuComponent, CdarticledetailComponent, CddoctordetailComponent, CdepartmentsmediaComponent, CdepartmentarticlesComponent, CdepartmentartvideosComponent, ListbannersComponent, AddbannerComponent, EditbannerComponent, CdbannerComponent, CdgalleryComponent, CdtermComponent, CdmissionComponent, CdvisionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    DynamicDialogModule,
    CalendarModule,
    RadioButtonModule,
    CarouselModule,
    DialogModule,
    CheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    AngularEditorModule,
    DataViewModule,
    LayoutModule,
    LayoutRoutingModule,
    MatGridListModule,
    MatListModule,
    MatBadgeModule,
    MatButtonModule,
    BadgeModule,
    ContextMenuModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    DataViewModule,
    DropdownModule,
    TooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    GalleriaModule,
    YouTubePlayerModule,
    ConfirmDialogModule,
    ButtonModule,


    
    AuthenticateModule,
    AuthenticateRoutingModule,

    DashboardModule,
    DashboardRoutingModule,

    DoctorsModule,
    DoctorsRoutingModule,

    PatientsModule,
    PatientsRoutingModule,

    SpecialistsModule,
    SpecialistsRoutingModule,

    RequestsModule,
    RequestsRoutingModule,


    ArticlesModule,
    ArticlesRoutingModule,

    VideosModule,
    VideosRoutingModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true, // isolate property is the key point to remember/
    }),
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    DialogService, DatePipe, ConfirmationService, MessageService],
  bootstrap: [AppComponent],



  // providers: [{
  //   provide: YOUTUBE_PLAYER_CONFIG,
  //   useValue: {
  //     loadApi: false
  //   }
  // }]
})
export class AppModule { }

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

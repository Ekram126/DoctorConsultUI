import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './cdwebsite/default/home/home.component';
import { CdarticledetailComponent } from './cdwebsite/default/cdarticledetail/cdarticledetail.component';
import { LoginComponent } from './authenticate/login/login.component';
import { CddoctordetailComponent } from './cdwebsite/default/cddoctordetail/cddoctordetail.component';
import { CdepartmentsmediaComponent } from './cdwebsite/default/cdepartmentsmedia/cdepartmentsmedia.component';
import { CdepartmentarticlesComponent } from './cdwebsite/default/cdepartmentarticles/cdepartmentarticles.component';
import { CdepartmentartvideosComponent } from './cdwebsite/default/cdepartmentartvideos/cdepartmentartvideos.component';
import { CdcontactComponent } from './cdwebsite/default/cdcontact/cdcontact.component';
import { CdtermComponent } from './cdwebsite/default/cdterm/cdterm.component';
import { CdmissionComponent } from './cdwebsite/default/cdmission/cdmission.component';
import { CdvisionComponent } from './cdwebsite/default/cdvision/cdvision.component';

const routes: Routes = [


  { path: '', component: HomeComponent },
  { path: 'adminlog', component: LoginComponent},
  { path: 'articledetail/:id', component: CdarticledetailComponent },
   { path: 'doctordetail/:id', component: CddoctordetailComponent },
   { path: 'media/:id', component: CdepartmentsmediaComponent },
   { path: 'articlemediadetail/:specialityId', component: CdepartmentarticlesComponent },
   { path: 'videomediadetail/:specialityId', component: CdepartmentartvideosComponent },
   { path: 'contactus', component: CdcontactComponent },
   { path: 'terms', component: CdtermComponent },

   { path: 'mission', component: CdmissionComponent },
   { path: 'vision', component: CdvisionComponent },


  { path: 'dash', loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

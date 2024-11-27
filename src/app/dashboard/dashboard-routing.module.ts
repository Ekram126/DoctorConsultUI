import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashpageComponent } from './dashpage/dashpage.component';
import { AuthGuard } from '../shared/services/guards/authGuard.guard';

const routes: Routes = [
  {
    path: '',    component: DashpageComponent,
    children: [
      {
        path: 'doctors',loadChildren: () =>import('src/app/features/doctors/doctors.module').then((m) => m.DoctorsModule),
      },

      {
        path: 'patients',
        loadChildren: () =>
          import('src/app/features/patients/patients.module').then(
            (m) => m.PatientsModule)
      },

      {
        path: 'specialists', 
         //data: { roles: ['Admin'] },
        // canActivate:[AuthGuard],
        loadChildren: () =>
          import('src/app/features/specialists/specialists.module').then(
            (m) => m.SpecialistsModule)
      },
      {
        path: 'requests',
       // data: { roles: ['Patient'] },
        loadChildren: () =>
          import('src/app/features/requests/requests.module').then(
            (m) => m.RequestsModule)
      }  ,

      {
        path: 'articles',
       // data: { roles: ['Patient'] },
        loadChildren: () =>
          import('src/app/features/articles/articles.module').then(
            (m) => m.ArticlesModule)
      }  ,
      {
        path: 'videos',
       // data: { roles: ['Patient'] },
        loadChildren: () =>
          import('src/app/features/videos/videos.module').then(
            (m) => m.VideosModule)
      }  ,
      {
        path: 'banners',
       // data: { roles: ['Admin'] },
        loadChildren: () =>
          import('src/app/features/banners/banners.module').then(
            (m) => m.BannersModule)
      }  ,
      {
        path: 'sections',
        loadChildren: () =>
          import('src/app/features/sections/sections.module').then(
            (m) => m.SectionsModule)
      }  
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../authenticate/login/login.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
    children: [
      { path: 'dash', loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

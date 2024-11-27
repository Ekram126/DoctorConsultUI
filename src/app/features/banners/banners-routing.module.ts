import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListbannersComponent } from './listbanners/listbanners.component';
import { AddbannerComponent } from './addbanner/addbanner.component';
import { EditbannerComponent } from './editbanner/editbanner.component';

const routes: Routes = [
  {   path: '', component: ListbannersComponent},
  {   path: 'createbanner', component: AddbannerComponent  },
  {   path: 'editbanner/:id', component: EditbannerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannersRoutingModule { }

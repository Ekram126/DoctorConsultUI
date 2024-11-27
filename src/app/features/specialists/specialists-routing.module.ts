import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListspecialComponent } from './listspecial/listspecial.component';
import { EditspecialComponent } from './editspecial/editspecial.component';
import { AddspecialComponent } from './addspecial/addspecial.component';

const routes: Routes = [
  {   path: '', component: ListspecialComponent},
  {   path: 'createspecial', component: AddspecialComponent },
  {   path: 'editspecial/:id', component: EditspecialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistsRoutingModule { }

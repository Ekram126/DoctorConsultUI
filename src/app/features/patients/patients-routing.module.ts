import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListpatientsComponent } from './listpatients/listpatients.component';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { EditpatientComponent } from './editpatient/editpatient.component';

const routes: Routes = [
  {   path: '', component: ListpatientsComponent},
  {   path: 'createpatient', component: AddpatientComponent  },
  {   path: 'editpatient/:id', component: EditpatientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }

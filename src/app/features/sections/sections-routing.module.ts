import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsectionsComponent } from './listsections/listsections.component';
import { EditsectionComponent } from './editsection/editsection.component';

const routes: Routes = [
  {   path: '', component: ListsectionsComponent},
  {   path: 'editsection/:id', component: EditsectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutingModule { }

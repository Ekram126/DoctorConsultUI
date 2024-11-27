import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListdoctorsComponent } from './listdoctors/listdoctors.component';
import { AdddoctorComponent } from './adddoctor/adddoctor.component';
import { EditdoctorComponent } from './editdoctor/editdoctor.component';
import { ViewvideoComponent } from '../videos/viewvideo/viewvideo.component';

const routes: Routes = [

  {   path: '', component: ListdoctorsComponent},
  {   path: 'createdoctor', component: AdddoctorComponent  },
  {   path: 'editdoctor/:id', component: EditdoctorComponent},
  {   path: 'viewdoctor/:id', component: ViewvideoComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }

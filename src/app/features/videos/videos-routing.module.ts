import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListvideosComponent } from './listvideos/listvideos.component';
import { AddvideoComponent } from './addvideo/addvideo.component';
import { EditvideoComponent } from './editvideo/editvideo.component';

const routes: Routes = [

  {   path: '', component: ListvideosComponent},
  {   path: 'createvideo', component: AddvideoComponent  },
  {   path: 'editvideo/:id', component: EditvideoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule { }

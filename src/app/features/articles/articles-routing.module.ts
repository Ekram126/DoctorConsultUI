import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarticleComponent } from './editarticle/editarticle.component';
import { AddarticleComponent } from './addarticle/addarticle.component';
import { ListarticleComponent } from './listarticle/listarticle.component';

const routes: Routes = [
  {   path: '', component: ListarticleComponent},
  {   path: 'createarticle', component: AddarticleComponent  },
  {   path: 'editarticle/:id', component: EditarticleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }

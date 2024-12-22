import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListrequestsComponent } from './listrequests/listrequests.component';
import { AddrequestComponent } from './addrequest/addrequest.component';
import { EditrequestComponent } from './editrequest/editrequest.component';
import { VerifyrequestComponent } from './verifyrequest/verifyrequest.component';
import { ViewrequestComponent } from './viewrequest/viewrequest.component';

const routes: Routes = [

  {   path: '', component: ListrequestsComponent},
  {   path: 'createrequest', component: AddrequestComponent },
  {   path: 'editrequest/:id', component: EditrequestComponent},
  {   path: 'viewrequest/:id', component: ViewrequestComponent},
  {   path: 'verifyrequest/:id', component: VerifyrequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }

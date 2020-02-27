import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'

import { ShowDataComponent } from './show-data.component';
import { ShowInformationComponent } from './show-information/show-information.component'

const routes: Routes = [{
  path: ':id',
  component: ShowInformationComponent,
},
{
  path: '',
  component: ShowDataComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class ShowDataRoutingModule { }

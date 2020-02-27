import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal/portal.component';


const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      { path: 'person-info', loadChildren: () => import('./show-data/show-data.module').then(m => m.ShowDataModule) }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

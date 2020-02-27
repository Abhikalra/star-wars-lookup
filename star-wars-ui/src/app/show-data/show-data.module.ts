import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowDataRoutingModule } from './show-data-routing.module';
import { ShowDataComponent } from './show-data.component';
import { ShowInformationComponent } from './show-information/show-information.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { ShowMoviesInfoComponent } from './show-movies-info/show-movies-info.component';
import { SharedModule } from '../shared/shared.module'


@NgModule({
  declarations: [ShowDataComponent,
    ShowInformationComponent,
    ShowDetailsComponent,
    ShowMoviesInfoComponent],
  imports: [
    CommonModule,
    ShowDataRoutingModule,
    SharedModule
  ]
})
export class ShowDataModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StarWarsService } from './services/star-wars-service.service';
import { PortalComponent } from './portal/portal.component'
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule
  ],
  providers: [StarWarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

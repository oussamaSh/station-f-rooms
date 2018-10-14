import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ErrorDisplayComponent } from './components/shared/error-display/error-display.component';
import { RoomsMainComponent } from './components/rooms-main/rooms-main.component';
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ValidateReservationComponent } from './components/validate-reservation/validate-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorDisplayComponent,
    RoomsMainComponent,
    RoomsListComponent,
    ValidateReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

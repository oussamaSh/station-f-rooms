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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalConfirmReservationComponent } from './components/modal-confirm-reservation/modal-confirm-reservation.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlertComponent } from './components/alert/alert.component';
import { RoomsPipe } from './pipes/rooms.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorDisplayComponent,
    RoomsMainComponent,
    RoomsListComponent,
    ValidateReservationComponent,
    ModalConfirmReservationComponent,
    AlertComponent,
    RoomsPipe
  ],
  entryComponents: [ModalConfirmReservationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

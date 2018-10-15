import { RoomsMainComponent } from './components/rooms-main/rooms-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateReservationComponent } from './components/validate-reservation/validate-reservation.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsMainComponent,
    data: {
      title: 'StationF Rooms'
    }
  },
  {
    path: 'rooms',
    component: RoomsMainComponent,
    data: {
      title: 'StationF Rooms'
    }
  },
  {
    path: 'room-reservation/:_id',
    component: ValidateReservationComponent,
    data: {
      title: 'Room Reservation'
    }
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

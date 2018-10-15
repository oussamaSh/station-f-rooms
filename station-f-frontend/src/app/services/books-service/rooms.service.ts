import { Room } from './../../models/room';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Globals from '../../utils/globals';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(public http: HttpClient) { }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(Globals.URL + '/rooms').pipe();
  }

  getRoomById(roomId): Observable<Room> {
    return this.http.get<Room>(Globals.URL + '/rooms/getRoomById/' + roomId).pipe();
  }

  makeReservation(roomId, newReservation) {
    return this.http.put(Globals.URL + '/rooms/makeReservation/' + roomId, newReservation);
  }

  searchAvailableRooms(reservationDetails): Observable<Room[]> {
    return this.http.post<Room[]>(Globals.URL + '/rooms/searchAvailableRooms', reservationDetails).pipe();
  }
}

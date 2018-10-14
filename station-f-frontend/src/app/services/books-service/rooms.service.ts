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
}

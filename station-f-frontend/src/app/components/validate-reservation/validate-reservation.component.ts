import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/books-service/rooms.service';
import { Room } from 'src/app/models/room';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation';

@Component({
  selector: 'app-validate-reservation',
  templateUrl: './validate-reservation.component.html',
  styleUrls: ['./validate-reservation.component.css']
})
export class ValidateReservationComponent implements OnInit {

  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  public errorMsg: string;
  public room: Room;
  public roomId: string;
  formMakeReservation: FormGroup;

  reservationDate = new FormControl('', [Validators.required]);
  reservationStartTime = new FormControl('', [Validators.required]);
  reservationEndTime = new FormControl('', [Validators.required]);
  nbrPersons = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.room = new Room();
    this.roomId = this.route.snapshot.paramMap.get('_id');
    this.roomsService.getRoomById(this.roomId).
      subscribe(response => {
        this.room = response;
      },
        error => this.errorMsg = error
      );
    this.formMakeReservation = this.formBuilder.group({
      reservationDate: this.reservationDate,
      reservationStartTime: this.reservationStartTime,
      reservationEndTime: this.reservationEndTime,
      nbrPersons: this.nbrPersons,
    });
  }

  makeReservation(formMakeReservation: FormGroup) {

    const reservation = new Reservation();

    reservation.reservationDate = formMakeReservation.value.reservationDate;
    reservation.reservationStartTime = formMakeReservation.value.reservationStartTime;
    reservation.reservationEndTime = formMakeReservation.value.reservationEndTime;
    reservation.nbrPersons = formMakeReservation.value.nbrPersons;
    reservation.roomId = this.roomId;
    console.log(reservation.reservationDate);
    this.roomsService.makeReservation(this.roomId, reservation).subscribe(createdReservation => {
      console.log(createdReservation);
    },
      error => {
        console.log(error);
      }
    );
  }

}

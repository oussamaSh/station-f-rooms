import { Component, OnInit, Input } from '@angular/core';
import { Room } from 'src/app/models/room';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation';
import { RoomsService } from 'src/app/services/books-service/rooms.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';

interface Alert {
  type: string;
  message: string;
}
@Component({
  selector: 'app-modal-confirm-reservation',
  templateUrl: './modal-confirm-reservation.component.html',
  styleUrls: ['./modal-confirm-reservation.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1200, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(1200, style({ opacity: 0 }))
      ])
    ])
  ]
})

export class ModalConfirmReservationComponent implements OnInit {

  @Input() roomById = new Room();
  @Input() allRooms: Room[] = [];

  formConfirmReservation: FormGroup;
  @Input() reservationDate = new FormControl(null, [Validators.required]);
  @Input() reservationStartTime = new FormControl(null, [Validators.required]);
  @Input() reservationEndTime = new FormControl(null, [Validators.required]);
  @Input() nbrPersons = new FormControl(null, [Validators.required]);
  confirmReservationDate = new FormControl(null, [Validators.required]);
  confirmReservationStartTime = new FormControl(null, [Validators.required]);
  confirmReservationEndTime = new FormControl(null, [Validators.required]);
  confirmNbrPersons = new FormControl(null, [Validators.required]);

  alerts: Alert[] = [];

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder, private roomsService: RoomsService, private alertService: AlertService) { }

  ngOnInit() {

    this.formConfirmReservation = this.formBuilder.group({
      confirmReservationDate: this.reservationDate,
      confirmReservationStartTime: this.reservationStartTime,
      confirmReservationEndTime: this.reservationEndTime,
      confirmNbrPersons: this.confirmNbrPersons,
    });
    console.log(this.reservationDate);
    return this.getRoomById;
  }

  getRoomById(room: Room) {
    this.roomById = this.allRooms.find(x => x._id === room._id);
    return this.roomById;
  }

  makeReservation(formConfirmReservation: FormGroup) {

    const reservation = new Reservation();

    const reservationDate = this.formConfirmReservation.value.confirmReservationDate.year
      + '-' + this.formConfirmReservation.value.confirmReservationDate.month
      + '-' + this.formConfirmReservation.value.confirmReservationDate.day;

    const reservationStartTime = this.formConfirmReservation.value.confirmReservationStartTime.hour
      + ':' + this.formConfirmReservation.value.confirmReservationStartTime.minute;

    reservation.reservationDate = reservationDate;
    reservation.reservationStartTime = reservationStartTime;
    reservation.reservationEndTime = formConfirmReservation.value.confirmReservationEndTime;
    reservation.nbrPersons = formConfirmReservation.value.confirmNbrPersons;
    reservation.roomId = this.roomById._id;

    this.roomsService.makeReservation(this.roomById._id, reservation).subscribe(createdReservation => {
       this.alertService.success('La salle a été réservé avec succès');
      // alert('sss');
      this.activeModal.close('Save click');
    },
      error => {
        console.log(error.error);
        // this.alertService.error(error.error);
        const alert: Alert = {
          type: 'danger',
          message: error.error,
        };
        this.alerts.push(alert);

      }
    );
  }

  // Checks the validity of inputs
  isValid(input: string) {
    return !this.formConfirmReservation.get(input).valid &&
      (this.formConfirmReservation.get(input).dirty || this.formConfirmReservation.get(input).touched);
  }

  showErrorCss(input: string) {
    return {
      'has-error': this.isValid(input),
      'has-feedback': this.isValid(input)
    };
  }


  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}

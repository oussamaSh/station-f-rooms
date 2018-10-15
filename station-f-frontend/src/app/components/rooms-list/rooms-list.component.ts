import { RoomsService } from './../../services/books-service/rooms.service';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Reservation } from 'src/app/models/reservation';
import { ModalConfirmReservationComponent } from '../modal-confirm-reservation/modal-confirm-reservation.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css'],
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
export class RoomsListComponent implements OnInit {

  constructor(private roomsService: RoomsService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  public errorMsg: string;
  allRooms: Room[] = [];
  closeResult: string;

  formMakeReservation: FormGroup;
  reservationDate = new FormControl(null, [Validators.required]);
  reservationStartTime = new FormControl(null, [Validators.required]);
  reservationEndTime = new FormControl('', [Validators.required]);
 // nbrPersons = new FormControl(null, [Validators.required]);

  customRoomFilter: any = { capacity: '' };

  ngOnInit() {
    this.roomsService.getAllRooms().subscribe(
      rooms => {
        console.log(rooms);
        this.allRooms = rooms;
      },
      error => this.errorMsg = error
    );
    this.formMakeReservation = this.formBuilder.group({
      reservationDate: this.reservationDate,
      reservationStartTime: this.reservationStartTime,
      reservationEndTime: this.reservationEndTime,
      // nbrPersons: this.nbrPersons,
    });
  }

  searchAvailableReservations(formMakeReservation: FormGroup) {

    const reservation = new Reservation();

    const reservationDate = this.formMakeReservation.value.reservationDate.year
      + '-' + this.formMakeReservation.value.reservationDate.month + '-' + this.formMakeReservation.value.reservationDate.day;

    const reservationStartTime = this.formMakeReservation.value.reservationStartTime.hour
      + ':' + this.formMakeReservation.value.reservationStartTime.minute;

    reservation.reservationDate = reservationDate;
    reservation.reservationStartTime = reservationStartTime;
    reservation.reservationEndTime = formMakeReservation.value.reservationEndTime;
    reservation.nbrPersons = formMakeReservation.value.nbrPersons;

    this.roomsService.searchAvailableRooms(reservation).subscribe(foundRooms => {
      this.allRooms.length = 0;
      this.allRooms = foundRooms;

    },
      error => {
        console.log(error);
      });
  }

  openModalDetails(room: Room) {
    const modalRef = this.modalService.open(ModalConfirmReservationComponent, { size: 'lg' });
    modalRef.componentInstance.roomById = room;
    modalRef.componentInstance.reservationDate = this.formMakeReservation.value.reservationDate;
    modalRef.componentInstance.reservationStartTime = this.formMakeReservation.value.reservationStartTime;
    modalRef.componentInstance.reservationEndTime = this.formMakeReservation.value.reservationEndTime;

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

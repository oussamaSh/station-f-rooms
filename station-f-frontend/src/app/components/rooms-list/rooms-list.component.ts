import { RoomsService } from './../../services/books-service/rooms.service';
import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/room';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit {

  constructor(private roomsService: RoomsService, private modalService: NgbModal) { }

  public errorMsg: string;
  allRooms: Room[] = [];
  closeResult: string;

  ngOnInit() {
    this.roomsService.getAllRooms().subscribe(
      rooms => {
        console.log(rooms);
        this.allRooms = rooms;
      },
      error => this.errorMsg = error
    );
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

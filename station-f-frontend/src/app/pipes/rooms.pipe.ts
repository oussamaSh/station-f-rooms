import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roomsPipe'
})
export class RoomsPipe implements PipeTransform {

  transform(allRooms: any, searchedTerm: any): any {
    if (searchedTerm === undefined || searchedTerm === '') { return allRooms; }
    return allRooms.filter(function (room) {
      return room.capacity >= searchedTerm;
    });
  }

}

export class Reservation {

    public reservationDate: Date;
    public reservationStartTime: Date;
    public reservationEndTime: Date;
    public nbrPersons: number;
    public roomId: string;

    constructor(reservationDate?,
                reservationStartTime?,
                reservationEndTime?,
                nbrPersons?,
                roomId?) {
        this.reservationDate = reservationDate;
        this.reservationStartTime = reservationStartTime;
        this.reservationEndTime = reservationEndTime;
        this.nbrPersons = nbrPersons;
        this.roomId = roomId;
    }
}

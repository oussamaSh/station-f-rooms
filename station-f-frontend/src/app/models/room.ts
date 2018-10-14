import { Equipment } from './equipment';
import { Reservation } from './reservation';
export class Room {

    public name: string;
    public description: string;
    public capacity: number;
    public equipements: Equipment[];
    public reservations: Reservation[];


    constructor(name,
                description,
                capacity,
                equipements,
                reservations) {
        this.name = name;
        this.description = description;
        this.capacity = capacity;
        this.equipements = equipements;
        this.reservations = reservations;
    }
}

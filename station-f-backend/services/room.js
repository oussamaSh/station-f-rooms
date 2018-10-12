var Room = require('../models/room');
var Reservation = require('../models/reservation');

var isReserved = false;

exports.getAllRooms = function (req, res) {
    return Room.find().populate('equipements').populate("reservations")
        .then(rooms => {
            return rooms;
        })
        .catch(error => {
            return error;
        });
};

exports.makeReservation = function (req, res) {


    var newReservation = new Reservation({
        reservationStartTime: req.reservationStartTime,
        reservationEndTime: req.reservationEndTime,
        nbrPersons: req.nbrPersons,
        roomId: req.roomId,
    });

    let newBookingStart = newReservation.reservationStartTime.getTime();
    let newBookingEnd = newReservation.reservationEndTime.getTime();


    return Room.findById(req.roomId).populate('reservations')
        .then(foundRoom => {
            if (foundRoom.capacity >= newReservation.nbrPersons) {
                foundRoom.reservations.forEach(reservation => {

                    // Convert existing reservation Date objects into number values
                    let existingBookingStart = new Date(reservation.reservationStartTime).getTime();
                    let existingBookingEnd = new Date(reservation.reservationEndTime).getTime();
                   // checkAvailibility(newBookingStart, existingBookingStart, newBookingEnd, existingBookingEnd);
                   if (newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd ||
                    existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd) {
            
                    isReserved = true;
            
                    throw new Error('Impossible la salle est deja reservée veuillez choisir une autre date/heure !');
            
                }
                });
                console.log('here 2');
                if (isReserved == false) {
                    
                    saveReservationToRoom(newReservation, foundRoom);
                }

            }
            else {
                res.status(400).send('Impossible: nombre de personne > capacite de la salle ');
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error });
        });
};

function checkAvailibility(newBookingStart, existingBookingStart, newBookingEnd, existingBookingEnd) {
    console.log('here 1');
    if (newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd ||
        existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd) {

        isReserved = true;

        throw new Error('Impossible la salle est deja reservée veuillez choisir une autre date/heure !');

    }
}

function saveReservationToRoom(newReservation, foundRoom) {
    Reservation.create(newReservation)
        .then(createdReservation => {

            foundRoom.reservations.push(createdReservation);
            foundRoom.save(function (err, updatedRoom) {
                if (err) return err;
                return updatedRoom;
            });
        })
        .catch(error => {
            res.status(400).json({ error });
        });
}

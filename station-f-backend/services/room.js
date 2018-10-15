var Room = require('../models/room');
var Reservation = require('../models/reservation');
var moment = require('moment');



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

    var reservationDate = new Date(req.reservationDate);

    var startTime = req.reservationStartTime;
    var endTime = req.reservationEndTime;

   // let newBookingStart1 = moment(req.reservationDate + ' ' + startTime).format();
   // let newBookingEnd1 = moment(req.reservationDate + ' ' + endTime);

    

    let newBookingStart = moment(req.reservationDate + ' ' + startTime).utc(true);
    let newBookingEnd =  moment(req.reservationDate + ' ' + endTime).utc(true);

    
   // let date1 = new Date(newBookingStart);
    const date1 = moment(req.reservationDate + ' ' + startTime).utc(true).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    const date2 = moment(req.reservationDate + ' ' + endTime).utc(true).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    var newReservation = new Reservation({
        reservationDate: reservationDate,
        reservationStartTime: date1,
        reservationEndTime: date2,
        nbrPersons: req.nbrPersons,
        roomId: req.roomId,
    });
    console.log(newBookingStart);
    return Room.findById(req.roomId).populate('reservations')
        .then(foundRoom => {
            var isReserved = false;
            if (foundRoom.capacity >= newReservation.nbrPersons) {
                foundRoom.reservations.forEach(reservation => {

                    // Convert existing reservation Date objects into number values
                 //   moment(reservation.reservationStartTime).format();
                    let existingBookingStart = new Date(reservation.reservationStartTime).getTime();
                    let existingBookingEnd = new Date(reservation.reservationEndTime).getTime();
                    
                    if (newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd ||
                        existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd) {

                        isReserved = true;

                       // throw new Error('Impossible la salle est deja reservée veuillez choisir une autre date/heure !');
                        //res.status(400).send('Impossible la salle est deja reservée veuillez choisir une autre date/heure !');
                            console.log("immpo");
                    }
                });
                if (isReserved == false) {
                    saveReservationToRoom(newReservation, foundRoom);
                    // res.send(newReservation);
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

exports.getRoomById = function (req, res) {
    var query = { _id: req.params._id };
    return Room.findById(query).populate('equipements').populate("reservations")
        .then(foundRoom => {
            return foundRoom;
        })
        .catch(error => {
            return error;
        });
};

function checkAvailibility(newReservationStart, existingReservationStart, newReservationEnd, existingReservationEnd) {
    if (newReservationStart >= existingReservationStart && newReservationStart < existingReservationEnd ||
        existingReservationStart >= newReservationStart && existingReservationStart < newReservationEnd) {

        isReserved = true;

        throw new Error('Impossible la salle est deja reservée veuillez choisir une autre date/heure !');

    }
}

function saveReservationToRoom(newReservation, foundRoom) {
    Reservation.create(newReservation)
        .then(createdReservation => {
            console.log(createdReservation);
            foundRoom.reservations.push(createdReservation);
            foundRoom.save(function (err, updatedRoom) {
                if (err) return err;
                return updatedRoom;
            });
        })
        .catch(error => {
            return error;
        });
}

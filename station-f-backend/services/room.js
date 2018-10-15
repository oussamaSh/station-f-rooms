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

    let newBookingStart = moment(req.reservationDate + ' ' + startTime).utc(true);
    let newBookingEnd = moment(req.reservationDate + ' ' + startTime).add(endTime, 'hours').utc(true);

    const formatedNewBookingStart = moment(req.reservationDate + ' ' + startTime).utc(true).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
    const formatedNewBookingEnd = moment(req.reservationDate + ' ' + startTime).add(endTime, 'hours').utc(true).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    var newReservation = new Reservation({
        reservationDate: reservationDate,
        reservationStartTime: formatedNewBookingStart,
        reservationEndTime: formatedNewBookingEnd,
        nbrPersons: req.nbrPersons,
        roomId: req.roomId,
    });
    console.log(endTime);
    return Room.findById(req.roomId).populate('reservations')
        .then(foundRoom => {
            var isReserved = false;
            if (foundRoom.capacity >= newReservation.nbrPersons) {
                foundRoom.reservations.forEach(reservation => {

                    // Convert existing reservation date objects into number values
                    let existingBookingStart = new Date(reservation.reservationStartTime).getTime();
                    let existingBookingEnd = new Date(reservation.reservationEndTime).getTime();

                    if (newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd ||
                        existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd) {

                        isReserved = true;
                        res.status(400).send('Impossible la salle est deja reservée veuillez choisir une autre date/heure !');
                      //  throw new Error('Impossible la salle est deja reservée veuillez choisir une autre date/heure !');

                    }
                });
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

exports.searchAvailableRooms = function (req, res) {
    var availableRooms = [];
    var startTime = req.body.reservationStartTime;
    var endTime = req.body.reservationEndTime;

    let newBookingStart = moment(req.body.reservationDate + ' ' + startTime).utc(true);
    let newBookingEnd = moment(req.body.reservationDate + ' ' + startTime).add(endTime, 'hours').utc(true);

    return Room.find().populate('equipements').populate("reservations")
        .then(rooms => {
            rooms.forEach(room => {
                var isReserved = false;
                room.reservations.forEach(reservation => {
                    let existingBookingStart = new Date(reservation.reservationStartTime).getTime();
                    let existingBookingEnd = new Date(reservation.reservationEndTime).getTime();

                    if (newBookingStart >= existingBookingStart && newBookingStart < existingBookingEnd ||
                        existingBookingStart >= newBookingStart && existingBookingStart < newBookingEnd) {
                        isReserved = true;
                    }

                });
                if (isReserved == false) {
                    availableRooms.push(room);
                }

            });
            return availableRooms;
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

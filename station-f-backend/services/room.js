var Room = require('../models/room');
var Reservation = require('../models/reservation');

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

    var reservation = new Reservation({
        reservationEndTime: req.reservationEndTime,
        nbrPersons: req.nbrPersons,
        roomId: req.roomId,
    });
    return Room.findById(req.roomId)
        .then(foundRoom => {
            if (foundRoom.capacity >= reservation.nbrPersons) {
                Reservation.create(reservation)
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
            else {
                res.status(201).send("Impossible: nombre de personne > capacite de la salle ");
            }
        })
        .catch(error => {
            res.status(400).json({ error });
        });
};
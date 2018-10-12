var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var Reservation = require('../models/reservation');

router.get('/', function (req, res) {

    Reservation.find().exec(function (err, reservations) {
        if (err) {
            res.send(err);
        }
        if (!reservations) {
            res.status(404).send();
        }
        else {
            return res.json(reservations);
        }
    });
});

router.post('/', (req, res, next) => {
    var reservation = new Reservation({
        reservationEndTime: req.body.reservationEndTime,
        nbrPersons: req.body.nbrPersons,
        roomId: req.body.roomId,
    });
    Room.findById(req.body.roomId)
        .then(foundRoom => {
            if (foundRoom.capacity >= reservation.nbrPersons) {
                Reservation.create(reservation)
                    .then(createdReservation => {
                        res.status(201).json(createdReservation);
                    })
                    .catch(error => {
                        res.status(400).json({ error });
                    });
            }
            else {
                res.status(201).send("impossible");
            }
        })
        .catch(error => {
            res.status(400).json({ error });
        });
});

module.exports = router;

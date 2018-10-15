var express = require('express');
var router = express.Router();
var request = require('request');
var Room = require('../models/room');
var Equipment = require('../models/equipment');
var Reservation = require('../models/reservation');
var roomsController = require('../controllers/room.js');


router.get('/', roomsController.getAllRooms);

router.put('/makeReservation/:_id', (req, res, next) => {
  roomsController.makeReservation(req,res);
});

router.get('/getRoomById/:_id', (req, res, next) => {
  roomsController.getRoomByID(req,res);
});

router.post('/searchAvailableRooms', (req, res, next) => {
  roomsController.searchAvailableRooms(req,res);
});

router.post('/', (req, res, next) => {
  var room = new Room({
    name: req.body.name,
    description: req.body.description,
    capacity: req.body.capacity,
    equipements: req.body.equipements
  });
  Room.create(room)
    .then(createdRoom => {
      res.status(201).json(createdRoom);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.post('/addEquipment', function (req, res, next) {
  var equipment = new Equipment({
    name: req.body.name,
  });
  equipment.save(function (err, insertedEquipment) {
    if (err) {
      res.send(err);
    }
    console.log(insertedEquipment);
    res.json(insertedEquipment);
  });

});


module.exports = router;

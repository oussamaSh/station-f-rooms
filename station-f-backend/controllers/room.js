var roomService = require('../services/room.js');

exports.getAllRooms = function (req, res) {

  return roomService.getAllRooms().then(rooms => {
    res.json(rooms);
  })
    .catch(error => {
      res.json({ error });
    });
};

exports.makeReservation = function (req, res) {
  return roomService.makeReservation(req.body, res).then(bookedReservation => {
    res.json(bookedReservation);
  })
    .catch(error => {
      res.json({ error });
    });
};

exports.getRoomByID = function (req, res) {
  return roomService.getRoomById(req, res).then(foundRoom => {
    res.json(foundRoom);
  })
    .catch(error => {
      res.json({ error });
    });
};

exports.searchAvailableRooms = function (req, res) {
  return roomService.searchAvailableRooms(req, res).then(foundRooms => {
    res.json(foundRooms);
  })
    .catch(error => {
      res.json({ error });
    });
};
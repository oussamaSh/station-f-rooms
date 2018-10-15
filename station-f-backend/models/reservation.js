var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = Schema({
    reservationDate: { type: Date },
    reservationStartTime: { type: Date },
    reservationEndTime: { type: Date },
    nbrPersons: {type: Number},
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' }
}, { collection: "reservation" });

module.exports = mongoose.model("Reservation", reservationSchema);
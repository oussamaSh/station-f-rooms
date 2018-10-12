var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = Schema({
    reservationDate: { type: Date, default:Date.now },
    reservationStartTime: { type: Date, default:Date.now },
    reservationEndTime: { type: Date },
    nbrPersons: {type: Number},
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' }
}, { collection: "room" });

module.exports = mongoose.model("Reservation", reservationSchema);
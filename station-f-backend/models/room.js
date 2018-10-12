var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = Schema({
    name: { type: String },
    description: { type: String },
    capacity: { type: Number },
    equipements: [{ type: Schema.Types.ObjectId, ref: 'Equipment' }],
    reservations: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
}, {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }}, { collection: "room" });

module.exports = mongoose.model("Room", roomSchema);
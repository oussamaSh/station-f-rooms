var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var equipmentSchema = Schema({
    name: { type: String },
}, { collection: "equipment" });

module.exports = mongoose.model("Equipment", equipmentSchema);
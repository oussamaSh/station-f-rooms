var mongoose = require('mongoose');
// var url = "mongodb://localhost/stationf";
var url = "mongodb://oussama712:mongo0000@ds133533.mlab.com:33533/stationf";

mongoose.connect(url, function (err, result) {
    if (err) {
        return ("Oops: " + err);
    }
    console.log("Database connection :) ");
});
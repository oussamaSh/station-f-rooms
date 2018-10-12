var mongoose = require('mongoose');
var url = "mongodb://localhost/stationf";

mongoose.connect(url, function (err, result) {
    if (err) {
        return ("Oops: " + err);
    }
    console.log("Database connection :) ");
});
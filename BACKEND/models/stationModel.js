const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    stationName : {type: String , required: true},
    stationUniqueId : {type : String , required : true},
    nextStation : {type : String},
    distanceToNextStation : {type : String},
    timeToNextStation : {type : String},
    previousStation : {type : String},
    distanceToPreviousStation : {type : String},
    timetoPreviousStation : {type : String},
    nearbyAttractions : {type : [String]}

});

module.exports = mongoose.model('Station', stationSchema);
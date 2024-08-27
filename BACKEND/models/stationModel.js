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
    nearbyAttractions : {type : [String]},
    mapUrl : {type : String},
    //nearbyMapUrl : {type : String},
    latitude : {type : Number , required : true},
    longitude : {type : Number , required : true},
});

module.exports = mongoose.model('Station', stationSchema);
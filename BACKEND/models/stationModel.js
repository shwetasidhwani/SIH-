const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true }
});

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
    components : [componentSchema]
});

module.exports = mongoose.model('Station', stationSchema);
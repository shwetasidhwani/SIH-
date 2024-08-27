const Station = require('../models/stationModel');

exports.getStationInfo = async (req, res) => {
    try{ 
        console.log("INside stationcontroller");
        console.log(req.params.stationName);
        const {stationName} = req.params;
        console.log("Req.body is gonna be empty shetwaas: ", req.body);
        console.log(stationName);

        const station = await Station.findOne({stationName});
        console.log(station);

        if(!station){
            return res.status(404).json({message : "Station not found"});
        }
            //maps ka stuff
        station.mapUrl = `/maps/${stationName.replace(" ", "_")}.jpeg`;
        //station.nearbyMapUrl = `/maps/${station.nextStation.replace(" ", "_")}.jpeg`;


        res.json(station);
    }
    catch(error){
        console.error("Error fetching station error : ");
        res.status(500).json({message : "Server error"});
    }
};
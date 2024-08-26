const Station = require('../models/stationModel');

exports.getStationInfo = async (req, res) => {
    try{ 
        console.log("INside stationcontroller");
        console.log(req.params.stationName);
        const {stationName} = req.params;
        console.log(stationName);

        const station = await Station.findOne({stationName});
        console.log(station);

        if(!station){
            return res.status(404).json({message : "Station not found"});
        }
        res.json(station);
    }
    catch(error){
        console.error("Error fetching station error : ");
        res.status(500).json({message : "Server error"});
    }
};
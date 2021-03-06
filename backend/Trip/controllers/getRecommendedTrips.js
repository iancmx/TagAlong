const TripStore = require("../models/Trip");
const mongoose = require("mongoose");
const tripRecommender = require("../../triprecommender/recommender");
const debug = require("debug")("http /getRecommendedTrips");
const User = require("../../User/models/user");

/**
 * handleGetRecommendedTrips: checks if the userid is valid and ensures the user exists,
 * 							  the function then finds all trips made by the user and returns
 * 							  all recommended trips that are similar to the user's trips.
 * 							  *this function only works if its called by a driver*
 *
 */

const handleGetRecommendedTrips = async (req, res) => {

	debug("/getRecommendedTrips hit");

	const userID = req.headers.userid;

	if (!mongoose.Types.ObjectId.isValid(userID)) {
		debug("invalid userID");
		return res.status(400).send("Invalid userID");
		
	}

	const user = await User.findById(userID);
	if (!user) {
		return res.status(400).send("User not found with corresponding userID");
	}
	if (user.isDriver === false) {
		return res.status(400).send("User is not a driver");
	}

	const trips = await TripStore.find({ userID });
	if (trips.length === 0) {
		return res.status(400).send("Driver has no trips");
	}
	let recommendedTrips = [];

	for (const trip of trips) {
		let appendingobj = {
			drivertrip: {},
			riderTrips: []
		};

		appendingobj.drivertrip = trip;

		const ridertrips = await tripRecommender.driverTripHandler(trip);
		
		appendingobj.riderTrips = ridertrips; 
		debug("current appendending object", appendingobj);
		recommendedTrips.push(appendingobj);
	}
	
	debug("responing recommended trips", recommendedTrips);
	res.json({trips: recommendedTrips});

};

module.exports = {
	handleGetRecommendedTrips
};

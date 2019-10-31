const User = require("../models/user");
const mongoose = require("mongoose");

const handleProfileUpdate = async (req, res) => {

	console.log("/profileUpdate hit");
	
	const { userID, firstName, lastName, age, gender, email, interests, isDriver, carCapacity, fbToken } = req.body;

	const update = {
		...firstName && { firstName },
		...lastName && { lastName },
		...age && { age },
		...gender && { gender },
		...email && { email },
		...isDriver && { isDriver },
		...email && { email },
		...carCapacity && { carCapacity },
		...fbToken && { fbToken }
	};

	if (mongoose.Types.ObjectId.isValid(userID)) {

		await User.findByIdAndUpdate(userID, update, { new: true }, (err, user) => {
			if (err) {
				return res.status(400).send(err);
			}
			else {
				console.log("user updated");
				res.json(user);
			}
		});
	}
	else {
		return res.status(400).send("Invalid userID");
	}


	

};

module.exports = {
	handleProfileUpdate
};

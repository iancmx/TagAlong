const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const handleLogin = async (req, res) => {
	
	const { username, password } = req.body;

	const user = await User.findOne({ username });

	if (user && bcrypt.compareSync(password, user.password)) {
		res.send(true);
	}
	else {
		return res.status(400).send("Incorrect email or password");
	}

}

module.exports = {
	handleLogin: handleLogin
}
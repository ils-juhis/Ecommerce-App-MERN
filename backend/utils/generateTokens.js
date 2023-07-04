
const jwt = require('jsonwebtoken')

let generateToken = async (user) => {
	try {
		const payload = { ...user };
		const accessToken = jwt.sign(
			payload,
			process.env.ACCESS_JWT_SECRET,
			{ expiresIn: "30m" }
		);

		const newRefreshToken = jwt.sign(
			payload,
			process.env.REFRESH_JWT_SECRET,
			{ expiresIn: "1d" }
		);

		return [accessToken, newRefreshToken];
		
	} catch (err) {
		console.log(err)
	}
};

module.exports = {generateToken}
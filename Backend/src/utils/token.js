const sendToken = (user, res, statusCode) => {
	const token = user.getJWTToken();
	const options = {
		expire: new Date(
			Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	res.status(statusCode).cookie("token", token, options).json({
		userid: user._id,
		token,
		success: true,
		role: user.role,
		team: user.team,
		name: user.name,
		email: user.email,
	});
};
module.exports = sendToken;

const router = require('express').Router();
const {verify} = require('jsonwebtoken');

const autobot_controller = require('../controllers/autobot_controller');
const {User} = require('../models');

async function blockGuestAndAttachUserId (req, res, next) {
	const token = req.cookies.token

	if(!token){
		return res.status(401).json({
			message: 'You are not authorized to perform that action'
		})
	}

	try {
		const data = await verify(token, process.env.JWT_SECRET);

		req.user_id = data.user_id;

		next();
	} catch (error) {
		console.log('JWT Error', error);

		res.status(402).json({
			message: 'Your token is invalid'
		});
	}
}

async function attachUser (req, res, next) {
	const user = await User.findById(req.user_id);

	req.user = user;

	next();
}


//Get route to retrieve all autobots
router.get('/autobots', autobot_controller.getAllAutobots);

//Get to retrieve a users associated autobots
router.get('/user', blockGuestAndAttachUserId, autobot_controller.getSingleUser);

// Post route to create an autobot
router.post('/autobots', blockGuestAndAttachUserId, attachUser, autobot_controller.createAutobot);

//Put route to update an autobot
router.put('/autobot', blockGuestAndAttachUserId, attachUser, autobot_controller.updateAutobot);

//Delete route to delete an autobot
router.delete('/autobot', blockGuestAndAttachUserId, attachUser, autobot_controller.deleteAutobot);

module.exports = router;
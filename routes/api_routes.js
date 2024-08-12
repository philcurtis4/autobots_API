const router = require('express').Router();

const autobot_controller = require('../controllers/autobot_controller');

router.get('/autobots', autobot_controller.getAllAutobots);

// Post route to create an autobot
router.post('/autobots', autobot_controller.createAutobot);

module.exports = router;
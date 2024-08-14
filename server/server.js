require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const db = require('./config/connection ');
const api_routes = require('./routes/api_routes');
const auth_routes = require('./routes/auth_routes');


const app = express();
const PORT = process.env.PORT || 3001;

// create a get route for every file inside of client
app.use(express.static('../client'));

// Attach all client side cookies onthe req.cookie property
app.use(cookieParser());

app.use(express.json());

app.use('/api', api_routes);
app.use('/api/auth', auth_routes);


// Send back the index.html file for all other requests/routes
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});

db.once('open', () => {
	console.log('DB connection established');
	//start express server
	app.listen(PORT, () => {
		console.log('Express server started on port', PORT);
	});

});

const express = require('express');
const app = express();
const RPC = require('discord-rpc');
// const clientId = '562001419503140909';
const clientId = '553654315252711435';
const scopes = ['rpc', 'rpc.api', 'messages.read'];
const client = new RPC.Client({ transport: 'ipc' });
const fs = require('fs');
const quotes = require('./quotes.json').quotes;
app.use(express.static("public"));
app.get("/", (request, response) => {
	response.sendFile(__dirname + "/views/index.html");
});
app.get("/discord", async (request, response) => {
	let userDetails = request.query.status;
	let userState = request.query.custom;
	let x = request.query.timestamp;
	
	function getDate(input) {
		var z = new Date(input);
		var int = z.getTime() / 1000.0;
		return int;
	};
	console.log(userState)

		if (userState == '' || userState == undefined || userState == null || userState == ' ' || userState == NaN) {

			let quotesAmount = 14 // If you add quotes, remember to subtract one from the total number. Computers count from 0.
			let number = Math.floor((Math.random() * quotesAmount) + 0);
			 userState = quotes[number];
		}

	function errors(err) {
		console.warn(err);
		return;
	}

	var largeImageKey;

	switch (userDetails) {
		case 'Gay':
			largeImageKey = 'gay';
			break;
		case 'Bi':
			largeImageKey = 'bi';
			break;
		case 'Pan':
			largeImageKey = 'pan';
			break;
		case 'Asexual':
			largeImageKey = 'asexual';
			break;
		case 'Nonbinary':
			largeImageKey = 'nonbinary';
			break;
		case 'Trans':
			largeImageKey = 'trans';
			break;
		default:
			largeImageKey = 'discordpride';
			break;
	}

	function sendFile() {
		return file;
	}

	client.on('ready', () => {
		console.log('Authed for user', client.user.username);
		client.clearActivity();
		client.setActivity({
			details: `${userDetails} Pride`,
			state: userState,
			// startTimestamp: new Date,
			// endTimestamp: getDate(x),
			instance: false,
			largeImageKey,
			largeImageText: `${userDetails} Pride!`,
			smallImageKey: `discordpride`,
		});
	})
	client.login({ clientId });
	response.status(200).send('Successfully set status. HTTP code 200')
});
const listener = app.listen("4242", () => {
	console.log("Your app is listening on port " + listener.address().port);
});
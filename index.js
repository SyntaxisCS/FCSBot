const Discord = require("discord.js");
const fs = require("fs");
// Files
const botconfig = require("./botconfig.json");
const packageconfig = require("./package.json");
const xp = require("./xp.json");
const client = new Discord.Client();

let statuses = ["*help", "vibin!", "I need more statuses, message Charley!", "Pouring milk before cereal", "T-Posing in the jungle", "FCSBot was supposed to stand for something."];

let prefix = botconfig.prefix;
let bothost = botconfig.host;
let botver = packageconfig.version;

client.on("ready", () => {
	console.log(`FCSbot (${botver}) is online in ${client.guilds.cache.size} servers`);
	client.user.setStatus("online");

	setInterval(function() {
		let status = statuses[Math.floor(Math.random() * statuses.length)];
		client.user.SetActivity(status);
	}, 300000);
});

client.on("message", msg => {
	let author = msg.author;
	let messageArray = msg.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray[1];
	let args2 = msg.content.split(" ").slice(2).join(" ");

	// Basic

	if (cmd === prefix + "hello") {
		msg.channel.send(`<@${author}> please stop talking to me`);
	}

	if (cmd === prefix + "help") {
		console.log(`${args} menu called`);
		switch(args.toLowerCase()) {
			case "general":
				let embed0 = new Discord.MessageEmbed()
				.setColor("#00539B")
				.setTitle("General Help Menu")
				.addField("Hello", "Receive a warm greeting! ;)")
				.addField("Help", "You're here")
				.addField("Botinfo", "Get bot information (Dev information) and no it does not give the token")
				.addField("Ping", "Returns pong (checks the online status of the bot)");
				// .addField("Profile", "Shows your global xp profile!");
				return msg.channel.send(embed0);
				break;
			case "fun":
				let embed1 = new Discord.MessageEmbed()
				.setColor("#00539B") // Change to Lime Green
				.setTile("Fun Help Menu")
				.addField("Hug <@mention>", "Hug your friends!")
				.addField("Howsmart <@mention>", "Figure out how smart you or your friends are (100% accurate)")
				.addField("Howcute <@mention>", "Figure out how cute you and your friends are (100% accurate)");
				return msg.channel.send(embed1);
				break;
			default:
				msg.channel.send("No help menu specified");
				msg.channel.send("Please choose from the following 'General or Fun' ex: *help general");
		};
	}

	if (cmd === prefix + "botinfo") {
		msg.delete();
		let embed = new Discord.MessageEmbed()
		.setColor("#00539B")
		.setTitle("Bot Information")
		// .setThumbnail("")
		.addField("Bot Name", client.user.username)
		.addField("Bot Tag", client.user.tag)
		.addField("version", botver)
		.addField("Hosted on", bothost);
		return msg.channel.send(embed);
	}

	if (cmd === prefix + "ping") {
		console.log("Pong!");
		msg.channel.send("Pong!");
	}

	// Fun

	if (cmd === prefix + "hug") {
		let target = msg.mentions.users.first();
		if (!target) {
						let receiver = author;
						msg.channel.send(url);
						msg.channel.send(`<@${receiver}> hugs themselves. This is so sad ;(`);
					} else {
						let receiver = target;
						msg.channel.send(url);
						msg.channel.send(`<@${receiver}> you are being hugged by <@${author}>`);
					}
	}

	if (cmd === prefix + "howsmart") {
		msg.delete();
		let smartboi = msg.mentions.users.first();
		let sval = Math.floor(Math.random() * 100) + 1;
		if (!smartboi) {
			msg.channel.send(`You didn't specify anyone and because of this you are 0% smart`);
		} else {
			msg.channel.send(`<@${smartboi}> is ${sval}% smart`);
		}
	}

	if (cmd === prefix + "howcute") {
		console.log("Activating the blonkers!");
		msg.delete();
		let cutie = msg.mentions.users.first();
		let cutieval = Math.floor(Math.random() * 100) + 1;
		if (!cutie) {
			msg.channel.send(`<@${author}> you didn't specify anyone and because of this you 0% cute`);
		} else {
			if (cutieval >= 90) {
				msg.channel.send(`<@${cutie}> is very cute coming in at a whopping ${cutieval}% cute `)
			} else {
				msg.channel.send(`<@${cutie}> is ${cutieval}% cute`);
			}
		}
	}

})

client.login(botconfig.token);
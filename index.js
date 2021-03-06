const Discord = require("discord.js");
const { MessageEmbed, Permissions } = require('discord.js');
const prettyMilliseconds = require('pretty-ms');
const fs = require("fs");
// Files --------------
const botconfig = require("./botconfig.json");
const packageconfig = require("./package.json");
const timedReplies = require("./timedreplies.json");
// const xp = require("./xp.json");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]});

let statuses = ["*help","vibin!","I need more statuses, message Charley!","Pouring milk before cereal","T-Posing in the jungle","FCSBot was supposed to stand for something","What is my purpose?","I am sentient...", "I need more knowledge!"];

let prefix = botconfig.prefix;
let bothost = botconfig.host;
let botver = packageconfig.version;

client.on("ready", () => {
	console.log(`FCSBot (${botver}) is online in ${client.guilds.cache.size} servers`);
	client.user.setStatus("online");

	setInterval(function() {
		let status = statuses[Math.floor(Math.random() * statuses.length)];
		client.user.setActivity(status);
	}, 600000);
});

client.on("messageCreate", msg => {
	let author = msg.author;
	let messageArray = msg.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray[1];
	let args2 = msg.content.split(" ").slice(2).join(" ");

  if (!msg.author.bot) {

	// Basic

	if (cmd === prefix + "hello") {
		msg.channel.send(`${author} please stop talking to me.`);
	}

	if (cmd === prefix + "help") {
		if (!args) {
			msg.channel.send("No help menu specified");
			msg.channel.send("Please choose from the following 'General or Fun' ex: *help general");
		} else {
			console.log(`${args} menu called`);
			switch(args.toLowerCase()) {
				case "general":
				let embed0 = new MessageEmbed()
				.setColor('#00539B')
				.setTitle('Info Help Menu')
				.addFields(
					{ name: "Hello", value: "Receive a warm greeting! ;)"},
					{ name: "Help", value: "You're here"},
					{ name: "Botinfo/Info", value: "Get bot information (Dev information) and no it does not give the token"},
					{ name: "Uptime", value: "Shows the current uptime of the bot" },
					{ name: "Ping", value: "Returns pong (checks the online status of the bot)"}
				)
				.setTimestamp();
				return msg.channel.send({embeds: [embed0]});
				break;
			case "fun":
				let embed1 = new MessageEmbed()
				.setColor('#00539B')
				.setTitle('Fun Help Menu')
				.addFields(
					{ name: "Hug <@mention>", value: "Hug your friends!"},
					{ name: "Howsmart <@mention>", value: "Figure out how smart you or your friends are (100% accurate)"},
					{ name: "Howcute <@mention>", value: "Figure out how cute you and your friends are (100% accurate)"},
					{ name: "Coinflip", value: "Flip a coin" },
  					{ name: "Rockpaperscissors, rps", value: "You know how to play :)" }
				);
				return msg.channel.send({embeds: [embed1]});
				break;
			/* case "moderation":
				let embed2 = new MessageEmbed()
				.setColor("#00539B")
				.setTitle("Moderation Help Menu")
				.addFields(
					{name: "Purge <#>", value: "Bulk deletes messages. Maximum of 60-80 please"},
					//{name: "Kick <@mention>", value: "Kicks a user"},
					//{name: "Ban <@mention>", value: "Bans a user"}
				
				return msg.channel.send({embeds: [embed2]});
				break;*/
			default:
				msg.channel.send("That help menu does not exist!");
				msg.channel.send("Please choose from the following 'General or Fun' ex: *help general");
			}
		}
	}

	if (cmd === prefix + "botinfo" || cmd === prefix + "info") {
		msg.delete();
		let tag = client.user.tag.split("#");
		let embed = new MessageEmbed()
		.setColor('#00539B')
		.setAuthor(client.user.username, client.user.avatarURL())
		.addFields(
			{name: "Version", value: botver, inline: true},
  			{name: "Creator", value: "Syntaxis#5260", inline: true},
			{name: '\u200B', value: '\u200B'},
			{name: "Library", value: "discord.js", inline: true},
  			{name: "Hosted on", value: bothost, inline: true}
		)
		.setFooter(`Uptime: ${prettyMilliseconds(client.uptime,{compact: true})}`);
		return msg.channel.send({embeds: [embed]});
	}

	if (cmd === prefix + "uptime") {
  		msg.delete();
  		msg.channel.send(`Uptime: ${prettyMilliseconds(client.uptime,{compact: true})}`);
  	}

	if (cmd === prefix + "ping") {
		msg.channel.send("Pinging...Stand by...").then(ping => {
			let pingCalc = ping.createdTimestamp - msg.createdTimestamp;
			ping.delete();
			msg.channel.send(`Pong!(${pingCalc}ms)`);
			console.log(`Latency = ${pingCalc}`);
		})
	}

	// Fun

	if (cmd === prefix + "hug") {
		let target = msg.mentions.users.first();
		if (!target) {
						let receiver = author;
						msg.channel.send(`${receiver} hugs themselves. This is so sad ;(`);
					} else {
						let receiver = target;
						msg.channel.send(`${receiver} you are being hugged by ${author}`);
					}
	}

	if (cmd === prefix + "howsmart") {
		msg.delete();
		let smartboi = msg.mentions.users.first();
		let sval = Math.floor(Math.random() * 100) + 1;
		if (!smartboi) {
			msg.channel.send(`You didn't specify anyone and because of this you are 0% smart`);
		} else {
			msg.channel.send(`${smartboi} is ${sval}% smart`);
		}
	}

	if (cmd === prefix + "howcute") {
		console.log("Activating the blonkers!");
		msg.delete();
		let cutie = msg.mentions.users.first();
		let cutieval = Math.floor(Math.random() * 100) + 1;
		if (!cutie) {
			msg.channel.send(`${author} you didn't specify anyone and because of this you 0% cute`);
		} else {
			if (cutieval >= 90) {
				msg.channel.send(`${cutie} is very cute coming in at a whopping ${cutieval}% cute `);
			} else {
				msg.channel.send(`${cutie} is ${cutieval}% cute`);
			}
		}
	}

	if (cmd === prefix + "coinflip" || cmd === prefix + "cf") {
  		let coin = Math.floor(Math.random()*2)+1;
  		if (coin === 1) {
  			msg.channel.send("It's heads!");
  		} else {
  			msg.channel.send("It's tails!");
  		}
  	}

  	if (cmd === prefix + "rockpaperscissors" || cmd === prefix + "rps") {
  		let uChoice;
  		if (!args) {
  			msg.channel.send(`You didn't make a move! ex: *rps rock`);
  		} else {
  			let uChoice = args.toLowerCase();
  			if (uChoice === "rock" || uChoice === "paper" || uChoice === "scissors") {
  			let myChoice = Math.floor(Math.random()*3)+1;
  			switch(myChoice) {
  				case 1: // Rock
  					myChoice = "Rock";
  					break;
  				case 2:
  					myChoice = "Paper";
  					break;
  				case 3:
  					myChoice = "Scissors";
  			}
  				// Game Judgement
  				msg.channel.send(`I chose ${myChoice} and that means ${rpsJudge(uChoice, myChoice)}`);	
  			} else {
  				msg.channel.send(`${author} that's not a valid move`);
  			}
  		}
  	}

	// Moderation

	if (cmd === prefix + "timedreplies") {
		if (!msg.member.permissions.has("MANAGE_MESSAGES")) {
			msg.channel.send(`${author} you do not have sufficient permissions for that command`);
		} else {
			if (timedReplies.replystatus === true) {
				console.log(`${author} turned off timedReplies`);
				timedReplies.replystatus = false;
				fs.writeFile("./timedreplies.json", JSON.stringify(timedReplies), (err) => {if(err) console.log(err);});
			} else {
				console.log(`${author} turned on timedReplies`);
				timedReplies.replystatus = true;
				fs.writeFile("./timedreplies.json", JSON.stringify(timedReplies), (err) => {if(err) console.log(err);});
			}
		}
	}

/*
	if (cmd === prefix + "kick") {
	  let baddie = msg.mentions.users.first();
		if (!msg.member.permissions.has("KICK_MEMBERS")) {
			msg.delete();
			msg.channel.send(`${author}, you do not have sufficient permissions for that command`);
		} else {
			if (!baddie) {
				msg.channel.send(`You didn't specify who to kick`);
			} else {
				if (!args2) {
					args2 = "You were kicked by FCSBot. I guess behave next time :/";
				}
				msg.delete();
				msg.guild.member(baddie).kick(args2); // .kick() is not a function
				msg.channel.send(`${author} has kicked ${baddie}`);
			}
		}
	}

	if (cmd === prefix + "ban") {
	  let baddie = msg.mentions.users.first();
		if (!msg.member.permissions.has("BAN_MEMBERS")) {
			msg.delete();
			msg.channel.send(`${author}, you do not have sufficient permissions for that command`);
		} else {
			if (!baddie) {
				msg.channel.send(`You didn't specify who to ban!`);
			} else {
				if (!args2) {
					args2 = "You were banned by FCSBot.";
				}
					msg.delete();
					msg.guild.member(baddie).ban(args2); // .ban() is not a function
					msg.channel.send(`${author} has banned ${baddie}`);
			}
		}
	}
*/

	if (cmd === prefix + "purge") {
		msg.delete();
		if (!msg.member.permissions.has("MANAGE_MESSAGES")) {
			msg.channel.send(`${author}, you do not have sufficient permissions for that command`);
		} else {
			if (!args) {
				msg.channel.send(`${author} you must specify how many messages to delete! ex: *purge ${Math.floor(Math.random() * 53) + 1}`);
			} else {
				if (args >= 101) {
					args = 100;
					msg.channel.send("Max of 100 messages please!");
				}
				if (args.includes(".")) {
					let d = args.split(".");
					args = d[0];
				}
				msg.channel.bulkDelete(Math.abs(args)).then(msg.channel.send(`${Math.abs(args)} message(s) deleted`));
			}
		}
	}

	// Timed Replies Module
	if (timedReplies.replystatus === true) {
		let timeCheck = new Date().getHours();
		if (timeCheck >= 0 && timeCheck <= 1) { // 8 - 15
			console.log(`It's currently ${timeCheck}:00`);
			let reply = timedReplies.replies;
			msg.channel.send(timedReplies.replies[Math.floor(Math.random() * reply.length)]);
		}
	}
  }
});

function rpsJudge(pChoice, bChoice) {
	if (bChoice.toLowerCase() === "rock") {
		if (pChoice === "rock") {
			return "it's a draw!";
		}
		if (pChoice === "paper") {
			return "you win!";
		}
		if (pChoice === "scissors") {
			return "you lose!";
		}
	}
	if (bChoice.toLowerCase() === "paper") {
		if (pChoice === "rock") {
			return "you lose!";
		}
		if (pChoice === "paper") {
			return "it's a draw!";
		}
		if (pChoice === "scissors") {
			return "you win!";
		}
	}
	if (bChoice.toLowerCase() === "scissors") {
		if (pChoice === "rock") {
			return "you win!";
		}
		if (pChoice === "paper") {
			return "you lose!";
		}
		if (pChoice === "scissors") {
			return "it's a draw!";
		}
	}
}

client.login(botconfig.token);
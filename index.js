const Discord = require("discord.js");
const { MessageEmbed, Permissions } = require('discord.js');
const fs = require("fs");
// Files --------------
const botconfig = require("./botconfig.json");
const packageconfig = require("./package.json");
const timedReplies = require("./timedreplies.json");
// const xp = require("./xp.json");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"]});

let statuses = ["*help", "vibin!", "I need more statuses, message Charley!", "Pouring milk before cereal", "T-Posing in the jungle", "FCSBot was supposed to stand for something."];

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
				.setTitle('General Help Menu')
				.addFields(
					{ name: "Hello", value: "Receive a warm greeting! ;)"},
					{ name: "Help", value: "You're here"},
					{ name: "Botinfo", value: "Get bot information (Dev information) and no it does not give the token"},
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
					{ name: "Howcute <@mention>", value: "Figure out how cute you and your friends are (100% accurate)"}
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

	if (cmd === prefix + "botinfo") {
		msg.delete();
		let embed = new MessageEmbed()
		.setColor('#00539B')
		.setTitle('General Help Menu')
		.addFields(
			{ name: "Bot Name", value: client.user.username},
			{ name: "Bot Tag", value: client.user.tag},
			{ name: "Version", value: botver},
			{ name: "Hosted On", value: bothost}
		)
		.setTimestamp();
		return msg.channel.send({embeds: [embed]});
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

	// Moderation

	if (cmd === prefix + "timedreplies") {
		if (timedReplies.replystatus = true) {
			console.log("Timed replies set to off");
			timedReplies.replystatus = false;
		} else {
			console.log("Timed replies set to on");
			timedReplies.replystatus = true;
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
		if (!msg.member.permissions.has("MANAGE_MESSAGES")) {
			msg.delete();
			msg.channel.send(`${author}, you do not have sufficient permissions for that command`);
		} else {
			msg.channel.bulkDelete(args).then(msg.channel.send(`${args} message(s) deleted`));
		}
	}

	// Unnamed timed module
	let timeCheck = new Date().getHours();
		if (timedReplies.replystatus === true) {
			if (timeCheck >= 15 && timeCheck <= 16) { // 8 - 15
				console.log(`It's currently ${timeCheck}:00`);
				msg.delete();
				let reply = timedReplies.replies;
				msg.channel.send(timedReplies.replies[Math.floor(Math.random() * reply.length)]);
			}
		}
  }
});

client.login(botconfig.token);
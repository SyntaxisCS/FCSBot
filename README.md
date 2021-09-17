# FCSBot

Discord Bot Project for coding class in school

## Description

A Discord.js Bot created for my school's coding class. Commands are being made for learning purposes rather than productivity or function.

## Getting Started

### Dependencies

* Node.js v16
* Discord.js v13

### Installing

* Download the latest release (seen on the right side)
    (Optional) Download the main branch for a less stable version
* Extract node_modules
* Insure Node.js is updated to v16
* Make your own bot token and put it in the botconfig.json under the token line

### Executing program

* Open command line application in app's folder (/FCSBot)
* Run the command line below

```
node index.js
```

## Help

If you experience any issues please open an issue

## Authors

* Charles Stello

## Version History

### 0.1.2

Added timedReplies module during school moderation

Added profile picture for bot

Added the ability for the bot to ignore its own messages

Added 3 new replies to the reply manager

Implemented permissions for moderation command

Added timed replies command

Added error handling to purge command (enforces a maximum of 100 messages to avoid discord.js related crashes)

### 0.1.1

Changed presence back to activity
Changed status carousel from 1 minute to 10 minutes

Started the beginning of the moderation framework:
- Added  basic moderation help menu (noted)
- Added basic moderation framework (noted)

### 0.1.0

Updated to Discord.js v13
Updated Login credentials for newly inforced intents
Fixed many depreciated methods:

- Presence (Originally Activity)
- Embeds

Reworked Embeds to support v13
Added Purge command

### 0.0.1

Initial Release

## License

This project is licensed under the GNU AGPLv3 License

## Acknowledgments

* [Node.js](https://nodejs.org/)
* [Discord.js](https://discord.js.org/)

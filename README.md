# Activity_Tracker# Activity Tracker
[![Downloads](https://img.shields.io/github/downloads/LEGENDARY-KING/Activity_Tracker/total.svg)](https://github.com/LEGENDARY-KING/Activity_Tracker/releases/latest) [![Stars](https://img.shields.io/github/stars/jagrosh/LEGENDARY-KING/Activity_Tracker.svg)](https://github.com/LEGENDARY-KING/Activity_Tracker/stargazers) [![Release](https://img.shields.io/github/release/jagrosh/LEGENDARY-KING/Activity_Tracker.svg)](https://github.com/LEGENDARY-KING/Activity_Tracker/releases/latest) [![License](https://img.shields.io/github/license/LEGENDARY-KING/Activity_Tracker.svg)](https://github.com/LEGENDARY-KING/Activity_Tracker/blob/master/LICENSE) [![Discord](https://ptb.discord.com/api/guilds/729630070276096050/widget.png)](https://discord.gg/9e8UKUc)

# Why did i make this
My friend was addicted to Genshin Impact. They wanted me to help them not play so much. I suggested the use of a tracker and reminder to make them self conscience and guilty to stop playing

# Example
WIP

### Requirements
1) Node Version >16.6
2) Discord.js Version 13

## **How To  Install**

### Step 1) Installing Dependencies 
```
npm install
```
### Step 2) Configuration
Change `config.example.json` file to `config.json`
Edit the contents as following
1) `token`: Add the bot token after creating an application from [here](https://discord.com/developers/applications) and creating a bot account
2) `owner`: Add your discord ID [Find from here](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID)
3) `prefix`: Prefix, the thing u want to add before commands(Only ownerOnly commands for now)
4) `presence_id`: Get the presence application ID of the application you want to track([Find using this](https://discord.js.org/#/docs/main/stable/class/Activity?scrollTo=applicationId) Or alternatively you can use the `!applicationID` owner only command and it will give you the application ID for the current activity you have)
5) `guild`: Guild ID of the server where u want the slash commands to update instantly

### Step 3)
Confirm your node version is >16.6 with 
```
node -v
```
Run the bot using
```
node server.js 
```
You can use a process manager like [pm2](https://pm2.keymetrics.io/) or [forever](https://www.npmjs.com/package/forever) for making sure it runs on restart and stuff



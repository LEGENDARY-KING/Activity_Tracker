# Activity Tracker

[![Downloads](https://img.shields.io/github/downloads/LEGENDARY-KING/Activity_Tracker/total.svg)](https://github.com/LEGENDARY-KING/Activity_Tracker/releases/latest) [![Stars](https://img.shields.io/github/stars/jagrosh/LEGENDARY-KING/Activity_Tracker.svg)](https://github.com/LEGENDARY-KING/Activity_Tracker/stargazers) [![Release](https://img.shields.io/github/release/jagrosh/LEGENDARY-KING/Activity_Tracker.svg)](https://github.com/LEGENDARY-KING/Activity_Tracker/releases/latest) [![License](https://img.shields.io/github/license/LEGENDARY-KING/Activity_Tracker.svg)](https://github.com/LEGENDARY-KING/Activity_Tracker/blob/master/LICENSE) [![Discord](https://ptb.discord.com/api/guilds/729630070276096050/widget.png)](https://discord.gg/9e8UKUc)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Overview
The Activity Tracker is a bot that tracks your presence in Discord and provides statistics accordingly. It can be used to track your daily playing time, among other things. The bot was made in Discord.js using Node.js.

## Features
- Tracks presence in Discord and provides statistics accordingly
- Useful for tracking daily playing time
- Built with Discord.js and Node.js

## Requirements
- Node.js version 16.6 or higher
- Discord.js version 13

## Installation
To install the Activity Tracker, follow these steps:

1. Clone the repository to your local machine using `git clone https://github.com/LEGENDARY-KING/Activity_Tracker.git`
2. Install the required dependencies by running `npm install`

## Configuration
To configure the bot, follow these steps:

1. Rename the `config.example.json` file to `config.json`
2. Edit the contents of the `config.json` file as follows:
   - `token`: Add the bot token after creating an application from [here](https://discord.com/developers/applications) and creating a bot account
   - `owner`: Add your Discord ID [Find from here](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID)
   - `prefix`: Prefix, the thing you want to add before commands (only owner-only commands for now)
   - `presence_id`: Get the presence application ID of the application you want to track ([find using this](https://discord.js.org/#/docs/main/stable/class/Activity?scrollTo=applicationId) or alternatively you can use the `!applicationID` owner-only command and it will give you the application ID for the current activity you have)
   - `guild`: Guild ID of the server where you want the slash commands to update instantly

## Usage
To use the bot, follow these steps:

1. Confirm that your Node.js version is 16.6 or higher by running `node -v`
2. Run the bot using `node server.js`
     - You can use a process manager like [pm2](https://pm2.keymetrics.io/) or [forever](https://www.npmjs.com/package/forever) to ensure that your server continues running even after logging out from your SSH session. 

## Contributing

Contributions are always welcome, whether it's finding and fixing bugs, adding new features, or improving documentation. To contribute, follow these steps:

1. Fork this repository.
2. Create a new branch: `git checkout -b my-new-branch`
3. Make changes and commit them: `git commit -am 'Add some feature'`
4. Push your changes to your fork: `git push origin my-new-branch`
5. Submit a pull request to this repository.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](https://github.com/LEGENDARY-KING/Activity_Tracker/blob/main/LICENSE) file for details.

## Author

- [LEGENDARY KING](https://github.com/LEGENDARY-KING) - Author

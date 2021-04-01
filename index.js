// const { default: axios } = require('axios');
// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
//         .then((response) => {
//             res.json(response.data);
//         });
// })

// app.listen(port, () => console.log(`App listening on port ${port}`));

require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./command');

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

bot.on('message', msg => {
    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
    console.info(`Called command: ${command}`);

    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.reply('there was an error trying to execute that command!');
    }
});
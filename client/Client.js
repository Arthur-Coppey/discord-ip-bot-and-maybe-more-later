const fs = require("fs");
const { Client, Collection } = require('discord.js');

module.exports = class extends Client {
    constructor(config) {
        super(
            {
                disabledEvents: ['TYPING_START'],
            }
        );

        this.config = config;

        this.initCommands();

        this.initEvents();
    }

    initCommands = () => {
        this.commands = new Collection();
        const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

        for (let file of commandFiles) {
            const command = require(`../commands/${file}`);
            this.commands.set(command.name, command);
        }
    }

    initEvents = () => {
        this.on('ready', () => {
            console.log('Ready!');
        });

        this.on('reconnecting', () => {
            console.log('Reconnecting!');
        });

        this.on('disconnect', () => {
            console.log('Disconnect!');
        });

        this.on('message', async (message) => {
            const args = message.content.slice(this.config.prefix.length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = this.commands.get(commandName);

            if (message.author.bot) return;
            if (!message.content.startsWith(this.config.prefix)) return;

            try {
                command.execute(message);
            } catch (error) {
                console.error(error);
                await message.reply('There was an error trying to execute that command!');
            }
        });
    }

    loginDefault() {
        return super.login(this.config.token);
    }
};
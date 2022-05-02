const Discord = require('v11-discord.js');
require('dotenv').config();

const bot = new Discord.Client({
    disableEveryone: true,
    sync: true,
    messageCacheLifetime: 3600,
    ws: {
        compress: true        
    }
}); 

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async message => {
    // If the message author is the bot, ignore it.
    if(message.author.id === bot.user.id) return;

    if (message.content.startsWith(process.env.PREFIX)) {
        // command handler    
        let args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
        let args2 = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        try {
            let commandFile = require(`./cmds/${command}.js`);
            commandFile.run(bot, message, args);
        } catch (e) {
        }
    }
});

bot.login(process.env.TOKEN);
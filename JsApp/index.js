require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Bot ready event
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Message handler
client.on('messageCreate', message => {
  // Prevent bot responding to itself
  if (message.author.bot) return;

  // Basic ping command
  if (message.content.toLowerCase() === '!ping') {
    message.reply('Pong! 🏓');
  }

  // Admin test command
  if (message.content.toLowerCase() === '!admin') {
    if (message.member.permissions.has('ADMINISTRATOR')) {
      message.channel.send('You have admin permissions! ⭐');
    } else {
      message.channel.send('❌ You lack admin permissions!');
    }
  }
});

// Error handling
client.on('error', error => {
  console.error('Discord client error:', error);
});

// Start bot
client.login(process.env.DISCORD_TOKEN);
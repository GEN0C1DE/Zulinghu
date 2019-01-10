// Coded by Pharaoh#6666 | Christopher H.

const Name = "TFN Bot"; // The Name of the Bot, will be used in various things.
const Version = "0.0.1 WIP"; // The Version of the Bot, will be used in various things.
const Discord = require('discord.js'); // The Bots Library used to Require the Bot.
const Commando = require('discord.js-commando'); // The Bots Command Library used for Command Use.
const Status = 'The Frosty Nation Mane.'; // The Bots Status for the Playing or Streaming.
const Testing = false; // This is for the Maintenance of the Bot, wont be enabled unless working on something.

// Getting Bot Setup.
global.Bot = new Commando.Client({
    commandPrefix: 'tfn!'
})


// Getting Bot Global Functions.
Bot.on("guildCreate", Guild => {
    console.log(`New guild joined: ${Guild.name} (id: ${Guild.id}). This guild has ${Guild.memberCount} members!`);
    if (Testing === false) Bot.user.setActivity(`${Status}`, { type: "STREAMING" })
});
Bot.on("guildDelete", Guild => {
    console.log(`I have been removed from: ${Guild.name} (id: ${Guild.id})`);
    if (Testing === false) Bot.user.setActivity(`${Status}`, { type: "STREAMING" })
});

Bot.on("ready", function () {
    console.log(`${Name}: Loaded and is ready for Usage. Online at ${Bot.guilds.size}`);
    if (Testing === false) Bot.user.setActivity(`${Status}`, { type: "STREAMING" })
    if (Testing === true) {
        Bot.user.setStatus("idle");
        Bot.user.setActivity("Maintenance Mode On, Will Be Back Soon.")
    }    
});


// Bot Login Process
Bot.login(process.env.BOT_TOKEN)

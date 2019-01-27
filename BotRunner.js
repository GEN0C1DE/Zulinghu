// Coded by Pharaoh#6666 | Christopher H.

const Name = "Sector Bot"; // The Name of the Bot, will be used in various things.
const Version = "0.0.1 WIP"; // The Version of the Bot, will be used in various things.
const Discord = require('discord.js'); // The Bots Library used to Require the Bot.
const Commando = require('discord.js-commando'); // The Bots Command Library used for Command Use.
const Timeout = require('foreach-timeout')

const Prefix = `s!`
const Status = `${Prefix}help | Sector Community Bot Incoming. ${Version}`; // The Bots Status for the Playing or Streaming.
const Testing = false; // This is for the Maintenance of the Bot, wont be enabled unless working on something.

const Colors = ["020202", "6e00ff"]
const Stop = [ ]

// Getting Bot Setup.
global.Bot = new Commando.Client({
    commandPrefix: Prefix
})

async function Color() {
    Timeout(Colors, (Color) => {
        Bot.guilds.forEach((guild) => {
            if (!Stop.includes(guild.id)) {
                let role = guild.roles.find('name', 'Certified Customary');
                if (role && role.editable)
                    role.setColor(Color);
            }
        })
    }, 1500).then(Color);
}

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
        return
    }    
    Color()
});


// Bot Login Process
Bot.login(process.env.BOT_TOKEN)

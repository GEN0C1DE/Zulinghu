// Coded by Pharaoh#6666 | Christopher H.

const Name = "Sector Bot"; // The Name of the Bot, will be used in various things.
const Version = "0.1.2 WIP"; // The Version of the Bot, will be used in various things.
const Discord = require('discord.js'); // The Bots Library used to Require the Bot.
const Commando = require('discord.js-commando'); // The Bots Command Library used for Command Use.
const Timeout = require('foreach-timeout')

const Prefix = `s!`
const Status = `${Prefix}help | Sector Community Bot. :) ${Version}`; // The Bots Status for the Playing or Streaming.
const Testing = false; // This is for the Maintenance of the Bot, wont be enabled unless working on something.

const Rainbow = ["FF0D00", "FF2800", "FF3D00", "FF4F00", "FF5F00", "FF6C00", "FF7800", "FF8300", "FF8C00", "FF9500", "FF9E00", "FFA500", "FFAD00", "FFB400", "FFBB00", "FFC200", "FFC900", "FFCF00", "FFD600", "FFDD00", "FFE400", "FFEB00", "FFF200", "FFFA00", "F7FE00", "E5FB00", "D5F800", "C6F500", "B7F200", "A8F000", "98ED00", "87EA00", "74E600", "5DE100", "41DB00", "1DD300", "00C618", "00BB3F", "00B358", "00AC6B", "00A67C", "009E8E", "028E9B", "06799F", "0969A2", "0C5DA5", "0E51A7", "1047A9", "133CAC", "1531AE", "1924B1", "1F1AB2", "2A17B1", "3415B0", "3C13AF", "4512AE", "4E10AE", "560EAD", "600CAC", "6A0AAB", "7608AA", "8506A9", "9702A7", "AD009F", "BC008D", "C7007D", "D0006E", "D8005F", "DF004F", "E7003E", "EF002A", "F80012"];
const Stop = [ ]

// Getting Bot Setup.
global.Bot = new Commando.Client({
    commandPrefix: Prefix
})

let Count = 0

async function Color() {
    Timeout(Rainbow, (Color) => {
        Bot.guilds.forEach((guild) => {
            if (!Stop.includes(guild.id)) {
                let role = guild.roles.find('name', 'Certified Customary');
                if (role && role.editable)
                    role.setColor(Color);
            }
        })
    }, 1000).then(Color);
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
/*Bot.on("message", Message => {
 
})*/
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

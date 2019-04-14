// Coded by Pharaoh#6666 | Christopher H.

const Name = "Zulinghu"; // The Name of the Bot, will be used in various things.
const Version = "0.1.2 WIP"; // The Version of the Bot, will be used in various things.
const Status = `Zulinghu Partner Update Coming Soon!`; // The Bots Status for the Playing or Streaming.
const Testing = false; // This is for the Maintenance of the Bot, wont be enabled unless working on something.

const Discord = require('discord.js'); // The Bots Library used to Require the Bot.
const Mongoose = require('mongoose'); // The Bots Database Connection
const Timeout = require('foreach-timeout') // The Bots Timeout Function

const Bot = new Discord.Client()

const Connection = `mongodb://${process.env.MonUSERTOKEN}:${process.env.MonPASSTOKEN}@ds024748.mlab.com:24748/lyaboo_server`
const Login = process.env.BOT_TOKEN
const XPNDLVL = require(__dirname + "/structs/Schemas/levelSchema.js"),

// Getting Rainbow Settings.
let Rainbow = ["FF0D00", "FF2800", "FF3D00", "FF4F00", "FF5F00", "FF6C00", "FF7800", "FF8300", "FF8C00", "FF9500", "FF9E00", "FFA500", "FFAD00", "FFB400", "FFBB00", "FFC200", "FFC900", "FFCF00", "FFD600", "FFDD00", "FFE400", "FFEB00", "FFF200", "FFFA00", "F7FE00", "E5FB00", "D5F800", "C6F500", "B7F200", "A8F000", "98ED00", "87EA00", "74E600", "5DE100", "41DB00", "1DD300", "00C618", "00BB3F", "00B358", "00AC6B", "00A67C", "009E8E", "028E9B", "06799F", "0969A2", "0C5DA5", "0E51A7", "1047A9", "133CAC", "1531AE", "1924B1", "1F1AB2", "2A17B1", "3415B0", "3C13AF", "4512AE", "4E10AE", "560EAD", "600CAC", "6A0AAB", "7608AA", "8506A9", "9702A7", "AD009F", "BC008D", "C7007D", "D0006E", "D8005F", "DF004F", "E7003E", "EF002A", "F80012"];
let Count = 0

async function Color() {
    Timeout(Rainbow, (Color) => {
        Bot.guilds.forEach((guild) => {
            let role = guild.roles.find('name', 'Certified Customary');
            if (role && role.editable)
            role.setColor(Rainbow[Count]);
        })
        Count = Count + 1
    }, 1500).then(Color);
}

// Opening Connections
Mongoose.connect(Connection, {useNewUrlParser: true }).catch(Error => console.error(Error))

// Global Functions
Bot.on("message", Message => {
	if (Message.author.bot) return;
	if (Message.channel.id === "529819167017402398"){
		let PartnerRole = Message.guild.roles.find("name", "🔱 Partner Managers 🔱
		if (Message.member.roles.has(PartnerRole) || Message.member.hasPermission("ADMINISTRATOR")){
			if (Message.content.includes('discord.gg/'||'discordapp.com/invite/')) {
				XPNDLVL.findOne({
					UserId: Message.author.id
				}, (Error, Results) => {
					let NewXP = Math.floor(Math.random() * 7) + 8 + 85;
					let NewMoney = 200 + (Math.random() * 5 * 2) 
					if (!Results) {
						let Level = new Settings.Schemas.Level({
							UserId: Message.author.id,
							LevelNumber: 1,
							XPNumber: NewXP,
							MoneyNumber: NewMoney
						})
						Level.save().then(Results => console.log(Results)).catch(Error => console.log(Error))
					} else {
						let CurrentLevel = Results.LevelNumber;
						let CurrentXP = Results.XPNumber;
						let CurrentMoney = Results.MoneyNumber;
						let NextLevel = Results.LevelNumber * 300;
								
						Results.XPNumber = CurrentXP + NewXP;
						Results.MoneyNumber = CurrentMoney + NewMoney;
						
						if(NextLevel <= Results.XPNumber){
							Results.LevelNumber = Results.LevelNumber + 1;
							let NewLevel = Results.LevelNumber
							let Embed = new Depends.Discord.RichEmbed()
							.setColor("6e00ff")
							.setTitle("Congratulations!")
							.setDescription(`You have leveled up to Level ${NewLevel}`);
							Message.channel.send(`${Message.author}`, Embed).then(MSG => MSG.delete(10000)) 
							Results.XPNumber = 0
						
							Settings.Schemas.Role.findOne({
								ServerID: Message.guild.id
							}, (Error, Results) => {
								if(Error) console.error(Error);
								if (!Results) return;
								let Roles = Results.Roles
								Roles.forEach((array) => {
									let LvlNum = array[0]
									let RoleID = array[1]
									let ARole = Message.guild.roles.get(RoleID)
									
									if(!ARole) return;
									if(!LvlNum) return;
									
									if(Number(LvlNum) <= NewLevel){
										Message.member.addRole(ARole);
									}	
								})
							})
						}
						Results.save().catch(Error => console.log(Error))
					}
					return Bot.channels.get("521782616563646467").send(`${Message.author} **You are awarded ${NewMoney} Lyasuno's and ${NewXP} XP for Partnering!**`)
				}) 
			}	  
		}
	}
})
Bot.on("ready", function () {
    console.log(`${Name}: Loaded and is ready for Usage. Online at ${Bot
    if (Testing === true) {.guilds.size}`);
    if (Testing === false) {
		Bot.user.setActivity(`${Status}`, { type: "STREAMING" })
        Bot.user.setStatus("idle");
        Bot.user.setActivity("Maintenance Mode On, Will Be Back Soon.")
        return
    }    
    Color()
});


// Bot Login Process
Bot.login(Login)

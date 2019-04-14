// Coded by Pharaoh#6666 | Christopher H.

const Name = "Zulinghu"; // The Name of the Bot, will be used in various things.
const Version = "0.1.2 WIP"; // The Version of the Bot, will be used in various things.
const Status = `=info | Zulinghu Rewards System!`; // The Bots Status for the Playing or Streaming.
const Testing = false; // This is for the Maintenance of the Bot, wont be enabled unless working on something.

const Discord = require('discord.js'); // The Bots Library used to Require the Bot.
const Mongoose = require('mongoose'); // The Bots Database Connection
const Timeout = require('foreach-timeout'); // The Bots Timeout Function

const Bot = new Discord.Client();

const Connection = `mongodb://${process.env.MonUSERTOKEN}:${process.env.MonPASSTOKEN}@ds024748.mlab.com:24748/lyaboo_server`
const Login = process.env.BOT_TOKEN;
const XPNDLVL = require(__dirname + "/structs/Schemas/levelSchema.js");
const MONROLES = require(__dirname + "/structs/Schemas/roleSchema.js");

let Place = 0;
let Size = 12;
const Servers = ["521782616563646465"];
const Rainbow = new Array(Size);


for (var i=0; i<Size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

  Rainbow[i] = '#'+ red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / Size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? '0'+hex : hex;
}

function changeColor() {
  for (let index = 0; index < Servers.length; ++index) {		
    Bot.guilds.get(Servers[index]).roles.find('name', "Certified Customary").setColor(Rainbow[Place])
		.catch(console.error);
	
    if(Place == (Size - 1)){
      Place = 0;
    }else{
      Place++;
    }
  }
}

// Opening Connections
Mongoose.connect(Connection, {useNewUrlParser: true }).catch(Error => console.error(Error))

// Global Functions
Bot.on("message", Message => {
	if (Message.author.bot) return;
	if (Message.channel.id === "529819167017402398"){
		console.log("Is Channel")
	if (Message.member.roles.find(r => r.name === "🔱 Partner Managers 🔱") || Message.member.hasPermission("ADMINISTRATOR")){
			console.log("Is Partner Manager")
			if (Message.content.includes('discord.gg/') || Message.content.includes('discordapp.com/invite/')) {
				console.log("Invite Found")
				XPNDLVL.findOne({
					UserId: Message.author.id
				}, (Error, Results) => {
					let NewXP = Math.floor(Math.random() * 7) + 8 + 85 * 2;
					let NewMoney = Math.floor(200 + (Math.random() * 5 * 2))
					if (!Results) {
						let Level = new XPNDLVL({
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
							let Embed = new Discord.RichEmbed()
							.setColor("6e00ff")
							.setTitle("Congratulations!")
							.setDescription(`You have leveled up to Level ${NewLevel}`);
							Message.channel.send(`${Message.author}`, Embed).then(MSG => MSG.delete(10000)) 
							Results.XPNumber = 0
						
							MONROLES.findOne({
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
					Bot.channels.get("521782616563646467").send(`${Message.author} **You are awarded ${NewMoney} Lyasuno's and ${NewXP} XP for Partnering!**`)
				}) 
			}	  
		}
	}
})
Bot.on("ready", function () {
    console.log(`${Name}: Loaded and is ready for Usage. Online at ${Bot.guilds.size}`)
    if (Testing === false) {
		Bot.user.setActivity(`${Status}`, { type: "STREAMING" })
		setInterval(changeColor, 60000);
	};
    if (Testing === true) {
        Bot.user.setStatus("idle");
        Bot.user.setActivity("Maintenance Mode On, Will Be Back Soon.")
        return
    }    
});


// Bot Login Process
Bot.login(Login)

// Coded by Pharaoh#6666 | Christopher H.

const Name = "Zulinghu"; // The Name of the Bot, will be used in various things.
const Version = "0.1.2 WIP"; // The Version of the Bot, will be used in various things.
const Status = `=info | Zulinghu Rewards System!`; // The Bots Status for the Playing or Streaming.
const Testing = true; // This is for the Maintenance of the Bot, wont be enabled unless working on something.

const Discord = require('discord.js'); // The Bots Library used to Require the Bot.
const Mongoose = require('mongoose'); // The Bots Database Connection
const Util = require('util'); // For Tracking Invites

const Bot = new Discord.Client();

const Invites = { }
const Wait = Util.promisify(setTimeout)

const Connection = `mongodb://${process.env.MonUSERTOKEN}:${process.env.MonPASSTOKEN}@ds024748.mlab.com:24748/lyaboo_server`
const Login = process.env.BOT_TOKEN;
const XPNDLVL = require(__dirname + "/structs/Schemas/levelSchema.js");
const MONROLES = require(__dirname + "/structs/Schemas/roleSchema.js");


// Opening Connections
Mongoose.connect(Connection, {useNewUrlParser: true }).catch(Error => console.error(Error))

// Global Functions
Bot.on('guildMemberAdd', Member => {
  Member.guild.fetchInvites().then(guildInvites => {
    const ei = Invites[Member.guild.id];
    Invites[Member.guild.id] = guildInvites;
    
	const Invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const Inviter = Member.guild.members.get(Invite.inviter.id);
    
	if (Inviter.roles.find(r => r.name === "?? Recruitment Team ??") || Inviter.hasPermission("ADMINISTRATOR")){
		XPNDLVL.findOne({
			UserId: Inviter.id
		}, (Error, Results) => {
			let NewXP = Math.floor(Math.random() * 7) + 8 + 85 * 2;
			let NewMoney = Math.floor(200 + (Math.random() * 5 * 2))
			if (!Results) {
				let Level = new XPNDLVL({
					UserId: Inviter.id,
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
					Bot.channels.get("521782616563646467").send(`${Inviter}`, Embed).then(MSG => MSG.delete(10000)) 
					Results.XPNumber = 0
						
					MONROLES.findOne({
						ServerID: Member.guild.id
					}, (Error, Results) => {
						if(Error) console.error(Error);
						if (!Results) return;
							let Roles = Results.Roles
							Roles.forEach((array) => {
								let LvlNum = array[0]
								let RoleID = array[1]
								let ARole = Member.guild.roles.get(RoleID)
									
								if(!ARole) return;
								if(!LvlNum) return;
									
								if(Number(LvlNum) <= NewLevel){
									Inviter.addRole(ARole);
								}	
							})
						})
					}
					Results.save().catch(Error => console.log(Error))
				}
			Bot.channels.get("521782616563646467").send(`${Inviter} **You are awarded ${NewMoney} Lyasuno's and ${NewXP} XP for Inviting ${Member.user.tag}!**`)
		})	
	}
  });
});
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
		
		Wait(1000);

		Bot.guilds.forEach(g => {
			g.fetchInvites().then(guildInvites => {
			  Invites[g.id] = guildInvites;
			});
		});
	};
    if (Testing === true) {
        Bot.user.setStatus("idle");
        Bot.user.setActivity("Maintenance Mode On, Will Be Back Soon.")
        return
    }    
});


// Bot Login Process
Bot.login(Login)

const Mongoose = require('mongoose')

let LevelSchema = new Mongoose.Schema({
	UserId: String,
	LevelNumber: Number,
	XPNumber: Number,
	MoneyNumber: Number
})

module.exports = Mongoose.model("Level", LevelSchema)
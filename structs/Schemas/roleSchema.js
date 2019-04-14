const Mongoose = require("mongoose")

let RoleSchema = new Mongoose.Schema({
	ServerID: String,
	Roles: Array
});

module.exports = Mongoose.model("Roles", RoleSchema)

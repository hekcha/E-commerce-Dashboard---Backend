const mongoose = require("mongoose");



const usersSchema = new mongoose.Schema({

    name:String,

    email:String,

    password: String

})


// creation of collection.so we first made database then collection then it's time to add data.
module.exports = mongoose.model("users",usersSchema)
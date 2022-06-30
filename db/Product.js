const mongoose = require("mongoose");



const usersSchema = new mongoose.Schema({

    name: String,

    price: String,

    category: String,
    userId: String,
    company: String,

})


// creation of collection.so we first made database then collection then it's time to add data.
module.exports = mongoose.model("products", productsSchema)
const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => { 
    await mongoose.connect(`${process.env.mongo}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = {
    connection
}
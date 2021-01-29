const mongoose = require("mongoose")
const Schema = mongoose.Schema

const homes = new Schema({
    id:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true, 

    }, 
    address: {
        type: String,
        required: true
        
    },
    value: {
        type: Number,        
        default: null
    },
    image: {
        type: String,
        default: null

    }
})

module.exports = mongoose.model("homes", homes)
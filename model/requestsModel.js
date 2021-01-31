const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Request = new Schema({   
    renter: {
        type: String,
        default: null
    },  
    address: {
        type: String,
        required: true
        
    },
    description: {
        type: String,
        required: true
    },
    done: {
      type: Boolean,
      default: false
    },    
  
    timestamps: {
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        updatedAt: {
          type: Date,
          default: Date.now(),
        }
      }

    
})

module.exports = mongoose.model("Request", Request)
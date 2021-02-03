const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Messages = new Schema({   
    username: {
        type: String,
        required: true
    },
    msg: {
        type: String, 
        required: true
    },
   from: {
       type: String, 
       required: true
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

module.exports = mongoose.model("Messages", Messages)
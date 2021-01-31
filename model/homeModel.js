const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Homes = new Schema({   
    propertyName: {
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
    renter: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    timestamps: {
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        updatedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    isLeased: {
        startDate: {
            type: Date,
            default: Date.now()
        },
        length: {
            type: String,
            default: '1 year'
        }
    }
})

module.exports = mongoose.model("Homes", Homes)
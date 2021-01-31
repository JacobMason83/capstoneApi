require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const registerRoutes = require('./routes/registration.js')
const loginRoutes = require('./routes/login')
const homeRoutes = require('./routes/homeShowPage')
const profile = require('./routes/profile')
const requestRoutes = require('./routes/requests')
const port = process.env.PORT || 4000;
const app = express();




mongoose.connect(
    process.env.MONGODB_URI,    
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
    err => {
    if(err) {
        console.error("Mongo Connection Error", err)
    } else {
        console.log('Database Connected')
    }
})

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use('/', homeRoutes)
app.use('/', profile)
app.use('/', requestRoutes)
app.use('/', registerRoutes)
app.use('/', loginRoutes)

app.listen(port, ()=> {
    console.log(`server is up on port ${port}`)
});
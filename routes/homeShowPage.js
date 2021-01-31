const express = require("express");
const router = express.Router();
const Homes = require('../model/homeModel')


//get all route for all the homes in the db for showing all landlord propeties
router.get('/allHomes', (req, res) => {
    Homes.find((err, homes) => {
        if(err) {
            res.status(404).json({ message: `${err}`})
        } else {
            res.status(200).json([
                ...homes.map(home => {
                    const {_id, propertyName, address, value, renter,image } = home
                    return {id: _id, propertyName,address,value,renter,image}
                })
            ])
        }
    })
})
// post route to the db for new homes in the db 
router.post('/homes', (req, res)=> {
   const homes = new Homes(req.body)
   homes
    .save()
    .then(homes => {
        const {_id, propertyName, address, value, renter,image} = homes
        res.status(200).json({id: _id, propertyName,address,value,renter,image})
    })
})
// patch route for changing values of property,ie renter, new lease date etc
router.patch('/homes/:id', (req, res) => {
    Homes.findById(req.params.id, {}, {}, (err, home) => {
        if(err) {
            res.status(404).json({ message: "Sorry, try again", errors: `${err}`})
        } else {
            home.propertyName = req.body.propertyName
            home.address = req.body.address
            home.value = req.body.value            
            home.renter = req.body.renter
            home.image = req.body.image
            
            home
            .save()
            .then(home => {
                res.status(200).json({message: "updated, good job you did it", home})
            })
            .catch(err => {
                res.status(400).json({ message: "Cant update it dude", errors: `${err}`})
            })
        }
    })
})
//delete a rental property from the list 
router.delete('/home/:id', (req, res) => {
    Homes.findByIdAndRemove(req.params.id, (err, home) => {
        if(err){
        res.status(404).json({ message: "could not delete", errors: `${err}`})
    } else {
        res.status(200).json({message: `${home} was deleted, i hope you made some money on it`})
    }
    })
})
module.exports = router;
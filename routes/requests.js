const express = require("express");
const router = express.Router();
const Requests = require('../model/requestsModel')


//get all route for all the homes in the db for showing all landlord propeties
router.get('/all-requests', (req, res) => {
    Requests.find((err, requests) => {
        if(err) {
            res.status(404).json({ message: `${err}`})
        } else {
            res.status(200).json([
                ...requests.map(request => {
                    const {_id, renter, address, description, done } = request
                    return {id: _id, renter, address,description,done}
                })
            ])
        }
    })
})
// post route to the db for new homes in the db 
router.post('/requests', (req, res)=> {
   const requests = new Requests(req.body)
   requests
    .save()
    .then(requests => {
        const {_id, renter,address,description,done} = requests
        res.status(200).json({id: _id, renter,address,description,done})
    })
})
// patch route for changing values of property,ie renter, new lease date etc
router.patch('/requests/:id', (req, res) => {
    Requests.findById(req.params.id, {}, {}, (err, request) => {
        if(err) {
            res.status(404).json({ message: "Sorry, try again", errors: `${err}`})
        } else {
            request.done = req.body.done
            
            request
            .save()
            .then(request => {
                res.status(200).json({message: "updated, good job you did it", home})
            })
            .catch(err => {
                res.status(400).json({ message: "Cant update it dude", errors: `${err}`})
            })
        }
    })
})
//delete a rental property from the list 
router.delete('/request/:id', (req, res) => {
    Requests.findByIdAndRemove(req.params.id, (err, request) => {
        if(err){
        res.status(404).json({ message: "could not delete", errors: `${err}`})
    } else {
        res.status(200).json({message: `${request} was deleted, i hope you made some money on it`})
    }
    })
})
module.exports = router;
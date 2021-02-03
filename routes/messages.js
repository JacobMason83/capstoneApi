const express = require("express");
const router = express.Router();

const Messages = require('../model/messageModel')


//get all route for all the messages
router.get('/messages', (req, res) => {
    Messages.find((err, messages) => {
        if(err) {
            res.status(404).json({ message: `${err}`})
        } else {
            res.status(200).json([
                ...messages.map(message => {
                    const {_id, username, msg, from, timestamps} = message
                    return {id: _id, username, msg, from, timestamps}
                })
            ])
        }
    })
})
router.get('/messages/:slug', (req, res) => {
    const slug = req.body.username
    const message =  Messages.find(message => message.username === slug)
    if(message) {
        res.status(200).json([
            ...messages.map(message => {
                const {_id, username, msg, from, timestamps} = message
                return {id: _id, username, msg, from, timestamps}
            })
        ])
    }else {
        res.status(401).json({ message: 'no messages found'})
    }
})


// post route to the db for new messages in the db 
router.post('/message', (req, res)=> {
   const messages = new Messages(req.body)
   messages
    .save()
    .then(messages => {
        const {_id, msg, username, from} = messages
        res.status(200).json({id: _id, msg, username, from})
    })
})
// patch route for changing messages etc
router.patch('/messages/:id', (req, res) => {
    Messages.findById(req.params.id, {}, {}, (err, message) => {
        if(err) {
            res.status(404).json({ message: "Sorry, try again", errors: `${err}`})
        } else {
            message.done = req.body.done
            
            request
            .save()
            .then(message => {
                res.status(200).json({message: "updated, good job you did it", message})
            })
            .catch(err => {
                res.status(400).json({ message: "Cant update it dude", errors: `${err}`})
            })
        }
    })
})
//delete a msg from the list 
router.delete('/deleteMessages/:id', (req, res) => {
    Messages.findByIdAndRemove(req.params.id, (err, message) => {
        if(err){
        res.status(404).json({ message: "could not delete", errors: `${err}`})
    } else {
        res.status(200).json({message: `${message} was deleted, i hope you made some money on it`})
    }
    })
})
module.exports = router;
const express = require("express");
const router = express.Router();
const Users = require("../model/User");
const { jwtauth } = require("../lib/jwtlib");
let _ = require("lodash");

router.get("/users/:id", async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.userId,
    });
    res.status(200).json({
      data: _.pick(user, Users.User.publicReturnable),
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});
// get route for data for users profile 
router.get("/", [jwtauth], async (req, res) => {
  try {
    let user = await models.User.findOne({
      _id: req.user._id,
    });
    res.status(200).json({
      data: _.pick(user, Users.User.returnable),
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});
//put route for user with auth 
router.put("/", [jwtauth], async (req, res) => {
  try {
    let user = await Users.User.findOne({
      _id: req.user._id,
    });
    user = _.merge(user, _.pick(req.body, Users.User.fillable));
    user = await user.save();
    user = _.pick(user, Users.User.returnable);
    res.status(200).json({
      data: _.pick(user, Users.User.returnable),
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

module.exports = router;
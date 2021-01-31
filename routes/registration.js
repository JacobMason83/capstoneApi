const express = require("express");
const router = express.Router();
const Users = require("../model/User");
let _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../config");

router.post("/register", async (req, res) => {
  try {
    let { username, role, password } = req.body;
    let user = new Users();
    user.username = username;
    user.role = role
    user.password = user.generatePasswordHash(password);
    user = await user.save();
    user = _.pick(user, Users.returnable);
    user.token = jwt.sign(
      {
        _id: user._id,
      },
      config.secret,
      {
        expiresIn: "10d",
      }
    );
    res.status(200).json({
      data: 'User Created',
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});

module.exports = router;
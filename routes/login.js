const express = require("express");
const router = express.Router();
let Users = require("../model/User");
let _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("../config");

router.post("/login", async (req, res) => {
  try {
    let user = await Users.findOne({
      username: req.body.username,
    });
    if (user) {
      let isUserAuthenticated = user.validatePassword(
        req.body.password,
        user.password
      );
      if (isUserAuthenticated) {
        user.token = jwt.sign(
          {
            id: user._id,
          },
          config.secret,
          {
            expiresIn: "10d",
          }
        );
        res.status(200).json({
          data: _.pick(user, Users.returnable),
        });
      } else {
        res.status(400).json({
          status: 400,
          message: "Password is incorrect",
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        message: "No account exist",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Some error occured",
      err,
    });
  }
});
router.post('/check-login' , (req, res) => {

  const user = req.body.id
  const token = Users.find(token => user === token)
  if(token){
    res.status(200).json({
      message: 'logged-in',
      token: user
    })
  } else {
    res.status(401).json({ message: "not-logged-in"})
  }
}
)

module.exports = router
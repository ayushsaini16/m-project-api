const express = require("express");
const {
  signup,
  signin,
  userdetails,
  leader,
} = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

userRouter.post("/details", userdetails);

userRouter.post("/leaderboard", leader);

module.exports = userRouter;

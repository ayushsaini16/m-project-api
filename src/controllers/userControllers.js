const userModel = require("../models/user");
const detailsModel = require("../models/userdetails");
const leaderboardModel = require("../models/leaderboard");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "fitsetgo@pp";

const signup = async (req, res) => {
  //   const { username, email, password } = req.body;
  //   Existing user check
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    //hashed password
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    // User Creation
    const result = await userModel.create({
      email: req.body.email,
      password: hashedpassword,
      username: req.body.username,
    });
    // TOken genration
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  //   try {
  //     const existingUser = await userModel.findOne({ email: req.body.email });
  //     if (!existingUser) {
  //       return res.status(400).json({ message: "User not found" });
  //     }

  //     bcrypt.compare(
  //       req.body.passowrd,
  //       existingUser[0].password,
  //       (err, result) => {
  //         if (err) {
  //           return res.status(500).json({ message: "Error" });
  //         }
  //         if (!result) {
  //           return res.status(400).json({ message: "Invalid Credentials" });
  //         }
  //         if (result) {
  //           const token = jwt.sign(
  //             { email: existingUser.email, id: existingUser._id },
  //             SECRET_KEY
  //           );

  //           res.status(201).json({ user: existingUser, token: token });
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     res.status(201).json({
  //       message: "Something went wrong",
  //     });
  //   }
  userModel
    .find({ username: req.body.username })
    .exec()
    .then((users) => {
      if (users.length < 1) {
        res.status(400).json({
          message: "Auth failed",
        });
      } else {
        bcrypt.compare(
          req.body.password,
          users[0].password,
          function (err, result) {
            if (err) {
              res.status(400).json({
                message: "Auth failed",
              });
            }
            if (result) {
              const token = jwt.sign(
                { email: users.email, id: users._id },
                SECRET_KEY
              );
              res.status(200).json({ user: users, token: token });
            }
          }
        );
      }
    });
};

const userdetails = async (req, res) => {
  try {
    const detailsResult = await detailsModel.create({
      height: req.body.height,
      weight: req.body.weight,
      daily_step_goal: req.body.daily_step_goal,
    });

    res.status(201).json({ details: detailsResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Details not found" });
  }
};

const leader = async (req, res) => {
  try {
    const resultleader = await leaderboardModel.create({
      rank: req.body.rank,
      name: req.body.name,
      steps: req.body.steps,
    });
    res.status(201).json({ leaderboarddetails: resultleader });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Leaderboard Details not found" });
  }
};

module.exports = { signup, signin, userdetails, leader };

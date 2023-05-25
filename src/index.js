const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");
const multer = require("multer");
const ImageModel = require("./models/image.model");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://admin:ayush@cluster0.32yfywj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on port no. " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("testImage");

//upload a image or file

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newImage = new ImageModel({
        name: req.body.name,
        image: {
          data: req.file.filename,
          contentType: "image/jpg",
        },
      });
      newImage
        .save()
        .then(() => res.send("successfully uploaded"))
        .catch((err) => console.log(err));
    }
  });
});

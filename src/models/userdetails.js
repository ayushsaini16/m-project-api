const mongoose = require("mongoose");

const UserDetailSchema = mongoose.Schema(
  {
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    daily_step_goal: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UsersDetails", UserDetailSchema);

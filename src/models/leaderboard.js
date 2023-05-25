const mongoose = require("mongoose");

const leaderboardSchema = mongoose.Schema(
  {
    rank: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    steps: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("leaderboard", leaderboardSchema);

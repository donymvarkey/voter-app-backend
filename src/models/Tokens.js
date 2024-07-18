const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    access_token: { type: String, required: true },
    access_token_expiry: { type: Number, required: true, default: 3600 },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    refresh_token: { type: String, required: true },
    refresh_token_expiry: {
      type: Number,
      required: true,
      default: process.env.REFRESH_TOKEN_EXP,
    },
  },
  { timestamps: true }
);

const Tokens = mongoose.model("Tokens", tokenSchema);

module.exports = Tokens;

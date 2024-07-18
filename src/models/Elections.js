const mongoose = require("mongoose");

const electionsSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true },
    startDate: { type: Date, required: true, default: Date.now() },
    winner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Candidates",
      required: false,
    },
  },
  { timestamps: true }
);

const Elections = mongoose.model("Elections", electionsSchema);

module.exports = Elections;

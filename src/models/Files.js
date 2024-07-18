const mongoose = require("mongoose");

const filesSchema = mongoose.Schema(
  {
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

const Elections = mongoose.model("Elections", filesSchema);

module.exports = Elections;

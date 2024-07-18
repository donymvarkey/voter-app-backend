const mongoose = require("mongoose");

const candidatesSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: false },
    dob: { type: Date, required: true },
    is_disqualified: { type: Boolean, default: false },
    election_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Elections",
      required: true,
    },
    votes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Candidates = mongoose.model("Candidates", candidatesSchema);

module.exports = Candidates;

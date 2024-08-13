const mongoose = require("mongoose");
const { hashPassword } = require("../helpers/utils");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fcm_token: { type: String, required: false },
  is_premium: { type: Number, required: false, default: 0 },
  plan_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Plans",
    required: false,
  },
  mfa: { type: Number, required: false, default: 0 },
  is_disabled: { type: Boolean, required: false, default: false },
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = hashPassword(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
const { hashPassword } = require("../helpers/utils");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fcm_token: { type: String, required: false },
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

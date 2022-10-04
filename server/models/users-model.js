const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  walletAddress: { type: String, required: true, unique: true },
  aadharNo: {type: Number,required: true},
  isWeb3: {type: Boolean, required: true},
  img: { type: String, required: true },
  coverImg: { type: String, required: true },
  bio: { type: String, required: true },
  socials: [{type: String, required: true}],
  apps: [{ type: mongoose.Types.ObjectId, required: true, ref: "App" }],
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

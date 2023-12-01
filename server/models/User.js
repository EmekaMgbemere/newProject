const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phonenumber: Number,
  email: String,
  password: String,
  userType: String,
  cinemaAdmin:String,
  secretKey: String,
  companyId: String,
  theaterID: String,
  selectedlocation: String,
  companyAddress: String,
  avatar: String,
  counterid: String,
  countername:String
});

const User = mongoose.model('User', userSchema);
module.exports = User;
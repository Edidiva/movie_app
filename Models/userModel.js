
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiration: {
      type: Date,
      default: null,
    },
    firstName: String,
    lastName: String,
    fullName: String
});

userSchema.pre('save', async function (next) {
    try {
      if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
      }
      this.fullName = this.firstName + " " + this.lastName;
      next();
    } catch (error) {
      next(error); 
    }
  });
  

const User = mongoose.model("User", userSchema);

module.exports = User;

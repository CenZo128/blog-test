const mongoose = require('mongoose');
const { Schema} =  mongoose;
const uniqueValidator = require("mongoose-unique-validator");


// hashing password
const { encryptPwd } = require("../helpers/bcrypt");

const userSchema = new Schema({
  full_name : { 
    type : String,
    require : true, 
    lowercase :true,
    trim : true,
  },
  email : {
    type : String,
    require : true,
    trim : false,
  },
  password : { 
    type : String,
    require : true,
  },
  profile_image: {
    type : String,
    default : "https://res.cloudinary.com/di02ey9t7/image/upload/v1602432289/FAVPNG_samsung-galaxy-a8-a8-user-login-telephone-avatar_peutPpGD_l18hzf.png"
  },
}, { timestamps: true, versionKey: false })

// pre, post hooks
userSchema.pre("save", async function (next) {
  let user = this;

  if (user.password && user.isModified("password")) {
    user.password = await encryptPwd(user.password);
  }
  next();
});

// unique validator
userSchema.plugin(uniqueValidator);
const user = mongoose.model("User", userSchema);

exports.User = user;
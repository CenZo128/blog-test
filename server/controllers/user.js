const { User } = require("../model/user");
// const {decryptPwd} = require('../helpers/bcrypt')
// const {tokenGenerator} = require('../helpers/jwt')
// import mongoose from 'mongoose';
// let User = mongoose.model('User');

exports.Register = async (ctx, next) => {
    try {
        let new_student = User(ctx.request.body);
        await new_student.save();
        ctx.body = new_student;   
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};
  exports.Login = async (req, res, next) => {

	try {
	  const { email, password } = req.body;
  
	  let user = await User.findOne({ email: email });
  
	  if (!user)
		return next({
		  message: `User  email  not registered `,
		});
		
	  if (decryptPwd(password, user.password)) {
		const token = tokenGenerator(user);
		
		res.status(200).json({
		  success: true,
		  message: "Successfully logged in!",
		  token: token,
		});
	  }
	  else {
		  res.status(500).json({
			  success: false,
			  message: "Cannot find Users password"
		  })
	  }
	} catch (err) {
	  res.status(500).json({
		  success: false,
		  message: "Cannot find User or Password"
	  })
	}
  };
  
  exports.GetUser = async (req, res, next) => {
	try {
	  let user = await User.find()
	  res.status(200).json({
		success: true,
		message: "Successfully retrieve the data!",
		data: user,
	  });
	} catch (err) {
	  next(err);
	}
  };
  exports.GetUserId = async (req, res, next) => {
	try {
	const  id  = req.userData._id;
	  let user = await User.findOne({_id: id})
	  res.status(200).json({
		data: user,
	  });
	} catch (err) {
	  next(err);
	}
  };
  exports.Edit = async (req, res, next) => {
	try {
	  const { full_name,email,description,profile_image } = req.body;
	  const { id } = req.params;
	  let obj = {};

		 //checking data input
		 if(full_name) obj.full_name = full_name;
		 if(email) obj.email = email;
		 if(description) obj.description = description;
		 if(req.file && req.file.fieldname && req.file.path) obj.product_image = req.file.path;

		 const updateUser = await User.findByIdAndUpdate(
            id,
            { $set: obj },
            { new: true }
        );
		res.status(200).json({
            success: true,
            msg: "User updated!",
            updateUser
        });
	} catch (err) {
	  next(err);
	}
  };
  
  exports.Delete = async (req, res, next) => {
	try {
	  const { id } = req.params;
  
	  if (!id) return next({ message: "Missing ID Params" });
  
	  await User.findByIdAndRemove(id, (error, doc, result) => {
		if (error) throw "Failed to delete";
		if (!doc)
		  return res.status(400).json({ success: false, err: "Data not found!" });
  
		res.status(200).json({
		  success: true,
		  message: "Successfully delete data!",
		  data: doc,
		});
	  });
	} catch (err) {
	  next(err);
	}
  };
  
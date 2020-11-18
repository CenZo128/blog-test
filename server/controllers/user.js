const { User } = require("../models/user");
const {decryptPwd} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')


exports.Register = async (req, res, next) => {
	const {email,full_name,password} = req.body
	try {	
	const found = await User.findOne({email})
	if (found){
		res.status (400).json({message : "email has been registered"})
	}
	else {
	  const data = await User.create({
		  full_name,
		  email, 
		  password
	  });
	  res.status(201).json({
		success: true,
		message: "Successfully create a user!",
		data,
	  });}
	} catch (err) {
	  next(err);
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
  
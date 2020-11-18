const { User } = require("../model/user");
const {decryptPwd} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')

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
	  const { email, password } = ctx.request.body;
	  let user = await User.findOne({ email: email });

	  if (!user)
		return next({
		  message: `User  email  not registered `,
		});
		
	  if (decryptPwd(password, user.password)) {
		const token = tokenGenerator(user);		
		ctx.status = 200;
		ctx.body = {token}
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

  exports.Edit = async (ctx, next) => {
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
	  const { id } = ctx.request.params;
	  if (!id) return next({ message: "Missing ID Params" });
	  await User.findByIdAndRemove(id, (error, doc, result) => {
		if (error) throw "Failed to delete";
		if (!doc)
		  return ctx.status = 400;
		  ctx.status = 200;
		  ctx.body = doc;
	  });
	} catch (err) {
	  next(err);
	}
  };
  
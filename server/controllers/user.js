const { User } = require("../model/user");
const {decryptPwd} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')


exports.list = async (ctx,next) => {
	try {
		let user = await User.find();
		ctx.status =200;
		ctx.body= user;
	}catch (err){
		ctx.status = 500;

	}
}
exports.Register = async (ctx, next) => {
    try {
		let new_student = new User(ctx.request.body);
		console.log(ctx.request.body);
        await new_student.save();
        ctx.body = new_student;   
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};
  exports.Login = async (ctx, next) => {

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
		  ctx.status = 500;
		  ctx.body = {
			  message: "error"
		  }
	  }
	} catch (err) {
		ctx.status = 500;
		ctx.body = {
			message: err.message
		}
	}
  };

  exports.Edit = async (ctx, next) => {
	try {
	  const { full_name,email,profile_image } = ctx.request.body;
	  const { id } = ctx.request.params;
	  let obj = {};
		console.log(ctx.request.body);
		console.log(ctx.request.params);
		 //checking data input
		 if(full_name) obj.full_name = full_name;
		 if(email) obj.email = email;
		 if(req.file && req.file.fieldname && req.file.path) obj.profile_image = req.file.path;

		 const updateUser = await User.findByIdAndUpdate(
            id,
            { $set: obj },
            { new: true }
		);
		ctx.status = 200;
		ctx.body = {updateUser}
	} catch (err) {
		ctx.status = 500;
	}
  };
  
  exports.Delete = async (ctx, next) => {
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
	  ctx.status = 400;
	}
  };
  
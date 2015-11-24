var User = require('../config/passport.js').user

function create(req, res){
	var user = new User(req.body.user)

	user.save(function(err){
		if(err) res.json({ err: err })
		res.json({message: 'User Created!'})
	})
}

function index(req,res){
	User.find({}, function(err,data){
		if(err) res.json({ err: err })
		res.json(data)
	})
}

function show(req,res){
	User.find({_id: req.params.user_id}, function(err,user){
		if(err) res.json({ err: err })
		res.json(user)
	})
}

function destroy(req, res){
	User.findOneAndRemove({_id: req.params.user_id}, function(err, user){
		if(err) res.send(err)
		res.json({success: true, message: "User " + user.name + " deleted!"})
	})
}

function signIn(req,res){
	User.findOne({email: req.body.email}, function(err,user){
		if(err) res.json({ err: err })
		if(user){
			if(user.authenticate(req.body.password))
				res.json({ message: "Valid User" })
			else
				res.json({ message: "Invalid User"})
		}
		else
			res.json({message: "User Not Found"})
	})
}

module.exports = {
	create: create,
	index: index,
	show: show,
	signIn: signIn,
	destroy: destroy
}

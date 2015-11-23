var User = require('../models/user.js')

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
	User.find({email: req.params.email}, function(err,user){
		if(err) res.json({ err: err })
		res.json(user)
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
	createUser: create,
	showAll: index,
	showUser: show,
	signIn: signIn
}

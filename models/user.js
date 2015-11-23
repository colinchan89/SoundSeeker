var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		bcrypt = require('bcrypt'),
	  userSchema = new Schema({
			name: String,
			email: {type: String, require: true},
			password: {type: String, require: true},
			zip: Number
	})

userSchema.pre('save', function(next){
	var user = this
	var hash = bcrypt.hashSync(user.password, 8)
	user.password = hash
	next()
})

userSchema.methods.authenticate = function(password){
	var user = this
	return bcrypt.compareSync(password, user.password)
}

var User = mongoose.model('User', userSchema)

module.exports = User

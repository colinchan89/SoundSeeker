var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		// bcrypt = require('bcrypt'),
	  userSchema = new Schema({
			name: String,
			email: {type: String, require: true},
			password: {type: String, require: true},
			zip: String
}
			facebook: {
        id: String,
        name: String,
        token: String,
        email: String
    })

// userSchema.pre('save', function(next){
// 	var user = this
// 	var hash = bcrypt.hashSync(user.password, 8)
// 	user.password = hash
// 	next()
// })

// userSchema.methods.authenticate = function(password){
// 	var user = this
// 	return bcrypt.compareSync(password, user.password)
// }

/*Ted Added passport*/
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password)
}
/*Ted Added passport*/

var User = mongoose.model('User', userSchema)

module.exports = User

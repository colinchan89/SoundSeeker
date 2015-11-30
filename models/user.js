var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		bcrypt = require('bcrypt')

	var userSchema = new Schema({
		local:	{
			name: String,
			email: {type: String, require: true},
			password: {type: String, require: true},
			zip: String,
			bookmarks: Array
 },
		facebook: {
        id: String,
        name: String,
        token: String,
        email: String,
				bookmarks: Array
			}
    })

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

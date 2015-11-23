var express = require('express'),
		soundcloud = express.Router(),
		SC = require('node-soundcloud')

// Initialize client
SC.init({
	id: '7ce0c4a7238f05f3fada1cdcff5b489c',
  secret: 'a2039f8373bab2514ae7e6f796e95033',
  uri: 'http://localhost:3000/',
	accessToken: 'https://api.soundcloud.com/oauth2/token'
})

// Connect user to authorize application
// var initOAuth = function(req, res) {
//   var url = SC.getConnectUrl()
//
//   res.writeHead(301, Location: url)
//   res.end()
// };
//
// // Get OAuth token
// var redirectHandler = function(req, res) {
//   var code = req.query.code
//
//   SC.authorize(code, function(err, accessToken) {
//     if(err) res.json({ err: err })
//     // Client is now authorized and able to make API calls
//     console.log('access token:', accessToken);
//   })
// }

var express = require('express'),
    app = express(),
		ejs = require('ejs'),
    ejsLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
	  logger = require('morgan'),
	  flash = require('connect-flash'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
	  passport = require('passport'),
    passportConfig = require('./config/passport.js').passport,
    userRoutes = require('./routes/users.js'),
    SC = require('node-soundcloud'),
    eventful = require('eventful-node'),
    client = new eventful.Client('tX9rVSJRM96LsCtP'),
		port = process.env.PORT || 3000,
		apiRouter = require('./routes/api_routes.js'),
    request = require('request')


//connect to db
mongoose.connect('mongodb://soundseeker:sound1@ds059524.mongolab.com:59524/soundseeker', function(err){
	if(err) return console.log('Cannot connect :(')
	console.log('Connected to MongoDB!')
})

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)
//soundcloud
////init client
SC.init({
  id: '7ce0c4a7238f05f3fada1cdcff5b489c',
  secret: 'a2039f8373bab2514ae7e6f796e95033',
  uri: 'http://localhost:3000/',
  accessToken: 'https://api.soundcloud.com/oauth2/token'
})

//root route
app.get('/', function(req,res){

	res.render('index')

})

//import routes
app.use('/api', apiRouter)

//Ted added for passport

// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.use(session({
    secret: "boomchakalaka",
    cookie:{_expires : 60000000}
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//root route
app.get('/', function(req,res){
    res.render('index')
})

app.get('/events/:id', function(req,res){
  // res.render('show')
  request('http://api.eventful.com/json/events/get?id=' + req.params.id + '&app_key=tX9rVSJRM96LsCtP', function (err, response, body) {
    if (!err && response.statusCode == 200) {
      var s = null;
      var performers = [];
      if(JSON.parse(body).performers){
        if(JSON.parse(body).performers.performer.length > 1){
          JSON.parse(body).performers.performer.forEach(function(a){
            performers.push(a.name)
          })
        }
        else {
          performers.push(JSON.parse(body).performers.performer.name)
        }
      }
      SC.get('/tracks', {tags: performers}, function(err, track) {
        if (err) throw err
        else console.log('success')
        song = track[0].id
        // track.forEach(function(n){
        // 	console.log(n.permalink_url)
        // })
        res.render('show', {event: JSON.parse(body), songId: song}) // Show the HTML for the Google homepage.
      })
    }
  })
})

app.use(userRoutes)

app.listen(port, function(){
    console.log("Server running on port", port)
})

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
    soundcloud = require('node-soundcloud'),
    eventful = require('eventful-node'),
    client = new eventful.Client('tX9rVSJRM96LsCtP');
    // passportConfig = require('./config/passport.js'),
		port = process.env.PORT || 3000,
		apiRouter = require('./routes/api_routes.js'),


//connect to db
mongoose.connect('mongodb://localhost/soundseeker', function(err){
	if(err) return console.log('Cannot connect :(')
	console.log('Connected to MongoDB!')
})

//soundcloud
////init client
soundcloud.init({
  id: '7ce0c4a7238f05f3fada1cdcff5b489c',
  secret: 'a2039f8373bab2514ae7e6f796e95033',
  uri: 'http://localhost:3000/',
  accessToken: 'https://api.soundcloud.com/oauth2/token'
})

//root route
app.get('/', function(req,res){
	// res.render('index')
  client.searchEvents({ keywords: 'concerts', location: '90404', within: 25, date: 'This Week', sort_order: 'popularity'}, function(err, data){
    if(err) throw err
    console.log('Recieved ' + data.search.total_items + ' events')
    var events = data.search.events.event

    soundcloud.get('/tracks', {tags: events[1].title}, function(err, track) {
      if (err) throw err
      else console.log('success')
      // res.json(track)
      track.forEach(function(n){
        console.log(n.permalink_url)
      })
    })

    events.forEach(function(n){
      var artists = n.performers.performer
      if(artists.length > 1){
        artists.forEach(function(n){
          console.log(n.name)
        })
      }
      console.log(artists.name)
    })
    res.json(events)
  })
})

//import routes
app.use('/api', apiRouter)

//Ted added for passport

// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

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

app.use(userRoutes)

app.listen(port, function(){
    console.log("Server running on port", port)
})

    //Ted added for passport

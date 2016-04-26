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

//init soundcloud client
SC.init({
  id: '7ce0c4a7238f05f3fada1cdcff5b489c',
  secret: 'a2039f8373bab2514ae7e6f796e95033',
  uri: 'http://localhost:3000/',
  accessToken: 'https://api.soundcloud.com/oauth2/token'
})

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

//middleware function to check if there is a current user
app.use(function(req,res,next){
  app.locals.isLoggedIn = req.isAuthenticated()
  if(req.user){
    app.locals.currentUser = req.user
  }
  next()
})

//basic routes
app.get('/', function(req,res){
  res.render('index')
})
app.get('/about', function(req,res){
  res.render('about')
})
app.get('/contact', function(req,res){
  res.render('contact')
})
app.use("/css", express.static(__dirname + '/css'));


//import api routes
app.use('/api', apiRouter)

//routes for passport
app.use(userRoutes)

//api request to eventful to create show page for individual concert
app.get('/events/:id', function(req,res){
  //use request npm package to retrieve JSON data for local DB
  request('http://api.eventful.com/json/events/get?id=' + req.params.id + '&app_key=tX9rVSJRM96LsCtP', function (err, response, body) {
    if (!err && response.statusCode == 200) {
      //create an array for individual performers
      var performers = [];
      //some performers are contained in arrays so we need to check for that
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
      //built in node-soundcloud method that searches using created performer array
      if(performers.length > 1) {
        SC.get('/tracks', {q: performers[0]}, function(err, track) {
          if(track){
            if (err) throw err
            console.log('success')
            //retrieve soundcloud id for 3 songs for embedded soundcloud player on show page
            song1 = track[0].id
            song2 = track[1].id
            song3 = track[2].id
            song4 = track[3].id
            song5 = track[4].id
            //retrieve url of show for saving purposes
            bookmarkURL = req.url
            res.render('show', {event: JSON.parse(body), songId: song1, songId2: song2, songId3: song3, songId4: song4, songId5: song5})
          }
        })
      }
      if(performers.length == 1) {
        SC.get('/tracks', {q: performers}, function(err, track) {
          if(track){
            if (err) throw err
            //retrieve soundcloud id for 3 songs for embedded soundcloud player on show page
            song1 = track[0].id
            song2 = track[1].id
            song3 = track[2].id
            song4 = track[3].id
            song5 = track[4].id
            //retrieve url of show for saving purposes
            bookmarkURL = req.url
            res.render('show', {event: JSON.parse(body), songId: song1, songId2: song2, songId3: song3, songId4: song4, songId5: song5})
          }
        })
      }
      if(performers.length == 0) {
          //in the event the soundcloud query returns no results
          res.render('show', {event: JSON.parse(body), songId: null})
      }
    }
  })
})

//set up server
app.listen(port, function(){
  console.log("Server running on port", port)
})

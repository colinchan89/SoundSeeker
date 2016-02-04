var express = require('express'),
		soundcloud = express.Router(),
		SC = require('node-soundcloud'),
		eventful = require('eventful-node'),
    client = new eventful.Client('tX9rVSJRM96LsCtP'),
		request = require('request')
// Initialize client
SC.init({
	id: '7ce0c4a7238f05f3fada1cdcff5b489c',
  secret: 'a2039f8373bab2514ae7e6f796e95033',
  uri: 'http://localhost:3000/',
	accessToken: 'https://api.soundcloud.com/oauth2/token'
})

soundcloud.get('/events/:location/:radius/:timespan', function(req,res){
	client.searchEvents({ keywords: 'concerts', location: req.params.location, within: req.params.radius, date: req.params.timespan, sort_order: 'popularity'}, function(err, data){
		if(err) throw err
		var events = data.search.events.event
		res.json(events)
	})
})

soundcloud.get('/event/single/:id', function(req,res){
// sample get for event:
// 'http://api.eventful.com/json/events/get?id=E0-001-089716403-9@2016011710&app_key=tX9rVSJRM96LsCtP'
	request('http://api.eventful.com/json/events/get?id=' + req.params.id + '&app_key=tX9rVSJRM96LsCtP', function (error, response, body) {
			res.json(JSON.parse(body)) // Parse JSON Object returned from eventful
	})
})

module.exports = soundcloud

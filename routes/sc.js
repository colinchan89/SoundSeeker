var express = require('express'),
		soundcloud = express.Router(),
		SC = require('node-soundcloud'),
		eventful = require('eventful-node'),
    client = new eventful.Client('tX9rVSJRM96LsCtP')

// Initialize client
SC.init({
	id: '7ce0c4a7238f05f3fada1cdcff5b489c',
  secret: 'a2039f8373bab2514ae7e6f796e95033',
  uri: 'http://localhost:3000/',
	accessToken: 'https://api.soundcloud.com/oauth2/token'
})


soundcloud.get('/events/:zip', function(req,res){
	client.searchEvents({ keywords: 'concerts', location: req.params.zip, within: 20, date: 'This Week', sort_order: 'popularity'}, function(err, data){
		if(err) throw err
		// console.log('Received ' + data.search.total_items + ' events')
		var events = data.search.events.event

		// soundcloud.get('/tracks', {tags: events[1].title}, function(err, track) {
		// 	if (err) throw err
		// 	else console.log('success')
		// 	// res.json(track)
		// 	track.forEach(function(n){
		// 		console.log(n.permalink_url)
		// 	})
		// })

		// events.forEach(function(evt){
		// 	var artists = evt.performers.performer
		// 	console.log(artists)
		// 	if(artists.length > 1){
		// 		artists.forEach(function(a){
		// 			console.log(a.name)
		// 		})
		// 	}
		// 	console.log(evt.performers.performer.name)
		// })
		res.json(events)
	})
})

soundcloud.get('/events/single/:id', function(req,res){
// sample get for event:
// 'http://api.eventful.com/rest/events/get?id=E0-001-079142837-2@2015112822&app_key=tX9rVSJRM96LsCtP'
})

soundcloud.get('/:id', function(req,res){

})

module.exports = soundcloud

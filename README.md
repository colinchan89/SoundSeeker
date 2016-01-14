# SoundSeeker README
SoundSeeker is a web app that uses the Eventful & SoundCloud APIs to provide the
user with a list of local concerts occurring that week (plus a link to buy
tickets) with an embedded SoundCloud player to preview the artist's top hits!

Heroku link: http://soundseeker.colinchan.net

### Technologies Used:
* Node version 4.1.1
* Express version 4.13.3
* MongoDB
* Passport (Local & Facebook)
* Mongoose
* EJS
* eventful-node (for Eventful API)
* node-soundcloud (for SoundCloud API)

### Getting Started
In the terminal go to the app's location and run 'npm install'. Create a Mongo
daemon using the 'mongod' command and start the server using 'node server.js' or
using 'nodemon'. SoundSeeker should now be available on localhost:3000!

### Using the App
SoundSeeker doesn't require you to make an account in order to access the full
features. From the landing page, enter your location in the main query and
press submit. Eventful's API will return the 10 most popular concerts within 10
miles and 7 days. You can further inspect the concert on a unique show page for
the event that uses Eventful's API to provide the date & time, additional
performers, the price, a link to buy tickets and an embedded SoundCloud player
with the artists most popular songs.

### What's Next
* More User Features: Improved profile page, bookmarks, etc.
* Improved Search: Adjustable search radius. Random Show option.

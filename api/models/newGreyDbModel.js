'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newGreyPerformersSchema = new Schema({
  name: {
    type: String,
    required: 'Please provide your name'
  },  
  email: {
    type: String,
    required: 'Please provide your email'
  },  
  tagline: {
    type: String,
  },
  description:{
  	type: String,
  },
  link: {
  	type: String
  },
  loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'     
  },
  fbid: {
  	type: String,
  	required: 'fbid required'
  },

});
newGreyPerformersSchema.static('findByFbId', function (fbid, callback) {
  return this.find({ fbid: fbid }, callback);
});


var newGreyOrganiserSchema = new Schema({
  name: {
    type: String,
    required: 'Please provide your name'
  },  
  email: {
    type: String,
    required: 'Please provide your email'
  },  
  description:{
  	type: String,
  },
  fbid: {
  	type: String,
  	required: 'fbid required'
  },
});
newGreyOrganiserSchema.static('findByFbId', function (fbid, callback) {
  return this.find({ fbid: fbid }, callback);
});


var newGreyGigSchema = new Schema({
  name: {
    type: String,
    required: 'Please provide the name of your gig'
  },  
  organiserId: {
    type: String,
    required: 'Organiser required'
  },  
  description:{
  	type: String,
  },
  date:{
  	type:Date,
  },
  loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d'     
  },

  fbid: {
  	type: String,
  	required: 'fbid required'
  },
});
newGreyGigSchema.static('findByFbId', function (fbid, callback) {
  return this.find({ fbid: fbid }, callback);
});


module.exports = mongoose.model('Performers', newGreyPerformersSchema);
module.exports = mongoose.model('Organisers', newGreyOrganiserSchema);
module.exports = mongoose.model('Gigs', newGreyGigSchema);

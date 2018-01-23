'use strict';
var mongoose = require('mongoose'),
Performer = mongoose.model('Performers'),
Organiser = mongoose.model('Organisers'),
Gig = mongoose.model('Gigs');

function removeFbId(obj){
    if(obj && "fbid" in obj)
    	obj.fbid="";
    	
    return obj;
}

exports.list_all_performers = function(req, res) {
  Performer.find({}, function(err, performers) {
    if (err)
      res.send(err);
      for(var i=0; i<performers.length; i++){
      	removeFbId(performers[i]);
      }
    res.json(performers);
  });
};

exports.list_performers_near = function(req, res) {
    var limit = req.query.limit || 1000;
    var maxDistance = req.query.distance || 8;
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 63710;

    var coords = [];
    coords[0] = req.query.long;
    coords[1] = req.query.lat;

    // find a location
    Performer.find({
      loc: {
        $near: coords,
        $maxDistance: maxDistance
      }
    }).limit(limit).exec(function(err, performers) {
      if (err) {
        return res.send(err);
      }
      res.json(performers);
    });
};

exports.create_a_performer = function(req, res) {
  var new_performer = new Performer(req.body);

  new_performer.save(function(err, performer) {
    if (err)
      res.send(err);
      
    removeFbId(performer);
    res.json(performer);
  });
};

exports.read_a_performer_by_fbid = function(req, res) {
  Performer.findByFbId(req.params.performerFbId, function(err, performerArray) {

    if (err)
    	res.send(err);
    if(performerArray.length == 0) 
    	res.send();
    else {
		var performer = performerArray[0];
    	removeFbId(performer);
    	res.json(performer);
    }
  });
};

exports.read_gigs_by_fbid = function(req, res) {
  Gig.findByFbId(req.params.organiserFbId, function(err, gigArray) {
    if (err)
    	res.send(err);
    	
    for (var i in gigArray) {
        removeFbId(gigArray[i]);
	}
	console.log(gigArray);
	res.json(gigArray);
    
  });
};

exports.create_a_organiser = function(req, res) {
  var new_organiser = new Organiser(req.body);
  new_organiser.save(function(err, organiser) {
    if (err)
      res.send(err);
      
    removeFbId(organiser);
    res.json(organiser);
  });
};

exports.read_a_organiser_by_fbid = function(req, res) {
  Organiser.findByFbId(req.params.organiserFbId, function(err, organiserArray) {
    if (err)
      	res.send(err);
    if(organiserArray.length == 0) 
    	res.send();
    else {
		var organiser = organiserArray[0];
    	removeFbId(organiser);
    	res.json(organiser);
    }
  });
};

exports.read_a_performer_by_profile_id = function(req, res) {
  Performer.findById(req.params.performerId, function(err, performer) {
    if (err)
    	res.send(err);
    removeFbId(performer);
    res.json(performer);
  });
};

exports.read_organiser_by_profile_id = function(req, res) {
  Organiser.findById(req.params.organiserId, function(err, organiser) {
    if (err)
    	res.send(err);
    removeFbId(organiser);
    res.json(organiser);
  });
};


exports.update_a_performer = function(req, res) {
  Performer.findOneAndUpdate({fbid: req.params.performerFbId}, req.body, {new: true}, function(err, performer) {
    if (err)
      res.send(err);
    removeFbId(performer);
    res.json(performer);
  });
};

exports.delete_a_performer = function(req, res) {
  	Performer.remove({
    	fbid: req.params.performerFbId
  	}, function(err, performer) {
    	if (err)
     		res.send(err);
     		
     Gig.remove({
    	fbid: req.params.performerFbId
  	 }, function(err2, performer) {
		if (err2)
      		res.send(err2);

    	res.json({ message: 'Performer successfully deleted' });
  	});
  });
};

exports.update_a_organiser = function(req, res) {
  Organiser.findOneAndUpdate({fbid: req.params.organiserFbId}, req.body, {new: true}, function(err, organiser) {
    if (err)
      res.send(err);
    removeFbId(organiser);
    res.json(organiser);
  });
};

exports.delete_a_organiser = function(req, res) {
  Organiser.remove({
    fbid: req.params.organiserFbId
  }, function(err, organiser) {
    if (err)
      res.send(err);

  Gig.remove({
    fbid: req.params.organiserFbId
  }, function(err2, gig) {
    if (err2)
      res.send(err2);
      
    res.json({ message: 'Organiser successfully deleted' });
  });
  });
};


exports.create_a_gig = function(req, res) {
  var dateVal = req.body.date.split('/');
  req.body.date = dateVal[1]+'/'+dateVal[0]+'/'+dateVal[2];
  var new_gig = new Gig(req.body);
  
  new_gig.save(function(err, gig) {
    if (err)
      res.send(err);
      
    removeFbId(gig);
    res.json(gig);
  });
};

exports.update_a_gig = function(req, res) {
  Gig.findOneAndUpdate({fbid: req.body.fbid, _id:req.body._id}, req.body, {new: true}, function(err, gig) {
    if (err)
      res.send(err);
            
    removeFbId(gig);
    res.json(gig);
  });
};

exports.delete_a_gig = function(req, res) {
  Gig.remove({
  	_id: req.params.gigId,
    fbid: req.body.fbid
  }, function(err, gig) {
    if (err)
      res.send(err);
    res.json({ message: 'Gig successfully deleted' });
  });
};


exports.read_a_gig = function(req, res) {
	console.log("read");
  Gig.findById(req.params.gigId, function(err, gig) {
    if (err)
    	return res.send(err);

    if(!gig){
    	return res.json({});
    }
    	
    removeFbId(gig);
    res.json(gig);
  });
};


exports.list_gigs_near = function(req, res) {
    var limit = req.query.limit || 1000;
    var maxDistance = req.query.distance || 8;
    // the raduis of Earth is approximately 6371 kilometers
    maxDistance /= 63710;
    
    var coords = [];
    coords[0] = req.query.long;
    coords[1] = req.query.lat;

    // find a location
    Gig.find({
      loc: {
        $near: coords,
        $maxDistance: maxDistance
      }
    }).limit(limit).exec(function(err, gigs) {
      if (err) {
        return res.send(err);
      }
      res.json(gigs);
    });
};



module.exports = function(app) {
  var new_grey_db = require('../controllers/newGreyDbController');

	app.route('/performers')
    .get(new_grey_db.list_all_performers)
    .post(new_grey_db.create_a_performer);

	app.route('/performers/near')
	.get(new_grey_db.list_performers_near);

	app.route('/performers/fbid/:performerFbId')
    .put(new_grey_db.update_a_performer)
    .delete(new_grey_db.delete_a_performer)
    .get(new_grey_db.read_a_performer_by_fbid);
    
    app.route('/performers/id/:performerId')
    .get(new_grey_db.read_a_performer_by_profile_id);

    
 	app.route('/organisers')
//     .get(new_grey_db.list_all_organiser)
    .post(new_grey_db.create_a_organiser);

	app.route('/organisers/fbid/:organiserFbId')
    .get(new_grey_db.read_a_organiser_by_fbid)
    .put(new_grey_db.update_a_organiser)
    .delete(new_grey_db.delete_a_organiser);

	app.route('/organisers/id/:organiserId')
	.get(new_grey_db.read_organiser_by_profile_id);

	 app.route('/gigs')
//     .get(new_grey_db.list_all_organiser)
    .post(new_grey_db.create_a_gig);

	 app.route('/gigs/id/:gigId')
	.put(new_grey_db.update_a_gig)
    .delete(new_grey_db.delete_a_gig)
    .get(new_grey_db.read_a_gig);
    
    app.route('/gigs/near')
	.get(new_grey_db.list_gigs_near);
	
	app.route('/gigs/by-organiser-with-fbid/:organiserFbId')
	.get(new_grey_db.read_gigs_by_fbid);

	
};

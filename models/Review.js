const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const reviewSchema = new mongoose.Schema({
	created: {
		type: Date,
		defautl: Date.now
	}
	author: {
		
	}
	store
	text
	rating

});

module.exports = mongoose.model('Review', reviewSchema);
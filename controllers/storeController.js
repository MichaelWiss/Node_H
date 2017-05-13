const mongoose = require('mongoose');
const Store = mongoose.model('Store');


exports.homePage = (req, res) => {
	console.log(req.name);
	res.render('index');
};


exports.addStore = (req, res) => {
	res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
	const store = await (new Store(req.body)).save();
	req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
	res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
	// query the database for a list of all stores
	const stores = await Store.find();
	console.log(stores);
	res.render('stores', { title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
	//find store
	const store = await Store.findOne({_id: req.params.id });
	
	//confirm they are the owner
	//render out edit form
	res.render('editStore',  { title: `Edit ${store.name}`, store });
}

exports updateStore = async (req, res) => {
	//find and update store
	const store = Store.findOneAndUpdate()
	//redirect to store
}

const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const multer =require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter: function(req, file, next) {
      const isPhoto = file.mimetype.startsWith('image/');
      if(isPhoto) {
      	next(null, true);
      } else {
      	next({ message: 'That filetype isn\'t allowed!' }, false);
      }
	}
};



exports.homePage = (req, res) => {
	console.log(req.name);
	res.render('index');
};


exports.addStore = (req, res) => {
	res.render('editStore', { title: 'Add Store' });
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
	//check if there is no new file
	if(!req.file) {
	  next();
	  return;
	}
	const extension = req.file.mimetype.split('/')[1];
	req.body.photo = `${uuid.v4()}.${extension}`;
	const photo = await jimp.read(req.file.buffer);
	await photo.resize(800, jimp.AUTO);
	await photo.write(`./public/uploads/${req.body.photo}`);
	// once we have written photo to file system
	next();
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

exports.updateStore = async (req, res) => {
	//set the location data to be a point
	req.body.location.type = 'Point';
	//find and update store
	const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true, // return the new store
		runValidators: true
	}).exec();
	req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store </a>`);
	res.redirect(`/stores/${store._id}/edit`);
	//redirect to store
};

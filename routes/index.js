const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('home');
});
router.get('/dashboard', (req, res) => {
	res.render('dashboard');
});
router.get('/login', (req, res) => {
	res.render('login');
});
router.post('/login', (req, res) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length < 1) {
				res.redirect('/login');
			} else {
				const password = req.body.password;
				bcryptjs.compare(password, user[0].password, (err, success) => {
					if (success == true) {
						res.redirect('/profile');
					} else {
						res.redirect('/login');
					}
				});
			}
		})
		.catch((err) => {
			res.status(500).json(err.message);
		});
});
router.get('/register', (req, res) => {
	res.render('register');
});
router.post('/register', (req, res) => {
	User.find({ email: req.body.email })
		.exec()
		.then((user) => {
			if (user.length > 0) {
				res
					.status(409)
					.json({ message: 'User already exists' })
					.redirect('/register');
			} else {
				const password = req.body.password;
				bcryptjs.hash(password, 10, (err, hash) => {
					if (err) {
						res.status(400).json(err);
					} else {
						const newUser = new User({
							_id: mongoose.Types.ObjectId(),
							name: req.body.name,
							email: req.body.email,
							password: hash,
						});

						newUser.save().then(() => {
							res
								.status(201)
								.json({ message: 'User created' })
								.redirect('/login');
						});
					}
				});
			}
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: 'Something went wrong', error: err.message });
		});
});
router.get('/profiles', (req, res) => {
	res.render('profiles');
});
router.post('/profiles', (req, res, next) => {
	const body = { ...req.body };
	// If you add authentication, this email can be gotten through the auth payload and used to query the database to update the user details;
	User.update(
		{ email: 'dev.tech.avalon@gmail.com' },
		{
			$set: {
				profile: body,
			},
		}
	)
		.then(() => {
			res.redirect('/dashboard');
		})
		.catch((err) => {
			res.json(err);
		});
});
router.get('/profile', (req, res) => {
	res.render('profile');
});
router.get('/update', (req, res) => {
	res.render('add-experience');
});
router.get('/create', (req, res) => {
	res.render('create');
});

module.exports = router;

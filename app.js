const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const expressLayouts = require('express-ejs-layouts');

const db = process.env.MONGO_URI;
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Databse connected');
	})
	.catch((err) => {
		console.log('Oops, database not connected, check connection string');
	});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/*
  @swagger
  
*/
app.use('/', require('./routes/index'));

module.exports = app;

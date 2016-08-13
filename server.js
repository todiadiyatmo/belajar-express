const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')
// connect mongo db
// 
MongoClient.connect('mongodb://vagrant:vagrant@ds153815.mlab.com:53815/toditesting', function(err, database) {
	if (err) return console.log(err)

	app.listen(3000, function() {
		console.log('listening on 3000');
	});

	app.get('/', function(req, res) {
	  res.sendFile(__dirname + '/views/index.html');
	});
	
	app.get('/quotes', function(req, res) {
		var cursor = database.collection('quotes').find();

		cursor = cursor.toArray(function(err, result) {
			// console.log(result)

			res.render('quotes.ejs', {quotes: result});
		});

	});

	app.post('/quotes', function(req, res)  {

		database.collection('quotes').save(req.body, function(error, result) {
			if (err) return console.log(err)

			console.log('saved to database');
			res.redirect('/quotes');
		});

	});
});
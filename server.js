// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://chaordicacademy:fullstack@ds031952.mongolab.com:31952/rest-api-superheroes'); // connect to our database
var Superhero  = require('./app/models/superhero');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /superheros
// ----------------------------------------------------
router.route('/superheroes')

	// create a superhero (accessed at POST http://localhost:8080/superheroes)
	.post(function(req, res) {

		var superhero = new Superhero();		// create a new instance of the Superhero model
		superhero.name = req.body.name;  // set the superheroes name (comes from the request)
        superhero.power = req.body.power;
        superhero.age = req.body.age;

		superhero.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Superhero created!' });
		});


	})

	// get all the superheros (accessed at GET http://localhost:8080/api/superheroes)
	.get(function(req, res) {
		Superhero.find(function(err, superheros) {
			if (err)
				res.send(err);

			res.json(superheros);
		});
	});

// on routes that end in /superheros/:superhero_id
// ----------------------------------------------------
router.route('/superheroes/:superhero_id')

	// get the superhero with that id
	.get(function(req, res) {
		Superhero.findById(req.params.superhero_id, function(err, superhero) {
			if (err)
				res.send(err);
			res.json(superhero);
		});
	})

	// update the superhero with this id
	.put(function(req, res) {
		Superhero.findById(req.params.superhero_id, function(err, superhero) {

			if (err)
				res.send(err);

			superhero.name = req.body.name;
			superhero.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Superhero updated!' });
			});

		});
	})

	// delete the superhero with this id
	.delete(function(req, res) {
		Superhero.remove({
			_id: req.params.superhero_id
		}, function(err, superhero) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;

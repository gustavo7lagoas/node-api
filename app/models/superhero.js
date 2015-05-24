var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SuperheroSchema   = new Schema({
	name: String,
    power: String,
    age: Number
});

module.exports = mongoose.model('Superhero', SuperheroSchema);

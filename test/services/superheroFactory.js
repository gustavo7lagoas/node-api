var factory = require('factory-girl'),
    Superhero = require('../../app/models/superhero');

var nameCounter = 1;
var powerCounter = 1;

factory.define('superhero', Superhero, {
    name : function() {
        return 'superhero: #' + nameCounter++;
    },
    power : function() {
        return 'superpower' + powerCounter;
    },
    age : 30
});

module.exports = factory;

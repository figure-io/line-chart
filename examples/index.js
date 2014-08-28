

// MODULES //

var Figure = require( './../lib' );


// Data:

var data = require( './line.data.json' );


// FIGURE //

var figure = new Figure();

figure
	.config( {} )
	.data( data );

console.log( figure.create() );
/**
*
*	FIGURE: line chart
*
*
*	DESCRIPTION:
*		- Module to create line charts.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Virtual DOM:
		jsdom = require( 'jsdom' ).jsdom,

		// Figure library:
		xfig = require( 'figure.io' ),

		// Default configuration:
		defaults = require( './defaults.json' );


	// DOCUMENT //

	var document = jsdom( '<html><head></head><body></body></html>' );


	// FIGURE //

	/**
	* FUNCTION: Figure()
	*	Figure constructor.
	*
	* @constructor
	* @returns {Figure} Figure instance
	*/
	function Figure() {
		this._data = [];
		this._config = JSON.parse( JSON.stringify( defaults ) );
		return this;
	} // end FUNCTION Figure()

	/**
	* METHOD: config( [config] )
	*	Figure configuration setter and getter. If no configuration object is provided, returns the figure configuration. If a configuration is provided, sets the specified configuration parameters.
	*
	* @param {Object} [config] - configuration object
	* @returns {Figure|Object} Figure instance or configuration object
	*/
	Figure.prototype.config = function( config ) {
		if ( !arguments.length ) {
			return JSON.parse( JSON.stringify( this._config ) );
		}
		// Check if object, etc.

		// Run through the configuration and only set the provided parameters.
		this._config = config;

		return this;
	}; // end METHOD config()

	/**
	* METHOD: data( [data] )
	*	Figure data setter and getter. If no data is provided, returns the figure data. If data is provided, sets the figure data.
	*
	* @param {Array} [data] - Array of arrays of arrays containing data elements; e.g., [[[x0,y0],[x1,y1],...,[xN,yN]],[[],[],...,[]]]
	* @returns {Figure|Array} Figure instance or data array
	*/
	Figure.prototype.data = function( data ) {
		if ( !arguments.length ) {
			return this._data;
		}
		if ( !Array.isArray( data ) ) {
			throw new TypeError( 'data()::invalid input argument. Data must be an array.' );
		}
		this._data = data;
		return this;
	}; // end METHOD data()

	/**
	* METHOD: create()
	*	Creates a figure containing a line chart.
	*
	* @returns {String} serialized chart.
	*/
	Figure.prototype.create = function() {
		var figure,
			canvas,
			annotations,
			title,
			graph,
			data,
			axes,
			line;

		// [1] Instantiate a new figure generator:
		figure = xfig.figure();

		// Create the figure:
		figure.create( document );

		// [2] Instantiate a new canvas generator and configure:
		canvas = xfig.canvas( figure )
			.width( 700 )
			.height( 500 );

		// Create the canvas:
		canvas.create();

		// [3] Instantiate a new graph generator and configure:
		graph = xfig.graph( canvas )
			.width( 500 )
			.height( 350 )
			.position({
				'left': 90,
				'top': 80
			})
			.xMin( 0 )
			.xMax( 1 )
			.yMin( 0 );

		// Create the graph:
		graph.create( 'line' );

		// [4] Instantiate a new data generator and configure:
		data = xfig.data( this._data )
			.accessors( 'x', function ( d ) {
				return d[ 0 ];
			})
			.accessors( 'y', function ( d ) {
				return d[ 1 ];
			});

		// Format the data:
		data.format( [ 'x', 'y' ] );

		// Bind the data instance to the graph:
		graph.data( data )
			.yMax( data.max( function ( d ) {
				return d[ 1 ];
			}));

		// [5] Instantiate a new line generator and configure:
		line = xfig.line( graph )
			.interpolation( 'basis' )
			.labels( [ 'data 0' ] );

		// Create the line:
		line.create();

		// [6] Instantiate a new axes generator and configure:
		axes = xfig.axes( graph );

		// Create the axes:
		axes.create();

		// [7] Instantiate a new annotations generator and configure:
		annotations = xfig.annotations( graph );

		// Create the annotations element:
		annotations.create();

		// [8] Instantiate a new title instance and configure:
		title = annotations.title()
			.top( -30 )
			.left( 0 );

		// Add a (sub)title:
		title.create( 'Subtitle' );

		// Return the figure:
		return figure.parent().innerHTML;
	}; // end METHOD create()


	// EXPORTS //

	module.exports = Figure;

})();
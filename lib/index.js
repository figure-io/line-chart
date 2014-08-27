/**
*
*	CHART: line
*
*
*	DESCRIPTION:
*		- Create line charts.
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

	var // Figure library:
		xfig = require( 'figure.io' ),

		// Virtual DOM:
		jsdom = require( 'jsdom' ).jsdom;


	// DOCUMENT //

	var document = jsdom( '<html><head></head><body></body></html>' );


	// FIGURE //

	/**
	* FUNCTION: createFigure( config, data )
	*	Creates a figure containing a line chart.
	*
	* @param {Object} config - chart configuration
	* @param {Object|Array} data - chart data
	* @returns {String} serialized chart
	*/
	function createFigure( config, data ) {
		var figure,
			canvas,
			annotations,
			title,
			graph,
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
		data = xfig.data( data )
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

		// [7.1] Instantiate a new title instance and configure:
		title = annotations.title()
			.top( -30 )
			.left( 0 );

		// Add a (sub)title:
		title.create( 'Subtitle' );

		// Return the figure:
		return figure.parent().innerHTML;
	} // end FUNCTION createFigure()


	// EXPORTS //

	module.exports = createFigure;

})();
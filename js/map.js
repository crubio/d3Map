/**
 * A d3 wrapper to consume JSON and draw a simple map.
 * 
 * Requires name, parent, height, width, data, type, map values in an array of objects. See example for structure.
 * There are not defaults yet built in, so please provide these values for a successful build.
 * Optional parameters include attributes (attr) and labels.
 *
 * This module builds one svg and creates layers for each object in the array as a <g> element. Values are stored in case they are needed later (see examples for extending)
 * 
 * @param  {Array}  ){	var _params;	var  _svg;	var _albersProjection;	var _geoPaths [Private values resturned at the conclusion of draw]
 * @return {object}         [Saved values after draw has completed]
 */
var Map = (function(){

	var _params;
	var _svg;
	var _albersProjection;
	var _geoPaths = [];

	function _init () {
		// Check for parameters array
		if (Array.isArray(_params) === false) {
			console.error("parameters out of wack");
			return;
		}

		if (window.d3 == undefined) { console.error("d3 version 3.x required")}
	}

	// Creates a single SVG for this application
	function _createSvg (obj) {
		if (!_svg) {
			return _svg = d3.select(obj.parent)
				.append("svg")
				.attr("height",obj.height)
				.attr("width", obj.width);
		}
		return _svg;
	}

	function _createAlbers (obj) {
		if (!_albersProjection) {
			_albersProjection = d3.geo.albers()
				.scale( obj.map.scale )
				.rotate( obj.map.rotate )
				.center( obj.map.center )
				.translate( [obj.width/2,obj.height/2] );
		}
	}

	function get() {
		return {
			params: _params,
			svg: _svg,
			albers: _albersProjection,
			geoPaths: _geoPaths
		}
	}

	function draw (params) {
		_params = params;
		_init();

		// Draw each object in the array
		_params.forEach(function(row,idx) {

			// Setup parent SVG first time	
			_createSvg(row);

			// Set basic albers projection
			_createAlbers(row);

			// Each row uses a different geoPath
			_geoPaths[idx] = d3.geo.path()
				.projection(_albersProjection);

			// Append g to svg and feed the data
			var currentSvg = _svg.append("g").attr("id", row.name);

			currentSvg.selectAll("path")
				.data(row.data) // Our variable containing the object from neighborhoods.js
				.enter() // For incoming data
				.append("path") // Add to path parameter in the SVG
				.attr("d", _geoPaths[idx]
					.projection(_albersProjection) // Feed in our projection parameters
					.pointRadius( function(d) {
						return row.map.pointRadiusValue;
				})) // d is an SVG attr that defines the coordinates of a path

			// Add in styles
			for (prop in row.attr) {
				currentSvg.attr(prop, row.attr[prop]);
			}

			if (row.labels) {
				currentSvg.selectAll("text")
					.data(row.data)
					.enter()
					.append("text")
					.attr("transform", function(d) { return "translate(" + _geoPaths[idx].centroid(d) + ")"; })
					.attr("class", function(d) {
						var className = d.properties[row.labels].replace(/\s+/g, "-").toLowerCase() + "-label";
						return className;
					})
					.text(function(d) { return d.properties[row.labels]; })
			}

		})

		return {
			params: _params,
			svg: _svg,
			albers: _albersProjection,
			geoPaths: _geoPaths
		}

	}

	return {
		draw: draw,
		get: get
	}

})();
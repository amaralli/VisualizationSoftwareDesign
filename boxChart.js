window.BoxChart = (function() {

	//constructs the box chart object, with no arguments
	var myChart = function() {

		//////////////////////////////////
		/****DEFAULTS AND VALUES*********/
		//////////////////////////////////

		/***Defaults assigned to user***/

		//size of margins
		var margin = {
			left:70,
			bottom:100,
			top:50,
			right:50,
		};

		var pointRadius = 5;

		var transitionTime = 1000;

		/*****Values changeable by user****/

		//as the user changes height and width, these may
		//change. 600 and 1000 are the default bounds
		var heightBound = 600;
		var widthBound = 400;

		//the x-value and y-values for the data set 
		var xVar;
		var yVar;

		//the color of the rectangles, with default of teal-ish blue
		var color = '#18c3bd';

		//variable representing user decision for points or lines
		//for min/max markers. Defaults to using dots
		var pointMarkers = true;

		/******Calculated values***********/

		// Height/width of the drawing area for data symbols
		var height = heightBound - margin.bottom - margin.top;
		var width = widthBound - margin.left - margin.right;

		//quartile data
		var boxChartMin;
		var boxChartQ1;
		var boxChartMedian;
		var boxChartQ3;
		var boxChartMax;

		//scales
		var xScale, yScale;

		//////////////////////////////////
		/*********CHART CREATION*********/
		//////////////////////////////////

		//generates the box and whisker plot
		function makeChart(selection) {
			selection.each(function(data1) {
				data = data1[0];
			
				var svg = d3.select(this)
						.append('svg')
						.attr('height', heightBound)
						.attr('width', widthBound);

				//create a G element to draw rectangles on
				var rect = svg.append('g');

				//create a G element to draw vertical lines on
				var vertLine = svg.append('g');

				//create a G elemet to draw median line on
				var medianLine = svg.append('g');

				//create a G element to draw min/max markers on
				var minMaxMarkers = svg.append('g');

				//append an xAxis label to the SVG, with appropriate margins
				var xAxisLabel = svg.append('g')
									.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
									.attr('class', 'axis')


				//append an xAxis label to the SVG, with appropriate margins
				var yAxisLabel = svg.append('g')
									.attr('class', 'axis')
									.attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')


				//append text to label the x axis
				var xAxisText = svg.append('text')
								   .attr('transform', 'translate(' + (margin.left + width/2) + ',' + (height + margin.top + 40) + ')')
								   .attr('class', 'title')

				//append text to label the y axis
				var yAxisText = svg.append('text')
								   .attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + height/2) + ') rotate(-90)')
								   .attr('class', 'title');

			   	//determines scale for axis and all points, and finds
			   	//quartile data
			    var scale = function() {

					xScale = d3.scale.ordinal().rangeBands([0, width], .1).domain([xVar]);

					boxChartMin = d3.min(data, function(d) {return +d[yVar]});

					boxChartMax = d3.max(data, function(d) {return +d[yVar]});

					var yVals = data.map(function(d) {
						return +d[yVar];
					})

					function compareNumbers(a, b)
					{
						return a - b;
					}

					yVals.sort(compareNumbers);

					console.log(yVals);

					boxChartQ1 = d3.quantile(yVals, .25);
					console.log(boxChartQ1);

					boxChartMedian = d3.quantile(yVals, .5);
					console.log(boxChartMedian);

					boxChartQ3 = d3.quantile(yVals, .75);
					console.log(boxChartQ3);

					yScale = d3.scale.linear().range([height, 0]).domain([0, boxChartMax]);
				}

				//creates appropriate axes
				var setAxes = function() {
					var xAxis = d3.svg.axis()
								  .scale(xScale)
								  .orient('bottom');

					var yAxis = d3.svg.axis()
								  .scale(yScale)
								  .orient('left')
								  .tickFormat(d3.format('.2s'));

			    	xAxisLabel.transition().duration(transitionTime).call(xAxis);
			    	yAxisLabel.transition().duration(transitionTime).call(yAxis);


			    	//xAxisText.text(xVar);
			    	yAxisText.text(yVar);
				}

				//actually creates the graphical rendition of data
				var draw = function() {
					scale(data);

					setAxes();

					/////////////////////////////////////////
					/*********SET UP RECTANGLES*************/
					/////////////////////////////////////////

				    rect.append('rect')
			    		.attr('x', function(d) {
			    			return margin.left + xScale(xVar);
			    		})
			    		.attr('y', function(d) {
			    			return margin.top + yScale(boxChartQ3)
			    		})
			    		.attr('height', function(d) {
			    			console.log("Q3 " + yScale(boxChartQ3));
			    			console.log("Q1 " + yScale(boxChartQ1));
			    			return yScale(boxChartQ1) - yScale(boxChartQ3)
			    		})
			    		.attr('width', xScale.rangeBand())
			    		.attr('stroke-width', 2)
			    		.attr('stroke', 'black')
			    		.style('fill', color);

					/////////////////////////////////////////
					/***********DRAW END POINTS*************/
					/////////////////////////////////////////

					if(pointMarkers) {
					    minMaxMarkers.append('circle')
						    	.attr('cx', function(d) {
						    		return margin.left + xScale(xVar) + (0.5 * xScale.rangeBand());
						    	})
						    	.attr('cy', margin.top + yScale(boxChartMax))
						    	.attr('r', pointRadius)
						    	.style('fill', '#000000');

				    	minMaxMarkers.append('circle')
						    	.attr('cx', function(d) {
						    		return margin.left + xScale(xVar) + (0.5 * xScale.rangeBand());
						    	})
						    	.attr('cy', margin.top + yScale(boxChartMin))
						    	.attr('r', pointRadius)
						    	.style('fill', '#000000');
				    } else {
				    	minMaxMarkers.append('line')
					    	.attr('x1', function(d) {
	    						return margin.left + xScale(xVar);
			    			})
							.attr('y1', margin.top + yScale(+boxChartMin))
							.attr('x2', function(d) {
					    		return margin.left + xScale(xVar) + xScale.rangeBand();
					    	})
							.attr('y2', margin.top + yScale(+boxChartMin))
							.attr('stroke-width', 2)
							.attr('stroke', 'black');

						minMaxMarkers.append('line')
					    	.attr('x1', function(d) {
	    						return margin.left + xScale(xVar);
			    			})
							.attr('y1', margin.top + yScale(+boxChartMax))
							.attr('x2', function(d) {
					    		return margin.left + xScale(xVar) + xScale.rangeBand();
					    	})
							.attr('y2', margin.top + yScale(+boxChartMax))
							.attr('stroke-width', 2)
							.attr('stroke', 'black');
				    }

					/////////////////////////////////////////
					/***********DRAW VERTICAL LINE**********/
					/////////////////////////////////////////

					vertLine.append('line')
						.attr('x1', function(d) {
				    		return margin.left + xScale(xVar) + (0.5 * xScale.rangeBand());
				    	})
						.attr('y1', margin.top + yScale(boxChartMin, 10))
						.attr('x2', function(d) {
				    		return margin.left + xScale(xVar) + (0.5 * xScale.rangeBand());
				    	})
						.attr('y2', margin.top + yScale(boxChartMax, 10))
						.attr('stroke-width', 2)
						.attr('stroke', 'black');

					/////////////////////////////////////////
					/***********DRAW MEDIAN LINE***********/
					/////////////////////////////////////////

					medianLine.append('line')
						.attr('x1', function(d) {
				    		return margin.left + xScale(xVar);
				    	})
						.attr('y1', margin.top + yScale(boxChartMedian))
						.attr('x2', function(d) {
				    		return margin.left + xScale(xVar) + xScale.rangeBand();
						})
						.attr('y2', margin.top + yScale(boxChartMedian))
						.attr('stroke-width', 2)
						.attr('stroke', 'black');

				};

				//actually calls the draw functionality
				draw(data);
			});

			//returns an object for chaining purposes
			return this;
		};



		//////////////////////////////////
		/************FUNCTIONS***********/
		//////////////////////////////////

		//sets or returns the width of the box chart
		makeChart.width = function(n) {
			if(!arguments.length) return widthBound;
			widthBound = n;
			width = widthBound - margin.bottom - margin.top;
			return this;
		}

		//sets or returns the height of the box chart
		makeChart.height = function(n) {
			if(!arguments.length) return heightBound;
			heightBound = n;
			height = heightBound - margin.bottom - margin.top;
			return this;
		}

		//sets or returns the color of the box chart
		makeChart.color = function(value) {
			if(!arguments.length) return color;
			color = value;
			return this;
		}

		//allows user to choose lines instead of dots for min/max
		makeChart.usePoints = function(value) {
			if(!arguments.length) return pointMarkers;
			if(typeof pointMarkers === 'boolean') {
				pointMarkers = value;
			}
			return this;
		}

		//allows user to set yVariable to parse through the data
		makeChart.yVariable = function(value) {
			if(!arguments.length) return yVar;
			yVar = value;
			return this;
		}

		//allows user to set x-axis label to parse through the data
		makeChart.xAxis = function(value) {
			if(!arguments.length) return xVar;
			xVar = value;
			return this;
		}

		//returns the chart after defaults are set
		return makeChart;

	};

	//returns constructed chart
	return myChart;

})();
$(document).ready(function () {
	var selectDiv = d3.select('#stuff');

	var boxChart = BoxChart()
			.width(1000)
			.height(400)
			.color('blue')
			.usePoints(false)
			.xAxis("Running Speeds")
			.yVariable('Speed');

	d3.csv('morely.csv', function(error, data) {
		console.log(boxChart);
		var boxChartWrapper = selectDiv.datum([data]).call(boxChart);
	})
	

});
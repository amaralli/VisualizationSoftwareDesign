$(document).ready(function () {
	var selectDiv = d3.select('#stuff');

	var boxChart = BoxChart()
			.width(600)
			.height(1600)
			.color('pink')
			.usePoints(true)
			.xAxis("Butts")
			.yVariable('Speed');

	d3.csv('morely.csv', function(error, data) {
		console.log(boxChart);
		var boxChartWrapper = selectDiv.datum([data]).call(boxChart);
	})
	

});
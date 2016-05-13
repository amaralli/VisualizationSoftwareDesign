# VisualizationSoftwareDesign
By Allison Amaral

###Welcome to the Box And Whisker Plot Creator

With this software, anyone can simply create a box and whisker plot!

####Background

A box and whisker plot represents the spread of a set of data, including the minimum, the maximum, the median and the upper and lower quartile. 

This software requires that you have a dataset with linear (numerical) y-values and ordinal (qualitative) x-values. After that, we'll handle the rest!

####Available customization

In this software, we will handle most of the nitty-gritty ourselves. However, there are still some things you can change, to make the box and whisker plot of your dreams!

Below is a list of the functions you can call. Further down, you will see instructions on how to use them.

+ You can change the **width**- but it will default to 400

`boxChart.width(value)`

+ You can change the **height**- but it will default to 600

`boxChart.height(value)`

+ You can change the color of the **box**- but it will default to a teal color. This can take in any Javascript color- "black", "#000000", and "rgb(256, 256, 256)" are all acceptable.

`boxChart.color(value)`

+ You can change whether or not the maximums or minimums will be **represented with lines or dots**- but it will default to dots. Passing in _true_ will give you dots, passing in _false_ will give you lines.

`boxChart.usePoints(true)`

+ You can change the **xAxis title**- it will be empty by default

`boxChart.xAxis("Example")`

+ You can change the **y-variable** represented in your box and whisker data. _This must match the format of the variable name in your dataset. If it has a capital letter, it must also have a capital letter, etc_

`boxChart.yVariable("Variable Name")`

You can use, or not use these, however you see fit. Outside of this, we'll worry about the rest!

####Using This Software

Now that you know what you can do with this software, let's look at how you use it.

1.First, save this Javascript file into the folder where the file you will be using is located.

2. After, you need to select the div that you would like to place your SVG and drawing in.
  * `var selectDiv = d3.select(DIV)`

3. Then, create your BoxChart object
  * `var chart = BoxChart()`

4. Once it's created, feel free to customize however you like with the above list of functions!
  * `chart.width(200).height(800)`

5. Finally, bind your data, and call your BoxChart object, and you'll have your box and whisker chart!
  * var boxChartWrapper = selectDiv.datum([data]).call(boxChart);`

#####After this, you have your chart! =)


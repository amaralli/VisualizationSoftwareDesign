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

1. You can change the *width*- but it will default to 400

`boxChart.width(value)`

2. You can change the *height*- but it will default to 600

`boxChart.height(value)`

3. You can change the color of the *box*- but it will default to a teal color. This can take in any Javascript color- "black", "#000000", and "rgb(256, 256, 256)" are all acceptable.

`boxChart.color(value)`

4. You can change whether or not the maximums or minimums will be *represented with lines or dots*- but it will default to dots. Passing in _true_ will give you dots, passing in _false_ will give you lines.

`boxChart.usePoints(true)`

5. You can change the *xAxis title*- it will be empty by default

`boxChart.xAxis("Example")`

6. You can change the *y-variable* represented in your box and whisker data. _This must match the format of the variable name in your dataset. If it has a capital letter, it must also have a capital letter, etc_

`boxChart.yVariable("Variable Name")`

You can use, or not use these, however you see fit. Outside of this, we'll worry about the rest!

####Using This Software

Now that you know what you can do with this software, let's look at how you use it.


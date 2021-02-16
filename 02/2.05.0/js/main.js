/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    2.5 - Activity: Adding SVGs to the screen
 */

const svg = d3
	.select("#chart-area")
	.append("svg")
	.attr("width", 400)
	.attr("height", 400);

svg.append("rect")
	.attr("x", 20)
	.attr("y", 100)
	.attr("width", 300)
	.attr("height", 60)
	.attr("fill", black)
	.attr("stroke", green);

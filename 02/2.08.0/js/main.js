/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    2.8 - Activity: Your first visualization!
 */

// Fetches JSON data
d3.json("data/buildings.json")
	.then((data) => {
		data.forEach((d) => {
			d.height = Number(d.height);
		});
		console.log(data);

		// Defines margins for svg group
		const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100 };
		const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
		const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM;

		// Map chart area
		const svg = d3
			.select("#chart-area")
			.append("svg")
			.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM);

		// Appends Group element to the canvas
		const g = svg
			.append("g")
			.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

		const x = d3
			.scaleBand()
			.domain(data.map((d) => d.name))
			.range([0, WIDTH])
			.paddingInner(0.3)
			.paddingOuter(0.1);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.height)])
			.range([0, HEIGHT]);

		// Defines the axes
		const xAxisCall = d3.axisBottom(x);

		const yAxisCall = d3.axisLeft(y);

		// Generates data visualisation as a bar chart
		const bars = g.selectAll("rect").data(data);

		bars.enter()
			.append("rect")
			.attr("x", (d) => x(d.name))
			.attr("y", 0)
			.attr("height", (d) => y(d.height))
			.attr("width", x.bandwidth)
			.attr("fill", (d) => {
				if (d.name === "Burj Khalifa") {
					return "red";
				} else {
					return "pink";
				}
			});
	})
	.catch((error) => {
		console.log(error);
	});

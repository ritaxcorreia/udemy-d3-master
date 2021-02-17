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
		const MARGIN = { LEFT: 130, RIGHT: 10, TOP: 10, BOTTOM: 130 };
		const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT;
		const HEIGHT = 600 - MARGIN.TOP - MARGIN.BOTTOM;

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

		// Label on X axis
		g.append("text")
			.attr("class", "x axis-label")
			.attr("x", WIDTH / 2)
			.attr("y", HEIGHT + 110)
			.attr("font-size", "16px")
			.attr("text-anchor", "middle")
			.text("The world's tallest buildings");

		// Label on Y axis
		g.append("text")
			.attr("class", "y axis-label")
			.attr("x", -(HEIGHT / 2))
			.attr("y", "-60")
			.attr("font-size", "16px")
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "middle")
			.text("Height (m)");

		const x = d3
			.scaleBand()
			.domain(data.map((d) => d.name))
			.range([0, WIDTH])
			.paddingInner(0.3)
			.paddingOuter(0.1);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.height)])
			.range([HEIGHT, 0]);

		// Defines the axes
		const xAxisCall = d3.axisBottom(x);
		g.append("g")
			.attr("class", "x axis")
			.attr("transform", `translate(0, ${HEIGHT})`)
			.call(xAxisCall)
			.selectAll("text")
			.attr("y", "10")
			.attr("x", "-5")
			.attr("text-anchor", "end")
			.attr("transform", "rotate(-40)");

		const yAxisCall = d3
			.axisLeft(y)
			.ticks(3)
			.tickFormat((d) => d + "m");

		g.append("g").attr("class", "y axis").call(yAxisCall);

		// Generates data visualisation as a bar chart
		const bars = g.selectAll("rect").data(data);

		bars.enter()
			.append("rect")
			.attr("x", (d) => x(d.name))
			.attr("y", (d) => y(d.height))
			.attr("height", (d) => HEIGHT - y(d.height))
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

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

		// Map chart area
		const svg = d3
			.select("#chart-area")
			.append("svg")
			.attr("width", 600)
			.attr("height", 600);

		const x = d3
			.scaleBand()
			.domain(data.map((d) => d.name))
			// .domain([d3.min(data, (d) => d.name), d3.max(data, (d) => d.name)])
			.range([0, 400])
			.paddingInner(0.3)
			.paddingOuter(0.1);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(data, (d) => d.height)])
			.range([0, 400]);

		// Generates data visualisation as a bar chart
		const bars = svg.selectAll("rect").data(data);

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

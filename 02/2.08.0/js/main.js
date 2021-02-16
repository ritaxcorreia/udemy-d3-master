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
			.attr("width", 500)
			.attr("height", 700);

		// Generates data visualisation as a bar chart
		const bars = svg.selectAll("rect").data(data);

		bars.enter()
			.append("rect")
			.attr("x", (d, i) => i * 50 + 50)
			.attr("y", 0)
			.attr("height", (d) => d.height)
			.attr("width", 40)
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

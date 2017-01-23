function circles(svg, data, speed, colors, height, width, rscale) {
    	console.log("circles alertt");

			//var rad = function(x) { return (x**3)/(x*height)};
			//console.log(rad(50));
			var circle = svg.selectAll("circle")
										.data(data)
										.enter()
										.append("circle")
                    .attr("cx", function(d,i) {return ((i+1)*(width/3))})
              			.attr("cy", height/2)
										.attr("r",0)
                    .attr("stroke", "black")
                    .attr("stroke-width", 1)
                    .attr("fill", function(d,i) {return colors[i]})
										.transition()
										.duration(speed)
										.attr("r",function(d) {return rscale(d)});
}

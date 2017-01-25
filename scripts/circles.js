function circles(svg, data, speed, colors, height, width, rscale) {
    	//console.log("circles alertt");
      var labels = ["you", "your cow"];
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


      svg.selectAll("circle").append("text")
        .attr("dx", function(d,i){return ((i+1)*(width/3))})
        .text(function(d,i){return labels[i]})
}

function circles_exit(svg, speed) {
  var circle = svg.selectAll("circle")
                  .transition()
                  .duration(speed)
                  .attr("r",0);

                svg.selectAll("text")
                   .attr("stroke", "000")
}

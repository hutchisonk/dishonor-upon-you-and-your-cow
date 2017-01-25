function linegraph(svg, data, slow, colors, height, width, xscale, yscale, barmargin) {

        var bardataset = data//.reverse();
        var barwidth = +svg.attr("width") - barmargin.left - barmargin.right,
            barheight = +svg.attr("height") - barmargin.top - barmargin.bottom;

        var barw = barwidth/50;//7;

        var g = svg.append("g")
  						.attr("transform", "translate(" + barmargin.left + "," + barmargin.top + ")");

        var dotsy = bardataset.map(function(x){
            return barheight - yscale(x);
            });


        var lineData = [{ "x": barmargin.left, "y": Number(dotsy[1])},  { "x": (1)*(width/3), "y": Number(dotsy[1])},
                  { "x": (2)*(width/3), "y": Number(dotsy[0])},  { "x": width, "y": Number(dotsy[0])}];

          //console.log(lineData)

        var lineFunction = d3.line()
                          .x(function(d) { return d.x; })
                          .y(function(d) { return d.y; });
                          //.interpolate("linear");

        var lineGraph = svg.append("path")
                        .attr("d", lineFunction(lineData))
                        .attr("stroke", "black")
                        .attr("stroke-width", 1)
                        .attr("fill", "none")
                        .classed("graph_path", true);;


        var dots = svg.selectAll("circle")
                        .data(bardataset)
                        .enter()
                        .append("circle")
                        .attr("cx", function(d,i) {return ((Math.abs(i-1)+1)*(width/3))})
                        .attr("cy", function(d) { dotsy.push(Number(barheight - yscale(d))); return barheight - yscale(d); })
                        .attr("r",0)
                        .transition()
                        .duration(slow)
                        .attr("r", 10);

          //console.log(dotsy);

        dots.attr("fill", function(d,i) { return colors[Math.abs(i-1)]})
            .attr("stroke", "black");


          var xaxispositions = function(x) {
            return (barwidth/4)-(barw/2)+(x*(barwidth/(3+(-x))));
          }

          //x axis
          g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + barheight + ")")
                .call(d3.axisBottom(xscale)
                        .ticks(2)
                        .tickFormat(function (d,i) { return ["you", "your cow"][Math.abs(i-1)]; }));

            var tick = g.selectAll(".tick");
            tick.attr("transform",function(d,i){
                  return "translate(" + (parseInt(xaxispositions(Math.abs(i-1))) + parseInt(barw/2))+ " ,"+0+")"});

          //y axis
          g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(yscale)
                        .ticks(1)
                        .tickFormat(function (d,i) { return ["more", "less"][Math.abs(i-1)]; }));


          var xtext = d3.select(".axis--x")
                .append("text")
                .attr("class", "axislabel")
                .attr("transform",
                          "translate(" + (width/2) + " ," + (-height/2) + ")")
                .style("text-anchor", "middle")
                .text("Upon whom");

          //y axis label
          var ytext = d3.select(".axis--y")
                .append("text")
                .attr("class", "axislabel")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "-0.71em")
                .attr("text-anchor", "end")
                .text("Dishonor");

}//linegraph function definition



function lineUpdate(svg, dataset, slow, colors, height, width, xscale ,yscale, barmargin) {

          var barwidth = +svg.attr("width") - barmargin.left - barmargin.right,
          barheight = +svg.attr("height") - barmargin.top - barmargin.bottom;

          var bardataset = dataset//.reverse();
          dotsy = [];


             svg.selectAll("circle").data(bardataset).transition()
     	    	.duration(500)
     	        .attr("cy", function(d) { dotsy.push(barheight - yscale(d)); return barheight - yscale(d); })

              var dotsy = bardataset.map(function(x){
                return barheight - yscale(x);
              });

              var lineData = [{ "x": barmargin.left, "y": Number(dotsy[1])},  { "x": (1)*(width/3), "y": Number(dotsy[1])},
                      { "x": (2)*(width/3), "y": Number(dotsy[0])},  { "x": width, "y": Number(dotsy[0])}];

              //console.log(lineData)

              var lineFunction = d3.line()
                              .x(function(d) { return d.x; })
                              .y(function(d) { return d.y; });
                              //.interpolate("linear");


              var lineGraph = svg.selectAll("path.graph_path").transition().duration(500)
                            .attr("d", lineFunction(lineData))
                            .attr("stroke", "black")
                            .attr("stroke-width", 1)
                            .attr("fill", "none");


}//lineUpdate function definition

function line_exit(svg, speed) {

  //fade out line
  var lineGraph = svg.selectAll("path.graph_path")
                     .transition()
                     .duration(speed)
                     .attr("stroke", "000")
  //zoom out circles - bigger then smaller?

  var circle = svg.selectAll("circle")
                  .transition()
                  .duration(speed)
                  .attr("r",0);
}

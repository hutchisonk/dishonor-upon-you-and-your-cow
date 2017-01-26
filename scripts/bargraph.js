function bargraph(svg, data, slow, colors, height, width, xscale ,yscale, barmargin, barw, xpositions) {
        var bardataset = data//.reverse();
        console.log(barw);

        // var barwidth = +svg.attr("width") - barmargin.left - barmargin.right,
        //  barheight = +svg.attr("height") - barmargin.top - barmargin.bottom;
        //
        // var barw = barwidth/7;

         var g = svg.append("g")
  						.attr("transform", "translate(" + barmargin.left + "," + barmargin.top + ")");

          var bars = g.selectAll(".bar")
    							.data(bardataset)
    							.enter()
                  .append("rect");

          // var xaxispositions = function(x) {
          //   return (barwidth/4)-(barw/2)+(x*(barwidth/(3+(-x))));
          // }

          //bar attributes
          bars.attr("class", "bar")
              .attr("x", function(d,i) {console.log("positions are "+xpositions[Math.abs(i-1)]); return xpositions[Math.abs(i-1)] - barw/2 })
              .attr("width", barw)
              .attr("y", function(d) { return ((svg.attr("height") - barmargin.top - barmargin.bottom) - yscale(d)/2); })
              .attr("height", function(d) { return 0; })
              .transition()
              .duration(slow)
              .attr("y", function(d) { return (svg.attr("height") - barmargin.top - barmargin.bottom) - yscale(d); })
              .attr("height", function(d) { return yscale(d); })
              .attr("fill", function(d,i) { return colors[Math.abs(i-1)] })
              .attr("stroke", "black")
              .attr("stroke-width", 1);
 //             .attr("x", function(d,i) { return (barwidth/4)-(barw/2)+(i*(barwidth/(3+(-i)))); })

          //x axis
          g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + (svg.attr("height") - barmargin.top - barmargin.bottom) + ")")
                .call(d3.axisBottom(xscale)
                        .ticks(2)
                        .tickFormat(function (d,i) { return ["you", "your cow"][Math.abs(i-1)]; }));

          var tick = g.selectAll(".tick");
          tick.attr("transform",function(d,i){
                return "translate(" + (xpositions[Math.abs(i-1)])+ " ,"+0+")"});
                    //.tickValues(function(d,i) {console.log("positions are "+xaxispositions(Math.abs(i-1))); return xaxispositions(Math.abs(i-1)) }));
                    //.attr("padding", "20px"));
                    //.tickValues(function(d,i) {console.log(xaxispositions(i)); return xaxispositions(i); }));


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

}//bargraph function definition

function barUpdate(svg, data, slow, colors, height, width, xscale ,yscale, barmargin, barw,xpositions) {

          console.log("h is "+height);
          var barwidth = +svg.attr("width") - barmargin.left - barmargin.right,
          barheight = +svg.attr("height") - barmargin.top - barmargin.bottom;

          var bardataset = data//.reverse();

          var barw = width/7;
          var g = svg.selectAll("g");

           var bars = g.selectAll(".bar")
                   .data(bardataset)
                   .transition()
                   .duration(750)
                     .attr("y", function(d) { return barheight - yscale(d); })
                     .attr("height", function(d) { return yscale(d); });

}//barupdate function definition


function bar_exit(svg, speed, barmargin, yscale) {

  var barwidth = +svg.attr("width") - barmargin.left - barmargin.right,
  barheight = +svg.attr("height") - barmargin.top - barmargin.bottom;

  var bars = svg.selectAll(".bar")
              .transition()
              .duration(speed)
              .attr("y", function(d) { return (barheight - yscale(d)/2); })
              .attr("height", function(d) { return 0; });
}

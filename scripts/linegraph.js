function linegraph(svg, data, slow, colors, height, width, xscale ,yscale, barmargin) {

        // can we just make this a bar chart but instead of bars we have little dots that we maybe
        // or maybe not connect with a thin line?

        var bardataset = data;//.reverse();
        // bardataset.unshift(0);
        // bardataset.push(width);
        // console.log("bds is "+bardataset);
        var barwidth = +svg.attr("width") - barmargin.left - barmargin.right,
          barheight = +svg.attr("height") - barmargin.top - barmargin.bottom;
        var barw = barwidth/7;

        var g = svg.append("g")
  						.attr("transform", "translate(" + barmargin.left + "," + barmargin.top + ")");

        var line = d3.line()//this is called the line generator
        .x(function(d,i) { return parseInt(xaxispositions(Math.abs(i-1))) + parseInt(barw/2); })
        .y(function(d) { /*console.log(d, yscale(d));*/ return (yscale(d)); });

        var xaxispositions = function(x) {
          return (barwidth/4)-(barw/2)+(x*(barwidth/(3+(-x))));
        }

        //x axis
        g.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + barheight + ")")
              .call(d3.axisBottom(xscale)
                      .ticks(1)
                      .tickFormat(function (d,i) { return ["you", "your cow"][Math.abs(i-1)]; }));
                      //.attr("padding", "20px"));
                      //.tickValues(function(d,i) {console.log(xaxispositions(i)); return xaxispositions(i); }));

          var tick = g.selectAll(".tick");
          tick.attr("transform",function(d,i){
                return "translate(" + (parseInt(xaxispositions(Math.abs(i-1))) + parseInt(barw/2))+ " ,"+0+")"})

          //y axis
          g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(yscale)
                        .ticks(1)
                        .tickFormat(function (d,i) { return ["more", "less"][Math.abs(i-1)]; }));

          // var linepath = svg.append("path")
          //     .data(data).enter()
          //     .append("path")
          //     .attr("d", function() {
          //       console.log("ds is "+bardataset); return line(data)
          //     }) // replacing line with M0,0l100,100 draws a line
          //     .attr("class", "line")
          //     .style("stroke", "red")
          //     .style("stroke-width", "100")
          //     .attr('fill', 'none');
          //
          // var linepath = g.append("path")
          //     .datum(data)
          //     .attr("class", "line")
          //     .attr("d", line);

          svg.append("path")
              .data([data])
              .attr("class", "line")
              .attr("d", line);

}//linegraph function definition


//
// function linegraph(svg, data, slow, colors, height, width, xscale ,yscale, barmargin) {
//         //  console.log("h is "+height);
//         //  var barwidth = +svg.attr("width") - barmargin.left - barmargin.right,
//         //  barheight = +svg.attr("height") - barmargin.top - barmargin.bottom;
//
//           var bardataset = data;//.reverse();
//
//           var barw = width/7;
//           var g = svg.selectAll("g");
//
//            var bars = g.selectAll(".bar")
//                    .data(bardataset)
//                    .transition()
//                    .duration(750)
//                      .attr("y", function(d) { return barheight - yscale(d); })
//                      .attr("height", function(d) { return yscale(d); });
//
// }//linegraph function definition

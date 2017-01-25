/////I REALLY REALLY WANT TO MAKE THIS PIE CHART AN OBJECT WITH PROPERTIES AND METHODS THAT
//I CAN ACCESS AND THATCAN TALK TO EACH OTHER OKAy


  //
  // var height = $('svg').attr('height');
  // var width = $('svg').attr('width');
  // var radius = (Math.min(width, height) / 2);//fix********


//var radius = (Math.min(width, height) / 2);

var pie = d3.pie()
            //.value(function(d){console.log(d); return d;})
            .sort(null);


var piechart = function(svg, dataset, speed, colors, height, width) {
    var radius = (Math.min(width, height) / 2);

    var dot = d3.arc()
        .outerRadius(1)
        .innerRadius(1);

    var arc = d3.arc()
        .outerRadius(radius-15)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    console.log(pie(dataset));

    var path = svg.selectAll('path')
          .data(pie(dataset))
          .enter()
          .append('path')
          .attr('d', dot)
          .transition()
          .duration(speed)
          .attr('d', arc)
          .attr("stroke", "black")
          .attr("stroke-width", 1)
          .attr('fill', function(d,i){
            return colors[i];
          });

    function arcTween(a) {
      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
        return arc(i(t));
      };
    }

    path.transition().duration(speed).attrTween("d", arcTween);
        //path.style("stroke", #fff)

      // console.log(path);
      // path.transition().duration(50).attrTween("d", arcTween)
      //     .attr("d", arc);

      // g.append("text")
      //   //.attr("transform", function(d,i) { return "translate(" + labelArc.centroid(d) + ")"; })
      //   .attr("dy", ".35em")
      //   .text(function(d,i) { return d[i] });
  }



var updatePie = function(svg, dataset, slow, colors, height, width) {
      var radius = (Math.min(width, height) / 2);

      var svg = d3.select("svg")
          // .attr("width", width)
          // .attr("height", height)
          // .append("g")
          .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var dot = d3.arc()
          .outerRadius(1)
          .innerRadius(1);

      var arc = d3.arc()
          .outerRadius(radius-15)
          .innerRadius(0);

      function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function(t) {
          return arc(i(t));
        };
      }

      var labelArc = d3.arc()
          .outerRadius(radius - 40)
          .innerRadius(radius - 40);

      var path = svg.selectAll('path')
            .data(pie(dataset))
            // .enter()
            // .append('path')
            // .attr('d', arc)
            // .attr('fill', function(d,i){
            //   return colors[i];
            // });

      //pie.value(function(d){ return d; })
  //    var path = svg.selectAll('path');
  //    path.data(pie(dataset));
      //var path = g.append("path");

      path.transition().duration(slow).attrTween("d", arcTween);
          //.attr("d", arc);
}//updatePie function

function pie_exit(svg, speed) {

  var dot = d3.arc()
              .outerRadius(1)
              .innerRadius(1);

    var path = svg.selectAll('path')
                  .transition()
                  .duration(speed)
                  .attr("d", dot);
    //
    // var circle = svg.selectAll("circle")
    //                 .transition()
    //                 .duration(speed)
    //                 .attr("r",0);

}

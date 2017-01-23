$(document).ready(function() {
  var dataset = [50,50];

	var barsgraphbars;
  var whichgraph = "";
	var extendedDS = []
	var you = 1;
	for (i=0;i<100;i++) {
		you = !you;
		extendedDS.push([you ? "you" : "your cow", Math.floor(Math.random()*101) - 50])
	}


	//$( function() {
	$( "#slider" ).slider({
		min: 1,
		max: 99,
		value: 50,

		slide: (function(event, ui) {
			//console.log(ui.value);
			//UPDATE THE DATASET
			dataset = [100-ui.value, ui.value];
			//console.log(dataset);
			//callGraph(whichgraph, dataset);
			//$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}),
		change: function (event, ui){
				updateGraph(whichgraph);
		}//slide
	//
});//slider
		//});

		var slow = 1000;
		var colors = ["#1aa5ff","#ff741a", "#ff1aa5", "#1aff74"]
		var youcow = {"you":"#009aff",
									"your cow":"#ff6500"}


		var height = $('svg').attr('height');
		var width = $('svg').attr('width');

		//for circles
		var rscale = d3.scaleLinear()
			.domain([0,100])
			.range([10,width/6]);

		var svg = d3.select("svg");

		//for bars - x and y axes
		var barmargin = {top: 20, right: 20, bottom: 30, left: 60};

		var xscale = d3.scaleOrdinal()
		        .domain(["you", "your cow"])
		        .range([0, width-barmargin.right-barmargin.left]);


		var	yscale = d3.scaleLinear()
							.domain([0, 100])
							.range([height-barmargin.bottom-barmargin.top, 0]);

		var barsvg = d3.select("svg");

		// var scale = d3.scaleLinear()
		// 		.domain([0, 100])
		// 		.range([0, height]);



var updateGraph = function(which) {

  // if (whichgraph == "bargraph") {
  //
  //     dataset = dataset.reverse();
  // }
  console.log(dataset)
	switch(which) {
    case "circles":
				whichgraph = "circles";
        // if (whichgraph == "bargraph") {
        //   var rects = svg.selectAll("rect");
        //
        // }
				svg.selectAll("circle").data(dataset).transition()
	    	.duration(500)
	        .attr("r",function(d) {return rscale(d)});
        break;
    case "piechart":
				whichgraph = "piechart";
        updatePie(svg, dataset, slow, colors, height, width);
        break;
		case "bargraph":
				whichgraph = "bargraph";
				barUpdate(svg, dataset, slow, colors, height, width, xscale ,yscale, barmargin);
        break;
    case "line":
	    	whichgraph = "line";
        line();
        break;
    case "linegraph":
				whichgraph = "linegraph";
				lineUpdate(svg, dataset, slow, colors, height, width, xscale ,yscale, barmargin);
        break;
		case "":
	    	whichgraph = "none";
				$( "#slider" ).slider({
						animate: "slow",
						value: 50});//move slider back to the middle
				console.log("first click");
	      break;
	    default:
		whichgraph = "";

        console.log("no function matches that id");
	}//switch
}

var callGraph = function(id) {
	switch(id) {
    case "circles":
				whichgraph = "circles";
        circles(svg, dataset, slow, colors, height, width, rscale);
        break;
    case "piechart":
				whichgraph = "piechart";
        piechart(svg, dataset, slow, colors, height, width);
        break;
		case "bargraph":
				whichgraph = "bargraph";
				bargraph(svg, dataset, slow, colors, height, width, xscale ,yscale, barmargin);
        break;
    case "linegraph":
	    	whichgraph = "linegraph";
        linegraph(svg, dataset, slow, colors, height, width, xscale, yscale, barmargin);
        break;
    default:
        console.log("no function matches that id");
	}//switch
}


$("button.graphstyle").click(function(){
	$("svg").empty();
  var id = $(this).attr("id");
	//console.log(id)
  console.log(dataset);
	callGraph(id);

})//graphstyle click function
callGraph("linegraph")

});//doc ready function

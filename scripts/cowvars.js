var dataset = [50,50];

var whichgraph = "none";
var extendedDS = []
var you = 1;
for (i=0;i<100;i++) {
  you = !you;
  extendedDS.push([you ? "you" : "your cow", Math.floor(Math.random()*101) - 50])
}

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

console.log($('svg').attr('width'));

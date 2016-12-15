var margin = {top: 0, right: 50, bottom: 20, left: 100},
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

var mapWidth = 545,
    mapHeight = 690;

var botLat = 34.0623;
var leftLng = -118.267;
var topLat = 34.1084;
var rightLng = -118.224;

var tractsList = [];
var svg;

var line = d3.svg.line()
              .x(function(d) { return d.x; })
              .y(function(d) { return d.y; })
              .interpolate("cardinal");

var createListener = function() {
  $("#wrapper").on("click", function (evt) {
    console.log(evt.pageX + ", " + (evt.pageY - 80));
  });
}

var drawTracts = function() {
  d3.json("../data/tracts.json", function(error, json) {
    if (error) return console.warn(error)
    tracts = json["tracts"];
    for (var tract in tracts) {
      tract = tracts[tract];
      svg.append("path")
          .attr("class", "tract")
          .attr("d", line(tract[1]))
          .attr("id", tract[0]);
    }
  });
}

$(document).ready(function() {
  svg = d3.select("#wrapper")
              .append("svg")
              .attr("class", "box")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.bottom + margin.top);

  createListener();
  var map = svg.append("image")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", mapHeight)
              .attr("width", mapWidth)
              .attr("xlink:href", "../data/echopark.svg");

  svg.append("circle")
      .attr("cx", 30)
      .attr("cy", 30)
      .attr("r", 20);

  drawTracts();
});

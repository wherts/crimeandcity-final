/*
TODO:
Add year buttons
Read in all the population data and display it in the tooltips by current year
Style tooltips
Draw graph of housing prices, highlight current year
Fill tract by dominant race (create legend)
Animate over all years???

change json data to be a list so we can sort the keys by pop/housing/income and alphabetically
*/

var margin = {top: 0, right: 50, bottom: 20, left: 100},
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

var mapWidth = 545,
    mapHeight = 690;

var botLat = 34.0623;
var leftLng = -118.267;
var topLat = 34.1084;
var rightLng = -118.224;

var tractsGroup;
var svg;
var tooltip;

var validYears = ["2000", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2019", "2020", "2021"];
var dataByYear = {};
var currentYear = validYears[0];

var line = d3.svg.line()
              .x(function(d) { return d.x; })
              .y(function(d) { return d.y; })
              .interpolate("cardinal");

var addClickListener = function() {
  $("body").on("click", function(evt) {
    console.log(evt.pageX + ", " + (evt.pageY - 80));
  });
}

var drawTracts = function() {
  d3.json("../json/tracts.json", function(error, json) {
    if (error) return console.warn(error)
    tracts = json["tracts"];
    tractsGroup = svg.append("g").attr("class", "tract").selectAll("g")
      .data(tracts).enter()
      .append("path")
      .attr("d", function(d) {return line(d[1]);})
      .attr("id", function(d) {return d[0];})
      .on("mouseover", function(d) {
          tooltip.style("display", "inline");
          $("#" + d[0]).attr("class", "hover");
          this.parentNode.appendChild(this);
      })
      .on("mousemove", function(d) {
          updateTooltip(d[0]);
      })
      .on("mouseout", function(d) {
          tooltip.style("display", "none");
          $("#" + d[0]).attr("class", "");
      });
  });
}

var pullInData = function() {
  // debugger;
  for (var year in validYears) {
    year = validYears[year];
    fileName = year + ".json"
    filePath = "../json/" + fileName;
    (function (year) {
      d3.json(filePath, function(error, jsonObj) {
        if (error) return console.warn(error);
        dataByYear[year] = jsonObj;
      });
    })(year);
  }
};

var updateTooltip = function(tractID) {
  currData = dataByYear[currentYear];
  text = "<h3><b>" + tractID + "</b></h3>";
  text += "</br>";
  for (var key in Object.keys(currData)) {
    key = Object.keys(currData)[key];
    text += key + ": " + currData[key][tractID];
    text += "</br>";
  }
  tooltip.html(text)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 200) + "px");
};

$(document).ready(function() {
  svg = d3.select("#wrapper")
              .append("svg")
              .attr("class", "box")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.bottom + margin.top);

  tooltip = d3.select("body")
        				.append("div")
        				.attr("class", "tooltip")
                .style("display", "none");

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

  pullInData();
  drawTracts();
  addClickListener();
});

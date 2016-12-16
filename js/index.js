/*
TODO:
Add year buttons
Read in all the population data and display it in the tooltips by current year
Style tooltips
Draw graph of housing prices, highlight current year
Fill tract by dominant race (create legend)
Animate over all years???
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
var incomeByYear = {},
    populationByYear = {},
    housingByYear = {};
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
    var prefix = "../json/";
    (function (year) {
      incomeFile = prefix + year + "-income.json";
      d3.json(incomeFile, function(error, jsonObj) {
        if (error) return console.warn(error);
        incomeByYear[year] = jsonObj;
      });

      housingFile = prefix + year + "-housing.json";
      d3.json(housingFile, function(error, jsonObj) {
        if (error) return console.warn(error);
        housingByYear[year] = jsonObj;
      });

      populationFile = prefix + year + "-population.json";
      d3.json(populationFile, function(error, jsonObj) {
        if (error) return console.warn(error);
        populationByYear[year] = jsonObj;
      });
    })(year);
  }
};

var updateTooltip = function(tractID) {
  currData = populationByYear[currentYear];
  text = "<h3><b>" + tractID + "</b></h3>";
  text += "</br>";
  for (var pair in currData) {
    pair = currData[pair];
    text += pair[0] + ": " + pair[1][tractID];
    text += "</br>";
  }

  currData = incomeByYear[currentYear];
  // text = "<h3><b>" + tractID + "</b></h3>";
  // text += "</br>";
  for (var pair in currData) {
    pair = currData[pair];
    text += pair[0] + ": " + pair[1][tractID];
    text += "</br>";
  }

  currData = housingByYear[currentYear];
  // text = "<h3><b>" + tractID + "</b></h3>";
  // text += "</br>";
  for (var pair in currData) {
    pair = currData[pair];
    text += pair[0] + ": " + pair[1][tractID];
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

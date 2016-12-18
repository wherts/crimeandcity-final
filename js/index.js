/*
TODO:
Draw graph of housing prices, highlight current year

Fill tract by dominant data item (create legend)
Animate over all years???
Test hosting on github
write on the page
Submit!
*/

var margin = {top: 0, right: 0, bottom: 0, left: 0},
      width = 545 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

var mapWidth = 545,
    mapHeight = 690;

var botLat = 34.0623;
var leftLng = -118.267;
var topLat = 34.1084;
var rightLng = -118.224;

var tractsGroup;
var mapSvg, graphSvg;
var tooltip;

var validYears = ["2000", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2019", "2020", "2021"];
var validTracts = ["187200","197200","197420","197300","197410","195720","197500","197600","197700","980010","187300"];

var incomeByYear = {},
    populationByYear = {},
    housingByYear = {};

var incomeByTract = {},
    populationByTract = {},
    housingByTract = {};

var currentYear = validYears[0];
var currentTract = "187200";
var currentDataMap = "Population";
var currentDataGraph = "Population";

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
    tractsGroup = mapSvg.append("g").attr("class", "tract").selectAll("g")
      .data(tracts).enter()
      .append("path")
      .style("fill", "black")
      .style("fill-opacity", 0.5)
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

var pullInMapData = function(callback) {
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
  callback(null);
};

// var pullInGraphData = function(callback) {
//   var incomeByTractLocal = {},
//       housingByTractLocal = {},
//       populationByTractLocal = {};
//   for (var tract in validTracts) {
//     tract = validTracts[tract];
//     var prefix = "../json/";
//
//     (function(tID) {
//       incomeFile = prefix + tID + "-income.json";
//       d3.json(incomeFile, function(error, jsonObj) {
//         if (error) return console.warn(error);
//         incomeByTractLocal[tID] = jsonObj;
//       });
//
//       housingFile = prefix + tID + "-housing.json";
//       d3.json(housingFile, function(error, jsonObj) {
//         if (error) return console.warn(error);
//         housingByTractLocal[tID] = jsonObj;
//       });
//
//       populationFile = prefix + tID + "-population.json";
//       d3.json(populationFile, function(error, jsonObj) {
//         if (error) return console.warn(error);
//         populationByTractLocal[tID] = jsonObj;
//       });
//     })(tract);
//   }
//   callback(null, [incomeByTractLocal, housingByTractLocal, populationByTractLocal]);
// };

var updateTooltip = function(tractID) {
  var currData;
  if (currentDataMap == "Population") {
    currData = populationByYear[currentYear];
  } else if (currentDataMap == "Housing") {
    currData = housingByYear[currentYear];
  } else {
    currData = incomeByYear[currentYear];
  }
  text = "<h3><b>" + tractID + " (" + currentYear + ")" + "</b></h3>";
  text += "</br>";
  for (var pair in currData) {
    pair = currData[pair];
    text += pair[0] + ": " + pair[1][tractID];
    text += "</br>";
  }
  tooltip.html(text)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 15) + "px");
};

var updateTractFill = function() {
  //TODO
  console.log("changing");
  $(".tract")
}

var addRadioListener = function() {
  $(".dataTypesMap").on('click', function() {
    currentDataMap = $(this).val();
    // updateTractFill();
  });

  $(".dataTypesGraph").on('click', function() {
    currentDataGraph = $(this).val();
  })
};

var addDropdownListener = function() {
  $("#selectYear").on('change', function() {
    currentYear = $(this).val();
  });

  $("#selectTract").on('change', function() {
    currentTract = $(this).val();
  });
};

var addMap = function() {
  mapSvg = d3.select("#mapWrapper")
              .append("svg")
              .attr("class", "box")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.bottom + margin.top);

  tooltip = d3.select("body")
        				.append("div")
        				.attr("class", "tooltip")
                .style("display", "none");

  var map = mapSvg.append("image")
              .attr("x", 0)
              .attr("y", 0)
              .attr("height", mapHeight)
              .attr("width", mapWidth)
              .attr("xlink:href", "../data/echopark.svg");
}

var findMaxY = function(tractDict) {
  var maxY = -1;
  for (var tract in validTracts) {
    tract = validTracts[tract];
    var keys = Object.keys(tractDict[tract]);
    for (var k in keys) {
      variable  = keys[k];
      data = tractDict[tract][variable];
      currMax = d3.max(data, function(d) {return d;});
      if (currMax > maxY) {
        maxY = currMax;
      }
    }
  }
  return maxY;
}

var addGraph = function() {
  graphSvg = d3.select("#graphWrapper")
                .append("svg")
                .attr("class", "box")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.bottom + margin.top);

  var graphShift = 30;
  var xScale = d3.scale.linear()
                  .domain([0, validYears.length])
                  .range([graphShift, width]);

  var maxY = findMaxY(populationByTract);
  var yScale = d3.scale.linear()
                  .domain([0, maxY])
                  .range([(height - 45), 0]);

  var xAxis = d3.svg.axis()
                .scale(xScale)
                .tickValues(validYears)
                .orient("bottom")
                .tickSize(-height, 1);

  var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .tickSize(1);

  graphSvg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + graphShift + ", 0)")
          .call(yAxis);

  graphSvg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0, " + (height - 45) + ")")
          .call(xAxis);

  //adding labels
  var yearLabels = graphSvg.append("g")
      .attr("class", "yearLabel")
      .selectAll(".yearLabel")
      .data(validYears).enter()
      .append("g")
      .attr("transform", function(d, i) {return "translate(" + (xScale(i) + 20) + "," + (height - 20) + ")rotate(-45)"});

  yearLabels.append("text")
            .attr("text-anchor", "middle")
            .text(function(d) {return d;});
}

var drawGraph = function() {

};

$(document).ready(function() {
  queue().defer(pullInMapData)
    .await(function(error) {
      if (error) return console.warn(error);
      addMap();
      drawTracts();
      addRadioListener();
      addDropdownListener();
    });

  var graphQueue = queue();

  for (var tract in validTracts) {
    tract = validTracts[tract];
    var prefix = "../json/";
    incomeFile = prefix + tract + "-income.json"
    populationFile = prefix + tract + "-population.json";
    housingFile = prefix + tract + "-housing.json";

    graphQueue.defer(d3.json, incomeFile);
    graphQueue.defer(d3.json, populationFile);
    graphQueue.defer(d3.json, housingFile);
  }

  graphQueue.awaitAll(function(error, graphData) {
      if (error) return console.warn(error);
      for (var tIdx in validTracts) {
        tID = validTracts[tIdx];
        var i = tIdx * 3;
        incomeByTract[tID] = graphData[i];
        populationByTract[tID] = graphData[i + 1];
        housingByTract[tID] = graphData[i + 2];
      }
      addGraph();
      drawGraph();
    });
});

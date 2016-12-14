var margin = {top: 10, right: 50, bottom: 20, left: 50},
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

$(document).ready(function() {
  console.log("Ready!");
  var svg = d3.select("#wrapper")
              .append("svg")
              .attr("class", "box")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.bottom + margin.top);

  var left = -118.267007,
      bottom = 34.062552,
      right = -118.226618,
      top = 34.108309;

  var osmUrl = "http://www.openstreetmap.org/?bbox=-118.267%2C34.0623%2C-118.224%2C34.1084";
  console.log(osmUrl);
  $.get({url: osmUrl,
        success: function(data) {
          console.log("success!");
          console.log(data);
        }
  })

  //draw echo park with openstreetmap data
});

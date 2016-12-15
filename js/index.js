var margin = {top: 0, right: 50, bottom: 20, left: 100},
      width = 800 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

var mapWidth = 545,
    mapHeight = 690;

var botLat = 34.0623;
var leftLng = -118.267;
var topLat = 34.1084;
var rightLng = -118.224;

var line = d3.svg.line()
              .x(function(d) { return d.x; })
              .y(function(d) { return d.y; })
              .interpolate("cardinal");

var createListener = function() {
  $("#wrapper").on("click", function (evt) {
    console.log(evt.pageX + ", " + (evt.pageY - 80));
  });
}

$(document).ready(function() {
  var svg = d3.select("#wrapper")
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
  //187200
  var pathData = [
    {x: "126", y: "10"},
    {x: "130", y: "0"},
    {x: "169", y: "3"},
    {x: "225", y: "2"},
    {x: "251", y: "7"},
    {x: "272", y: "14"},
    {x: "297", y: "29"},
    {x: "313", y: "45"},
    {x: "319", y: "72"},
    {x: "319", y: "102"},
    {x: "322", y: "139"},
    {x: "340", y: "177"},
    {x: "325", y: "196"},
    {x: "312", y: "206"},
    {x: "284", y: "174"},
    {x: "262", y: "144"},
    {x: "228", y: "96"},
    {x: "194", y: "60"},
    {x: "158", y: "26"},
    {x: "126", y: "10"}];


  svg.append("path")
      .attr("id", "CT187200")
      .attr("class", "tract")
      .attr("d", line(pathData));

  //197200
  var pathData = [
    {x: "316", y: "206"},
    {x: "325", y: "196"},
    {x: "343", y: "180"},
    {x: "350", y: "196"},
    {x: "368", y: "209"},
    {x: "388", y: "220"},
    {x: "427", y: "229"},
    {x: "449", y: "239"},
    {x: "466", y: "255"},
    {x: "487", y: "279"},
    {x: "495", y: "308"},
    {x: "497", y: "341"},
    {x: "494", y: "376"},
    {x: "473", y: "360"},
    {x: "420", y: "318"},
    {x: "390", y: "295"},
    {x: "360", y: "267"},
    {x: "327", y: "223"}];

  svg.append("path")
      .attr("id", "CT197200")
      .attr("class", "tract")
      .attr("d", line(pathData));

    // 197700
    pathData = [
      {x: "248", y: "674"},
      {x: "233", y: "656"},
      {x: "220", y: "629"},
      {x: "217", y: "602"},
      {x: "214", y: "577"},
      {x: "209", y: "546"},
      {x: "205", y: "536"},
      {x: "193", y: "517"},
      {x: "224", y: "529"},
      {x: "255", y: "546"},
      {x: "274", y: "571"},//***
      {x: "285", y: "564"},
      {x: "342", y: "594"},
      {x: "341", y: "605"},
      {x: "350", y: "609"},
      {x: "359", y: "607"},
      {x: "379", y: "592"},
      {x: "385", y: "603"},
      {x: "342", y: "631"},
      {x: "317", y: "647"},
      {x: "291", y: "660"},
      {x: "269", y: "664"},
      {x: "248", y: "673"},
      {x: "248", y: "674"}];
    svg.append("path")
        .attr("id", "CT197700")
        .attr("class", "tract")
        .attr("d", line(pathData));

        // 197110
      pathData = [
        {x: "274", y: "571"},
        {x: "255", y: "546"},
        {x: "224", y: "529"},
        {x: "213", y: "524"}, //up to here is perfect
        {x: "219", y: "511"},
        {x: "216", y: "490"},
        {x: "210", y: "473"},
        {x: "204", y: "446"},
        {x: "200", y: "422"},
        {x: "212", y: "408"},
        {x: "222", y: "391"},
        {x: "235", y: "371"},
        {x: "236", y: "349"},
        {x: "253", y: "333"},
        {x: "266", y: "318"},
        {x: "287", y: "305"},
        {x: "304", y: "283"},
        {x: "302", y: "270"},
        {x: "278", y: "257"},
        {x: "303", y: "235"},
        {x: "316", y: "229"},
        {x: "293", y: "202"}, //great through here
        {x: "315", y: "210"},
        {x: "327", y: "223"},
        {x: "360", y: "267"},
        {x: "390", y: "295"},
        {x: "420", y: "318"},
        {x: "473", y: "360"},
        {x: "493", y: "378"}, //checked
        {x: "495", y: "410"},
        {x: "504", y: "436"},
        {x: "477", y: "464"},
        {x: "441", y: "502"},
        {x: "418", y: "529"},
        {x: "410", y: "540"},
        {x: "396", y: "581"},
        {x: "379", y: "592"},
        {x: "359", y: "607"},
        {x: "350", y: "609"},
        {x: "341", y: "605"},
        {x: "342", y: "594"},
        {x: "285", y: "564"},
        {x: "274", y: "571"}];
      svg.append("path")
          .attr("id", "CT197110")
          .attr("class", "tract")
          .attr("d", line(pathData));

    // 197600
    pathData = [
      {x: "248", y: "674"},
      {x: "233", y: "656"},
      {x: "220", y: "629"},
      {x: "217", y: "602"},
      {x: "214", y: "577"},
      {x: "209", y: "546"},
      {x: "205", y: "536"},
      {x: "186", y: "523"},
      {x: "143", y: "614"},
      {x: "165", y: "630"},
      {x: "192", y: "650"},
      {x: "222", y: "673"},
      {x: "241", y: "680"},
      {x: "248", y: "674"}];
    svg.append("path")
        .attr("id", "CT197600")
        .attr("class", "tract")
        .attr("d", line(pathData));

    pathData = [
      {x: "75", y: "584"},
      {x: "71", y: "538"},
      {x: "73", y: "500"},
      {x: "88", y: "464"},
      {x: "148", y: "489"},
      {x: "182", y: "514"},
      {x: "164", y: "567"},
      {x: "141", y: "614"},
      {x: "116", y: "599"},
      {x: "75", y: "584"}
    ];

    svg.append("path")
        .attr("id", "CT197500")
        .attr("class", "tract")
        .attr("d", line(pathData));

    // 197500
    // 195720
    // 197420
    // 197300
    // 197410
    // 187300

});

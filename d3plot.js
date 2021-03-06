Shiny.addCustomMessageHandler("yearTotalJs",
function(message){
  
  d3.selectAll("svg > *").remove();

  var data = message;
    var w = 500;
    var h = 500;
    var barPadding = 0;
    var scaleFactor = 10;
    var padding = 40;
    
    var parseTime = d3.timeParse("%Y-%d-%m");
    
    var rowConverter = function(d){
      return {
        Year: parseTime(d.Year + "-01-01"),
        Total: d.Total,
        Colour: d.Colour
      };
    };
 
   var svg = d3.select("body")
            .append("svg")  
            .style("width", w + 'px')   // <-- Here
            .style("height", h + 'px');
  
  var xScale = d3.scaleBand()
               .domain(d3.range(data.length))
               .rangeRound([0, w])
               .paddingInner(0.05);
  
var yScale = d3.scaleLinear()
  .domain([d3.min(data, function(d){
    return d.Total;
  }), d3.max(data, function(d){
    return d.Total;
  })])
  .rangeRound([h - padding, padding]);
  
  var aScale = d3.scaleSqrt()     
               .domain([0, d3.max(data, function(d) { return d.Total; })])
               .range([0, 10]);
  
  var rScale = d3.scaleLinear()
               .domain([0, d3.max(data, function(d) { return d.Total; })])
               .range([2, 7]);

  var rect = svg.selectAll("rect")
    .data(data);
    
  rect.enter().append("rect")
  .attr("x", function(d, i) {
    return xScale(i);
   })
   .attr("width", xScale.bandwidth)
   .attr("y", function(d){
      return yScale(d.Total);
   })
   .attr("height", function(d){
      return (h - yScale(d.Total)) - padding;
   })
   .attr("fill", function(d){
     return d.Colour;
   });

  rect.transition();
   
   var xAxis = d3.axisBottom()
      .scale(xScale)
      .tickFormat(d3.format("d"));
      
   var yAxis = d3.axisLeft()
      .scale(yScale);
      
   svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);
          
    svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(yAxis);
          


});

   



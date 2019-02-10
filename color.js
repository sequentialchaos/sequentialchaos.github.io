var body = d3.select("body");

var form = body.append("form")
               .text("Pick a color: ");

form.append("input")
    .attr("type", "color")
    .on("change", function() {
      console.log(this.value);
      svg.background.attr("fill", this.value);
    })

body.append("br");

var svg = {
  "width" : 250,
  "height" : 250,
}

svg.whole = d3.select("body")
              .append("svg")
              .attr("width", svg.width)
              .attr("height", svg.height)
              .attr("class" ,"chart");




svg.background = d3.select("svg.chart")
                   .append("circle")
                   .attr("cx", svg.width / 2)
                   .attr("cy", svg.height / 2)
                   .attr("r", svg.width / 2)
                   .attr("fill", "#8000ff") 
                   .attr("class", "background");



svg.center = d3.select("svg.chart")
               .append("circle")
               .attr("cx", svg.width / 2)
               .attr("cy", svg.height / 2)
               .attr("r", 3);

svg.radius = d3.select("svg.chart")
               .append("line")
               .attr("x1", svg.width / 2)
               .attr("x2", svg.width)
               .attr("y1", svg.height / 2)
               .attr("y2", svg.height / 2)
               .attr("stroke", "black")
               .attr("stroke-width", 3)
               .attr("stroke-dasharray", "4,4");
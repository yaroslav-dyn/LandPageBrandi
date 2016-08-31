//creating Landscape map

function landscapeMap(graph){

    // maps trigger
    //delete previous highlight button
    $(".map-list li").removeClass('active');
    //highlighting  map button
    $("#landscape-map").addClass("active");


    //color palette d3
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    //main variables
    var
        riskObj = [],
        oneTrend = [],
        nodesRadius = 4;

    //var svg = d3.select("svg"),
    //    width = +svg.attr("width") ,
    //    height = +svg.attr("height"),
    //    margin = {top: 20, right: 20, bottom: 30, left: 40},
    //    halfWidth = width/ 2,
    //    halfHeight = height/ 2,
    //    nodesRadius = 4;



    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;


    //filtering 'Risk' nodes
    graph.nodes.forEach(function (p) {
        if (p.type === 'Risk') {
            riskObj.push(p);
        }

    });


    var xValue = function(d) { return d.Likelihood;}, // data -> value
        yValue = function(d) { return d.impact;}, // data -> value
        xScale = d3.scaleLinear().range([0, width]), // value -> display
        xMap = function(d) { return xScale(xValue(d));}, // data -> display
        xAxis = d3.axisBottom().scale(xScale),

        yScale = d3.scaleLinear().range([height, 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.axisLeft().scale(yScale);



//----------------Append in DOM SVG--------------------------------

    var svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g");


    // don't want dots overlapping axis, so add in buffer to data domain
    xScale.domain([d3.min(graph.nodes, xValue)-1, d3.max(graph.nodes, xValue)+1]);
    yScale.domain([d3.min(graph.nodes, yValue)-1, d3.max(graph.nodes, yValue)+1]);


    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Likelihood");

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "start")
        .text("Impact");

    //appends 'g' containers
    var rNode = svg.selectAll(".nodes-risks")
        .data(riskObj)
        .enter().append("g")
        .attr("class", "g-nodes risks")
        .on("click", currentNodeRisk);

    //add nodes text
    var textRisks = rNode
        .append("text")
        .attr("class", "text text-risks")
        .attr("dx", xMap)
        .attr("dy", yMap)
        .attr("transform","translate(-14,-8)")
        .data(riskObj)
        .text(function (d) {
             return d.label || d.id;
         })
        .attr("id", function (d) {
            return d.id
        });


    // draw dots
    //append nodes in 'g' containers
    var riskNode = rNode
        .append("circle")
        .attr("class", "nodes nodes-risks")
        .attr("cx", xMap)
        .attr("cy", yMap)
        .attr("r", function(d){
            return altNodeSize(d, nodesRadius, 0) })
        .attr("fill", function (d) {
            return color(d.category || d.group);
        })
        .attr("id", function (d) {
            return d.id
        });


    //-------function on click RISKS NODES----------------------------
    function currentNodeRisk() {

        //visible & transform RiskNodes
        d3.selectAll(".nodes-risks")
            .transition()
            .duration(300)
            .attr("r", function(d){
                return altNodeSize(d, nodesRadius,0) });

        d3.select(this).select("circle").transition()
            .duration(300)
            .attr("r", function(d){
                return altNodeSize(d, nodesRadius,2) });

        //visible & transform TEXT
        d3.selectAll(".text-risks")
            .attr("class", "text text-risks text-hidden")
            .attr("style", "font-weight: normal");

        d3.select(this).select(".text-risks")
            .attr("class", "text text-risks text-visible")
            .attr("style", "font-weight: bold; font-size: 0.9em");

        //check current node id
        var currentID = d3.select(this).select("circle").attr("id"),
            currentColor = d3.select(this).select("circle").attr("fill");



        //text current id node
        d3.selectAll(".text-risks")
            .filter(function (d) {
                return d.id == currentID;
            })
            .attr("style", "font-size: 0.8em; font-weight: bold");



        //----Sidebar text data--------------------------

        //create one current object for sidebar data
        riskObj.forEach(function (e) {
            if (e.id == currentID) {
                oneTrend.push(e);
            }
        });

        console.log(oneTrend);
        //type of risk
        d3.selectAll(".trend-risk")
            .text("risk");
        //Nodes label
        d3.selectAll(".trends-selected")
            .data(oneTrend)
            .text(function (d) {
                return d.label || d.id;
            });
        //Nodes description
        d3.selectAll(".description-risk")
            .data(oneTrend)
            .text(function (d) {
                return d.description || "No description";
            });
        //Nodes category
        d3.selectAll(".sel-cat")
            .data(oneTrend)
            .text(function (d) {
                return d.category || "No category";
            })
            .attr("style", "color:" + currentColor);

        //Nodes impact
        d3.selectAll(".sel-impact")
            .data(oneTrend)
            .text(function (d) {
                return d.impact || "No impact value";
            });
        //Nodes likelihood
        d3.selectAll(".sel-likelihood")
            .data(oneTrend)
            .text(function (d) {
                return d.Likelihood || "No likelihood value";
            });






        //clearing array
        oneTrend = [];



    }//END currentNodeRisk



    //-------------ABORTING filters FUNCTION--------------------------------------------

    $("#clear-filter").click(function () {


        d3.selectAll(".nodes-risks")
            .attr("r", function(d){
                return altNodeSize(d, nodesRadius,0) });


        d3.selectAll(".text-risks")
            .attr("class", "text text-risks text-hidden")
            .attr("style", "font-weight: normal");



        //----Sidebar text data clearing--------------------------

        //clearing all sidebar data text
        d3.selectAll(".s-data-text")
            .text("");

    });




}//End landscapeMap

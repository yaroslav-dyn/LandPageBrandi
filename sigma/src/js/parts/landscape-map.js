//creating Landscape map

function landscapeMap(graph){

    $("body").attr("class","map landscape-map");

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
        nodesRadius = 5;



    var svg = d3.select("svg"),
        margin = {top: 80, right: 160, bottom: 80, left: 80},
        width = +svg.attr("width")- margin.left - margin.right ,
        height = +svg.attr("height") - margin.top - margin.bottom;


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

        yScale = d3.scaleLinear().range([height , 0]), // value -> display
        yMap = function(d) { return yScale(yValue(d));}, // data -> display
        yAxis = d3.axisLeft().scale(yScale);




//----------------Append in DOM SVG--------------------------------


    var mainG = svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //Closeness of nodes
    xScale.domain([d3.min(riskObj, xValue)-0.5, d3.max(riskObj, xValue)+0.5]);
    yScale.domain([d3.min(riskObj, yValue)-0.5, d3.max(riskObj, yValue)+0.5]);


    // x-axis
    mainG
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .attr("fill", "#000")
        .style("text-anchor", "end")
        .text("Likelihood");

    // y-axis
    mainG
        .append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("x", -5)
        .attr("y", 10)
        .attr("fill", "#000")
        .attr("dy", ".5em")
        .style("text-anchor", "end")
        .text("Impact");

    //appends 'g' containers
    var rNode = svg.selectAll(".nodes-risks")
        .data(riskObj)
        .enter().append("g")
        .attr("class", "g-nodes risks")
        .on("click", currentNodeRisk)
        .attr("cat",function(d){
            return d.category
        });



    //add nodes text
    var textRisks = rNode
        .append("text")
        .attr("class", "text text-risks")
        .attr("dx", xMap)
        .attr("dy", yMap)
        .attr("transform", "translate(8,14)")
        .data(riskObj)
        .text(function (d) {
             return d.label || d.id;
         })
        .attr("style",function(d){
            return d.textAncor ;
        })
        .attr("id", function (d) {
            return d.id
        });



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
        .attr("style","stroke: none")
        .attr("id", function (d) {
            return d.id
        });





//-----------------Common functions---------------------------------------------
    /*
     * Landscape map function for category filter
     */
    var cat = [],
        uniqueTextObj = {},
        uniqueColorObj = {},
        colorObj = [];

//creating object for buttons = category
    riskObj.forEach(function(e){
        cat.push(e.category);
    });

//creating object for buttons color = category color
    $(".g-nodes .nodes-risks").each(function(){
        colorObj.push($(this).attr("fill"));
    });
    //function for uniq arrays
    function returnUnique(arr,color) {

        for (var i = 0, i_max = arr.length; i < i_max; i++) {
            uniqueTextObj[arr[i]] = "";
        }


        for (var j = 0, j_max = color.length; j < j_max; j++) {
            uniqueColorObj[color[j]] = "";
        }
        return Object.keys(uniqueTextObj), Object.keys(uniqueColorObj);


    }
    returnUnique(cat,colorObj);
//-----------------------------------------------------------------------

//-----------------CATEGORY FILTER---------------------------------------
    //append filter category block
    var catCont = $(".risk-categories");
    //clear filter block
    catCont.html("");

    //add category buttons
    function getCategoriesSide(catContIn, uniqueTextObj,uniqueColorObj ){
        catContIn.append("<h4 class='sidebar-main-header'>Filters:</h4>");
        catContIn.append("<ul></ul>");

        Object.keys(uniqueTextObj).forEach(function(e,i){

            var color = Object.keys(uniqueColorObj)[i];

            $(".risk-categories ul").append("<li class='cat-item' style='background-color: "+color+"' >" + e + "</li>");
        });
    }
    getCategoriesSide(catCont, uniqueTextObj,uniqueColorObj);

    //function on click button category
    $(".risk-categories ul li").on("click", function(){

        $(this).parent().find('li').removeClass("active");
        $(this).addClass("active");

       var currentButtonCat =  $(this).text();
        svg.selectAll(".g-nodes")
            .attr("style", "opacity:0");

        svg.selectAll(".g-nodes")
            .filter(function(d){
                return d.category == currentButtonCat;
            })
            .attr("style", "opacity:1");
    });

//-----------------COMPARATIVE FILTERS---------------------------------------

    //function on click button compare
    $(".compare-container ul li").on("click", function(){

        $(this).parent().find('li').removeClass("active");
        $(this).addClass("active");

        //clear svg area

    });



    //-------function on click RISKS NODES----------------------------
    function currentNodeRisk() {

        //visible & transform RiskNodes
        d3.selectAll(".nodes-risks")
            .transition()
            .duration(300)
            .attr("class","nodes nodes-risks")
            .attr("r", function(d){
                return altNodeSize(d, nodesRadius,0) });

        d3.select(this).select("circle").transition()
            .duration(300)
            .attr("class","nodes nodes-risks current-node")
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

        //general sidebar data function (common-functions template)
        getDataSidebar(riskObj, oneTrend, currentColor);


        //clearing array
        oneTrend = [];


    }//END currentNodeRisk


//-----------------------CURRENT NODE-----------------------------------------------

    //save current node
    var currNode = $(".trends-selected").attr("curid"),
        typeOfRisk = $(".trend-risk").text();

    if(currNode != "empty" && typeOfRisk != "trend") {
        svg.selectAll(".nodes-risks")
            .filter(function (d) {
                return d.id == currNode;
            })
            .transition()
            .duration(300)
            .attr("r", function (d) {
                return altNodeSize(d, nodesRadius, 2)
            });

        d3.selectAll(".text-risks")
            .filter(function (d) {
                return d.id == currNode;
            })
            .attr("class", "text text-risks text-visible")
            .attr("style", "font-weight: bold; font-size: 0.9em");

    }



    //-------------ABORTING filters FUNCTION--------------------------------------------


    //generic clearing function
    function clearLanMap(){
        svg.selectAll(".g-nodes")
            .attr("style", "opacity:1");

        d3.selectAll(".nodes-risks")
            .attr("class","nodes nodes-risks")
            .attr("r", function(d){
                return altNodeSize(d, nodesRadius,0)
            });


        d3.selectAll(".text-risks")
            .attr("class", "text text-risks text-hidden")
            .attr("style", "font-weight: normal");



        //----Sidebar text data clearing--------------------------

        d3.selectAll(".data-area")
            .attr("class","data-area hidden");

        //clearing all sidebar data text
        d3.selectAll(".s-data-text")
            .text("");

        //Drop active category button
        $(".risk-categories ul li").removeClass("active");

        //clear current node
        $(".trends-selected").attr("curid","empty");

    }

    //clear button
    $("#clear-filter").click(function () {
        clearLanMap();

    });

    //clear all on page on blur
    $("#graph-wrapper").click(function (e) {
        if(e.target.id != 'container-graph')
            return;
        clearLanMap();

    });


}//End landscapeMap

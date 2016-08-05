//creating risk-intercon map

function riskInterconMap(graph){

    //main variables
    var
        riskObj = [],
        edges = [],
        categoryObj = {},
        edgesCutRisk = [],
        oneTrend = [];


    var svg = d3.select("svg"),
        width = +svg.attr("width") ,
        height = +svg.attr("height"),
        halfWidth = width/ 2,
        halfHeight = height/ 2,
        rLage = halfHeight - 20,
        rSmall = rLage/1.1,
        nodesRadius = 5,
        strokeWidth = 0.4,
        widthRect = 10,
        heightRect = 10,
        gainStrokeWidth = 6, //increment current stroke width (stroke width = strokeWidth * gainStrokeWidth)
        inactiveOpacity = 0.4, //value inactive lines opacity (normal opacity = 1 )
        linksCut = [];

    //color palette d3
    var color = d3.scaleOrdinal(d3.schemeCategory20),
        trendsColor = "#AB00AB";



    //filtering 'Risk' nodes
    graph.nodes.forEach(function (p) {
        if (p.type === 'Risk') {
            riskObj.push(p);
        }

    });


    //radius function for 'risk' nodes
    riskObj.forEach(function (p, i) {
        var n = riskObj.length,
            step = (2 * Math.PI) / n,
            angle = i * step;
        p.cx = rSmall * Math.cos(angle);
        p.cy = rSmall * Math.sin(angle);
    });



    //creating object links
    graph.links.forEach(function (e) {

        if(e.type == "Risk-Risk"){
            linksCut.push(e)
        }
    });

    linksCut.forEach(function(e){
        var sourceNode = riskObj
                .filter(function (n) {
                    return n.id === e.source;
                })[0],

            targetNode = riskObj
                .filter(function (n) {
                    return n.id === e.target;
                })[0];

        edges.push({source: sourceNode, target: targetNode, value: e.value});
    });


    //created object for risk nodes
    riskObj.forEach(function (e) {
        var categories = e.category;

        if (categoryObj[categories] == undefined) {
            categoryObj[categories] = [];
        }
        categoryObj[categories].push(e);

    });

    //include coordinate in sort object
    var b = 1;
    for (var i in categoryObj) {
        b += 5;

        var n = categoryObj[i].length,
            step = (2 * Math.PI) / n,
            clasterRadius,
            zenith;


        categoryObj[i].forEach(function (e, j) {

            j += 4;
            var angle = j * step;

            if (n<=2) {
                clasterRadius = 500;
                zenith = clasterRadius / 100;
            }
            else if (n <= 4) {
                clasterRadius = 300;
                zenith = clasterRadius / 100;
            }
            else if (n <= 6) {
                clasterRadius = 350;
                zenith = clasterRadius / 100;
            }
            else if (n <= 8) {
                clasterRadius = 300;
                zenith = clasterRadius / 100;
            }
            else if (n <= 10) {
                clasterRadius = 350;
                zenith = clasterRadius / 100;
            }
            else if (n <= 12) {
                clasterRadius = 400;
                zenith = clasterRadius / 100;
            }
            else if (n <= 14) {
                clasterRadius = 450;
                zenith = clasterRadius / 100;
            }
            else if (n <= 16) {
                clasterRadius = 500;
                zenith = clasterRadius / 100;
            }


            e.cx = ( ( Math.cos(b) * (( halfWidth / n / 1.4) * zenith ) ) + ( Math.sin(angle) * ( clasterRadius / j) ) );
            e.cy = ( ( Math.sin(b) * (( halfHeight / n / 1.4) * zenith ) ) + ( Math.cos(angle) * ( clasterRadius / j) ) );

            console.log();


        });




    }


//----------------Append in DOM SVG--------------------------------

    //--------------LINKS-----------------------------------------
    //append links
    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(edges)
        .enter().append("line")
        .attr("x1", function (d) {
            return d.source.cx + halfWidth;
        })
        .attr("y1", function (d) {
            return d.source.cy + halfHeight;
        })
        .attr("x2", function (d) {
            return d.target.cx + halfWidth;
        })
        .attr("y2", function (d) {
            return d.target.cy + halfHeight;
        })
        .attr("stroke", function (d) {
            return color(d.target.category)
        })
        .attr("stroke-width", function(d){
            return d.value / 100 || d.strength / 100;
        })
        .attr("title", function (d) {
            return d.value
        })
        .attr("source", function (d) {
            return d.source.id
        })
        .attr("target", function (d) {
            return d.target.id
        });


    //--------------RISK NODES-----------------------------------------
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
        .text(function (d) {
            return d.label || d.id;
        })
        .attr("dx", function (d) {
            return d.cx + halfWidth + 10
        })
        .attr("dy", function (d) {
            return d.cy + halfHeight - 6
        })
        .attr("id", function (d) {
            return d.id
        });



    //append nodes in 'g' containers
    var riskNode = rNode
        .append("rect")
        .attr("class", "nodes nodes-risks")
        .attr("x", function (d) {
            return d.cx + halfWidth
        })
        .attr("y", function (d) {
            return d.cy + halfHeight
        })
        .attr("id", function (d) {
            return d.id
        })
        .attr("width", widthRect)
        .attr("height", heightRect)
        .attr("fill", function (d) {
            return color(d.category || d.group);
        });


//-------------ABORTING filters FUNCTION--------------------------------------------

    $("#clear-filter").click(function () {

        d3.selectAll(".nodes-trends")
            .attr("r", nodesRadius + 2)
            .attr("fill", trendsColor);

        d3.selectAll(".nodes-risks")
            .attr("width", widthRect)
            .attr("height", heightRect);

        d3.selectAll(".text-trends")
            .attr("class", "text text-trends text-hidden")
            .attr("style", "font-weight: normal");

        d3.selectAll(".text-risks")
            .attr("class", "text text-risks text-hidden")
            .attr("style", "font-weight: normal");

        d3.selectAll("line")
            .attr("stroke-width", function(d){
                return d.value / 10;
            })
            .attr("style", "opacity: 1");

        //----Sidebar text data clearing--------------------------

        //clearing all sidebar data text
        d3.selectAll(".s-data-text")
            .text("");

    });


//----------------filtering Data--------------------------------------

    //------------Event functions---------------------------------------
    //show sidebar
    function changeSidebar() {
        $("#container-expo").removeClass("col-md-offset-1 ");
        $("#sidebar-data").removeClass("hidden")
    }


//-------fun on click RISKS NODES----------------------------

    function currentNodeRisk() {
        changeSidebar();
        //visible & transform RiskNodes
        d3.selectAll(".nodes-risks")
            .transition()
            .duration(300)
            .attr("width", widthRect)
            .attr("height", heightRect);

        d3.select(this).select("rect").transition()
            .duration(300)
            .attr("width", widthRect + 4)
            .attr("height", 14);

        //visible & transform TEXT
        d3.selectAll(".text-risks")
            .attr("class", "text text-risks text-hidden")
            .attr("style", "font-weight: normal");

        d3.select(this).select(".text-risks")
            .attr("class", "text text-risks text-visible")
            .attr("style", "font-weight: bold; font-size: 0.9em");

        //check current node id
        var currentID = d3.select(this).select("rect").attr("id"),
            currentColor = d3.select(this).select("rect").attr("fill");

        //filtering all lines where currentId = target
        d3.selectAll("line")
            .attr("stroke-width", function(d){
                return d.value /10;
            })
            .attr("style", "opacity: " + inactiveOpacity)
            .data(edges)
            .filter(function (d) {
                if (d.target.id == currentID && d.source.type == "Risk") {
                    edgesCutRisk.push(d.source.id)
                }
                if (d.source.type == "Risk") {
                    return d.target.id == currentID;
                }

            })
            .attr("stroke-width", function(d){
                return d.value / 10 * gainStrokeWidth;
            })
            .attr("style", "opacity: 1");



        //----Sidebar text data--------------------------

        //create one current object for sidebar data
        riskObj.forEach(function (e) {
            if (e.id == currentID) {
                oneTrend.push(e);
            }
        });

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

        //clearing array
        oneTrend = [];
        edgesCutRisk = [];

    }//END currentNodeRisk

}//End riskInterconMap


//creating trend-risk map

function trendsRiskMap(graph){


    //main variables
    var
        trendObj = [],
        riskObj = [],
        edges = [],
        categoryObj = {},
        edgesCutTrend  = [],
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
        strokeWidth = 0.3,
        gainStrokeWidth = 6, //increment current stroke width (stroke width = strokeWidth * gainStrokeWidth)
        inactiveOpacity = 0.4; //value inactive lines opacity (normal opacity = 1 )

    //color palette d3
    var color = d3.scaleOrdinal(d3.schemeCategory20),
        trendsColor = "#AB00AB",
        trendsColorCurrent  = "#E54FBD";




    //filtering 'Trends' nodes
    graph.nodes.forEach(function (p) {
        if (p.type === 'Trend') {
            trendObj.push(p);
        }

    });
    //radius function for 'Trends' nodes
    trendObj.forEach(function (p, i) {
        var n = trendObj.length,
            step = (2 * Math.PI) / n,
            angle = i * step;
        p.cx = rLage * Math.cos(angle);
        p.cy = rLage * Math.sin(angle);
    });


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
        var sourceNode = graph.nodes.filter(function (n) {
                return n.id === e.source;
            })[0],
            targetNode = graph.nodes.filter(function (n) {
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

            j += 5;

            if (n <= 2) {
                clasterRadius = 200;
                zenith = clasterRadius / 100;
            }
            else if (n <= 4) {
                clasterRadius = 250;
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
            if(n <= 4){
                n = 4;
            }

            var angle = j * step;
            e.cx = ( ( Math.cos(b) * (( halfWidth / n / 1.4) * zenith ) ) + ( Math.sin(angle) * ( clasterRadius / j) ) );
            e.cy = ( ( Math.sin(b) * (( halfHeight / n / 1.2) * zenith ) ) + ( Math.cos(angle) * ( clasterRadius / j) ) );


        })

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
        .attr("stroke-width", strokeWidth)
        .attr("title", function (d) {
            return d.value
        })
        .attr("source", function (d) {
            return d.source.id
        })
        .attr("target", function (d) {
            return d.target.id
        });


    //--------------TRENDS NODES------------------------------------------
    //appends 'g' containers
    var gNode = svg.selectAll(".nodes-trends")
        .data(trendObj)
        .enter().append("g")
        .attr("class", "g-nodes trends")
        .on("click", currentNodeTrend);

    //append nodes in 'g' containers
    var node = gNode
        .append("circle")
        .attr("class", "nodes nodes-trends")
        .attr("id", function (d) {
            return d.id
        })
        .attr("cx", function (d) {
            return d.cx + halfWidth
        })
        .attr("cy", function (d) {
            return d.cy + halfHeight
        })
        .attr("r", nodesRadius + 2)
        .attr("fill", trendsColor);

    //add nodes text
    var textTrends = gNode
        .append("text")
        .attr("class", "text text-trends")
        .text(function (d) {
            return d.label || d.id;
        })
        .attr("dx", function (d) {
            return d.cx + halfWidth + 10
        })
        .attr("dy", function (d) {
            return d.cy + halfHeight - 10
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
        .append("circle")
        .attr("class", "nodes nodes-risks")
        .attr("cx", function (d) {
            return d.cx + halfWidth
        })
        .attr("cy", function (d) {
            return d.cy + halfHeight
        })
        .attr("id", function (d) {
            return d.id
        })
        .attr("r", nodesRadius)
        .attr("fill", function (d) {
            return color(d.category || d.group);
        });

//----------------filtering Data--------------------------------------

    //------------Event functions---------------------------------------
    //show sidebar
    function changeSidebar() {
        $("#sidebar-data").removeClass("hidden")
    }


//-------------fun on click TRENDS NODES--------------------------------
    function currentNodeTrend() {

        changeSidebar();

        //visible & transform trendsNodes
        d3.selectAll(".nodes-trends")
            .transition()
            .duration(300)
            .attr("r", nodesRadius + 2)
            .attr("fill", trendsColor);

        d3.select(this).select(".nodes-trends").transition()
            .duration(300)
            .attr("r", nodesRadius + 5);

        //visible & transform TEXT
        d3.selectAll(".text-trends")
            .attr("class", "text text-trends text-hidden")
            .attr("style", "font-size: 0.9em");

        d3.select(this).select(".text-trends")
            .attr("class", "text text-trends text-visible")
            .attr("style", "font-size: 1em: font-weight: bold");

        //check current node id
        var currentID = d3.select(this).select("circle").attr("id"),
            currentColor = d3.select(this).select("circle").attr("fill");

        //filtering all lines where currentId = source
        d3.selectAll("line")
            .attr("stroke-width", strokeWidth)
            .attr("style", "opacity: " + inactiveOpacity)
            .data(edges)
            .filter(function (d) {
                if (d.source.id == currentID) {
                    edgesCutTrend.push(d.target.id)
                }
                return d.source.id == currentID;
            })
            .attr("stroke-width", strokeWidth * gainStrokeWidth)
            .attr("style", "opacity: 1");

        //filtering current risk nodes
        d3.selectAll(".nodes-risks")
            .attr("r", nodesRadius + 1)
            .filter(function (d) {
                return edgesCutTrend.indexOf(d.id) >= 0;

            })
            .transition()
            .duration(300)
            .attr("r", nodesRadius + 3);


        //abort filtering current text nodes
        d3.selectAll(".text-risks")
            .attr("class", "text text-risks text-hidden")
            .attr("style", "font-weight: normal");
        //filtering current risk-text nodes
        d3.selectAll(".text-risks")
            .filter(function (d) {
                return edgesCutTrend.indexOf(d.id) >= 0;
            })
            .attr("class", "text text-risks text-visible");


        //----Sidebar text data--------------------------

        //create one current object for sidebar data
        trendObj.forEach(function (e) {
            if (e.id == currentID) {
                oneTrend.push(e);
            }
        });

        //type of risk
        d3.selectAll(".trend-risk")
            .text("trend");
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

        oneTrend = [];
        edgesCutTrend = [];

    }//END currentNodeTrends


//-------fun on click RISKS NODES----------------------------

    function currentNodeRisk() {
        changeSidebar();
        //visible & transform RiskNodes
        d3.selectAll(".nodes-risks")
            .transition()
            .duration(300)
            .attr("r", nodesRadius);

        d3.select(this).select("circle").transition()
            .duration(300)
            .attr("r", nodesRadius + 3);

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

        //filtering all lines where currentId = target
        d3.selectAll("line")
            .attr("stroke-width", strokeWidth)
            .attr("style", "opacity: " + inactiveOpacity)
            .data(edges)
            .filter(function (d) {
                if (d.target.id == currentID && d.source.type == "Trend") {
                    edgesCutRisk.push(d.source.id)
                }
                if (d.source.type == "Trend") {
                    return d.target.id == currentID;
                }

            })
            .attr("stroke-width", strokeWidth * gainStrokeWidth)
            .attr("style", "opacity: 1");


        //filtering current trend nodes
        d3.selectAll(".nodes-trends")
            .attr("fill", trendsColor)
            .attr("r", nodesRadius + 2)
            .filter(function (d) {
                return edgesCutRisk.indexOf(d.id) >= 0;
            })
            .transition()
            .attr("fill", trendsColorCurrent)
            .attr("r", nodesRadius + 5);


        //filtering corresponding text trends
        d3.selectAll(".text-trends")
            .attr("class", "text text-trends text-hidden")
            .attr("style", "font-size: inherit");


        d3.selectAll(".text-trends")
            .filter(function (d) {
                return edgesCutRisk.indexOf(d.id) >= 0;
            })
            .attr("class", "text text-trends text-visible")
            .attr("style", "font-size: 0.8em");


        d3.selectAll(".trend-risk")
            .text("risk");


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


//-------------ABORTING filters FUNCTION--------------------------------------------

$("#clear-filter").click(function () {

    d3.selectAll(".nodes-trends")
        .attr("r", nodesRadius + 2)
        .attr("fill", trendsColor);

    d3.selectAll(".nodes-risks")
        .attr("r", nodesRadius);

    d3.selectAll(".text-trends")
        .attr("class", "text text-trends text-hidden")
        .attr("style", "font-weight: normal");

    d3.selectAll(".text-risks")
        .attr("class", "text text-risks text-hidden")
        .attr("style", "font-weight: normal");

    d3.selectAll("line")
        .attr("stroke-width", strokeWidth)
        .attr("style", "opacity: 1");

    //----Sidebar text data clearing--------------------------

    //clearing all sidebar data text
    d3.selectAll(".s-data-text")
        .text("");

});



}//End trendsRiskMap

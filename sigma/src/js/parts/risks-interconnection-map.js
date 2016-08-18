//creating risk-interconnections map

function riskInterconMap(graph){
    $("#container-expo").removeClass("col-md-offset-1");

    //main variables
    var
        riskObj = [],
        edges = [],
        categoryObj = {},
        edgesCutRisk = [],
        oneTrend = [],
        allLinks = [],
        sortedAllLinks = [],
        linksCut = [];


    var svg = d3.select("svg"),
        width = +svg.attr("width") ,
        height = +svg.attr("height"),
        halfWidth = width/ 2,
        halfHeight = height/ 2,
        rLage = halfHeight - 20,
        rSmall = rLage/1.1,
        nodesRadius = 5,
        strokeWidth = 0.5,
        widthRect = 10,
        heightRect = 10,
        edgesColor = "#a5a5a5",
        //increment current stroke width (stroke width = strokeWidth * gainStrokeWidth)
        inactiveOpacity = 0.2; //value inactive lines opacity (normal opacity = 1 )




    //color palette d3
    var color = d3.scaleOrdinal(d3.schemeCategory20),
        trendsColor = "#AB00AB";


    //filtering 'Risk' nodes
    graph.nodes.forEach(function (p) {
        if (p.type === 'Risk') {
            riskObj.push(p);
        }

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

    var n = Object.keys(categoryObj).length, //count of categories

        polygon = {
            x:[0,20,40,60,40,20, 10,20,30,40,50,60],
            y:[0,-20,-20,0,20,20, -5,-10,-10,-5,10,10]

            //x:[0,20,40,60,80,20, 10,20,30,40,50,60],
            //y:[0,-20,0,-20,0,20, -5,-10,-10,-5,10,10]

        };

    var sCluster = 3.5;


    for (var i in categoryObj){

        //categoryObj[i].forEach(function(e,j){
        //    e.cx = polygon.x[j] * sCluster ;
        //    e.cy = polygon.y[j] * sCluster -halfHeight/2 ;
        //})
        console.log(i);

    }

                            //1
    if(categoryObj[Object.keys(categoryObj)[0]]) {
        categoryObj[Object.keys(categoryObj)[0]].forEach(function (e, j) {

            e.cx = polygon.x[j] * sCluster;
            e.cy = polygon.y[j] * sCluster - halfHeight / 2;

        });
    }

                                 //2
    if(categoryObj[Object.keys(categoryObj)[1]]) {
        categoryObj[Object.keys(categoryObj)[1]].forEach(function (e, j) {
            e.cx = polygon.x[j] * sCluster + halfWidth / 2.5;
            e.cy = polygon.y[j] * sCluster;

        });
    }

                         //3
    if(categoryObj[Object.keys(categoryObj)[2]]) {

        categoryObj[Object.keys(categoryObj)[2]].forEach(function (e, j) {
            e.cx = polygon.x[j] * sCluster;
            e.cy = polygon.y[j] * sCluster;
        });
    }


                            //4
    if(categoryObj[Object.keys(categoryObj)[3]]) {
        categoryObj[Object.keys(categoryObj)[3]].forEach(function (e, j) {

            e.cx = polygon.x[j] * sCluster - halfWidth / 2.5;
            e.cy = polygon.y[j] * sCluster;

        });
    }
                            //5

    if(categoryObj[Object.keys(categoryObj)[4]]) {
        categoryObj[Object.keys(categoryObj)[4]].forEach(function (e, j) {

            e.cx = polygon.x[j] * sCluster;
            e.cy = polygon.y[j] * sCluster + halfHeight / 2;

        });

    }

    if(categoryObj[Object.keys(categoryObj)[5]]) {

        categoryObj[Object.keys(categoryObj)[5]].forEach(function (e, j) {

            if (e) {
                e.cx = polygon.x[j] * sCluster;
                e.cy = polygon.y[j] * sCluster + halfHeight / 2;
            }

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
        .attr("stroke", edgesColor)
        .attr("title", function (d) {
            return d.value
        })
        .attr("source", function (d) {
            return d.source.id
        })
        .attr("target", function (d) {
            return d.target.id
        })
        .attr("stroke-width", function(d){
             return altStrength(d,strokeWidth,0);
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
            return d.id || d.label;
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
        //.attr("width", widthRect)
        //.attr("height", heightRect)
        .attr("r", nodesRadius)
        .attr("fill", function (d) {
            return color(d.category || d.group);
        });



//----------------filtering Data--------------------------------------

    //------------Event functions---------------------------------------
    //show sidebar
    function changeSidebar() {
       // $("#container-expo").removeClass("col-md-offset-1");
        $("#sidebar-data").removeClass("hidden")
    }


//-------function on click RISKS NODES----------------------------
    function currentNodeRisk() {
        changeSidebar();

        //visible & transform RiskNodes
        d3.selectAll(".nodes-risks")
            .transition()
            .duration(300)
            //.attr("width", widthRect)
            //.attr("height", heightRect);
            .attr("r", nodesRadius);

        d3.select(this).select("circle").transition()
            .duration(300)
            .attr("r", nodesRadius + 2);

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



        //sorting all links Ascending
         var sortedAllLinks = allLinks.sort(function(a, b) {return b.value -  a.value });

        //filtering all lines where currentId = target
        d3.selectAll("line")
            .attr("stroke-width", function(d){
                return altStrength(d, strokeWidth, 0);
            })
            .attr("style", "opacity: " + inactiveOpacity)
            .attr("class", "")
            .data(edges)
            .filter(function (d) {
                if (d.source.id == currentID) {
                    edgesCutRisk.push(d.target.id)
                }
                    return d.source.id == currentID;

            })
            .attr("style", "opacity: 1")
            .attr("class", "current-line")
            .attr("stroke-width", function(d) {
                return altStrength(d,strokeWidth, 2.5);
            });

        //filtering all links where currentId = source
        d3.selectAll("line")
            .filter(function (d) {
                if (d.target.id == currentID) {
                    edgesCutRisk.push(d.source.id)
                }
                return d.target.id == currentID;
            })
            .attr("style", "opacity: 1")
            .attr("class", "current-line")
            .attr("stroke-width", function(d) {
                return altStrength(d,strokeWidth, 2.5);
            });


        d3.selectAll(".text-risks")
            .attr("style", "font-size: 0.6em")
            .filter(function (d) {
                return edgesCutRisk.indexOf(d.id) >= 0;
            })
            .attr("class", "text text-risks text-visible")
            .attr("style", "font-size: 0.8em");

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
        allLinks = [];
        sortedAllLinks = [];

    }//END currentNodeRisk


    //function alt strokewidth
    function altStrength(d, strokeWidth, gainStrokeWidth) {

        if (d.value <= 10 || d.strength <= 10) {
            return d = strokeWidth + 0.1 + gainStrokeWidth;
        }
        else if (d.value <= 20 || d.strength <= 20) {
            return d = strokeWidth + 0.2 + gainStrokeWidth;
        }
        else if (d.value <= 30 || d.strength <= 30) {
            return d = strokeWidth + 0.3 + gainStrokeWidth;
        }
        else if (d.value <= 40 || d.strength <= 40) {
            return d = strokeWidth + 0.4 + gainStrokeWidth;
        }
        else if (d.value <= 50 || d.strength <= 50) {
            return d = strokeWidth + 0.5 + gainStrokeWidth;
        }
        else if (d.value <= 60 || d.strength <= 60) {
            return d = strokeWidth + 0.6 + gainStrokeWidth;
        }
        else if (d.value <= 70 || d.strength <= 70) {
            return d = strokeWidth + 0.7 + gainStrokeWidth;
        }
        else if (d.value <= 80 || d.strength <= 80) {
            return d = strokeWidth + 0.8 + gainStrokeWidth;
        }
        else if (d.value <= 90 || d.strength <= 90) {
            return d = strokeWidth + 0.9 + gainStrokeWidth;
        }
        else if (d.value <= 100 || d.strength <= 100) {
            return d = strokeWidth + 1 + gainStrokeWidth;
        }

        else if (d.value <= 110 || d.strength <= 110) {
            return d = strokeWidth + 1.1 + gainStrokeWidth;
        }

        else if (d.value <= 120 || d.strength <= 120) {
            return d = strokeWidth + 1.2 + gainStrokeWidth;
        }

        else  if (d.value <= 130 || d.strength <= 130) {
            return d = strokeWidth + 1.3 + gainStrokeWidth;
        }

        else if (d.value <= 140 || d.strength <= 140) {
            return d = strokeWidth + 1.4 + gainStrokeWidth;
        }

        else if (d.value <= 150 || d.strength <= 150) {
            return d = strokeWidth + 1.5 + gainStrokeWidth;
        }
        else if (d.value <= 160 || d.strength <= 160) {
            return d = strokeWidth + 1.6 + gainStrokeWidth;
        }
        else if (d.value <= 160 || d.strength <= 160) {
            return d = strokeWidth + 1.7 + gainStrokeWidth;
        }
        else if (d.value <= 170 || d.strength <= 170) {
            return d = strokeWidth + 1.8 + gainStrokeWidth;
        }
        else if (d.value <= 180 || d.strength <= 180) {
            return d = strokeWidth + 1.9 + gainStrokeWidth;
        }
        else if (d.value <= 190 || d.strength <= 190) {
            return d = strokeWidth + 2 + gainStrokeWidth;
        }
        else if (d.value <= 200 || d.strength <= 200) {
            return d = strokeWidth + 2.1 + gainStrokeWidth;
        }
        else if(d.value > 200 || d.strength > 200){
            return d = strokeWidth + 2.2 + gainStrokeWidth;
        }
    }

    //-------------ABORTING filters FUNCTION--------------------------------------------

    $("#clear-filter").click(function () {

        d3.selectAll(".nodes-trends")
            .attr("r", nodesRadius + 2)
            .attr("fill", trendsColor);

        d3.selectAll(".nodes-risks")
            //.attr("width", widthRect)
            //.attr("height", heightRect);
            .attr("r", nodesRadius);

        d3.selectAll(".text-trends")
            .attr("class", "text text-trends text-hidden")
            .attr("style", "font-weight: normal");

        d3.selectAll(".text-risks")
            .attr("class", "text text-risks text-hidden")
            .attr("style", "font-weight: normal");

        d3.selectAll("line")
            .data(edges)
            .attr("stroke-width", function(d){
                return altStrength(d,strokeWidth,0);

            })
            .attr("style", "opacity: 1")
            .attr("stroke","gray")
            .attr("class", "");

        //----Sidebar text data clearing--------------------------

        //clearing all sidebar data text
        d3.selectAll(".s-data-text")
            .text("");

    });

    $("#highlight-text").click(function(){
        d3.selectAll(".text-risks")
            .attr("class", "text text-risks text-visible")
    });



}//End riskInterconMap


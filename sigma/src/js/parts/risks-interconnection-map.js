//creating risk-interconnections map

function riskInterconMap(graph){

    $("body").attr("class","map interconnections");


    // maps trigger
    //delete previous highlight button
    $(".map-list li").removeClass('active');
    //highlighting  map button
   $("#intercon-button").addClass("active");

    //clear most connected
    $(".most-connected").html("");

    $(".data-area-left").addClass("hidden");


    //main variables
    var
        riskObj = [],
        edges = [],
        categoryObj = {},
        edgesCutRisk = [],
        oneTrend = [],
        linksCut = [],
        edgesForThree = [],
        textClasses = {};


    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        halfWidth = width/ 2 - 50,
        halfHeight = height/ 2,
        nodesRadius = 4,
        strokeWidth = 0.5,
        edgesColor = "#a5a5a5",
        inactiveOpacity = 0.2; //value inactive lines opacity (normal opacity = 1 )



    //color palette d3
    var color = d3.scaleOrdinal(d3.schemeCategory20);


    //classes for text object
    textClasses = {
        "default": "text text-risks",
        "visible": "text text-risks text-visible",
        "hidden": "text text-risks text-hidden"
    };



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

    var countCategories = Object.keys(categoryObj).length, //count of categories

        polygon = {
            x:[0,20,40,60,40,20, 15,25,35,45,55,65],
            y:[0,-20,-15,5,15,20, -3,-8,-23,-13,2,8],

            xHeight: [-10,10,30,50,30,10, 5,15,25,35,45,55],
            yHeight:[-10,-30,-25,-5,5,10, -13,-18,-32,-23,2,-8],

            xLow: [10,30,50,70,50,30, 25,35,45,55,65,75],
            yLow:[10,-10,-5,15,25,30, 7,2,-13,-3,18,8]

        };

    var sCluster = 3.6, //clusters size
        heightGain = 1.6;


    if(halfHeight <= 400){
        sCluster = 3.2;
        heightGain = 1.8;
    }


    if(countCategories > 5){
        halfHeight = halfHeight - 100;
        halfWidth = halfWidth -100
    }

                            //1
    if(categoryObj[Object.keys(categoryObj)[0]]) {
        categoryObj[Object.keys(categoryObj)[0]].forEach(function (e, j) {

            e.cx = polygon.x[j] * sCluster;
            e.cy = polygon.y[j] * sCluster - halfHeight / heightGain;

        });
    }

                            //2
    if(categoryObj[Object.keys(categoryObj)[1]]) {
        categoryObj[Object.keys(categoryObj)[1]].forEach(function (e, j) {
            e.cx = polygon.x[j] * sCluster + halfWidth / 2.2;
            e.cy = polygon.y[j] * sCluster;

        });
    }

                         //3
    if(categoryObj[Object.keys(categoryObj)[2]]) {
        categoryObj[Object.keys(categoryObj)[2]].forEach(function (e, j) {


            e.cx = (polygon.xLow[j] - 5) * sCluster;
            e.cy = (polygon.yLow[j] + 5)  * sCluster;
        });
    }

    if(categoryObj[Object.keys(categoryObj)[2]]) {                       //4
        categoryObj[Object.keys(categoryObj)[3]].forEach(function (e, j) {
          e.cx = (polygon.xHeight[j] + 5) * sCluster - halfWidth / 2.2;
          e.cy = (polygon.yHeight[j] - 5) * sCluster;

        });
    }

                            //5
    if(categoryObj[Object.keys(categoryObj)[4]]) {
        categoryObj[Object.keys(categoryObj)[4]].forEach(function (e, j) {

            e.cx = (polygon.x[j] + 10)  * sCluster;
            e.cy = (polygon.y[j] +5 ) * sCluster + halfHeight / heightGain;

        });

    }
                            //6
    if(categoryObj[Object.keys(categoryObj)[5]]) {
        categoryObj[Object.keys(categoryObj)[5]].forEach(function (e, j) {


            e.cx = (polygon.xHeight[j] + 5) * sCluster - halfWidth / 2.2;
            e.cy = polygon.yHeight[j] * sCluster + halfHeight / heightGain;

        });
    }
                            //7
    if(categoryObj[Object.keys(categoryObj)[6]]) {
        categoryObj[Object.keys(categoryObj)[6]].forEach(function (e, j) {

           e.cx = polygon.xLow[j] * sCluster + halfWidth / 2.2;
           e.cy = polygon.yLow[j] * sCluster + halfHeight / heightGain;

        });
    }
                            //8
    if(categoryObj[Object.keys(categoryObj)[7]]) {
        categoryObj[Object.keys(categoryObj)[7]].forEach(function (e, j) {

            e.cx = polygon.x[j] * sCluster - halfHeight / heightGain ;
            e.cy = polygon.y[j] * sCluster - halfWidth / 2.2;

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
        .attr("source", function (d) {
            return d.source.id
        })
        .attr("target", function (d) {
            return d.target.id
        })
        .attr("stroke-width", function(d){
            return altStrength(d,strokeWidth, 0);
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
        .attr("class", textClasses.default)
        .text(function (d) {
            return d.label || d.id;
        })
        .attr("dx", function (d) {
            return d.cx + halfWidth - 14;
        })
        .attr("dy", function (d) {
            return d.cy + halfHeight - 8;
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
        .attr("r", function(d){
            return altNodeSize(d, nodesRadius, 0) })
        .attr("fill", function (d) {
            return color(d.category || d.group);
        });



//----------------filtering Data--------------------------------------
    //clear filter block
    $(".risk-categories").html("");



//-------function on click RISKS NODES----------------------------
    function currentNodeRisk() {
        $(".data-area-left").removeClass("hidden");
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
                return altNodeSize(d, nodesRadius,2)
            });

        //visible & transform TEXT
        d3.selectAll(".text-risks")
            .attr("class", textClasses.hidden)
            .attr("style", "font-weight: normal");

        d3.select(this).select(".text-risks")
            .attr("class", textClasses.visible)
            .attr("style", "font-weight: bold; font-size: 0.9em");

        //check current node id
        var currentID = d3.select(this).select("circle").attr("id"),
            currentColor = d3.select(this).select("circle").attr("fill");


        //filtering all lines where currentId = source
        d3.selectAll("line")
            .attr("stroke-width", function(d){
                return altStrength(d, strokeWidth, 0);
            })
            .attr("style", "opacity: " + inactiveOpacity)
            .attr("class", "")
            .data(edges)
            .filter(function (d) {
                if (d.source.id == currentID) {
                    edgesCutRisk.push(d.target.id);
                    edgesForThree.push({source: d.target, value: d.value});
                }
                    return d.source.id == currentID;

            })
            .attr("style", "opacity: 1")
            .attr("class", "current-line")
            .attr("stroke-width", function(d) {
                return altStrength(d,strokeWidth, 2.5);
            });


        //filtering all links where currentId = target
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
            .attr("class", textClasses.visible)
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


        //sort array to max
        edgesForThree.sort(
            function(a, b) {
                return b.value - a.value;
            }
        );


        //general sidebar data function (common-functions template)
        getDataSidebar(riskObj, oneTrend, currentColor, edgesForThree);


        //clearing array
        oneTrend = [];
        edgesCutRisk = [];
        edgesForThree = [];


    }//END currentNodeRisk(Click)





//-----------------------CURRENT NODE-----------------------------------------------


    function currentNode(){
        var edgesCutRiskCur = [],
        //save current node
            currNode = $(".trends-selected").attr("curid"),
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
                .attr("class", textClasses.visible)
                .attr("style", "font-weight: bold; font-size: 0.9em");

            d3.selectAll("line")
                .attr("style", "opacity: 1");

            //filtering all lines where currentId = source
            d3.selectAll("line")
                .attr("stroke-width", function (d) {
                    return altStrength(d, strokeWidth, 0);
                })
                .attr("style", "opacity: " + inactiveOpacity)
                .attr("class", "")
                .data(edges)
                .filter(function (d) {
                    if (d.source.id == currNode) {
                        edgesCutRiskCur.push(d.target.id)
                    }
                    return d.source.id == currNode;

                })
                .attr("style", "opacity: 1")
                .attr("class", "current-line")
                .attr("stroke-width", function (d) {
                    return altStrength(d, strokeWidth, 2.5);
                });


            //filtering all links where currentId = target
            d3.selectAll("line")
                .filter(function (d) {
                    if (d.target.id == currNode) {
                        edgesCutRiskCur.push(d.source.id)
                    }
                    return d.target.id == currNode;
                })
                .attr("style", "opacity: 1")
                .attr("class", "current-line")
                .attr("stroke-width", function (d) {
                    return altStrength(d, strokeWidth, 2.5);
                });

            //filtering all text labels
            d3.selectAll(".text-risks")
                .filter(function (d) {
                    return edgesCutRiskCur.indexOf(d.id) >= 0;
                })
                .attr("class", textClasses.visible)
                .attr("style", "font-size: 0.8em");

            edgesCutRiskCur = [];

        }
    }//end current node

    currentNode();

//-----------------Three most connected----------------------
    function threeNodeFun(cutOfThree){

        var currentID,
            currentColor;

        currentID = cutOfThree;


        //visible & transform RiskNodes
        d3.selectAll(".nodes-risks")
            .transition()
            .duration(300)
            .attr("class","nodes nodes-risks")
            .attr("r", function(d){
                return altNodeSize(d, nodesRadius,0) 
            });

        svg.selectAll(".nodes-risks")
            .filter(function (d) {
                return d.id == currentID;
            })
            .transition()
            .duration(300)
            .attr("r", function (d) {
                return altNodeSize(d, nodesRadius, 2)
            });


        //visible & transform TEXT
        d3.selectAll(".text-risks")
            .attr("class", textClasses.hidden)
            .attr("style", "font-weight: normal");

        d3.selectAll(".text-risks")
            .filter(function (d) {
                return d.id == currentID;
            })
            .attr("class", textClasses.visible)
            .attr("style", "font-weight: bold; font-size: 0.9em");



        //filtering all lines where currentId = source
        d3.selectAll("line")
            .attr("stroke-width", function(d){
                return altStrength(d, strokeWidth, 0);
            })
            .attr("style", "opacity: " + inactiveOpacity)
            .attr("class", "")
            .data(edges)
            .filter(function (d) {
                if (d.source.id == currentID) {
                    edgesCutRisk.push(d.target.id);
                    edgesForThree.push({source: d.target, value: d.value});
                }
                return d.source.id == currentID;

            })
            .attr("style", "opacity: 1")
            .attr("class", "current-line")
            .attr("stroke-width", function(d) {
                return altStrength(d,strokeWidth, 2.5);
            });



        //filtering all links where currentId = target
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
            .attr("class", textClasses.visible)
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


        //sort array to max
        edgesForThree.sort(
            function(a, b) {
                return b.value - a.value;
            }
        );


        //category color
        var io = d3.selectAll(".nodes-risks")
            .filter(function(d){
                return d.id == currentID
            })
            .attr("fill");

        currentColor = io;


        //general sidebar data function (common-functions template)
        getDataSidebar(riskObj, oneTrend, currentColor, edgesForThree);

        //clearing array
        oneTrend = [];
        edgesCutRisk = [];
        edgesForThree = [];

     }//End threeNodeFun

    //function on click most connected button

        $(document).on("click", ".most-connected .m-node",function() {
            if($("body").hasClass("interconnections")){

                $(this).parent().find('li').removeClass("active");
                $(this).addClass("active");
                var cutOfThree  = $(this).attr("mid");

                    threeNodeFun(cutOfThree);
            }
        });

//-----------------------END CURRENT NODE-----------------------------------------------


    //-------------ABORTING filters FUNCTION--------------------------------------------

    //generic clearing function
    function clearRimMap(){
        d3.selectAll(".nodes-risks")
            .attr("class","nodes nodes-risks")
            .attr("r", function(d){
                return altNodeSize(d, nodesRadius,0) });


        d3.selectAll(".text-risks")
            .attr("class", "text text-risks text-hidden")
            .attr("style", "font-weight: normal");

        d3.selectAll("line")
            .data(edges)
            .attr("stroke-width", function(d){
                return altStrength(d,strokeWidth,0);

            })
            .attr("style", "opacity: 1")
            .attr("class", "");

        //----Sidebar text data clearing--------------------------

        d3.selectAll(".data-area")
            .attr("class","data-area hidden");

        d3.selectAll(".data-area-left")
            .attr("class","data-area hidden");

        //clearing all sidebar data text
        d3.selectAll(".s-data-text")
            .text("");

        //clear current node
        $(".trends-selected").attr("curid","empty");

    }
    //clear button
    $("#clear-filter").click(function () {
        clearRimMap();

    });

    //clear all on page on blur
    $("#graph-wrapper").click(function (e) {
        if(e.target.id != 'container-graph')
            return;
        clearRimMap();

    });

    //-------------END ABORTING filters FUNCTION--------------------------------------------



}//End riskInterconMap


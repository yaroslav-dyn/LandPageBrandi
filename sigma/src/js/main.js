var heightWindow = $(window).innerHeight() - 120,
	widthWindow = $(".container-expo").innerWidth() - 120;



$('#container-graph-static').attr('width',widthWindow).attr('height',heightWindow).css('height',heightWindow);

function staticMap(){

	//main variables
	var svg = d3.select("svg"),
		width = +svg.attr("width") ,
		height = +svg.attr("height"),
		halfWidth = width/ 2,
		halfHeight = height/ 2,

		rLage = halfHeight - 20,
		rSmall = rLage/1.1 ,
		trendObj = [],
		riskObj = [],
		edges = [],
		categoryObj = {},
		nodesRadius = 5;

	//color palette d3
	var color = d3.scaleOrdinal(d3.schemeCategory20),
		trendsColor = "purple";


	// var simulation = d3.forceSimulation()
	// 	.force("link", d3.forceLink().id(function(d) { return d.id; }))
	// 	.force("charge", d3.forceManyBody())
	// 	.force("center", d3.forceCenter(width / 2, height / 2));



//parse json D3.js
	d3.json("csv/complete.json", function(error, graph) {
		if (error) throw error;

//-----------------filtering and coordinates-------------------

		//filtering 'Trends' nodes
		graph.nodes.forEach(function(p){
			if(p.type === 'Trend'){
				trendObj.push(p);
			}

		});
		//radius function for 'Trends' nodes
		trendObj.forEach(function(p,i){
			var n = trendObj.length,
				step = (2 * Math.PI)/n,
				angle = i * step;
			p.cx = rLage * Math.cos(angle);
			p.cy = rLage * Math.sin(angle);
		});


		//filtering 'Risk' nodes
		graph.nodes.forEach(function(p){
			if(p.type === 'Risk'){
				riskObj.push(p);
			}

		});


		//radius function for 'risk' nodes
		riskObj.forEach(function(p,i){
			var n = riskObj.length,
				step = (2 * Math.PI)/n,
				angle = i * step;
				p.cx = rSmall * Math.cos(angle);
				p.cy = rSmall * Math.sin(angle);
		});


		//creating object links
		graph.links.forEach(function(e) {
			var sourceNode = graph.nodes.filter(function(n) { return n.id === e.source; })[0],
				targetNode = graph.nodes.filter(function(n) { return n.id === e.target; })[0];

			edges.push({source: sourceNode, target: targetNode, value: e.value});
		});

		//created object for risk nodes
		riskObj.forEach(function(e){
			var categories = e.category;


			if(categoryObj[categories] == undefined){
				categoryObj[categories] = [];
			}
			categoryObj[categories].push(e);

		});

		//include coordinate in sort object
		var b = 1;
		for(var i in categoryObj){
			b += 5;

			var n = categoryObj[i].length,
			step = (2 * Math.PI)/ n,
			clasterRadius,
			zenith;

			categoryObj[i].forEach(function(e,j){

				j += 6;

				if(n<=2){
					clasterRadius = 250;
					zenith = clasterRadius/100;
				}
				else if(n<=4){
					clasterRadius = 300;
					zenith =clasterRadius/100;
				}
				else if(n<=6){
					clasterRadius = 350;
					zenith = clasterRadius/100;
				}
				else if(n<=8){
					clasterRadius = 300;
					zenith = clasterRadius/100;
				}
				else if(n<=10){
					clasterRadius = 350;
					zenith = clasterRadius/100;
				}
				else if(n<=12){
					clasterRadius = 400;
					zenith = clasterRadius/100;
				}
				else if(n<=14){
					clasterRadius = 450;
					zenith = clasterRadius/100;
				}
				else if(n<=16){
					clasterRadius = 500;
					zenith = clasterRadius/100;
				}

				var angle = j * step;
				e.cx =   ( ( Math.cos(b) * (( halfWidth/n/1.4) * zenith ) ) + ( Math.sin(angle) * ( clasterRadius / j) ) );
				e.cy =   ( ( Math.sin(b) * (( halfHeight/n/1.2) * zenith ) ) + ( Math.cos(angle) * ( clasterRadius / j) ) );


			})

		}

//----------------filtering Data----------------------------------





//----------------Append in DOM SVG--------------------------------

	//--------------LINKS-----------------------------------------
		//append links
		var link = svg.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(edges)
			.enter().append("line")
			.attr("x1", function(d) { return d.source.cx + halfWidth; })
			.attr("y1", function(d) { return d.source.cy + halfHeight; })
			.attr("x2", function(d) { return d.target.cx + halfWidth; })
			.attr("y2", function(d) { return d.target.cy + halfHeight; })
			.attr("stroke",function(d){return color(d.target.category)})
			.attr("stroke-width", "0.3")
			.attr("title", function(d){return d.value})
			.attr("source", function(d){return d.source.id})
			.attr("target", function(d){return d.target.id});





	//--------------TRENDS NODES------------------------------------------
		//appends 'g' containers
		var gNode = svg.selectAll(".nodes-trends")
				.data(trendObj)
				.enter().append("g")
				.attr("fill",trendsColor)
				.attr("class","g-nodes trends")
				.on("click", currentNode);


		//append nodes in 'g' containers
		var node = gNode
				.append("circle")
				.attr("class","nodes nodes-trends")
				.attr("id",function(d){return d.id})
				.attr("cx", function(d){ return d.cx  + halfWidth })
				.attr("cy", function(d){ return d.cy  + halfHeight })
				.attr("r", nodesRadius + 2);

		//add nodes text
		var textTrends = gNode
			.append("text")
			.attr("class","text trends")
			.text(function(d) { return d.label || d.id; })
			.attr("dx", function(d){ return d.cx + halfWidth + 10})
			.attr("dy", function(d){ return d.cy + halfHeight - 10});


	//--------------RISK NODES-----------------------------------------
		//appends 'g' containers
		var rNode = svg.selectAll(".nodes-risks")
			.data(riskObj)
			.enter().append("g")
			.attr("class","g-nodes risks");



		//append nodes in 'g' containers
		var risknode = rNode
			.append("circle")
			.attr("class","nodes nodes-risks")
			.attr("cx", function(d){ return d.cx  + halfWidth })
			.attr("cy", function(d){ return d.cy  + halfHeight })
			.attr("id",function(d){return d.id})
			.attr("r", nodesRadius)
			.attr("fill", function(d) { return color(d.category || d.group); });


		//add nodes text
		var textRisks = rNode
			.append("text")
			.attr("class","text risks")
			.text(function(d) { return d.label || d.id; })
			.attr("dx", function(d){ return d.cx + halfWidth + 10})
			.attr("dy", function(d){ return d.cy + halfHeight - 6});


	//------------Event functions---------------------------------------

		//fun on click TRENDS NODES
		function currentNode() {

			//visible & transform NODES
			d3.selectAll(".nodes-trends")
				.transition()
				.duration(300)
				.attr("r", nodesRadius + 2);

			d3.select(this).select("circle").transition()
				.duration(300)
				.attr("r", nodesRadius + 5);


			d3.select(this).select("circle").attr("cx");


			//visible & transform TEXT
			d3.selectAll(".text")
				.attr("class","text trends");

			d3.select(this).select("text")
				.attr("class","text trends text-visible");

			var currentID = d3.select(this).select("circle").attr("id");


			if( $("line").attr('source') == currentID ){
				alert(this);
			}








				//dd
				//.filter(function(d){
				//	return d.source === 'R_WATER';
                //
				//})
				//.attr("stroke-width","4");



		}




	});//End json d3.js
}//end static map

var input = document.getElementById('upload-input');
//rules to upload file
function handleFileSelect()
{
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return;
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else {
        fileAppStare();
    }
}
//inicialize fileReader(uploader)
function fileAppStare(){
    $('#container-graph').html('')
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    //fr.readAsText(file);
    fr.readAsDataURL(file);
}


//* files parser in parts/parsers

//On change do all
$('#upload-input').on('change',function(){
    handleFileSelect();
    var fileName = document.getElementById('load-file');
    var parseName =  file.name;
    var spanEl = document.getElementById('header-file');
    fileName.innerText = "file Upload: ";
    spanEl.innerText = parseName;
    var nameEl = $('.load-file-name');
    nameEl.addClass('name-show');
    $('#container-graph').attr('width','960').attr('height','800').css('height','800px');

    //snapshot
    $('#pj').on('click', function(){
        html2canvas([ document.getElementById('container-graph') ], {
            onrendered: function(canvas) {
               $('#snap-area').append(canvas);
            }
        });
    });

});
//parsers




//  parse json file in area (d3.js)
function receivedText() {

	var heightWindow = $(window).innerHeight() - 120,
		widthWindow = $(".container-expo").innerWidth() - 120;

	$('#container-graph').attr('width',widthWindow).attr('height',heightWindow).css('height',heightWindow);

		//main variables
		var svg = d3.select("svg"),
			width = +svg.attr("width") ,
			height = +svg.attr("height"),
			halfWidth = width/ 2,
			halfHeight = height/ 2,

			rLage = halfHeight - 20,
			rSmall = rLage/1.1 ,
			trendObj = [],
			riskObj = [],
			edges = [],
			categoryObj = {};

		//color palette d3
		var color = d3.scaleOrdinal(d3.schemeCategory20),
			trendsColor = "purple";


		// var simulation = d3.forceSimulation()
		// 	.force("link", d3.forceLink().id(function(d) { return d.id; }))
		// 	.force("charge", d3.forceManyBody())
		// 	.force("center", d3.forceCenter(width / 2, height / 2));



//parse json D3.js
		d3.json("csv/complete.json", function(error, graph) {
			if (error) throw error;

//-----------------filtering and coordinates-------------------

			//filtering 'Trends' nodes
			graph.nodes.forEach(function(p){
				if(p.type === 'Trend'){
					trendObj.push(p);
				}

			});
			//radius function for 'Trends' nodes
			trendObj.forEach(function(p,i){
				var n = trendObj.length,
					step = (2 * Math.PI)/n,
					angle = i * step;
				p.cx = rLage * Math.cos(angle);
				p.cy = rLage * Math.sin(angle);
			});


			//filtering 'Risk' nodes
			graph.nodes.forEach(function(p){
				if(p.type === 'Risk'){
					riskObj.push(p);
				}

			});


			//radius function for 'risk' nodes
			riskObj.forEach(function(p,i){
				var n = riskObj.length,
					step = (2 * Math.PI)/n,
					angle = i * step;
				p.cx = rSmall * Math.cos(angle);
				p.cy = rSmall * Math.sin(angle);
			});


			//creating object links
			graph.links.forEach(function(e) {
				var sourceNode = graph.nodes.filter(function(n) { return n.id === e.source; })[0],
					targetNode = graph.nodes.filter(function(n) { return n.id === e.target; })[0];

				edges.push({source: sourceNode, target: targetNode, value: e.value});
			});

			//created object for risk nodes
			riskObj.forEach(function(e){
				var categories = e.category;


				if(categoryObj[categories] == undefined){
					categoryObj[categories] = [];
				}
				categoryObj[categories].push(e);

			});

			//include coordinate in sort object
			var b = 1;
			for(var i in categoryObj){
				b += 5;

				var n = categoryObj[i].length,
					step = (2 * Math.PI)/ n,
					clasterRadius,
					zenith;


				var bangle = b * step;

				categoryObj[i].forEach(function(e,j){

					j += 6;

					if(n<=2){
						clasterRadius = 250;
						zenith = clasterRadius/100;
					}
					else if(n<=4){
						clasterRadius = 300;
						zenith =clasterRadius/100;
					}
					else if(n<=6){
						clasterRadius = 350;
						zenith = clasterRadius/100;
					}
					else if(n<=8){
						clasterRadius = 300;
						zenith = clasterRadius/100;
					}
					else if(n<=10){
						clasterRadius = 350;
						zenith = clasterRadius/100;
					}
					else if(n<=12){
						clasterRadius = 400;
						zenith = clasterRadius/100;
					}
					else if(n<=14){
						clasterRadius = 450;
						zenith = clasterRadius/100;
					}
					else if(n<=16){
						clasterRadius = 500;
						zenith = clasterRadius/100;
					}


					var angle = j * step;
					e.cx =   ( ( Math.cos(b) * (( halfWidth/n/1.4) * zenith ) ) + ( Math.sin(angle) * ( clasterRadius / j) ) );
					e.cy =   ( ( Math.sin(b) * (( halfHeight/n/1.2) * zenith ) ) + ( Math.cos(angle) * ( clasterRadius / j) ) );


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
				.attr("x1", function(d) { return d.source.cx + halfWidth; })
				.attr("y1", function(d) { return d.source.cy + halfHeight; })
				.attr("x2", function(d) { return d.target.cx + halfWidth; })
				.attr("y2", function(d) { return d.target.cy + halfHeight; })
				.attr("stroke",function(d){return color(d.target.category)})
				.attr("title", function(d){return d.value});

			//--------------TRENDS NODES------------------------------------------
			//appends 'g' containers
			var gNode = svg.selectAll(".nodes-trends")
				.data(trendObj)
				.enter().append("g")
				.attr("fill",trendsColor);


			//append nodes in 'g' containers
			var node = gNode
				.append("circle")
				.attr("class","nodes nodes-trends")
				.attr("cx", function(d){ return d.cx  + halfWidth })
				.attr("cy", function(d){ return d.cy  + halfHeight })
				.attr("r", 7);

			//add nodes text
			var textTrends = gNode
				.append("text")
				.attr("class","text trends")
				.text(function(d) { return d.label || d.id; })
				.attr("dx", function(d){ return d.cx + halfWidth - 30})
				.attr("dy", function(d){ return d.cy + halfHeight  - 10});


			//--------------RISK NODES-----------------------------------------
			//appends 'g' containers
			var rNode = svg.selectAll(".nodes-risks")
				.data(riskObj)
				.enter().append("g");


			//append nodes in 'g' containers
			var risknode = rNode
				.append("circle")
				.attr("class","nodes nodes-risks")
				.attr("cx", function(d){ return d.cx  + halfWidth })
				.attr("cy", function(d){ return d.cy  + halfHeight })
				.attr("id",function(d){return d.id})
				.attr("r", 5)
				.attr("fill", function(d) { return color(d.category || d.group); });


			//add nodes text
			var textRisks = rNode
				.append("text")
				.attr("class","text risks")
				.text(function(d) { return d.label || d.id; })
				.attr("dx", function(d){ return d.cx + halfWidth + 10})
				.attr("dy", function(d){ return d.cy + halfHeight + - 6});


		});//End json d3.js






}//End parse file in area (d3.js)
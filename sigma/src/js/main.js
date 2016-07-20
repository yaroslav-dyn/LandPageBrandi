
$('#container-graph-static').attr('width','960').attr('height','600').css('height','600px');

function staticMap(){

	//main variables
	var svg = d3.select("svg"),
		width = +svg.attr("width"),
		height = +svg.attr("height"),
		halfWidth = width/ 2,
		halfHeight = height/ 2,

		rLage = halfHeight / 1.1,
		rSmall = rLage / 2,
		trendObj = [],
		riskObj = [],
		edges = [];

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



		console.log(edges);

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
		var gNode = svg.selectAll(".nodes-risk")
				.data(trendObj)
				.enter().append("g")
				.attr("fill",trendsColor);


		//append nodes in 'g' containers
		var node = gNode
				.append("circle")
				.attr("class","nodes nodes-risk")
				.attr("cx", function(d){ return d.cx  + halfWidth })
				.attr("cy", function(d){ return d.cy  + halfHeight })
				.attr("r", 6);

		//add nodes text
		var text = gNode
				.append("text")
				.attr("class","text trends")
				.text(function(d) { return d.label || d.id; })
				.attr("dx", function(d){ return d.cx + halfWidth + 10})
				.attr("dy", function(d){ return d.cy + halfHeight + - 6});


	//--------------RISK NODES-----------------------------------------
		//appends 'g' containers
		var rNode = svg.selectAll(".nodes-trends")
			.data(riskObj)
			.enter().append("g")
			.attr("fill", function(d) { return color(d.category || d.group); });


		//append nodes in 'g' containers
		var risknode = rNode
			.append("circle")
			.attr("class","nodes nodes-trends")
			.attr("cx", function(d){ return d.cx  + halfWidth })
			.attr("cy", function(d){ return d.cy  + halfHeight })
			.attr("id",function(d){return d.id})
			.attr("r", 5);


		//add nodes text
		var text = rNode
			.append("text")
			.attr("class","text trends")
			.text(function(d) { return d.label || d.id; })
			.attr("dx", function(d){ return d.cx + halfWidth + 10})
			.attr("dy", function(d){ return d.cy + halfHeight + - 6});


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

  var nameFile = fr.result;

	var svg = d3.select("svg"),
		width = +svg.attr("width"),
		height = +svg.attr("height");

	var color = d3.scaleOrdinal(d3.schemeCategory20);

	var simulation = d3.forceSimulation()
		.force("link", d3.forceLink().id(function(d) { return d.id; }))
		.force("charge", d3.forceManyBody())
		.force("center", d3.forceCenter(width / 2, height / 2));

//parse json D3.js
	d3.json(nameFile, function(error, graph) {
		if (error) throw error;

		var link = svg.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(graph.links)
			.enter().append("line")
			.attr("stroke-width", function(d) { return Math.sqrt(d.value);});
		link.append("title")
			.text(function(d) { return d.value || d.strength ; })   
		
		var gNode = svg.selectAll(".nodes")
				.data(graph.nodes)
				.enter().append("g")
				.attr("class", "nodes");

		var node = gNode
				.append("circle")			
				.attr("r", 8)
				.attr("fill", function(d) { return color(d.category || d.group); })
				// .on('mouseover', showText)
				// .on('mouseout', hideText);
			   				   
		var text = gNode
				.append("text")
				.attr("class", "text")  
				.text(function(d) { return d.label || d.id; });
	  			
		simulation
			.nodes(graph.nodes)
			.on("tick", ticked);

		simulation.force("link")
			.links(graph.links);

		function ticked() {
			link
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });

			node
				.attr("cx", function(d) { return d.x; })
				.attr("cy", function(d) { return d.y; });

			text
				.attr("dx", function(d) { return d.x + 10; })
				.attr("dy", function(d) { return d.y-10; });    
		  
		}

		//functions

		function showText() {       
			 text.attr('class','visible');
			 console.log('event');    
		}

		function hideText() {       
			 text.attr('class','hidden');
		}

	});//End json d3.js



}//End parse file in area (d3.js)
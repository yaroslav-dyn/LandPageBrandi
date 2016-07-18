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



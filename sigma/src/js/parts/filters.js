
$('#container-graph-static').attr('width','960').attr('height','800').css('height','800px');
function staticMap(){
 
	var svg = d3.select("svg"),
		width = +svg.attr("width"),
		height = +svg.attr("height");

	var color = d3.scaleOrdinal(d3.schemeCategory20);

	// var simulation = d3.forceSimulation()
	// 	.force("link", d3.forceLink().id(function(d) { return d.id; }))
	// 	.force("charge", d3.forceManyBody())
	// 	.force("center", d3.forceCenter(width / 2, height / 2));

   


//parse json D3.js
	d3.json("csv/complete.json", function(error, graph) {
		var n = 20,
			rSmall = 20,
			rLage = 200,
			points = d3.range(n),
			chords = [],
			step = (2 * Math.PI)/n;	


		var simulation = points.forEach(function(p, i){
			var angle = i * step;
				chords.push({cx: rLage * Math.cos(angle)}, {cy: rLage * Math.sin(angle)});
			});	

	

		if (error) throw error;

		var link = svg.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(graph.links)
			.enter().append("line");
		link.append("title")
			.text(function(d) { return d.value || d.strength ; });
		
		//var gNode = svg.selectAll(".nodes")
		//		.data(graph.nodes)
		//		.enter().append("g")
		//		.attr("class", "nodes")
		//		.attr("fill", function(d) { return color(d.category || d.group); });


		var node = svg.append("g")

				.selectAll("circle")
			.data(chords)
				.enter().append("circle")

				.attr("cx", function(d){ return d.cx})
				.attr("cy", function(d){ return d.cy})
				.attr("r", 8);
			
			   				   
		//var text = gNode
		//		.append("text")
		//		.attr("class", "text")
		//		.attr("dy", ".35em")
		//		.text(function(d) { return d.label || d.id; });
	  			
		// simulation
		// 	.nodes(graph.nodes)
		// 	.on("tick", ticked);

		// simulation.force("link")
		// 	.links(graph.links);

	

		// function ticked() {

		// 	link
		// 		.attr("x1", function(d) { return d.source.x; })
		// 		.attr("y1", function(d) { return d.source.y; })
		// 		.attr("x2", function(d) { return d.target.x; })
		// 		.attr("y2", function(d) { return d.target.y; });

		// 	// node
		// 	// 	.attr("cx", function(d) { return d.x; })
		// 	// 	.attr("cy", function(d) { return d.y; });

		// 	text
		// 		.attr("x", function(d) { return d.x; })
		// 		.attr("y", function(d) { return d.y; });    
		  
		// }


	});//End json d3.js

}
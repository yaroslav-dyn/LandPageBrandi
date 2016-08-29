var heightWindow = $(window).innerHeight() - 120,
	widthWindow = $(".container-expo").innerWidth() - 120;

//min height for testing
if(heightWindow <= 600){
	heightWindow = 600;
}



function receivedText(){
$('#container-graph').attr('width', widthWindow).attr('height', heightWindow).css("height", heightWindow);


//parse json D3.js
	var fileName = fr.result;
	d3.json( fileName , function(error, graph) {

		if (error) throw error;

//-----------------filtering and coordinates-------------------

	//show sidebar
	 $("#sidebar-data").removeClass("hidden");

	//default cart
	//trendsRiskMap(graph);

	riskInterconMap(graph);



	});//End json d3.js

}//end receivedText








$("#intercon-button").on("click",function(){
	$("#container-graph").html("");
	$("#graph-wrapper").css("text-align", "center");


	function receivedText(){
		$("#container-graph").attr("width", widthWindow).attr("height", heightWindow).css("height", heightWindow);


//parse json D3.js
		var fileName = fr.result;
		d3.json( fileName , function(error, graph) {


			if (error) throw error;

//-----------------filtering and coordinates-------------------


			riskInterconMap(graph);


		});//End json d3.js

	}//end receivedText
	receivedText();
});

$("#trends-button").on("click",function(){
	$('#container-graph').html('');
	$("#graph-wrapper").css("text-align", "right");

	function receivedText(){
		$('#container-graph').attr('width', widthWindow).attr('height', heightWindow).css("height", heightWindow);

//parse json D3.js
		var fileName = fr.result;
		d3.json( fileName , function(error, graph) {
			if (error) throw error;

			trendsRiskMap(graph);


		});//End json d3.js

	}//end receivedText
	receivedText();
});

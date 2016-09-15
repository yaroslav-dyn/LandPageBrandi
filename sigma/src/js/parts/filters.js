
var heightWindow = $(window).innerHeight() - 120,
	widthWindow = $(".container-expo").innerWidth() - 120;

//min height for testing
if(heightWindow <= 600){
	heightWindow = 600;
}



function receivedText(e){
$('#container-graph').attr('width', widthWindow).attr('height', heightWindow).css("height", heightWindow);

//parse json D3.js
	var fileName = e.target.result;


	//d3.json( fileName , function(error, graph) {
    //
	//	if (error) throw error;

//-----------------filtering and coordinates-------------------

	//change grid for left sidebar
	$("#left-sidebar").removeClass("hidden");
	$("#container-expo").removeClass("col-md-10").addClass("col-md-8");
	//show sidebar
	$("#sidebar-data").removeClass("hidden");
	$(".upload-wrapper").addClass("hidden");

	//default cart:
	//trendsRiskMap(graph);
	//riskInterconMap(graph);
	riskInterconMap(JSON.parse(fileName));

	//});//End json d3.js

}//end receivedText


//--------FOR TESTING-------------------------------------------------------------------------------------------//
function staticMap(){

	$("#sidebar-data").removeClass("hidden");

	//change size block for this map
	var heightWindow = $(window).innerHeight() - 120,
		widthWindow = $(".container-expo").innerWidth();

	$('#container-graph').attr('width', widthWindow).attr('height', heightWindow).css("height", heightWindow);

	//parse json D3.js
	d3.json( "csv/complete-cut.json" , function(error, graph) {

			if (error) throw error;

		//trendsRiskMap(graph);
		//riskInterconMap(graph);
		landscapeMap(graph);

	});//End json d3.js


}
//--------END  FOR TESTING-------------------------------------------------------------------------------------------//

//call r-i map
$("#intercon-button").on("click",function(){
	$("#container-graph").html("");

	function receivedText(){
		$("#container-graph").attr("width", widthWindow).attr("height", heightWindow).css("height", heightWindow);

		//parse json D3.js
		var fileName = fr.result;

		riskInterconMap(JSON.parse(fileName));


	}//end receivedText
	receivedText();
});

//call t-r map
$("#trends-button").on("click",function(){
	$('#container-graph').html('');




	function receivedText(){
		$('#container-graph').attr('width', widthWindow).attr('height', heightWindow).css("height", heightWindow);

		//parse json D3.js
		var fileName = fr.result;
			trendsRiskMap(JSON.parse(fileName));


	}//end receivedText
	receivedText();
});

//call landscape map
$("#landscape-map").on("click",function(){
	$('#container-graph').html('');


	function receivedText(){
		$('#container-graph').attr('width', widthWindow).attr('height', heightWindow).css("height", heightWindow);

		//parse json D3.js
		var fileName = fr.result;

		landscapeMap(JSON.parse(fileName));

		//});//End json d3.js

	}//end receivedText
	receivedText();
});
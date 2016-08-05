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



		//$("#trendsMap").click(trendsRiskMap(graph));
		riskInterconMap(graph);


	});//End json d3.js

}//end receivedText
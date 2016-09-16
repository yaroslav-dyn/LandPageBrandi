var heightWindow, widthWindow;


function receivedText(e){

	var heightWindow = $(window).innerHeight() - 120,
		widthWindow = $(".container-expo").innerWidth() - 60;

//min height for testing
	if(heightWindow <= 600){
		heightWindow = 600;
	}


	$('#container-graph').attr('width', widthWindow).attr('height', heightWindow).css("height", heightWindow);

//parse json D3.js
	var fileName = e.target.result;




//-----------------filtering and coordinates-------------------

	//change grid for left sidebar
	$("#left-sidebar").removeClass("hidden");
	$("#container-expo").removeClass("col-md-10").addClass("col-md-8");
	//show sidebar
	$("#sidebar-data").removeClass("hidden");
	$(".upload-wrapper").addClass("hidden");
	$(".slogan").addClass("hidden");

	//default cart:
	//trendsRiskMap(graph);
	//riskInterconMap(graph);
	riskInterconMap(JSON.parse(fileName));

	//});//End json d3.js

}//end receivedText



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
		$('#container-graph').attr('width', widthWindow).attr('height', heightWindow).css("height", heightWindow)

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
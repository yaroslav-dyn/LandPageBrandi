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



		//trendsRiskMap(graph);
		riskInterconMap(graph);


	});//End json d3.js

}//end receivedText


function staticMap(){

	$('#container-graph').attr('width', widthWindow).attr('height', heightWindow).css("height", heightWindow);

	d3.json( "csv/complete.json" , function(error, graph) {


		if (error) throw error;


		trendsRiskMap(graph);
		//riskInterconMap(graph);


	});//End json d3.js

}


//Click map trigger


$(".map-list li").on("click", function(){
	
	$(this).parent().find('li').removeClass('active');
	$(this).addClass("active");


});




$("#intercon-button").on("click",function(){
	$('#container-graph').html('');
	function receivedText(){
		$('#container-graph').attr('width', widthWindow).attr('height', heightWindow).css("height", heightWindow);


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

$("#risk-intercon-button").on("click",function(){
	$('#container-graph').html('');
	function receivedText(){
		$('#container-graph').attr('width', widthWindow).attr('height', heightWindow).css("height", heightWindow);


//parse json D3.js
		var fileName = fr.result;
		d3.json( fileName , function(error, graph) {


			if (error) throw error;

//-----------------filtering and coordinates-------------------



			trendsRiskMap(graph);


		});//End json d3.js

	}//end receivedText
	receivedText();
});

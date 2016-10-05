
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
    $('#container-graph').html('');
    file  = document.querySelector('input[type=file]').files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file, "UTF-8");
    //fr.readAsDataURL(file);

}

//* files parser in parts/parsers

//On change do all
$('#upload-input').on('change',function(){
    handleFileSelect();
    var fileName = document.getElementById('load-file');
    var parseName =  file.name;
    var spanEl = document.getElementById('header-file');
    fileName.innerText = "File Upload: ";
    spanEl.innerText = parseName;
    var nameEl = $('.load-file-name');
    nameEl.addClass('name-show');

});



d3.json("../csv/data.json", function(data) {


	var
		sortRegion = [];


	data.forEach(function(e){

		var reg = e.Region;

			if (sortRegion[reg] == undefined) {
				sortRegion[reg] = [];
			}
			sortRegion[reg];

	});


//append in DOM

	//append population wrapper
	d3.select(".regions")
		.append("div")
		.attr("class","col-md-6 pop-wrapper");


	//append area wrapper
	d3.select(".regions")
		.append("div")
		.attr("class","col-md-6 area-wrapper");

	//append 'population' label
	d3.select(".pop-wrapper")
		.append("div")
		.attr("class","col-md-12 pop-label")
		.text("Population");

	//append 'Land mass (Area)' label
	d3.select(".area-wrapper")
		.append("div")
		.attr("class","col-md-12 area-label")
		.text("Land mass (Area)");



	Object.keys(sortRegion).forEach(function (e) {

		$(".pop-wrapper").append("<div class='col-md-12 region' id='"+ e +"'>" + "<div class='col-md-12 region-labels'>"+ e + "</div>" + "</div>");
		$(".area-wrapper").append("<div class='col-md-12 region' id='"+ e +"'>" + "<div class='col-md-12 region-labels'>"+ e + "</div>" + "</div>");

	});




	data.forEach(function(e){
		$(".region").each(function(){

			if($(this).attr("id") == e.Region){
				$(this).append("<div class='col-md-2 label-country'>" + e.Country + "</div>");
			}
		});


	});



	//
	//d3.select(".pop-wrapper")
	//	.data(Object.keys(sortRegion))
	//	.enter()
	//	.append("div")
	//	.attr("class","col-md-12 pop-label")
	//	.text(Object.keys(sortRegion));
	//


    //
    //
	// 	d3.select(".pop-wrapper")
	//	.selectAll(".pop-item")
	//	.data(data)
	//	.enter().append("div")
	//	.attr("class","col-md-2 region pop-item");
    //
    //
    //
	//	d3.selectAll(".pop-item")
	//		.append("div")
	//		.attr("class","label-country")
	//		.text(function(d){
	//			return d.Country;
	//		})
	//		.attr("data-toggle","tooltip")
	//		.attr("data-original-title",function(d){
	//			return d.Population
	//		})
	//		.attr("data-placement", "top");
    //
    //
	//	d3.selectAll(".pop-item")
	//		.append("div")
	//		.attr("class","pop")
	//		.text(function(d){
	//			return d.Population
	//		});
    //
    //


	//

    //
    //
	//d3.select(".area-wrapper")
	//	.selectAll(".area-item")
	//	.data(data)
	//	.enter().append("div")
	//	.attr("class","col-md-2 region area-item");
    //
    //
	//d3.selectAll(".area-item")
	//	.append("div")
	//	.attr("class","label-country")
	//	.text(function(d){
	//		return d.Country;
	//	});
    //
    //
	//d3.selectAll(".area-item")
	//	.append("div")
	//	.attr("class","pop")
	//	.text(function(d){
	//		return d.Area
	//	});


	sortRegion = [];

});
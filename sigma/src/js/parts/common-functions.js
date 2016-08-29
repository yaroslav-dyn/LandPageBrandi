//Global functions for maps

//show all label
$("#highlight-text").click(function(){
    d3.selectAll(".text")
        .attr("class", "text text-risks text-visible")
});
//abort event on link
$( ".map-list li a" ).click(function( event ) {
    event.preventDefault();

});



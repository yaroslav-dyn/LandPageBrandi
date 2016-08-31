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


/*function  node size depending on "rank 1-6"
    for R-I and Landscape map
 */
function altNodeSize(d, nodesRadius, gainNodeSize) {

    if (d.rank == 1 ) {
        return d = nodesRadius + 3.2 + gainNodeSize;
    }
    else if (d.rank == 2 ) {
        return d = nodesRadius + 2.6 + gainNodeSize;
    }
    else if (d.rank == 3 ) {
        return d = nodesRadius + 2 + gainNodeSize;
    }
    else if (d.rank == 4 ) {
        return d = nodesRadius + 1.4 + gainNodeSize;
    }
    else if (d.rank == 5 ) {
        return d = nodesRadius + 0.8 + gainNodeSize;
    }
    else if (d.rank == 6 ) {
        return d = nodesRadius + 0.2 + gainNodeSize
    }
    else{
        return d = nodesRadius  + gainNodeSize;
    }

}

/*function  stroke width depending on "rank 1-6"
    for r-i map
*/
function altStrength(d, strokeWidth, gainStrokeWidth) {

    if (d.source.rank == 1 || d.target.rank == 1 ) {
        return d = strokeWidth + 1.1 + gainStrokeWidth;
    }
    else if (d.source.rank == 2 || d.target.rank == 2) {
        return d = strokeWidth  + 0.6 + gainStrokeWidth;
    }
    else{
        return d = strokeWidth  - 0.2 + gainStrokeWidth;
    }

}



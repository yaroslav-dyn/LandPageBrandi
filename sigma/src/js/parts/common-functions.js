//Global functions for maps

//show all label
$("#highlight-text").click(function(){
    d3.selectAll(".text")
        .attr("class", "text text-risks text-visible")
});

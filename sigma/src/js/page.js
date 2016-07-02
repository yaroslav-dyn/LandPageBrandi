
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

function fileAppStare(){
    var contanGraph = document.getElementById('container-gexf');
    contanGraph.innerText = "";
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    //fr.readAsText(file);
    fr.readAsDataURL(file);
}


//  parse file in area (sigma.js)
function receivedText() {
    var nameFile = fr.result;
    var gexfSigma = new sigma({
        renderer: {
            container: document.getElementById('container-gexf'),
            type: 'canvas'
        },
        settings:{
            doubleClickEnabled: false
            //enableEdgeHovering: true,
            //edgeHoverColor: 'edge',
            //defaultEdgeHoverColor: '#fff',
            //edgeHoverSizeRatio: 1,
            //edgeHoverExtremities: true
        }

    });
    sigma.parsers.gexf(
        nameFile,
        gexfSigma,
        function() {
            gexfSigma.refresh();
            gexfSigma.graph.nodes().forEach(function (n) {  
                if(n.attributes[0] != undefined){
                    var el = n.attributes[0];
                }
                else{
                    console.log("attribute not found")
                }
              
            })
        }
               // Array.prototype.contains = function(v) {
               //      for(var i = 0; i < this.length; i++) {
               //          if(this[i] === v) return true;
               //      }
               //      return false;
               //  };

               //  Array.prototype.unique = function() {
               //      var arr = [];
               //      for(var i = 0; i < this.length; i++) {
               //          if(!arr.contains(this[i])) {
               //              arr.push(this[i]);
               //          }
               //      }
               //      return arr; 
               //  }
               //  var uniqueMas = n.attributes[0].unique()



    );
    //export json
    //$('#pj').click(function(){
    //    gexfSigma.toJSON({
    //        download: true,
    //        filename: 'graph.json'
    //    });
    //})

}//End parse file in area (sigma.js)


//On change do all
$('#upload-input').on('change',function(){
    handleFileSelect();
    var fileName = document.getElementById('load-file');
    var parseName =  file.name;
    var spanEl = document.getElementById('header-file');
    fileName.innerText = "file Upload: ";
    spanEl.innerText = parseName;
    var nameEl = $('.load-file-name');
    nameEl.addClass('name-show');
    $('#container-gexf').height(400);
 
    //snapshot
    $('#pj').on('click', function(){
        html2canvas([ document.getElementById('container-gexf') ], {
            onrendered: function(canvas) {
               $('#snap-area').append(canvas);
            }
        });
    });


});




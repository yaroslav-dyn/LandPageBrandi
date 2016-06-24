
var input = document.getElementById('upload-input');
//onclick upload file
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

//  parse file in area
function receivedText() {
    var nameFile = fr.result;
    sigma.parsers.gexf(
        nameFile,
        { container: 'container-gexf' }
    );

}
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

});
//*******************************************************************************************

var g = {
    "nodes": [
        {
            "id": "n0",
            "label": "A node",
            "x": 0,
            "y": 0,
            "size": 3
        },
        {
            "id": "n1",
            "label": "Another node",
            "x": 3,
            "y": 1,
            "size": 2
        },
        {
            "id": "n2",
            "label": "And a last one",
            "x": 1,
            "y": 3,
            "size": 1
        }
    ],
    "edges": [
        {
            "id": "e0",
            "source": "n0",
            "target": "n1"
        },
        {
            "id": "e1",
            "source": "n1",
            "target": "n2"
        },
        {
            "id": "e2",
            "source": "n2",
            "target": "n0"
        }
    ]
};




var s = new sigma({
    graph: g,
    renderer: {
        container: 'graph-container',
        type: 'canvas'
    },
    settings: {
        minNodeSize: 3,
        maxNodeSize: 3,
        minEdgeSize: 3,
        maxEdgeSize: 3
    }
});







//// Finally, let's ask our sigma instance to refresh:
//s.refresh();
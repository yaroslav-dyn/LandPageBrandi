
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



//  parse file in area
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
        }

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
            "label": "node 1",
            "x": 0,
            "y": 0,
            'size': 1
        },
        {
            "id": "n1",
            "label": "node 2",
            "x": 3,
            "y": 0,
            'size': 1
        },
        {
            "id": "n2",
            "label": "node 3",
            "x": 3,
            "y": 3,
            'size': 1
        },
        {
            "id": "n3",
            "label": "node 4",
            "x": 0,
            "y": 3,
            'size': 1
        },
        {
            "id": "n4",
            "label": "node 4",
            "x": 1.5,
            "y": 1.5,
            'size': 1
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
            "target": "n3"
        },
        {
            "id": "e3",
            "source": "n3",
            "target": "n0"
        },
        {
            "id": "e4",
            "source": "n0",
            "target": "n2"
        },
        {
            "id": "e5",
            "source": "n1",
            "target": "n3"
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
        minEdgeSize: 1,
        maxEdgeSize: 3,
        minNodeSize: 2,
        maxNodeSize: 3,
        defaultEdgeColor: 'purple',
        edgeColor: 'edge',
        defaultNodeColor: 'red',
        nodeColor: 'node',
        font: "Verdana",
        labelThreshold: "3",
        defaultLabelColor:"green"
    }
});








//// Finally, let's ask our sigma instance to refresh:
//s.refresh();
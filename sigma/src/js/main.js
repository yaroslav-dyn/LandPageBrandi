
var input = document.getElementById('upload-input');

//onclick upload file
function handleFileSelect()
{
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser.');
        return;
    }


    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Upload'");
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

$('#upload-input').on('change',function(){
    handleFileSelect()
    var fileName = document.getElementById('load-file');
    var parseName =  file.name;
    var spanEl = document.getElementById('header-file');
    fileName.innerText = "file UPload: ";
    spanEl.innerText = parseName;
    $('.load-file-name').css('opacity',1);
});





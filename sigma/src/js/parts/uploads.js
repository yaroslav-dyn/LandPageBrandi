
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
    file = input.files[0];
    fr = new FileReader();
    fr.onload = receivedText;
    //fr.readAsText(file);
    fr.readAsDataURL(file);
}


//* files parser in parts/parsers

//On change do all
$('#upload-input').on('change',function(){
    handleFileSelect();
    var fileName = document.getElementById('load-file');
    var fileNameSb = document.getElementById('load-file-sb');
    var parseName =  file.name;
    var spanEl = document.getElementById('header-file');
    var spanElSb = document.getElementById('header-file-sb');
    fileName.innerText = "file Upload: ";
    fileNameSb.innerText = "file Upload: ";
    spanEl.innerText = parseName;
    spanElSb.innerText = parseName;
    var nameEl = $('.load-file-name');
    nameEl.addClass('name-show');

    //snapshot
    $('#pj').on('click', function(){
        html2canvas([ document.getElementById('container-graph') ], {
            onrendered: function(canvas) {
               $('#snap-area').append(canvas);
            }
        });
    });

});



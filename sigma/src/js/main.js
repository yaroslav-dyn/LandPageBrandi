var filter;
/**
 * DOM utility functions
 */
var _ = {
  $: function (id) {
    return document.getElementById(id);
  },
  all: function (selectors) {
    return document.querySelectorAll(selectors);
  },
  removeClass: function(selectors, cssClass) {
    var nodes = document.querySelectorAll(selectors);
    var l = nodes.length;
    for ( i = 0 ; i < l; i++ ) {
      var el = nodes[i];
      // Bootstrap compatibility
      el.className = el.className.replace(cssClass, '');
    }
  },
  addClass: function (selectors, cssClass) {
    var nodes = document.querySelectorAll(selectors);
    var l = nodes.length;
    for ( i = 0 ; i < l; i++ ) {
      var el = nodes[i];
      // Bootstrap compatibility
      if (-1 == el.className.indexOf(cssClass)) {
        el.className += ' ' + cssClass;
      }
    }
  },
  show: function (selectors) {
    this.removeClass(selectors, 'hidden');
  },
  hide: function (selectors) {
    this.addClass(selectors, 'hidden');
  },
  toggle: function (selectors, cssClass) {
    var cssClass = cssClass || "hidden";
    var nodes = document.querySelectorAll(selectors);
    var l = nodes.length;
    for ( i = 0 ; i < l; i++ ) {
      var el = nodes[i];
      //el.style.display = (el.style.display != 'none' ? 'none' : '' );
      // Bootstrap compatibility
      if (-1 !== el.className.indexOf(cssClass)) {
        el.className = el.className.replace(cssClass, '');
      } else {
        el.className += ' ' + cssClass;
      }
    }
  }
};
function updatePane (graph, filter) {
  var categories = {};

  // read nodes
  graph.nodes().forEach(function(n) {
    categories[n.attributes.cat] = true;
  });

  var nodecategoryElt = _.$('node-category');
  Object.keys(categories).forEach(function(c) {
    var optionElt = document.createElement("option");
    optionElt.text = c;
    nodecategoryElt.add(optionElt);

  });

  //custom each for categories
  var catList = $('#list-cat');
  Object.keys(categories).forEach(function(c) {
    var liElt = document.createElement("li");
    liElt.text = c;
    catList.append('<li>'+ c + '</li>');
  });


  //$(' li').click(function(){
  //    var tt = $(this).text();
  //  $('#node-category').val(tt);
  //});

  // reset button
  _.$('reset-btn').addEventListener("click", function(e) {
    _.$('node-category').selectedIndex = 0;
    filter.undo().apply();
    _.$('dump').textContent = '';
    _.hide('#dump');
  });
  //// export button
  //_.$('export-btn').addEventListener("click", function(e) {
  //  var chain = filter.serialize();
  //  console.log(chain);
  //  _.$('dump').textContent = JSON.stringify(chain);
  //  _.show('#dump');
  //});
}
sigma.renderers.def = sigma.renderers.canvas;
// Initialize sigma with the dataset:
sigma.parsers.gexf('gexf/graph-4.gexf', {
  container: 'container-gexf',
  settings: {

  }
}, function(s) {


  s.graph.nodes().forEach(function (n) {
   console.log(n.viz.color);
    n.viz.color = 'rgb(0,0,0)';

  });
  s.refresh();


  // Initialize the Filter API
  filter = sigma.plugins.filter(s);
  updatePane(s.graph, filter);
  function applyCategoryFilter(e) {
    var c = e.target[e.target.selectedIndex].value;
    filter
      .undo('node-category')
      .nodesBy(
        function(n, options) {
          return !c.length || n.attributes[options.property] === c;
        },
        {
          property: 'cat'
        },
        'node-category'
      )
      .apply();
  }



  $(' #list-cat li').on("click", applyCategoryFilter, function(){
    var tt = $(this).text();
    $('#node-category').val(tt);
  });


  _.$('node-category').addEventListener("change", applyCategoryFilter);
});

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
        function(s) {


            //
            //s.graph.nodes().forEach(function (n) {
            //    if(n.attributes['cat'] != undefined){
            //        var el = n.attributes;
            //        console.log(el);
            //    }
            //    else{
            //        console.log("attribute not found")
            //    }
            //
            //});





            s.refresh();
        }
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
    $('#container-gexf').height(800);
 
    //snapshot
    $('#pj').on('click', function(){
        html2canvas([ document.getElementById('container-gexf') ], {
            onrendered: function(canvas) {
               $('#snap-area').append(canvas);
            }
        });
    });


});
//parsers
sigma.parsers.json(
  'gexf/convertcsv.json',
  { container: 'parse-csv' }
);
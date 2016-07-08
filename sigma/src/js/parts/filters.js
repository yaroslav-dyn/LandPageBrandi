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

  var nodecategoryElt = $('#node-category');
  Object.keys(categories).forEach(function(c) {
    var optionElt = document.createElement("li");
    optionElt.text = c;
    console.log(optionElt.text);
    nodecategoryElt.append("<li>"+optionElt.text +"</li>");
  });
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
// Initialize sigma with the dataset:
sigma.parsers.gexf('gexf/graph-4.gexf', {
  container: 'container-gexf',
  settings: {
    edgeColor: 'default',
    defaultEdgeColor: '#ccc'
  }
}, function(s) {
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

  _.$('node-category').addEventListener("change", applyCategoryFilter);
});

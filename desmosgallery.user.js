// ==UserScript==
// @name        DesmosGallery
// @namespace   https://github.com/FabriceNeyret/DesmosGallery
// @version     1.6.1
// @description Desmos Gallery generator
// @author      Fabrice Neyret
// @include     https://www.desmos.com/calculator*
// @match       https://*.desmos.com/calculator*
// @run-at      document-start
// @grant       GM_addStyle
// @downloadURL https://github.com/FabriceNeyret/DesmosGallery/raw/main/desmosgallery.user.js
// @updateURL   https://github.com/FabriceNeyret/DesmosGallery/raw/main/desmosgallery.user.js
// ==/UserScript==

// changelog:
//   1.6        OPTION (default=true) : skip draft graphs ( title = Undefined ).
//   1.5        include date & link to github. OPTION (default=false): date + backup URL per graph
//   1.4        protection against DesModder freezing Desmos start script
//   1.3        structure new place found. Independance back.
//   1.2        fix after Desmos Calc is now closured. Now rely on DesModder util.
//   1.1        also download the html file ( images directly link to Desmos website )
//   1.0        first version: open a new tab with the gallery

/* DesmosGallery TamperMonkey / GreaseMonkey script by Fabrice Neyret */
// script structure inspired by https://github.com/baz1/DesmosToSVG

function PageScript() {
  window.DesmosGallery = new Object();

  // my stuff
  DesmosGallery.getGallery = function() {
    var g = Calc._calc.globalHotkeys.mygraphsController.graphsController.__savedGraphs; // structure found again. ( thanks Naitronbomb ! )
 // var g = DesModder.controller.topLevelComponents.graphsController.__savedGraphs;     // since 09/2022 the Calc structure is no longer exposed. Now rely on DesModder util.
 // var g = Calc.myGraphsWrapper._childViews[0].props.graphsController().__savedGraphs; // structure containing all user graph informations. ( thanks fireflame241 ! )
    
    var t = "<html>\n<head><title> Desmos graphs - visual list </title>\n";             // build the gallery html
    t += "<style>div { display:inline-block; width : 200px; height: 250px; padding: 10px;} div img { height: 200px;  width:  200px;}</style>\n"; // CSS
    t += "</head>\n<body>\n<hr><center><h1>My Desmos Graphs visual list</h1> </center><hr>\n";
    gc = Date().replace(/ \([\s\S]*?\)/g, '');
    t += "(&nbsp "+g.length+" graphs&nbsp&nbsp <small> on &nbsp "+gc+"</small>&nbsp&nbsp)</br>\n";
    skip = 0;
    for( var i=0; i<g.length; i++) {                                                    // foreach user graphs
      if ( true && ( g[i].title == "Graphique sans titre" || g[i].title == "Untitled Graph" ) ) 
          { skip++; continue; }                                                         // OPTIONAL: skip draft graphs ( title undefined )
      t += "<div><a href=https://www.desmos.com/calculator/"+g[i].hash+"><img src="+g[i].thumbURL+"></br>"+g[i].title+"</a>"; // image + title + URL
      if ( false )  t+= " (<a href="+g[i].stateURL+">JSON"+"</a>)";                     // OPTIONAL: JSON URL for backup
      if ( false ) {                                                                    // OPTIONAL: show creation date of each graph
        var gc=""+g[i].created;
        gc = gc.replace(/ \([\s\S]*?\)/g, '');
        t+= " ("+gc+")";
      }
      t += "</div>\n";
    }
    if (skip > 0)  t+="<br>"+skip+" untitled graphs skipped.";
    t+="<hr>&nbsp&nbsp&nbsp<small>generated with <a href=https://github.com/FabriceNeyret/DesmosGallery>DesmosGallery</a></small></body></html>"
    window.open().document.write(t);                                                    // creates new tab with gallery
    download( t, "DesmosGallery.html", "text/plain; charset=UTF-8" );                   // download the html file
  };

function download(data, filename, type) { // from https://github.com/SlimRunner/desmos-scripts-addons/blob/master/graph-archival-script/
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
          url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

  function pollForValue(func) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const val = func();
        if (val !== null && val !== undefined) {
          clearInterval(interval);
          resolve(val);
        }
      }, 100);
    });
  }
  
  function init() {    
    var spanObj = document.createElement("SPAN");                                       // creates button
    DesmosGallery.button = document.createElement("INPUT");
    DesmosGallery.button.type = "button";
    DesmosGallery.button.disabled = false; // true;
    DesmosGallery.button.addEventListener("click", DesmosGallery.getGallery, false);
    DesmosGallery.button.value = "Get Gallery";

    spanObj.appendChild(DesmosGallery.button);

    DesmosGallery.graph = document.getElementsByClassName("dcg-graph-inner");           // attach it to the top bar
    if (DesmosGallery.graph.length != 1) {
      console.log("GM_DesmosGallery: Graph not found, or several found.");
      return;
    }
    DesmosGallery.graph = DesmosGallery.graph[0];
    var floaters = document.getElementsByClassName("align-right-container");
    if (floaters.length != 1) {
      console.log("GM_DesmosGallery: Floaters object not found, or several found.");
      return;
    }
    floaters[0].appendChild(spanObj);
    console.log("GM_DesmosGallery: (Info) Button added.");

  }

  pollForValue(() => window.Calc).then(() => {  // protection against DesModder freezing Desmos start script
        console.log("Calc has been loaded");
        init();
      });
}

function AddJSNode(fn, url) {
  var scriptNode = document.createElement("script");
  scriptNode.type = "text/javascript";
  if (fn) scriptNode.textContent = "(" + fn.toString() + ")();";
  if (url) scriptNode.src = url;
  var target = document.getElementsByTagName ('head')[0] ||
      document.body || document.documentElement;
  target.appendChild(scriptNode);
}

window.addEventListener("DOMContentLoaded", function() {
//AddJSNode(null, "exernalJStoInclude.js");
  AddJSNode(PageScript, null);
}, false);

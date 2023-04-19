function setupListeners(){
    document.addEventListener("mouseup", masterClick, false); 
    document.addEventListener("keydown", masterKeyDown, false);
    document.addEventListener("keyup", masterKeyUp, false);
    document.addEventListener("dblclick", masterDBLclick, false); 
    _hnd['svgHandler'].addEventListener("mousedown", controllerEventMouseDown, false);
    _hnd['svgHandler'].addEventListener("mousemove", controllerEventMouseMove, false);
    //$(window).bind('mousewheel DOMMouseScroll', function (event) { controllerEventWheel(event);  }  );
    window.addEventListener('mousewheel', controllerEventWheel);
    window.addEventListener('DOMMouseScroll', controllerEventWheel);
    window.addEventListener("resize", updateRuler);

    document.addEventListener('contextmenu', function(evt) { 
      evt.preventDefault();
    }, false);
    
    document.onchange = function(evt){
      //evt = evt || window.event;
      var mck = evt.target.getAttribute("change");
      if( mck!=null)fnCall(mck, evt);
    }

    contextMenu = document.querySelector(".wrapper"),
    shareMenu = contextMenu.querySelectorAll(".share-menu");

    _hnd['svgHandler'].addEventListener("contextmenu", e => {
        e.preventDefault();
        let x = e.offsetX, y = e.offsetY;

        x+=48; y+=42;
        var r=showRightMenu();
        if(r==false)return;

        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
        //contextMenu.style.visibility = "visible";
        visibilityForSelection(".wrapper", "block");
    });
    //document.addEventListener("click", () => contextMenu.style.visibility = "hidden");

}

function masterKeyDown(evt){
    //evt = evt || window.event;     
    var ctrlDown = evt.ctrlKey||evt.metaKey; // Mac support
    _evtMsg['keycode']=evt.keyCode;
    if (evt.ctrlKey && evt.keyCode == 90)controlZundo();        // CTRZ Z
    if (ctrlDown && (evt.keyCode == 67))toClipboard(false);     // CTRL C 
    if (ctrlDown && (evt.keyCode == 86))pasteClipboard(evt);    // CTRL V
    if (ctrlDown && (evt.keyCode == 88))toClipboard(true);      // CTRL X
    if ( evt.keyCode == 33 )MCKapplyZorder(false, "forward");      // PageUP
    if ( evt.keyCode == 34 )MCKapplyZorder(false, "backward");      // PageDown
    if (ctrlDown && (evt.keyCode == 71)){evt.preventDefault();MCKbtnGroupClick(true);  }      // CTRL G
    if (ctrlDown && (evt.keyCode == 80)){evt.preventDefault();OpenImageNewTab(true);  }      // CTRL P
    if( evt.keyCode == 27 )restoreKeys();                                                     // ESC
    if( evt.keyCode == 46 )deleteSeleccion();                                                 // DELETE
    if( evt.keyCode == 113 ){evt.preventDefault(); zoomMore(evt);      }                      // F2 ZoomMore
    if( evt.keyCode == 114 ){evt.preventDefault(); zoomMinus(evt);      }                     // F3 ZoomMinus        
}
function masterKeyUp(evt){
  _evtMsg['keycode']=null;
}

function masterClick(evt){
  if( _evtMsg['waitFor']!=null ){
    fnCall(_evtMsg['waitFor'], evt);
    _evtMsg['waitFor']=null;
    return;
  }
  visibilityForSelection(".wrapper", "none");
  drawPolygon(evt,'click');
  dragScreen(evt, 'up');
  drawSelector(evt, 'up');
  var mck = evt.target.getAttribute("mouseUp");         
  if( mck!=null)fnCall(mck, evt);
}

function masterDBLclick(evt){
    //evt = evt || window.event;
    var dbck = evt.target.getAttribute("DblClick");
    if( dbck!=null)fnCall(dbck, evt);
}

/*function controllerEventClick(evt){         //toda el area SVG         
    drawPolygon(evt,'click');
}*/

function controllerEventMouseMove(evt){        
    mouseMoveAreaWork(evt);
    if( evt.shiftKey){
      var r=dragScreen(evt, 'move');  
      if(r==true)return;
    }    
    drawSelector(evt, 'move');
    drawPolygon(evt,'move');  
}

function controllerEventWheel(evt){
    zoom(evt);
}

function controllerEventMouseDown(evt){         
  //contextMenu.style.visibility = "hidden";  
  dragScreen(evt, 'down');
    drawSelector(evt, 'down');
    //if(_evtMsg['jxWork']==true && evt.button==2)duplicateSelection(); 
    var MouseDown = evt.target.getAttribute("MouseDown");
    if( MouseDown!=null){
      fnCall(MouseDown, evt);
      return;
    }
}
        
/*function controllerEventMouseUp(evt){         
    dragScreen(evt, 'up');
    drawSelector(evt, 'up');
}*/

function addListenerFunSelector( _event, _selector, _fun){
  [...document.querySelectorAll(_selector)].forEach((element, index, array) => {
    element.addEventListener(_event, _fun , false);
  });
}

function listAllEventListeners() {
        const allElements = Array.prototype.slice.call(document.querySelectorAll('*'));
        allElements.push(document);
        allElements.push(window);      
        const types = [];
      
        for (let ev in window) {
          if (/^on/.test(ev)) types[types.length] = ev;
        }
      
        let elements = [];
        for (let i = 0; i < allElements.length; i++) {
          const currentElement = allElements[i];
          for (let j = 0; j < types.length; j++) {
            if (typeof currentElement[types[j]] === 'function') {
              elements.push({
                "node": currentElement,
                "type": types[j],
                "func": currentElement[types[j]].toString(),
              });
            }
          }
        }      
        return elements.sort(function(a,b) {
          return a.type.localeCompare(b.type);
        });
}
function spy(){
        console.table(listAllEventListeners());
}

function spy2(){
  var cta=0;
  Array.from(document.querySelectorAll("*")).forEach(element => {
      const events = getEventListeners(element);
      if (Object.keys(events).length !== 0) {
          console.log(element, events);
          cta++;
      }
  });
  console.log("Total Listeners:"+cta);
}

function fnCall(fn, ...args){
  let func = (typeof fn =="string")?window[fn]:fn;
  if (typeof func == "function") func(...args);
  else throw new Error(`${fn} is Not a function!`);
}
    

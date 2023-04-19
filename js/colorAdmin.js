function MCKclickBotonManager(event){
    var id=event.target.id;
    if( checkVisibility( document.getElementById("panelColorAdmin") )==true ){ 
        removeAllFromSelection(".preview");
        removeAllFromSelection(".controlerFill");
        removeAllFromSelection(".markColorDeg ");
        clearListener("fillColorsCombineDeg");
        clearListener("borderColorsCombineDeg");
        removeClassFromSelection(".btnTool.sel", "sel");
        [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
            element.hide();
        });
        sTool='';
    }else{
        var ttItems=document.querySelectorAll(".selectable").length;
        if(ttItems==0){
            document.getElementById("tbColorAdmin").style.display = "none";
            document.getElementById("colorAdminNoItems").style.display = "block";
        }else{
            document.getElementById("tbColorAdmin").style.display = "block";
            document.getElementById("colorAdminNoItems").style.display = "none";
        }
        selecTool(id, 'panelColorAdmin', 'COLOR ADMIN');
        setupColorManager();
    }
} 
  
//addListenerFunSelector( "click", ".fillStyle", fillInsideStyleClick );  
function MCKfillInsideStyleClick(event){
    var parent=event.target.parentNode.id;
    var selNext=event.target.id;
    removeAllFromSelection(".controlerFill");
    removeClassFromSelection("#controllerFillLineal", "sel");
    removeClassFromSelection("#controllerBorderLineal", "sel");

    removeClassFromSelection("#"+parent+" .fillStyle", "sel");
    addClassForSelection("#"+event.target.id, "sel");  
    document.getElementById(parent).setAttribute("sel", selNext);

    if(parent=='fillInsideStyle'){
        visibilityForSelection( ".verForTypeFill", '');
        visibilityForSelection( ".verForTypeFill."+selNext, 'none');        //console.log("fillInsideStyle");
        if( selNext=="fillInsideNone" ){                                    //console.log("fillInsideNone");
            [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {       
                applyColor2element(element, "none", "fill");
            });
        }else if( selNext=="fillInsideSolid" ){                             //console.log("fillInsideSolid");
            var color=document.getElementById("colorisFill").value;
            [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {       
                applyColor2element(element, color, "fill");
            });
        }else if( selNext=="fillInsideDeg" || selNext=="fillInsideRad" ){
            parseCSS("fillColorsCombineDeg", "fillInsideStyle", "fill");
            controlPointZ("color");
        }
    }else if(parent=='fillBorderStyle'){
        visibilityForSelection( ".verForTypeBorder", '');
        visibilityForSelection( ".verForTypeBorder."+selNext, 'none');      //console.log("fillBorderStyle");
        if( selNext=="fillBorderNone" ){                                    //console.log("fillBorderNone");
            [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {       
                applyColor2element(element, "none", "stroke") ;
            });
        }else if( selNext=="fillBorderSolid" ){                             //console.log("fillBorderSolid");
            var color=document.getElementById("colorisBorder").value;
            [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {       
                //element.setAttributeNS( null, "fill", color );  
                //element.style['stroke'] =  color;
                applyColor2element(element, color, "stroke") ;
            });
        }else if( selNext=="fillBorderDeg" || selNext=="fillBorderRad" ){
            parseCSS("borderColorsCombineDeg", "fillBorderStyle", "stroke");
            controlPointZ("color");
        }
    } 
    controlPointZ("color"); 
//console.log("fillStyle selNow:"+selNow+" selNext:"+selNext);
}
 
function MCKlinejoinClick(event){
    var parent=event.target.parentNode.id; 
    var selNow=document.getElementById(parent).getAttribute("sel");
    var selNext=event.target.id;
    removeClassFromSelection("#"+parent+" .linejoin", "sel");
    addClassForSelection("#"+event.target.id, "sel");  
    document.getElementById(parent).setAttribute("sel", selNext);
    [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {   
        element.setAttributeNS( null, "stroke-linejoin", selNext.replace("linejoin-", "") );  
        element.classList.remove("stroke-linejoin");
    });
    controlPointZ("color");
}
 
function MCKlinecapClick(event){
    var parent=event.target.parentNode.id; 
    var selNow=document.getElementById(parent).getAttribute("sel");
    var selNext=event.target.id;
    removeClassFromSelection("#"+parent+" .linecap", "sel");
    addClassForSelection("#"+event.target.id, "sel");  
    document.getElementById(parent).setAttribute("sel", selNext);
    [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {   
        element.setAttributeNS( null, "stroke-linecap", selNext.replace("linecap-", "") );  
        element.classList.remove("stroke-linecap");
    });
    controlPointZ("color");
}

function MCKpaintOrderClick(event){
    var parent=event.target.parentNode.id; 
    //var selNow=document.getElementById(parent).getAttribute("sel");
    var selNext=event.target.id;

    removeClassFromSelection("#"+parent+" .paint-order", "sel");
    addClassForSelection("#"+event.target.id, "sel");
    document.getElementById(parent).setAttribute("sel", selNext);

    selNext=selNext.replace(/paintOrder-/g,'');
    [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {       
        element.setAttributeNS( null, "paint-order", selNext );  
        element.classList.remove("paint-order");
    });
    controlPointZ("color");
}

function MCKwidthBorderLineChange(event){        
    [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {       
        applyColor2element(element, event.target.value, "stroke-width");
    });
    controlPointZ("color");
}

addListenerFunSelector( "input", "#colorisFill", colorisFillInput );
function colorisFillInput(event){      
    var color=event.target.value;
    __colorisFillInput(color);
}
addListenerFunSelector( "input", "#colorisFillAlpha", colorisFillInputAlpha );
function colorisFillInputAlpha(event){      
    var color=document.getElementById("colorisFill").value;
    __colorisFillInput(color);
}
addListenerFunSelector( "change", "#colorisFill", colorisBorderChange );
function colorisBorderChange(event){
    controlPointZ("color");
}
function __colorisFillInput(color){      
    var apply2sel=document.getElementById("fillInsideStyle").getAttribute("sel");
    var opacity=document.getElementById("colorisFillAlpha").value;

    if( apply2sel=="fillInsideDeg" || apply2sel=="fillInsideRad"){
        var colorMark=addAlphaColor(color, opacity);
        document.querySelectorAll("#fillColorsCombineDeg .markColorDeg.sel")[0].style.backgroundColor = colorMark;      //la marca de degradado seleccionada

        parseCSS("fillColorsCombineDeg", "fillInsideStyle", "fill", opacity);  
    }else if( apply2sel=="fillInsideSolid" ){
        [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {       
            applyColor2element(element, color, "fill", opacity);
        });
    }
}


addListenerFunSelector( "input", "#colorisBorder", colorisBorderInput );
function colorisBorderInput(event){      
    var color=event.target.value;
    __colorisBorderInput(color);   
}
addListenerFunSelector( "input", "#colorisBorderAlpha", colorisBorderInputAlpha );
function colorisBorderInputAlpha(event){      
    var color=document.getElementById("colorisBorder").value;
    __colorisBorderInput(color);
}
addListenerFunSelector( "change", "#colorisBorder", colorisBorderChange );
function colorisBorderChange(event){
    controlPointZ("color");
}
function __colorisBorderInput(color){      
    var apply2sel=document.getElementById("fillBorderStyle").getAttribute("sel");
    var opacity=document.getElementById("colorisBorderAlpha").value;

    if( apply2sel=="fillBorderDeg" || apply2sel=="fillBorderRad"){
        var colorMark=addAlphaColor(color, opacity);
        document.querySelectorAll("#borderColorsCombineDeg .markColorDeg.sel")[0].style.backgroundColor = colorMark;
        parseCSS("borderColorsCombineDeg", "fillBorderStyle", "stroke");  
    }else if( apply2sel=="fillBorderSolid" ){
        [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {       
            applyColor2element(element, color, "stroke", opacity); 
        });
    }    
}

//addListenerFunSelector( "click", "#controllerFillLineal", controllerFillLinealInput );
function MCKcontrollerFillLinealInput(event){     
    removeAllFromSelection(".controlerFill");
    if( hasClass("#controllerFillLineal", "sel") ){
        removeClassFromSelection("#controllerFillLineal", "sel");
        controlPointZ("color");
        return;
    }
    
    var selType=document.querySelectorAll("#fillInsideStyle")[0].getAttribute("sel");
    var e=document.querySelectorAll(".selectable")[0];  
    [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {       
        if( selType=="fillInsideDeg" )linearPercent2xy(element, "fill");
        if( selType=="fillInsideRad" )radialPercent2xy(element, "fill");
    });
    //console.log( "controllerFillLinealInput: selType:"+selType ); 
    //if( selType=="fillInsideDeg" )linearPercent2xy(e, "fill");
    //if( selType=="fillInsideRad" )radialPercent2xy(e, "fill");
    event.target.setAttribute("class", "sel");
    removeClassFromSelection("#controllerBorderLineal", "sel");
}
//addListenerFunSelector( "click", "#controllerBorderLineal", controllerBorderLinealInput );
function MCKcontrollerBorderLinealInput(event){     
    removeAllFromSelection(".controlerFill");
    if( hasClass("#controllerBorderLineal", "sel") ){
        removeClassFromSelection("#controllerBorderLineal", "sel");
        return;
    }
    
    var selType=document.querySelectorAll("#fillBorderStyle")[0].getAttribute("sel");
    var e=document.querySelectorAll(".selectable")[0];    
    //console.log( "controllerFillLinealInput: selType:"+selType ); 
    if( selType=="fillBorderDeg" )linearPercent2xy(e, "stroke");
    if( selType=="fillBorderRad" )radialPercent2xy(e, "stroke");
    event.target.setAttribute("class", "sel");
    removeClassFromSelection("#controllerFillLineal", "sel");
}

function radialPercent2xy(element, _attr){
    var uric=element.getAttribute(_attr);
    uric = uric.replace(/\s/g,'');
    var uri = /url\(#(.+)\)/.exec(uric);  uri=uri[1];
    var grad=document.getElementById(uri);
    grad.removeAttribute("fx");
    grad.removeAttribute("fy");
    grad.removeAttribute("fr");
    //var tag=grad.tagName;
    
    var x1=grad.getAttribute("cx");   var y1=grad.getAttribute("cy");
    var r=grad.getAttribute("r");
    console.log( "uri:"+uri+ " x1:"+x1+" y1:"+y1+" r:"+r ); 

    x1 = x1.replace(/%/g,'');  y1 = y1.replace(/%/g,'');
    r = r.replace(/%/g,'');
    
    var bb = transformedBoundingBox( element.id );  
    var p1x=((x1/100)*bb.width)+bb.x ;
    var p1y=((y1/100)*bb.height)+bb.y ;

    var p2x=((r/100)*bb.width)+p1x ;
    var p2y=p1y ;
    
    var ct1=drawControllerDir(p1x, p1y, "white", "1", uri, bb);
    var ct2=drawControllerDir(p2x, p2y, "white", "2", uri, bb);
    var ln1=drawLineControleXY(ct1, ct2);
    ct1.setAttribute("lineControl", ln1);   ct1.setAttribute("pointControl", "1");
    ct2.setAttribute("lineControl", ln1);   ct2.setAttribute("pointControl", "2");
    ct1.front();
    ct2.front();
    
    function drawLineControleXY(p1,p2){
        var newID=createID("controllerLine");
        var m1=createSVGElement("line", false, newID);
        m1.setAttribute("x1", p1.getAttribute("cx") );
        m1.setAttribute("y1", p1.getAttribute("cy") );
        m1.setAttribute("x2", p2.getAttribute("cx") );
        m1.setAttribute("y2", p2.getAttribute("cy") );
        m1.setAttribute("class", "controlerFill");
        m1.setAttribute("stroke","black");
        m1.setAttribute("stroke-dasharray","2");
        _hnd['svgHandler'].appendChild(m1);
        return newID;
    }
    function drawControllerDir(x, y, c, npoint, id, box){
        var newID=createID("controller");
        var m1=createSVGElement("circle", false, newID);
        m1.setAttribute("cx", x);
        m1.setAttribute("cy", y);
        m1.setAttribute("r", "1%");
        m1.setAttribute("fill", c);
        m1.setAttribute("stroke", "black");
        m1.setAttribute("idmod", id);
        m1.setAttribute("npoint", npoint);
        m1.setAttribute("xx", box.x);
        m1.setAttribute("yy", box.y);
        m1.setAttribute("ww", box.width);
        m1.setAttribute("hh", box.height);
        m1.setAttribute("class", "controlerFillPoint controlerFill");
        _hnd['svgHandler'].appendChild(m1);
    
        addListenerFunSelector( "mousedown", ".controlerFillPoint", selectControllerXY );
        function selectControllerXY(event){
        _selector['FLAGDRAWSELECTOR']=true;
        document.onmouseup = endControllerXY;
        document.onmousemove = moveControllerXY;
    
        function moveControllerXY(event){
            event.stopImmediatePropagation();
            var evt=event.target;
    
            var movX=Number(_evtMsg['mousePOS'].x);
            var movY=Number(_evtMsg['mousePOS'].y);
            evt.setAttribute("cx", movX);
            evt.setAttribute("cy", movY);

            var lineControl=event.target.getAttribute("lineControl");
            var pointControl=event.target.getAttribute("pointControl");
            if(lineControl==null || pointControl==null)return;

            var l=document.getElementById(lineControl);
            l.setAttributeNS(null, "x"+pointControl, movX);
            l.setAttributeNS(null, "y"+pointControl, movY);
    
            var idmod=evt.getAttribute("idmod");
            var defdeg=document.getElementById(idmod);      // (150/100) x 100 = 150%
            var xx=Number(evt.getAttribute("xx"));
            var yy=Number(evt.getAttribute("yy"));
            var ww=Number(evt.getAttribute("ww"));
            var hh=Number(evt.getAttribute("hh"));
            
            var zx1=_hnd['svgHandler'].querySelectorAll("circle[pointControl='1']")[0].getAttribute("cx");
            var zy1=_hnd['svgHandler'].querySelectorAll("circle[pointControl='1']")[0].getAttribute("cy");
            var zx2=_hnd['svgHandler'].querySelectorAll("circle[pointControl='2']")[0].getAttribute("cx");
            var zy2=_hnd['svgHandler'].querySelectorAll("circle[pointControl='2']")[0].getAttribute("cy");
            var xd=trunc( ( (zx1-xx)/ww) * 100, 2 ) ;
            var yd=trunc( ( (zy1-yy)/hh) * 100, 2 );
            var radius=distance(zx1, zy1, zx2, zy2 ); 
            radius=(radius/ww) * 100;
            defdeg.setAttributeNS(null, "cx", xd+"%");
            defdeg.setAttributeNS(null, "cy", yd+"%");
            defdeg.setAttributeNS(null, "r", radius+"%");            
            //console.log("idmod:"+idmod+" npoint:"+npoint+" xx:"+xx+" yy:"+yy+" ww:"+ww+" hh:"+hh+" %x"+xd+" %y"+yd);
        }
        function endControllerXY(event){
            document.onmouseup = null;
            document.onmousemove = null;
            _selector['FLAGDRAWSELECTOR']=false;
        }
        }
        return m1;
    }
    
    return [ [p1x, p1y], [p2x, p2y] ];
}

function linearPercent2xy(element, _attr){
    var uric=element.getAttribute(_attr);
    uric = uric.replace(/\s/g,'');
    var uri = /url\(#(.+)\)/.exec(uric);  uri=uri[1];
    var grad=document.getElementById(uri);
    var tag=grad.tagName;

    var x1=grad.getAttribute("x1");   var y1=grad.getAttribute("y1");
    var x2=grad.getAttribute("x2");   var y2=grad.getAttribute("y2");

    x1 = x1.replace(/%/g,'');  y1 = y1.replace(/%/g,'');
    x2 = x2.replace(/%/g,'');  y2 = y2.replace(/%/g,'');

    var bb = transformedBoundingBox( element.id );  
    var p1x=((x1/100)*bb.width)+bb.x ;
    var p1y=((y1/100)*bb.height)+bb.y ;
    var p2x=((x2/100)*bb.width)+bb.x ;
    var p2y=((y2/100)*bb.height)+bb.y ;

    var ct1=drawControllerDir(p1x, p1y, "white", "1", uri, bb);
    var ct2=drawControllerDir(p2x, p2y, "white", "2", uri, bb);
    var ln1=drawLineControleXY(ct1, ct2);
    ct1.setAttribute("lineControl", ln1);   ct1.setAttribute("pointControl", "1");
    ct2.setAttribute("lineControl", ln1);   ct2.setAttribute("pointControl", "2");
    ct1.front();
    ct2.front();

    function drawLineControleXY(p1,p2){
        var newID=createID("controllerLine");
        var m1=createSVGElement("line", false, newID);
        m1.setAttribute("x1", p1.getAttribute("cx") );
        m1.setAttribute("y1", p1.getAttribute("cy") );
        m1.setAttribute("x2", p2.getAttribute("cx") );
        m1.setAttribute("y2", p2.getAttribute("cy") );
        m1.setAttribute("class", "controlerFill");
        m1.setAttribute("stroke","black");
        m1.setAttribute("stroke-dasharray","2");
        _hnd['svgHandler'].appendChild(m1);
        return newID;
    }
    function drawControllerDir(x, y, c, npoint, id, box){
        var newID=createID("controller");
        var m1=createSVGElement("circle", false, newID);
        m1.setAttribute("cx", x);
        m1.setAttribute("cy", y);
        m1.setAttribute("r", "1%");
        m1.setAttribute("fill", c);
        m1.setAttribute("stroke", "black");
        m1.setAttribute("idmod", id);
        m1.setAttribute("npoint", npoint);
        m1.setAttribute("xx", box.x);
        m1.setAttribute("yy", box.y);
        m1.setAttribute("ww", box.width);
        m1.setAttribute("hh", box.height);
        m1.setAttribute("class", "controlerFillPoint controlerFill");
        _hnd['svgHandler'].appendChild(m1);

        addListenerFunSelector( "mousedown", ".controlerFillPoint", selectControllerXY );
        function selectControllerXY(event){
        //console.log("down "+event.target.id);
        _selector['FLAGDRAWSELECTOR']=true;
        document.onmouseup = endControllerXY;
        document.onmousemove = moveControllerXY;

        function moveControllerXY(event){
            event.stopImmediatePropagation();

            var movX=Number(_evtMsg['mousePOS'].x);
            var movY=Number(_evtMsg['mousePOS'].y);
            event.target.setAttribute("cx", movX);
            event.target.setAttribute("cy", movY);
            var lineControl=event.target.getAttribute("lineControl");
            var pointControl=event.target.getAttribute("pointControl");
            if(lineControl==null || pointControl==null)return;
            var l=document.getElementById(lineControl);
            //console.log("x:"+movX+" y:"+movY+" lineControl:"+lineControl+" pointControl:"+pointControl);
            l.setAttributeNS(null, "x"+pointControl, movX);
            l.setAttributeNS(null, "y"+pointControl, movY);

            var idmod=event.target.getAttribute("idmod");
            var npoint=event.target.getAttribute("npoint");
            var defdeg=document.getElementById(idmod);      // (150/100) x 100 = 150%
            var xx=Number(event.target.getAttribute("xx"));
            var yy=Number(event.target.getAttribute("yy"));
            var ww=Number(event.target.getAttribute("ww"));
            var hh=Number(event.target.getAttribute("hh"));
            var xd=trunc( ( (movX-xx)/ww) * 100, 2 ) ;
            var yd=trunc( ( (movY-yy)/hh) * 100, 2 );
            defdeg.setAttributeNS(null, "x"+npoint, xd+"%");
            defdeg.setAttributeNS(null, "y"+npoint, yd+"%");
            //console.log("idmod:"+idmod+" npoint:"+npoint+" xx:"+xx+" yy:"+yy+" ww:"+ww+" hh:"+hh+" %x"+xd+" %y"+yd);
        }
        function endControllerXY(event){
            document.onmouseup = null;
            document.onmousemove = null;
            _selector['FLAGDRAWSELECTOR']=false;
        }
        }
        return m1;
    }

    return [ [p1x, p1y], [p2x, p2y] ];
}

function parseCSS(_idMixer, _ulSelector, _attr){
    var r=[], stops="linear-gradient(90deg, ", defStop='';
    [...document.querySelectorAll("#"+_idMixer+" .markColorDeg")].forEach((element, index, array) => {
        var stopClr=element.style.backgroundColor;
        var stopPer=element.getAttribute("offset");      
        var rr={'color':stopClr, 'offset':stopPer};
        r.push(rr);
    });
    let ro = r.orderBy(r => parseFloat(r.offset));

    for( var i=0; i<ro.length; i++ ){
        stops+=ro[i]['color']+" "+ro[i]['offset']+"%,";
        var colorOK=parseColor(ro[i]['color'], "ARRAY");
        var opacityOK=colorOK[2]['alpha'];
        colorOK="rgb("+colorOK[2]['red']+","+colorOK[2]['green']+","+colorOK[2]['blue']+")";
        //if(_opacity)opacityOK=_opacity;
        defStop+="<stop offset='"+ro[i]['offset']+"%' style='stop-color:"+colorOK+";stop-opacity:"+opacityOK+";' />";
        //console.log(ro[i]);
    }
    stops=stops.slice(0, -1);
    document.getElementById(_idMixer).style.setProperty( "background", stops );
    var pref, onlyStop;
    var ULselector=document.getElementById(_ulSelector);
    if(ULselector==null)return;

    var styleNow=ULselector.getAttribute("sel");
    if( styleNow=="fillInsideDeg" || styleNow=="fillInsideRad" || styleNow=="fillBorderDeg" || styleNow=="fillBorderRad" ){
        onlyStop=defStop;
        if(styleNow=="fillInsideDeg" || styleNow=="fillBorderDeg"){
            defStop="<linearGradient id='****' x1='15%' y1='85%' x2='85%' y2='15%'>"+defStop+"</linearGradient>";
            pref=_attr+"-Linear-";        
        }
        if(styleNow=="fillInsideRad" || styleNow=="fillBorderRad"){
            defStop="<radialGradient id='****' cx='50%' cy='50%' fx='50%' fy='50%' r='50%'>"+defStop+"</radialGradient>";
            pref=_attr+"-Radial-";
        }

        [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {
            var newID=pref+element.id;
            var defStopOK=defStop.replace("****",newID);
            if( checkID(newID)==true ){
                document.getElementById(newID).innerHTML=onlyStop;
            }else{
                DEFS.insertAdjacentHTML( "beforeend", defStopOK );
            }
            if( pref==_attr+"-Linear-" )removeID( _attr+"-Radial-"+element.id );
            if( pref==_attr+"-Radial-" )removeID( _attr+"-Linear-"+element.id );
            applyColor2element(element, "url(#"+newID+")", _attr);
        });
    }
}

function noShowColors(msg){
document.getElementById("tbColorAdmin").style.display = "none";
document.getElementById("colorAdminNoItems").innerText=msg;
document.getElementById("colorAdminNoItems").style.display = "block";
}

function setupColorManager(){
    if(sTool!='panelColorAdmin')return;
    var fcol=0, furi=0, ttItems=document.querySelectorAll(".selectable").length;
    removeAllFromSelection(".controlerFill");
    if(ttItems>1){
        [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {       
            var c=element.getAttributeNS( null, "fill" );  
            if( c.startsWith("url") )furi++;
            if( c.startsWith("#")   )fcol++; 
            //flattenSimple( element.id ); 
        });
        console.log("furis:"+furi+" fcol:"+fcol);
        if(furi==0){

        }else if( furi>0 && fcol>0 ){
            noShowColors("Estilos Diferentes");
            return;
        }    
    }else if( ttItems==1 ){
        var idOne=document.querySelectorAll(".selectable")[0].id;
        //if( checkID(idOne) ) flattenSimple( idOne ); 
    }

    removeClassFromSelection("#controllerFillLineal", "sel");
    removeClassFromSelection("#controllerBorderLineal", "sel");
    if(ttItems==0){
        document.getElementById("tbColorAdmin").style.display = "none";
        document.getElementById("colorAdminNoItems").style.display = "";
        return;
    }else{
        document.getElementById("tbColorAdmin").style.display = "";
        document.getElementById("colorAdminNoItems").style.display = "none";
    }
    removeClassFromSelection(".fillStyle", "sel");

    var firstElement=document.querySelectorAll(".selectable")[0];
    var fill=firstElement.getAttributeNS(null, "fill");
    var stroke=firstElement.getAttributeNS(null, "stroke");

    if(fill==null){
        fill=getStyleFromID(firstElement.id, "fill");
        firstElement.setAttributeNS(null, "fill", fill);
    }
    if(stroke==null){
        stroke=getStyleFromID(firstElement.id, "stroke");
        firstElement.setAttributeNS(null, "stroke", stroke);
    }

    var lineJoin=firstElement.getAttributeNS(null, "stroke-linejoin"); 
    if(!lineJoin || lineJoin=='' || lineJoin==null || lineJoin=='undefined'){
        lineJoin=firstElement.style['stroke-linejoin'];
        if( lineJoin=='' || lineJoin==null || lineJoin=='undefined' ){
            firstElement.setAttributeNS(null, "stroke-linejoin", "miter");
            lineJoin="miter";
        }else{
            if(lineJoin=='miter-clip' || lineJoin=='arcs' || lineJoin=='crop')lineJoin='miter';
            firstElement.classList.remove("stroke-linejoin");
            firstElement.setAttributeNS(null, "stroke-linejoin", lineJoin);
        }
    }
    if(lineJoin=='miter-clip' || lineJoin=='arcs' || lineJoin=='crop')lineJoin='miter';
    removeClassFromSelection("#stroke-linejoin .linejoin", "sel");
    addClassForSelection("#lineJoin-"+lineJoin, "sel"); 

    var lineCap=firstElement.getAttributeNS(null, "stroke-linecap"); 
    if(!lineCap || lineCap=='' || lineCap==null || lineCap=='undefined'){
        lineCap=firstElement.style['stroke-linecap'];
        if( lineCap=='' || lineCap==null || lineCap=='undefined' ){
            firstElement.setAttributeNS(null, "stroke-linecap", "butt");
            lineCap="butt";
        }else{
            firstElement.classList.remove("stroke-linecap");
            firstElement.setAttributeNS(null, "stroke-linecap", lineCap);
        }
    }
    removeClassFromSelection("#stroke-linecap .linecap", "sel");
    addClassForSelection("#linecap-"+lineCap, "sel");

    var paintOrder=firstElement.getAttributeNS(null, "paint-order");  
    if( paintOrder==null || paintOrder=='undefined' ){
        paintOrder=firstElement.style['paint-order'];
        if( paintOrder=='' || paintOrder==null || paintOrder=='undefined' ){
            firstElement.setAttributeNS(null, "paint-order", "fill");
            paintOrder="fill";
        }else{
            firstElement.classList.remove("paint-order");
            firstElement.setAttributeNS(null, "paint-order", paintOrder);
        }
    }
    if( paintOrder.includes(" ") ){
        var por = paintOrder.split(' ');
        paintOrder=por[0];
    }
    
    removeClassFromSelection("#paint-order .paint-order", "sel");
    addClassForSelection("#paintOrder-"+paintOrder, "sel");  

    document.getElementById("widthBorderLine").value=firstElement.getAttributeNS(null, "stroke-width");
    //console.log("lineJoin:"+lineJoin+" lineCap:"+lineCap+" paintOrder:"+paintOrder);

    removeAllFromSelection(".markColorDeg");
    loadFill( fill, 'fillInside', 'verForTypeFill', "fillColorsCombineDeg", "colorisFill", "fill" );
    loadFill( stroke, 'fillBorder', 'verForTypeBorder', "borderColorsCombineDeg", "colorisBorder", "stroke" );

    function loadFill(typeFill, where, verForType, mixer, idInputColor, fill){   
        var selFillStyle='none', colorSelect='none';
        if( typeFill.startsWith('url(') ){
            typeFill = typeFill.replace(/\s/g,'');
            var uri = /url\(#(.+)\)/.exec(typeFill); //console.log(uri);
            uri=uri[1];
            var fillTag=document.getElementById(uri);
            var cta=0;
            [...document.querySelectorAll("#"+uri+" stop")].forEach((element, index, array) => {
                var offset=element.getAttribute("offset");
                var color=element.style.getPropertyValue("stop-color");
                color=color.toLowerCase();
                var opacity=element.style.getPropertyValue("stop-opacity");
                if(opacity==null)opacity=1;
                var colorOK=parseColor(color, "ARRAY");
                if( color.startsWith('rgba') ){

                }else if( color.startsWith('rgb') ){
                    color="rgba("+colorOK[2]['red']+","+colorOK[2]['green']+","+colorOK[2]['blue']+","+opacity+")";
                }else if( color.startsWith('#') ){
                    if( color.length=9 ){

                    }else if( color.length=7 ){
                        color="rgba("+colorOK[2]['red']+","+colorOK[2]['green']+","+colorOK[2]['blue']+","+opacity+")";
                    }
                }

                offset=offset.replace(/%/g, '');
                var mkx=normalize( offset, -2, 223, 0, 100)
                var newID=createID("markDegree" );
                var markSelFirst='';
                if(cta==0){
                    colorSelect=color;
                    markSelFirst='sel';
                }else{
                    markSelFirst='';
                }
                var m="<div id='"+newID+"' offset='"+offset+"' class='markColorDeg "+markSelFirst+"' style='left:"+mkx+"px;top:-8px;background-color:"+color+"'></div>";
                document.getElementById(mixer).insertAdjacentHTML( "beforeend", m );
                cta++;       
            });

            var tag=document.getElementById(uri).tagName;      
            if( tag=="linearGradient" )selFillStyle=where+"Deg";
            if( tag=="radialGradient" )selFillStyle=where+"Rad";
        }else if(typeFill=='none'){
            selFillStyle=where+"None";
        } else{
            selFillStyle=where+"Solid";
            colorSelect=document.querySelectorAll(".selectable")[0].getAttribute(fill);
            var opacity=document.querySelectorAll(".selectable")[0].getAttribute(fill+"-opacity");
            if(opacity==null)opacity=1;
            var colorOK=parseColor(colorSelect, "ARRAY");
            if( colorSelect.startsWith('rgba') ){

            }else if( colorSelect.startsWith('rgb') ){
                colorSelect="rgba("+colorOK[2]['red']+","+colorOK[2]['green']+","+colorOK[2]['blue']+","+opacity+")";
            }else if( colorSelect.startsWith('#') ){
                if( colorSelect.length=9 ){

                }else if( colorSelect.length=7 ){
                    colorSelect="rgba("+colorOK[2]['red']+","+colorOK[2]['green']+","+colorOK[2]['blue']+","+opacity+")";
                }
            }
            createFirstDegree();
        } 
        addClassForSelection("#"+selFillStyle, "sel");
        document.getElementById(where+"Style").setAttribute("sel", selFillStyle);    
        document.getElementById(idInputColor).value=parseColor(colorSelect, 'HEX');

        var r=parseColor( colorSelect, "ARRAY");
        document.getElementById(idInputColor+"Alpha").value=r[2]['alpha'];

        visibilityForSelection( "."+verForType, '');
        visibilityForSelection( "."+verForType+"."+selFillStyle, 'none');

        function createFirstDegree(){
        var newID=createID("markDegree" );
        var m="<div id='"+newID+"' offset='0' class='markColorDeg sel' style='left:0px;top:-8px;background-color:"+colorSelect+"'></div>";
        document.getElementById(mixer).insertAdjacentHTML( "beforeend", m );

        var newID=createID("markDegree" );
        var n="<div id='"+newID+"' offset='100' class='markColorDeg' style='left:225px;top:-8px;background-color:"+colorSelect+"'></div>";
        document.getElementById(mixer).insertAdjacentHTML( "beforeend", n );
        }
        //console.log("selFillStyle:"+selFillStyle);
    }


    if(fill=='' || fill=='undefined' )fill='none';
    setupMixColor("fillEditorDegree", "fillColorsCombineDeg", "colorisFill", "fillInsideStyle", "fill");
    setupMixColor("borderEditorDegree", "borderColorsCombineDeg", "colorisBorder", "fillBorderStyle", "stroke");
}

function setupMixColor(_idDegreeEditor, _idMixer, _idInputColor, _ulSelector, _attr){      // fillEditorDegree -> fillColorsCombineDeg -> markColorDeg
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var markSel="";

    addListenerFunSelector( "dblclick", "#"+_idMixer, function(e){      // agregar nuevas marcas de degradado
        e = e || window.event;
        e.stopImmediatePropagation();
        var ckX= e.layerX-9;
        
        var maxL=document.getElementById(_idMixer).offsetLeft+document.getElementById(_idMixer).offsetWidth-27;
        var per=normalize( ckX, 0, 100, -2, maxL);
        if( per<3 )return;

        function noRepeatMarker(clickX){
            clickX=Number(clickX);

            [...document.querySelectorAll("#"+_idMixer+" .markColorDeg")].forEach((element, index, array) => {        
                var px=element.style.left;
                px = Number(px.replace(/px/g,''));
                if( clickX<px+3 && clickX>px-3 ){
                    console.log("************ marca repetida:"+clickX);
                    return true;        
                }
            });
            return false;
        }
        var repeatOK=noRepeatMarker(ckX);
        if(repeatOK==true)return;

        function getColorNewMarker(clickX){
            var maxi=9999, mini=-9999, colorMini, colorMaxi, alphaMini=1, minMin=9999, maxMax=-9999, alphaMaxi=1;
            clickX=Number(clickX);

            [...document.querySelectorAll("#"+_idMixer+" .markColorDeg")].forEach((element, index, array) => {        
                var px=element.style.left;
                px = Number(px.replace(/px/g,''));
                if( px<minMin ){ minMin=px; colorMini=element.style.backgroundColor; }
                if( px>maxMax ){ maxMax=px; colorMaxi=element.style.backgroundColor; }        
            });
            //console.log("clicX:"+clickX+ "minMin:"+minMin+" maxMax:"+maxMax);
            if( clickX<minMin )return colorMini;
            if( clickX>maxMax )return colorMaxi;

            [...document.querySelectorAll("#"+_idMixer+" .markColorDeg")].forEach((element, index, array) => {        
                var px=element.style.left;
                px = Number(px.replace(/px/g,''));
                if( px>clickX && px<maxi ){ maxi=px;  colorMaxi=parseColor(element.style.backgroundColor, 'ARRAYD');  alphaMaxi=parseColor(element.style.backgroundColor, 'ALPHA'); }
                if( px<clickX && px>mini ){ mini=px;  colorMini=parseColor(element.style.backgroundColor, 'ARRAYD');  alphaMini=parseColor(element.style.backgroundColor, 'ALPHA'); }
                //console.log("Mark ID:"+element.id+" px:"+px+" Mini:"+mini+" Maxi:"+maxi+" AlphaMini:"+alphaMini+" alphaMaxi:"+alphaMaxi);
            });      
            var per=normalize( clickX, 0, 1, mini, maxi );  //console.log("Per:"+per);
            var alpha=normalize( clickX, alphaMini, alphaMaxi, mini, maxi );
            var colorm= interpolateColor(colorMaxi, colorMini, per);
            return "rgba("+colorm[0]+","+colorm[1]+","+colorm[2]+","+alpha+")";
        }
        var newColor=getColorNewMarker(ckX);  
        //console.log("Mas Marker Mixer:"+_idMixer+" Color:"+newColor);      

        var newID=createID("markDegree" );
        var m="<div id='"+newID+"' class='markColorDeg' style='left:"+ckX+"px;top:-8px;background-color:"+newColor+"'></div>";
        document.getElementById(_idMixer).insertAdjacentHTML( "beforeend", m );
        addListenerFunSelector( "mousedown", "#"+_idMixer+" .markColorDeg", selectMarker ); 
        removeClassFromSelection( "#"+_idMixer+" .markColorDeg", "sel"  );
        addClassForSelection( "#"+newID, "sel"  );
        document.getElementById(newID).setAttribute("offset", per);
        parseCSS(_idMixer);
        controlPointZ("color");
    });

    addListenerFunSelector( "mousedown", "#"+_idMixer+" .markColorDeg", selectMarker );
    function selectMarker(e){
        e = e || window.event;
        e.preventDefault();
        var marker=e.target;
        markSel=marker;

        removeClassFromSelection("#"+_idMixer+" .markColorDeg", "sel");
        addClassForSelection("#"+marker.id, "sel");
        document.getElementById(_idInputColor).value=parseColor(marker.style.backgroundColor, 'HEX');
        var r=parseColor(marker.style.backgroundColor, 'ARRAY');
        document.getElementById(_idInputColor+"Alpha").value=r[2]['alpha'];

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = endDegMarker;
        document.onmousemove = moveDegMarker;
        function moveDegMarker(e){
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        if(e.clientY>document.getElementById(_idMixer).offsetTop+50 || e.clientY<document.getElementById(_idMixer).offsetTop-40 ){
            marker.remove();
            parseCSS(_idMixer);
            return;
        }

        var minL=-2;    
        var maxL=document.getElementById(_idMixer).offsetLeft+document.getElementById(_idMixer).offsetWidth-23;
        var nposX=marker.offsetLeft - pos1;
        if(nposX<minL)nposX=minL;
        if(nposX>maxL)nposX=maxL;

        var per=normalize( nposX, 0, 100, minL, maxL);
        per=Math.trunc(per * 100) / 100;

        marker.style.top = "-8px";
        marker.style.left = nposX + "px";
        marker.setAttribute("offset", per);
        parseCSS(_idMixer,_ulSelector, _attr);
        }

        function endDegMarker(){
        document.onmouseup = null;
        document.onmousemove = null;
        controlPointZ("color");
        }    

    };

    parseCSS(_idMixer ,_ulSelector, _attr);
}

function drawPalette(_palette){
    var cls='', ttColors=COLORPALETT[_palette].length;
    cls+="<li mouseUp='openColorPalette' v='0' style='display:block;position:fixed;'><svg style='width:24px;height:24px;color:white;pointer-events:none;' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><polyline points='0,90 50,50 100,90' style='stroke-width:8;stroke:var(--text-color);fill:none;' /><polyline points='0,50 50,10 100,50' style='stroke-width:8;stroke:var(--text-color);fill:none;' /></svg></li>";
    cls+="<li mouseUp='applyColorPalette' style='background:none'><svg style='width:24px;height:24px;color:white;pointer-events:none;' viewBox='0 0 75 75' xmlns='http://www.w3.org/2000/svg'><line x1='0' y1='0' x2='75' y2='75' style='stroke-width:8;stroke:black;' /><line x1='0' y1='75' x2='75' y2='0' style='stroke-width:8;stroke:black;' /></svg></li>";
    cls+="<li mouseUp='applyColorPalette' style='background:none'><svg style='width:24px;height:24px;color:white;pointer-events:none;' viewBox='0 0 75 75' xmlns='http://www.w3.org/2000/svg'><line x1='0' y1='0' x2='75' y2='75' style='stroke-width:8;stroke:black;' /><line x1='0' y1='75' x2='75' y2='0' style='stroke-width:8;stroke:black;' /></svg></li>";
    for( var i=0; i<ttColors; i++ ){
        cls+="<li mouseUp='applyColorPalette' style='background:"+COLORPALETT[_palette][i]+"'></li>";
    }
    cls="<ul id='liPalette'>"+cls+"</ul>";
    document.getElementById("divPalette").innerHTML = cls;
}

function openColorPalette(event){
    /*event.preventDefault();
    event.stopImmediatePropagation();*/
    //var button=event.button;
    var v=event.target.getAttribute("v");
    var palette=document.getElementById("colorPalette");
    if(v==0){
        setStyleForID("divPalette", "height", "72px" );
        setStyleForID("AYUDA", "bottom", "82px" );
        setStyleForID("infoXY", "bottom", "76px" );
        event.target.setAttribute("v", "1");
    }else{
        setStyleForID("divPalette", "height", "24px" );
        setStyleForID("AYUDA", "bottom", "20px" );
        setStyleForID("infoXY", "bottom", "28px" );
        event.target.setAttribute("v", "0");
    }
    //console.log("open palette");
}

function applyColorPalette(event){    
    var attr="fill";
    if(event.button==2)attr="stroke";
    var css = window.getComputedStyle(event.target, null);
    var cl = standardize_color(css.getPropertyValue("background-color"));
    controlPointZ("iniDRR");
    [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {
        applyColor2element(element, cl, attr);            
        if(attr=='fill'){
            removeID( "fill-Radial-"+element.id );
            removeID( "fill-Linear-"+element.id );
        } 

        setupColorManager();
    });
    controlPointZ("color");   
}

function standardize_color(str){
    var ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = str;
    return ctx.fillStyle;
}
function parseColor(color, modeOut) {
//return "HEX HEXA RGB RGBA ARRAY"
    var r=[], cache,
    p = parseInt, // Use p as a byte saving reference to parseInt
    color = color.replace(/\s/g,''); // Remove all spaces
    color=standardize_color(color);
    color = color.replace(/\s/g,'');
    r.push(color);

    if (cache = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color)){       // HEXA #123456AF        
        r.push( { 'out': 'HEX', 'red':cache[1], 'green':cache[2], 'blue':cache[3], 'alpha':cache[4] } );
        r.push( { 'out': 'DEC', 'red':p(cache[1], 16), 'green':p(cache[2], 16), 'blue':p(cache[3], 16), 'alpha':p(cache[4], 16) } );
    }else if (cache = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color)){                // HEX #1234AF        
        r.push( { 'out': 'HEX', 'red':cache[1], 'green':cache[2], 'blue':cache[3], 'alpha':'ff' } );
        r.push( { 'out': 'DEC', 'red':p(cache[1], 16), 'green':p(cache[2], 16), 'blue':p(cache[3], 16), 'alpha':1 } );
    }else if (cache = /#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(color)){                         // HEX Simple #FF0
        r.push( { 'out': 'HEX', 'red':p(cache[1], 16)*17, 'green':p(cache[2], 16)*17, 'blue':p(cache[3], 16)*17, 'alpha':1 } );
        r.push( { 'out': 'DEC', 'red':cache[1], 'green':cache[2], 'blue':cache[3], 'alpha':'ff' } );
    }else if ( cache = /rgba\(([\d]+),([\d]+),([\d]+),(.+)\)/.exec(color) ){                        // RGBA
        r.push( { 'out': 'HEX', 'red':decToHex(cache[1]), 'green':decToHex(cache[2]), 'blue':decToHex(cache[3]), 'alpha':decToHex(Math.floor(normalize(cache[4], 0, 255, 0, 1))) } );        
        r.push( { 'out': 'DEC', 'red':cache[1], 'green':cache[2], 'blue':cache[3], 'alpha':Number(cache[4]).toFixed(3) } );        
    }else if (cache = /rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color)){                               // RGB
        r.push( { 'out': 'HEX', 'red':decToHex(cache[1]), 'green':decToHex(cache[2]), 'blue':decToHex(cache[3]), 'alpha':'ff' } );
        r.push( { 'out': 'DEC', 'red':cache[1], 'green':cache[2], 'blue':cache[3], 'alpha':1 } );
    }else throw color + ' is not supported by parseColor';
    
    // Performs RGBA conversion by default
    isNaN(cache[3]) && (cache[3] = 1);
    //r.push(cache);
    
    function decToHex(c) {
        c=Number(c);
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    function RGBAToHexA(rgba, forceRemoveAlpha = false) {
        return "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
          .split(',') // splits them at ","
          .filter((string, index) => !forceRemoveAlpha || index !== 3)
          .map(string => parseFloat(string)) // Converts them to numbers
          .map((number, index) => index === 3 ? Math.round(number * 255) : number) // Converts alpha to 255 number
          .map(number => number.toString(16)) // Converts numbers to hex
          .map(string => string.length === 1 ? "0" + string : string) // Adds 0 when length of one number is 1
          .join("") // Puts the array to togehter to a string
    }
    //console.log( r );
    if( modeOut=='HEXA' )return "#"+r[1]['red']+r[1]['green']+r[1]['blue']+r[1]['alpha'];
    if( modeOut=='HEX' )return "#"+r[1]['red']+r[1]['green']+r[1]['blue'];
    if( modeOut=='RGBA' )return "rgba("+r[2]['red']+","+r[2]['green']+","+r[2]['blue']+r[2]['alpha']+")";
    if( modeOut=='RGB' )return "rgb("+r[2]['red']+","+r[2]['green']+","+r[2]['blue']+")";
    if( modeOut=='ARRAYH' )return [ r[1]['red'], r[1]['green'], r[1]['blue'] ];
    if( modeOut=='ARRAYD' )return [ r[2]['red'], r[2]['green'], r[2]['blue'] ];
    if( modeOut=='ARRAY' )return r;
    if( modeOut=='ALPHA' )return r[2]['alpha'];
    return "rgba("+r[2]['red']+","+r[2]['green']+","+r[2]['blue']+","+r[2]['alpha']+")";
}
var interpolateColor = function(color1, color2, factor) {
    //console.log("Color1: "+color1);
    //console.log("Color2: "+color2);
    if (arguments.length < 3) { factor = 0.5; }
    var result = color1.slice();
    for (var i=0;i<3;i++) {
      result[i] = Math.round( Number(result[i]) + factor*(Number(color2[i])-Number(color1[i])));
    }
    return result;
};

function applyColor2element(e, _color, _attr, _opacity){
    var es=getAllDescendants(e, true);
    es.forEach(function(item, index){
        if( isGraphSVGe(item) ){
            var isURL=_color.startsWith( 'url' );
            if( item.tagName!="g" ){                
                if( (_attr=="fill" || _attr=="stroke")&& isURL==false ){
                    if(_color=="none"){
                        item.setAttribute( _attr, "none" );
                        item.setAttribute( _attr+"-opacity", "1" );
                    }else{
                        var colorOK=parseColor( _color, 'ARRAY' );
                        var opacityOK=colorOK[2]['alpha'];
                        colorOK="rgb("+colorOK[2]['red']+","+colorOK[2]['green']+","+colorOK[2]['blue']+")";
                        item.setAttribute( _attr, colorOK );
                        if(_opacity)opacityOK=_opacity;
                        item.setAttribute( _attr+"-opacity", opacityOK );
                    }                    
                }else{
                    item.setAttribute( _attr, _color );
                    item.removeAttribute( _attr+"-opacity" );
                } 
                item.setAttribute( "vector-effect", "none" ); 
                removeStyleFromSelection("#"+item.id , _attr); 
                removeStyleFromSelection("#"+item.id , _attr+"-opacity");             
            }            
        } 
    });
}

function applyStrokeW2element(e, _color, _attr){
    var es=getAllDescendants(e, true);
    es.forEach(function(item, index){
        if( isGraphSVGe(item) ){
            item.setAttribute( _attr, _color );
            removeStyleFromSelection("#"+item.id , _attr); 
            removeStyleFromSelection("#"+item.id , _attr+"-opacity"); 
        } 
    });
}

function get_random_color(hmin, hmax, smin, smax, lmin, lmax) {          
    //get_random_color(1, 360, 60, 95, 50, 75) NICE COLORS
    //get_random_color(1, 360, 80, 80, 50, 50) ACID COLORS
    var h = trunc(rand(hmin, hmax), 1);
    var s = trunc(rand(smin, smax), 1);
    var l = trunc(rand(lmin, lmax), 1);
    var color= 'hsl(' + h + ',' + s + '%,' + l + '%)';
    return  {color: color, h:h, s:s, l:l} ;
}
function random_color_fix(smin, smax, lmin, lmax) {          
    //get_random_color( 60, 95, 50, 75)
    //get_random_color( 80, 80, 50, 50) ACID COLORS
    //get_random_color( 25, 25, 90, 90) PAPER COLORS
    var z= rand(0, 10000);
    if(z<1000)var h = trunc(rand(0, 50), 1);
    else if(z<2000)var h = trunc(rand(50, 70), 1);
    else if(z<3000)var h = trunc(rand(70, 100), 1);
    else if(z<4000)var h = trunc(rand(100, 150), 1);
    else if(z<5000)var h = trunc(rand(150, 180), 1);
    else if(z<6000)var h = trunc(rand(180, 210), 1);
    else if(z<7000)var h = trunc(rand(210, 260), 1);
    else if(z<8000)var h = trunc(rand(210, 260), 1);
    else if(z<9000)var h = trunc(rand(260, 310), 1);
    else var h = trunc(rand(310, 360), 1);

    //var h = trunc(rand(hmin, hmax), 1);
    var s = trunc(rand(smin, smax), 1);
    var l = trunc(rand(lmin, lmax), 1);
    var color= 'hsl(' + h + ',' + s + '%,' + l + '%)';
    return  {color: color, h:h, s:s, l:l} ;
}

function parseHSL(str) {
    var hsl, h, s, l;
    hsl = str.replace(/[^\d.,]/g, '').split(',');   // strip non digits ('%')  
    h = Number(hsl[0]);                          // convert to number
    s = Number(hsl[1]);
    l = Number(hsl[2]);
    return [h, s, l];                              // return parts
}
function harmonize(color, start, end, interval) {
    var colors = [color];
    
    var [h, s, l] = parseHSL(color);
    //console.log( [h, s, l] );

    for(let i = start; i <= end; i += interval) {
        var h1 = (h + i) % 360;
        h1=trunc(h1, 1);
        var c1 = `hsl(${h1}, ${s}%, ${l}%)`;
        colors.push(c1);
    }
    return colors;
}
function colorComplement(HSLcolor){
//const color = 'hsl(270, 49%, 40%)'
    return harmonize(HSLcolor, 180, 180, 1);
}
function colorSplit(HSLcolor){
    return harmonize(HSLcolor, 150, 210, 60);
}
function colorTriad(HSLcolor){
    return harmonize(HSLcolor, 120, 240, 120);
}
function colorTetrad(HSLcolor){
    return harmonize(HSLcolor, 90, 270, 90);
}
function colorAnalogous(HSLcolor){
    return harmonize(HSLcolor, 30, 90, 30);
}
function colorSL(HSLcolor, s, l){
    var color=parseHSL(HSLcolor);
    var _s= color[1]+s < 100 ? color[1]+s : 100;
    var _l= color[2]+l < 100 ? color[2]+l : 100;
    _s =_s > 0 ? _s : 0;
    _l =_l > 0 ? _l : 0;
    return "hsl("+color[0]+","+_s+"%,"+_l+"%)";
}

function addAlphaColor(color, opacity, outMode){
    var r=parseColor(color, "ARRAY");

    if( outMode=='HEXA'){
        var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255).toString(16);
        return r[1]['red']+r[1]['green']+r[1]['blue']+_opacity;
    }
    return 'rgba('+r[2]['red']+','+r[2]['green']+','+r[2]['blue']+','+opacity+')';
}
function addAlphaHEX(color, opacity) {
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}

function updateSkin(event){
var skins=[ 
    ['#212529','#ff0066','#fafafb','#fafafb','#404040'], ['#212529','#ff0066','#fafafb','#fafafb','#404040'],
    ['#212529','#ff0066','#fafafb','#fafafb','#404040'], ['#212529','#ff0066','#fafafb','#fafafb','#404040'],
    ['#212529','#ff0066','#fafafb','#fafafb','#404040'], ['#212529','#ff0066','#fafafb','#fafafb','#404040'] ]; 

    if(event.target.tagName.toLowerCase()=='select'){
        var theme = document.querySelector("select[change=updateSkin] option:checked").getAttribute("theme");
        theme=theme.split(";");
        document.querySelector("body").style.setProperty('--background-color', theme[0] );
        document.querySelector("body").style.setProperty('--text-color', theme[1] );
        document.querySelector("body").style.setProperty('--background-hover', theme[2] );
        document.querySelector("body").style.setProperty('--text-color-inv', theme[3] );
        document.querySelector("body").style.setProperty('--border-color', theme[4] );
        document.querySelector("#background-color").value=theme[0];
        document.querySelector("#text-color").value=theme[1];
        document.querySelector("#background-hover").value=theme[2];
        document.querySelector("#text-color-inv").value=theme[3];
        document.querySelector("#border-color").value=theme[4];
        console.log(theme);
    }
    if(event.target.tagName.toLowerCase()=='input'){        
        document.querySelector("body").style.setProperty('--background-color', document.querySelector("#background-color").value );
        document.querySelector("body").style.setProperty('--background-hover', document.querySelector("#background-hover").value );
        document.querySelector("body").style.setProperty('--text-color', document.querySelector("#text-color").value );
        document.querySelector("body").style.setProperty('--text-color-inv', document.querySelector("#text-color-inv").value );
        document.querySelector("body").style.setProperty('--border-color', document.querySelector("#border-color").value );
        console.log(event.target.value);
    }

}
function MCKopenClipMaster(event){
    deletePreviewTMP();
    var id=event.target.id;
    if( checkVisibility( document.getElementById("panelClip") )==true ){ 
      removeClassFromSelection(".btnTool.sel", "sel");
      [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
            element.hide();
        });
      sTool='';
      removeClipMakEditor(true);
      restoreMask();
    }else{
      sTool='panelClip';
      setupClipMaster();
      selecTool(id, 'panelClip', 'MASK OBJECT');
    } 
}
  
function setupClipMaster(){
    if(sTool!='panelClip')return;
    removeClipMakEditor(true);
    var ttSel=document.querySelectorAll(".cosito.selectable").length;
    if(ttSel==0 || ttSel>1){
      visibilityForSelection("#clipMaskNO", "block");
      visibilityForSelection("#clipMaskOK", "none");
      visibilityForSelection("#maskStyles", "none");
      restoreMask();
      return;
    }
    visibilityForSelection("#clipMaskNO", "none");
    visibilityForSelection("#clipMaskOK", "block");
    visibilityForSelection("#maskStyles", "block");
  
    if(ttSel==1){
        var shape=document.querySelectorAll(".cosito.selectable")[0];
        var cp=shape.getAttributeNS(null, "clip-path");
  
      if(cp!=null){
        visibilityForSelection("#clipMaskApply", "block");
        visibilityForSelection("#clipMaskDelete", "block");
        
        var points=polyClip2Points(cp);
        points=points["points"];
        drawPolygonMask(points);
        drawClipMask();

        var mask=shape.getAttributeNS( null, "clip-path" );
        shape.removeAttributeNS( null, "clip-path");
        shape.setAttribute("masktmp", mask);
      }else{      
        visibilityForSelection("#clipMaskApply", "none");
        visibilityForSelection("#clipMaskDelete", "none");
      }
    }
}

function saveClipMask(){
    var mask=polyPoints2Array();
    mask="polygon("+mask["mask"]+")";

    var shape=document.querySelectorAll(".cosito.selectable")[0];
    shape.setAttributeNS( null, "clip-path", mask );
    shape.removeAttribute( "masktmp");

    removeAllFromSelection(".polyClip");
    removeAllFromSelection(".polyClipPoly");
    visibilityForSelection("#clipMaskDelete", "block");

    removeClassFromSelection(".btnTool.sel", "sel");
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    sTool='';
    console.log("guardar mascara");
}

function removeClipMask(){
    var e=document.querySelectorAll(".cosito.selectable")[0];
    e.removeAttributeNS( null, "clip-path");
    e.removeAttribute( "masktmp");

    removeClipMakEditor(true);
    visibilityForSelection("#clipMaskApply", "none");
    visibilityForSelection("#clipMaskDelete", "none");
    removeClassFromSelection(".btnTool.sel", "sel");
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    sTool='';
}

function restoreMask(){
    [...document.querySelectorAll("[masktmp]")].forEach((element, index, array) => {
        var masktmp=element.getAttribute("masktmp");
        element.removeAttribute("masktmp");
        element.setAttributeNS(null, "clip-path", masktmp);
    });
}

function removeClipMakEditor(all){
    if(all==true)removeAllFromSelection(".polyClipPoly");
    removeAllFromSelection(".polyClip");
}

function polyPoints2Array(){      //polygon points to array/Mask%
    var shape=document.querySelectorAll(".cosito.selectable")[0];
    var poly=document.getElementById("polyMaskEdit");

    var bb=transformedBoundingBox(shape.id);
    var points=poly.getAttributeNS(null, "points");
    points=points.trim();
    var pointsr= points.split(' ').map(function(item) {
        var rt=item.trim();
        var sp=rt.split(',').map(function(item) { return Number(item);   }) ;
        return sp ;
    });
    var mask='';
    for( var i=0; i<pointsr.length; i++ ){
        var dx=pointsr[i][0]-bb.x;
        var dy=pointsr[i][1]-bb.y;
        dx=trunc( normalize(dx, 0, 100, 0, bb.width), 2);
        dy=trunc( normalize(dy, 0, 100, 0, bb.height), 2);
        mask+=dx+'% '+dy+'%, ';
    }
    mask = mask.slice(0, -2);

    var out={        
        pointsr:pointsr,
        mask:mask
    };
    return out;
}

function polyClip2Points(mask){     //mask% to points/Rpoints
    if( mask.indexOf("(")>0 ){  mask = /\(([^()]*)\)/.exec(mask);  mask=mask[1];  }
    var e=document.querySelectorAll(".cosito.selectable")[0];
    var bb=transformedBoundingBox(e.id);

    var r=mask.split(',').map(function(item) {
        var rt=item.trim();
        rt=rt.replaceAll('%','');
        var p=rt.split(' ').map(function(item) { return Number(item);   }) ;
        return p ;
    });

    var points='', pointsr=[];
    r.forEach(function(item, index, arr){
        item[0] = trunc(((item[0]/100)*bb.width)+bb.x, 2);      //(0.5) x 200
        item[1] = trunc(((item[1]/100)*bb.height)+bb.y, 2);
        points+=item[0]+','+item[1]+' ';
        pointsr.push( [ item[0], item[1] ] );    
    });

    var out={
        points:points,
        pointsr:pointsr
    };
    return out;
}

function drawPolygonMask(points){
    removeAllFromSelection(".polyClipPoly");
    var newID="polyMaskEdit";                               // createID("polyClip");
    var poly=createSVGElement( "polygon", false, newID );
    poly.setAttribute("points", points);
    poly.setAttribute("class", "polyClipPoly");
    poly.setAttribute("fill", "url(#patternBool)");
    poly.setAttribute("style", "pointer-events:none;");
    _hnd['svgHandler'].appendChild( poly );
    return poly;
}

function applyClipMask(event){      //click boton selector de mascaras preset
    var mask=event.target.getAttribute("st");
    var points=polyClip2Points(mask);
    points=points["points"];
    
    drawPolygonMask(points);
    drawClipMask();
    visibilityForSelection("#clipMaskApply", "block");
    var cp=document.querySelectorAll(".cosito.selectable")[0].getAttributeNS(null, "clip-path");
    if(cp!=null && cp.length>8){
        visibilityForSelection("#clipMaskDelete", "block");
    }else{
        visibilityForSelection("#clipMaskDelete", "none");
    }
}

function drawClipMask(){  
    removeAllFromSelection(".polyClip");
    var mask=polyPoints2Array(); 
    mask=mask["mask"];

    var pts=polyClip2Points(mask);
    var pointsr=pts['pointsr'];
    
    var upoint;
    pointsr.forEach(function(item, index, arr){
        if(index==0){
            upoint=[ item[0], item[1] ];
        }else{
            drawLineClip(upoint[0], upoint[1], item[0], item[1], index-1, index);
            upoint=[ item[0], item[1] ];
        }
    });
    drawLineClip(upoint[0], upoint[1], pointsr[0][0], pointsr[0][1], pointsr.length-1, 0 );

    pointsr.forEach(function(item, index, arr){
        drawPointClip(item[0], item[1], index );
    });

    function drawLineClip(x1, y1, x2, y2, point1, point2){
        var idLine=createID("lineClip");
        var segment=createSVGElement( "line", false, idLine );
        segment.setAttribute("x1", x1 );
        segment.setAttribute("y1", y1 );
        segment.setAttribute("x2", x2 );
        segment.setAttribute("y2", y2 );
        segment.setAttribute("point1", point1 );
        segment.setAttribute("point2", point2 );
        segment.setAttribute("class", "polyClip line");
        segment.setAttribute("DblClick", "addNodePolyClip" );
        segment.setAttribute("style", "stroke-linecap:round;stroke-linejoin:round;stroke:black;stroke-width:0.75%;cursor:crosshair;" );
        _hnd['svgHandler'].appendChild( segment );
    }

    function drawPointClip(x,y, pos){
        var idNode=createID("nodeClip");  
        var nodo=bolita(x,y, "0.5rem", "red");
        nodo.setAttribute("class", "polyClip node");
        nodo.setAttribute("id", idNode);
        nodo.setAttribute("pos", pos);
        nodo.setAttribute("MouseDown", "updateNodePolyClip");
        _hnd['svgHandler'].appendChild( nodo );
    }
}

function updateNodePolyClip(evt){
    var poly=document.getElementById("polyMaskEdit");
    var pointsr=polyPoints2Array();
    pointsr=pointsr["pointsr"];

    document.onmousemove=function(){
        evt.target.setAttributeNS(null, "cx", _evtMsg['mousePOS']['x']);
        evt.target.setAttributeNS(null, "cy", _evtMsg['mousePOS']['y']);
        var pos=evt.target.getAttribute("pos");
        pointsr[pos][0]=_evtMsg['mousePOS']['x'];
        pointsr[pos][1]=_evtMsg['mousePOS']['y'];
        var pointsOK= pointsr.join( ' ' );
        poly.setAttributeNS(null, "points", pointsOK);
        setAttributeForSelection("line.polyClip[point1='"+pos+"']", "x1", _evtMsg['mousePOS']['x'] ); 
        setAttributeForSelection("line.polyClip[point1='"+pos+"']", "y1", _evtMsg['mousePOS']['y'] );
        setAttributeForSelection("line.polyClip[point2='"+pos+"']", "x2", _evtMsg['mousePOS']['x'] ); 
        setAttributeForSelection("line.polyClip[point2='"+pos+"']", "y2", _evtMsg['mousePOS']['y'] );
    };
    document.onmouseup=function(){
        document.onmousemove=null;
        document.onmouseup=null;
    }; 
}

function addNodePolyClip(evt){
    var line=evt.target;
    var p1=line.getAttribute("point1");
    var p2=line.getAttribute("point2");

    var poly=document.getElementById("polyMaskEdit");
    var pointsr=polyPoints2Array();
    pointsr=pointsr["pointsr"];
    var point=[ _evtMsg['mousePOS']['x'], _evtMsg['mousePOS']['y'] ];

    if( p2>p1 ){        
        pointsr.insert( p2, point );
    }else{
        pointsr.push( point );
    }
    var pointsOK= pointsr.join( ' ' );
    poly.setAttributeNS(null, "points", pointsOK);

    drawClipMask();
}


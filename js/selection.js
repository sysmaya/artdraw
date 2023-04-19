function btnApplyTransformClick(){
  if( _selector['SELTOOL']=='DRAWTABS' ){
    Dialog("Mode Edit Tabs", "First exit from edit Tabs", "OK");
    return;
  }
  if( _selector['SELTOOL']=='EDITBEZIER' ){
    Dialog("Mode Edit Bezier", "First exit from edit Bezier", "OK");
    return;
  }
  var id=null, flagG=false,  ttsel=document.getElementsByClassName('selectable').length;  
    if( ttsel==0 )return;       
    
    flatteearSel();   
    if( ttsel==1 ){  
        id=document.getElementsByClassName('selectable')[0].id; 
        var oi=getAttributeFromID('propSelName', 'originalID'); 
        var ni=document.getElementById('propSelName').value; 
        if( ni!=oi ){
          if( document.getElementById(ni) ){
              alert('Nombre objeto en uso'); 
          } else{                
            setAttributeForSelection('.selectable', 'id', ni);
          }             
        }
    }else{
      flagG=true;
    }    
    
    var x =fourCartesian('x', document.getElementById('propSelX').value, 1 );     
    var y =fourCartesian('y', document.getElementById('propSelY').value, 1 );
    var w = document.getElementById('propSelW').value;
    var h = document.getElementById('propSelHxx').value;      

    if(flagG==false){
        var elsel=document.getElementById(id);
        elsel.scale(w, h);
        elsel.moveTo(x, y);
    }else{
        resizeSVGselection(".selectable", w, h);
        moveSVGselection(".selectable", x, y);        
    }
    makeSelection(true);  
};

function clickSVG(event){
    if( _evtMsg['busy']==true || _evtMsg['isEditNodes']==true )return;
    if( _selector['SELTOOL']=='DRAWTABS' )return;  
    if( _evtMsg['waitFor']!=null )return;     

    var eSelected=null, seles=document.getElementsByClassName('selectable').length;
    //console.log(event.target);
    //check if element is inside . No es cosito, pero esta dentro de un cosito
    

    if(event.target.classList.contains("cosito")){
        eSelected=event.target;
    }else if(event.target.classList.contains("grouped") || event.target.classList.contains("letter") || event.target.tagName=='path' ){
        eSelected=event.target.closest('.cosito');
    }else if( event.target.closest(".cosito")!=null  ){
        eSelected=event.target.closest(".cosito");
    }else{
        if(event.target.classList.contains("subCosito")){
            var subc=event.target.id;
            eSelected=document.getElementById("tabs-"+subc);
        }
    }        

    if( eSelected!=null && isDomEntity(eSelected)==true ){            
        var selItems=Number(seles) + 1;
        if (event.shiftKey) {             
            eSelected.classList.add("selectable");
            eSelected.setAttribute( "selItem", selItems );
        }else{
            [...document.getElementsByClassName('cosito selectable')].forEach((element, index, array) => {
                element.classList.remove("selectable");
                element.setAttribute( "selItem", 0 );
            });
            eSelected.classList.add("selectable");
            eSelected.setAttribute( "selItem", 1 );
        }
        makeSelection(true);
    }else{
        noneSelected();
    }        
}

function makeSelection(properties){       
    if(_evtMsg['isEditNodes']===true)return;
    if( _selector['SELTOOL']=='DRAWTABS' )return;

    if (typeof properties === 'undefined' || properties===null)properties=false;
    var viewbox = _hnd['svgHandler'].getAttributeNS(null, "viewBox").split(" ");
    viewbox[2]=Number(viewbox[2]);
    //_rdius=viewbox[2]*0.0022;
    _rdius='0.5%';
            
    HideSelector();    
    //check si hay grupos dentro
    if(properties==true)showProperties();  
    
    

    var _rof=viewbox[2]*0.025;
    var _SXparams = { /*transformOrigin:true,*/ rotatorAnchor:'n', rotatorOffset:_rof, snap:{x:0.1,y:0.1,angle: 0.1}, onInit(){  this.on("drag", (args) => {  callbackMoveSelection(args);  });  this.on("resize", (args) => {  callbackMoveSelection(args);  });           }  };  //transformOrigin:true,
    if(_evtMsg['keycode']==82){
        _SXparams = { transformOrigin:true, rotatorAnchor:'n', rotatorOffset:_rof, snap:{x:0.1,y:0.1,angle: 0.1}, resizable:false  };
        //console.log("rotate");
    }
    xElem = subjx( '.selectable' );
    xDraggable=xElem.drag( _SXparams);

    setupColorManager(); 
    selectText();
    setupClipMaster();  
    mainPanelArray(); 
    previewRough();
    loadFilter();
} 

function callbackMoveSelection(args){
    showLinesPosition(args);
}

function MCKAlignGuides(){
    if( hasClass("#liAlign", "sel")==true ){
        _workSetup['guides']=false;
    }else{
        _workSetup['guides']=true;
    }
    var e=document.getElementById("liAlign");
    e.toggleClass("sel");
}

function showLinesPosition(args){
    if( _workSetup['guides']==false )return;

    removeAllFromSelection('.lineControl');
    var show=_workSetup['showGuide'];
    var bbox=getBBoxFromSelection(".selectable");
    var bx1=bbox.x, bx2=bbox.x+(bbox.width/2), bx3=bbox.x+bbox.width;
    var by1=bbox.y, by2=bbox.y+(bbox.height/2), by3=bbox.y+bbox.height;
    var midX=_workSetup['width']/2;
    var midY=_workSetup['height']/2;
    
    var disX1=Math.abs(midX-bx1), disX2=Math.abs(midX-bx2), disX3=Math.abs(midX-bx3)  ; 
    var disY1=Math.abs(midY-by1), disY2=Math.abs(midY-by2), disY3=Math.abs(midY-by3); 
    if( disX1<show || disX2<show || disX3<show )drawLineControl('V', midX, bbox);
    if( disY1<show || disY2<show || disY3<show )drawLineControl('H', midY, bbox);

    var els=document.querySelectorAll( ".cosito:not(.selectable" );
    els.forEach(function(el) {
        var bbel=getBBoxFromSelection("#"+el.id);
        var bex1=bbel.x, bex2=bbel.x+(bbel.width/2), bex3=bbel.x+bbel.width;
        var bey1=bbel.y, bey2=bbel.y+(bbel.height/2), bey3=bbel.y+bbel.height;

        //over or Bottom
        if( by3<bey1 || by1>bey3 ){
            var points=null;
            if(by3<bey1)points={"y1":by1, "y2":bey1};
            if(by1>bey3)points={"y1":by3, "y2":bey3};
            var disX1=Math.abs(bex1-bx1), disX2=Math.abs(bex1-bx2), disX3=Math.abs(bex1-bx3); 
            if( disX1<show || disX2<show || disX3<show )drawLineControl('V', bex1, bbox, points );
            var disX1=Math.abs(bex2-bx1), disX2=Math.abs(bex2-bx2), disX3=Math.abs(bex2-bx3); 
            if( disX1<show || disX2<show || disX3<show )drawLineControl('V', bex2, bbox, points);
            var disX1=Math.abs(bex3-bx1), disX2=Math.abs(bex3-bx2), disX3=Math.abs(bex3-bx3); 
            if( disX1<show || disX2<show || disX3<show )drawLineControl('V', bex3, bbox, points);
        }
        //left or right
        else if( bx3<bex1 || bx1>bex3 ){
            var points=null;
            if(bx3<bex1)points={"x1":bx1, "x2":bex1};
            if(bx1>bex3)points={"x1":bx3, "x2":bex3};
            var disY1=Math.abs(bey1-by1), disY2=Math.abs(bey1-by2), disY3=Math.abs(bey1-by3); 
            if( disY1<show || disY2<show || disY3<show )drawLineControl('H', bey1, bbox, points);
            var disY1=Math.abs(bey2-by1), disY2=Math.abs(bey2-by2), disY3=Math.abs(bey2-by3); 
            if( disY1<show || disY2<show || disY3<show )drawLineControl('H', bey2, bbox, points);
            var disY1=Math.abs(bey3-by1), disY2=Math.abs(bey3-by2), disY3=Math.abs(bey3-by3); 
            if( disY1<show || disY2<show || disY3<show )drawLineControl('H', bey3, bbox, points);
        }
        //center
        else{
            if( Math.abs(bex2-bx1)<show || Math.abs(bex2-bx2)<show || Math.abs(bex2-bx3)<show ){
                var points=points={"y1":bey1, "y2":bey3};
                drawLineControl('V', bex2, bbox, points);
            }
            if( Math.abs(bey2-by1)<show || Math.abs(bey2-by2)<show || Math.abs(bey2-by3)<show ){
                var points=points={"x1":bex1, "x2":bex3};
                drawLineControl('H', bey2, bbox, points);
            }
        }

    });

    function drawLineControl(type, pos, bb, points){
        if(type=='V'){
            var x1=pos, y1=-10000, x2=pos, y2=10000;
        }
        if(type=='H'){
            var x1=-10000, y1=pos, x2=10000, y2=pos;
        }
        if(points!=null){
            if(points.x1!=null)x1=points.x1;
            if(points.y1!=null)y1=points.y1;
            if(points.x2!=null)x2=points.x2;
            if(points.y2!=null)y2=points.y2;
        }
        var id=createID();
        SVGdraw( "line", { 'id':id, 'x1':x1, 'y1':y1, 'x2':x2, 'y2':y2, 'stroke':'red', 'stroke-width':1, 'vector-effect':'non-scaling-stroke', 'stroke-dasharray':'2 2', 'class':'lineControl preview' } );

        var pmx=bb.x+(bb.width/2), pmy=bb.y+(bb.height/2), max = bb.width > bb.height ? bb.width*0.035: bb.height*0.035;;
        var px1=pmx-max, py1=pmy-max, px2=pmx+max, py2=pmy-max;
        var px3=pmx-max, py3=pmy+max, px4=pmx+max, py4=pmy+max;
        SVGdraw( "line", { 'id':createID(), 'x1':px1, 'y1':py1, 'x2':px4, 'y2':py4, 'stroke':'red', 'stroke-width':1, 'vector-effect':'non-scaling-stroke', 'class':'lineControl preview' } );
        SVGdraw( "line", { 'id':createID(), 'x1':px3, 'y1':py3, 'x2':px2, 'y2':py2, 'stroke':'red', 'stroke-width':1, 'vector-effect':'non-scaling-stroke', 'class':'lineControl preview' } );
    }
    return false;
}

function HideSelector(){
    if(xDraggable!=null) xDraggable.disable();
    removeAllFromSelection('g.sjx-svg-wrapper');
    xElem=null;
    xDraggable=null; 
    removeAllFromSelection('.lineControl');       
}

function showProperties(){
    var seles=document.getElementsByClassName('selectable');    
    var id=null, flagG=false, ttItems=seles.length;
    
    if(ttItems==0){
        noneSelected();
        return;
    }
    
    var elements=[], propSelName=document.getElementById('propSelName');
    if( ttItems==1 ){
        id=seles[0].id;         
        propSelName.disabled = false;
        propSelName.value=id;
        propSelName.setAttribute( 'originalID', id );     
        
        var transform=seles[0].getAttributeNS(null, "transform");
        var d=seles[0].getAttributeNS(null, "d");
        elements.push( { id:id, transform:transform, d:d } );
        if( seles[0].tagName=="g" ){
            addClassForSelection("#liGroup", "sel");
            document.querySelectorAll("#liGroup")[0].title="Ungroup Element";
        }else{
            if(seles[0].tagName=="image"){
                removeClassFromSelection("#liGroup", "sel");
                document.querySelectorAll("#liGroup")[0].title="Group";
                removeClassFromSelection("#liCombine", "sel");
                document.querySelectorAll("#liCombine")[0].title="Combine";
            }else{
                removeClassFromSelection("#liGroup", "sel");
                document.querySelectorAll("#liGroup")[0].title="Group";

                if( isShapeCombined(id) ){
                    addClassForSelection("#liCombine", "sel");
                    document.querySelectorAll("#liCombine")[0].title="Uncombine Element";
                }else{
                    removeClassFromSelection("#liCombine", "sel");
                    document.querySelectorAll("#liCombine")[0].title="Combine";
                }
            }            
        }
    }else{
        propSelName.disabled = true;
        propSelName.value=ttItems+' Selected Elements';
        var bboxg=getBBoxFromSelection(".selectable");

        removeClassFromSelection("#liGroup", "sel");
        document.querySelectorAll("#liGroup")[0].title="Group Elements";
        removeClassFromSelection("#liCombine", "sel");
        document.querySelectorAll("#liCombine")[0].title="Combine Elements";

        flagG=true;
    }
    
    var bbox =null;
    if(flagG==true){
        bbox=bboxg;
    }else{
        bbox = transformedBoundingBox(id);
    }
    bbox.x=fourCartesian('x', bbox.x, 0);
    bbox.y=fourCartesian('y', bbox.y, 0);
    var px=(bbox.x).toFixed(2);
    var py=(bbox.y).toFixed(2);
    var pw=(bbox.width).toFixed(2);
    var ph=(bbox.height).toFixed(2);   
    document.getElementById('propSelX').value=px; 
    document.getElementById('propSelY').value=py; 
    document.getElementById('propSelW').value=pw; 
    document.getElementById('propSelHxx').value=ph;
    document.getElementById('propSelName').disabled = false; 
    document.getElementById('propSelX').disabled = false;
    document.getElementById('propSelY').disabled = false;
    document.getElementById('propSelW').disabled = false;
    document.getElementById('propSelHxx').disabled = false;
    
    var tnodes=countNodes(".selectable");
    document.querySelectorAll("#xinfoPanelHeader span")[0].innerText="Selection ("+tnodes+" nodes)";    

    _selector['propSel']=elements;
} 

function selecTool(_idButton, _tool, _title){
    removeClassFromSelection(".btnTool.sel", "sel");
    addClassForSelection("#"+_idButton, "sel");
    sTool=_tool;
    var e=document.getElementById(_tool);       
    var v=0;
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        if( checkVisibility(element)==true )v++;
    });
    if( v==0 ){
        e.slideDown(500);      
    }else{     
        [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
            element.hide();
        });
        e.slideDown(500);
    }            
}

function noneSelected(){
    var seles=document.getElementsByClassName('selectable').length;
    //console.log("noneSelected");
    if(seles==0){
        document.getElementById('propSelName').value=''; 
        document.getElementById('propSelX').value=''; 
        document.getElementById('propSelY').value=''; 
        document.getElementById('propSelW').value=''; 
        document.getElementById('propSelHxx').value=''; 

        document.getElementById('propSelName').disabled = true; 
        document.getElementById('propSelX').disabled = true;
        document.getElementById('propSelY').disabled = true;
        document.getElementById('propSelW').disabled = true;
        document.getElementById('propSelHxx').disabled = true;
        //setupColorManager();
        //selectText();
        setupClipMaster();
        //previewRough();
        //rotatePreview();
        loadFilter();        

        deletePreviewTMP();


        removeClassFromSelection("#liGroup", "sel");
        document.querySelectorAll("#liGroup")[0].title="Group Elements";
        removeClassFromSelection("#liCombine", "sel");
        document.querySelectorAll("#liCombine")[0].title="Combine Elements";
        document.querySelectorAll("#xinfoPanelHeader span")[0].innerText="Selection";
    }
}

function jxStart(){
    //console.log('jxStart');
    _evtMsg['jxWork']=true;
    _evtMsg['isDrawSelector']=false;
    _evtMsg['dragSPsel']=null;
    if (typeof _hnd['selector'] !== 'undefined' && _hnd['selector']) _hnd['selector'].remove();
    _hnd['selector']=null;         

    if( _evtMsg['keycode']==68 ){
        var ids=duplicateSelection(".selectable", "copiedShapes");        
        controlPointZ("new", ".copiedShapes");
        removeClassFromSelection(ids, "copiedShapes" );
        removeClassFromSelection(ids, "selectable" );
    }
    
    controlPointZ("iniDRR");
    busyON('jxStart()');

}

function duplicateSelection(_query, _addClass){
    var ids="";
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        var etmp=element.cloneNode(true);
        var newID=createID('path');
        etmp.id=newID;
        if(_addClass!=null && _addClass!='undefined'){
            etmp.classList.add(_addClass);            
        }
        _hnd['svgHandler'].appendChild(etmp);
        ids+="#"+newID+",";
    });
    ids=ids.slice(0, -1);
    return ids;
}

function jxEnd(type){
    _evtMsg['jxWork']=false;
    controlPointZ(type);    
    makeSelection(true);
    busyOFF();
}

function deleteSeleccion(){
    if( _selector['SELTOOL']=="EDITBEZIER" ){
        var idPath=document.querySelector(".editNode.sel").getAttribute("idPath");
        var index=document.querySelector(".editNode.sel").getAttribute("index");
        var path=document.getElementById(idPath);
        var segments = path.getPathData({normalize: true});
        var typeLast=segments[segments.length-1].type;
        //console.log(segments);
        if(index==0){
            var x1=segments[1].values[4];
            var y1=segments[1].values[5];
            segments[0].values[0]=x1;
            segments[0].values[1]=y1;
            segments.splice(1, 1);
        }else if(  (typeLast=='C' && index==segments.length-1) || (typeLast=='Z' && index==segments.length-2)   ){
            if( typeLast=='C' ){
                segments.splice( segments.length-1, 1);
            }
            if( typeLast=='Z' ){
                //segments.splice( segments.length-1, 1);
                alert("Arreglar borrado ultimo nodo terminado en Z. Utils 690");
            }
        }else{            
            segments.splice(index, 1);            
        }
        
        path.setPathData(segments);
        closeEditNodes();
        _selector['SELTOOL']="EDITBEZIER";
        activateEditNodes();
        return;
    }
    controlPointZ("del");
    

    [..._hnd['svgHandler'].querySelectorAll(".selectable")].forEach((element, index, array) => {
        var fill=element.getAttribute("fill");
        if(fill!=null){
            if( fill.includes("(#") ){
                fill = fill.match(/\(#(.*?)\)/)[1];
                if( checkID(fill) ){
                    var tt=document.querySelectorAll(  '[fill*="'+fill+'"]'  ).length;
                    if(tt<=1)removeID(fill);
                }
            }
        }
        
        var stroke=element.getAttribute("stroke");
        if(stroke!=null){
            if( stroke.includes("(#") ){
                stroke = stroke.match(/\(#(.*?)\)/)[1];
                if( checkID(stroke) ){
                    var tt=document.querySelectorAll(  '[stroke*="'+stroke+'"]'  ).length;
                    if(tt<=1)removeID(stroke);
                }
            }
        }        

        var filter=element.getAttribute("filter");
        if(filter!=null){
            if( filter.includes("(#") ){
                filter = filter.match(/\(#(.*?)\)/)[1];
                if( checkID(filter) ){
                    var tt=document.querySelectorAll(  '[filter*="'+filter+'"]'  ).length;
                    if(tt<=1)removeID(filter);
                }
            }
        }

        element.remove();
    });    

    HideSelector();
}

function controlPointZ(type, e, idOne){
    //console.log("controlPointZ: "+type);
    //typeControl: new, del, iniDDR, drag, resize, rotate, color, degree, group, ungroup, combine, uncombine, zindex..
    var classQuery=".selectable", ids=[], elements=[];
    if(e!=null && e!='undefined'){
        if( Object.prototype.toString.call(e) === "[object String]" ){
            classQuery=e;
            [...document.querySelectorAll(classQuery)].forEach((element, index, array) => {  oneZ(element); ids.push( element.id ); idOne=element.id;    });
        }else{
            oneZ(e);
            ids.push(e.id);
            idOne=e.id;
        }        
        //idOne=e.id;
    }else{
        [...document.querySelectorAll(classQuery)].forEach((element, index, array) => {  oneZ(element); ids.push( element.id );    });
    }       
    
    function oneZ(element){
        var transform=null, d=null, fill="", stroke="", strokew=null, gradFill=null, gradStroke=null, lineJoin=null, lineCap=null, paintOrder=null;
        var id=element.id;
        if(id==null)return;
        var txt=document.getElementById(id).outerHTML;

        fill=element.getAttributeNS(null, "fill");
        stroke=element.getAttributeNS(null, "stroke");
        if(fill!=null)   if( fill.startsWith("url(#") )gradFill=dregreeControlPointZ(fill);
        if(stroke!=null) if( stroke.startsWith("url(#") )gradStroke=dregreeControlPointZ(stroke);               
        
        elements.push(  { id:id, txt:txt, fill:fill, stroke:stroke, gradFill:gradFill, gradStroke:gradStroke} );       
    }
    
    function dregreeControlPointZ(typeFill){
        var uri = /url\(#(.+)\)/.exec(typeFill); 
        uri=uri[1];
        if( checkID(uri)==false )return;
        return document.getElementById(uri).outerHTML;
    }

    _ctrlZ.push( {type:type, idOne:idOne, ids:ids, elements:elements} );    

    if( _ctrlZ.length>2 && JSON.stringify(_ctrlZ[_ctrlZ.length - 1])==JSON.stringify(_ctrlZ[_ctrlZ.length - 2] ) ){
        _ctrlZ.pop();
    }
}

function controlZundo(){
    if( _ctrlZ.length<=0 )return;
    HideSelector();

    if( _ctrlZ[_ctrlZ.length - 1].type=="new" ){
        for(var i=0; i<_ctrlZ[_ctrlZ.length - 1].ids.length; i++ ){
            removeID( _ctrlZ[_ctrlZ.length - 1].ids[i]);
        }        
        _ctrlZ.pop();
        return;
    }

    if( _ctrlZ[_ctrlZ.length - 1].type=="del" ){
        for(var i=0; i<_ctrlZ[_ctrlZ.length - 1].elements.length; i++ ){
            _hnd['svgHandler'].insertAdjacentHTML( "beforeend", _ctrlZ[_ctrlZ.length - 1].elements[i].txt );
        }
        _ctrlZ.pop();
        return;
    }

    if( _ctrlZ[_ctrlZ.length - 1].type=="group" ){
        var idGroup=_ctrlZ[_ctrlZ.length - 1].ids[0];
        unGroupElements(idGroup, "cosito" );
        console.log(idGroup);
        _ctrlZ.pop();
        return;
    }

    if( _ctrlZ[_ctrlZ.length - 1].type=="ungroup" ){
        var subg=_ctrlZ[_ctrlZ.length - 1].ids;
        var idOne=_ctrlZ[_ctrlZ.length - 1].idOne;
        var g=groupElements('selectable', 0, 'cosito', true, "grouped");
        g.id=idOne;
        _ctrlZ.pop();
        return;
    }

    _ctrlZ.pop();
    var lastZ = _ctrlZ[_ctrlZ.length - 1];
    var type=lastZ.type;
    var els=lastZ.elements;
    
    for(var i=0; i<els.length; i++){
        var id=els[i].id;
        var e=document.getElementById(id);

        if(els[i].txt!=null){            
            //console.log("quito==> "+e.outerHTML  );
            //console.log("pongo==> "+els[i].txt  );
            removeID(id);
            _hnd['svgHandler'].insertAdjacentHTML( "beforeend", els[i].txt );
        }
        if(els[i].gradFill!=null){    restoreDegree(els[i].fill, els[i].gradFill)  }
        if(els[i].gradStroke!=null){  restoreDegree(els[i].stroke, els[i].gradStroke)  }
    }

    function restoreDegree(typeFill, degree){
        var uri = /url\(#(.+)\)/.exec(typeFill); 
        uri=uri[1];

        removeID(uri);
        DEFS.insertAdjacentHTML( "beforeend", degree );
    }

    if( type=="iniDRR" )_ctrlZ.pop();
}

function mainPanelArray(){
    if( sTool!='panelArray' )return;
    var tp=document.getElementById("changeTypeArrayGenerate").value;

    if(tp=="xy"){
        visibilityForSelection("#arrayRotateCfg", "none");
        visibilityForSelection("#xyArrayCfg", "block");
        removeID("centerPointRotate");
        arrayXY();
    }
    if(tp=="radial"){
        visibilityForSelection("#xyArrayCfg", "none");
        visibilityForSelection("#arrayRotateCfg", "block");
        rotatePreview();        
    }
}

function rotatePreview(){
    var ttsel=document.querySelectorAll(".cosito.selectable").length;
    if(ttsel==0){
        removeID("centerPointRotate");
        return;
    }

    var bb=getBBoxFromSelection(".cosito.selectable");
    var x=bb.x+(bb.width/2);
    var y=bb.y+(bb.height/2);
    drawCenter(x, y);

    function drawCenter(x, y){       
        //removeID("centerPointRotate");
        if( checkID("centerPointRotate")==true )return;
        var centerPoint= createSVGElement("path", false, "centerPointRotate");
        centerPoint.setAttributeNS(null, 'd', 'M100 149.7069C100 149.7069 200 149.7069 200 149.7069ZM150.3982 100C150.3982 100 150.6918 200.0138 150.6918 200.0138ZM113.08 150.0169C113.08 129.2987 129.8618 112.5169 150.58 112.5169 171.2983 112.5169 188.08 129.2987 188.08 150.0169 188.08 170.7351 171.2983 187.5169 150.58 187.5169 129.8618 187.5169 113.08 170.7351 113.08 150.0169 113.08 150.0169 113.08 150.0169 113.08 150.0169Z');  //0.5ch
        centerPoint.setAttributeNS(null, 'fill', "red");
        centerPoint.setAttributeNS(null, 'stroke', "black");
        centerPoint.setAttributeNS(null, 'stroke-width', "1");
        centerPoint.setAttribute( 'class', "preview");
        _hnd['svgHandler'].appendChild( centerPoint );
        centerPoint.scale(15,15);
        centerPoint.move(x-22.5 ,y-22.5);
 
        centerPoint.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            document.onmouseup = closeCenterPoint;
            document.onmousemove = moveCenterPoint;   
            _selector['FLAGDRAWSELECTOR']=true;                     
        }
        function closeCenterPoint(){
            document.onmouseup = null;
            document.onmousemove = null;
            _selector['FLAGDRAWSELECTOR']=false;
        }
        function moveCenterPoint(){        
            centerPoint.moveTo(_evtMsg['mousePOS'].x-7.5 , _evtMsg['mousePOS'].y-7.5);
        }
    }
}

function rotatePreviewSet(event){
    var ttsel=document.querySelectorAll(".cosito.selectable").length;
    if(ttsel==0){
        Dialog("None Selected", "Select object to rotate.", "OK");
        return;
    }
    var degrees=document.getElementById("rotateAngle").value;
    var mode=event.target.getAttribute("mode");
    var bbCenter=getBBoxFromSelection("#centerPointRotate");
    var x=bbCenter.x+7.5, y=bbCenter.y+7.5;
    [...document.querySelectorAll(".cosito.selectable")].forEach((element, index, array) => {
        var r;
        if(mode=="duplicate"){
            var r=duplicateSelection("#"+element.id, "xxx");
            removeClassFromSelection(".cosito.xxx","selectable");
            removeClassFromSelection(".cosito.xxx","xxx");            
        }
        var transform=element.getAttribute("transform");
        if(transform!=null){
            flattenSimple(element.id);
            var e=document.getElementById(element.id);
            e.rotate( degrees, x, y );
        }else{
            element.rotate( degrees, x, y );
        }
        
        if(mode=="duplicate"){
            controlPointZ( "new", r );
        }else{
            controlPointZ("iniDRR");
            controlPointZ("rotate");
        }
        
    });

    HideSelector();
    makeSelection(true);
}

function arrayXY(){
    var ttsel=document.querySelectorAll(".cosito.selectable").length;
    if(ttsel==0){
        removeID("centerPointRotate");
        return;
    }
    deletePreviewTMP();
    var rows=Number(document.getElementById("XYarrayRows").value);
    var cols=Number(document.getElementById("XYarrayCols").value);
    var spaceX=Number(document.getElementById("XYarraySpaceX").value);
    var spaceY=Number(document.getElementById("XYarraySpaceY").value);
    var flipX=document.getElementById("XYarrayFlipX").checked;
    var flipY=document.getElementById("XYarrayFlipY").checked;
    var rotateX=Number(document.getElementById("XYarrayRotateX").value);
    var oddX=Number(document.getElementById("XYoddSpaceX").value);
    var oddY=Number(document.getElementById("XYoddSpaceY").value);

    var i, j, selection, element, ttsel=document.querySelectorAll(".selectable").length;
    if(ttsel>1){
        element=duplicateSelection(".selectable", "xxx");
        var groupForCopy= groupElementbySelection(".xxx", 0, "groupForCopy" );
        groupForCopy.removeAttribute("class");

        [...document.querySelectorAll("#groupForCopy .cosito")].forEach((element, index, array) => {
            element.setAttribute("class", "grouped");
        });

        removeClassFromSelection("#groupForCopy", "cosito");
        element=document.getElementById("groupForCopy");
        selection="#groupForCopy";
    }else{
        element=document.querySelector(".selectable").id;
        selection="#"+element;
    }
    
    var degreesX=0, cta=0, bb=getBBoxFromSelection(selection);

    for(i=0; i<cols; i++){
        for(j=0; j<rows; j++){
            var posX= bb.x + ( (bb.width + spaceX) * i );
            var posY= bb.y + ( (bb.height + spaceY) * j );
            if( cta>0 ){
                var copy=duplicateSelection(selection, "cosito");
                copy=document.querySelector(copy);
                
                if(j % 2 == 1){
                    posX=posX+oddX;
                    posY=posY+oddY;
                }
                
                copy.moveTo(posX, posY);
                if(flipX && i % 2 == 1)flipXSelection("#"+copy.id);
                if(flipY && j % 2 == 1)flipYSelection("#"+copy.id);

                if(rotateX!=0){
                    degreesX+=rotateX;
                    copy.rotate(degreesX);
                }

                addClassForSelection("#"+copy.id, "preview");
            }
            cta++;
        }
    }
    removeID("groupForCopy");
}

function createArrayXY(){
    var id=createID("group");
    groupElements2("preview", 1, id);
    changeClassFromSelection(".preview", "grouped");
    addClassForSelection("#"+id, "cosito");
    controlPointZ( "new", document.getElementById(id) );
    
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    removeClassFromSelection(".btnTool.sel", "sel");
    sTool='';
}

function changeTypeArrayGenerate(event){
    var tp=event.target.value;
    deletePreviewTMP();
    if(tp=="xy"){
        visibilityForSelection("#arrayRotateCfg", "none");
        visibilityForSelection("#xyArrayCfg", "block");
        removeID("centerPointRotate");
        arrayXY();
    }
    if(tp=="radial"){
        visibilityForSelection("#xyArrayCfg", "none");
        visibilityForSelection("#arrayRotateCfg", "block"); 
        rotatePreview();       
    }
}


function deletePreviewTMP(who){
    var caller=deletePreviewTMP.caller.name;
    
    removeClassFromSelection(".cosito.hidetmp", "hidetmp");
    removeAllFromSelection(".preview");
    if( (sTool!="panelClip" || caller!="noneSelected") && caller!="MCKopenClipMaster" ){
        removeClipMakEditor(true);
        restoreMask();
    }

    [..._hnd['svgHandler'].querySelectorAll("[filter]")].forEach((element, index, array) => {
        var filter=element.getAttribute("filter");
        var url = filter.match(/\(#(.*?)\)/)[1];
        if( checkID(url)==false )element.removeAttribute("filter");
    });
}

function showRightMenu(){
    var ttsel=document.querySelectorAll(".selectable").length;

    removeClassFromSelection("#ctxCut", "disabled");
    removeClassFromSelection("#ctxCopy", "disabled");
    removeClassFromSelection("#ctxDelete", "disabled");
    removeClassFromSelection("#ctxCopyFill", "disabled");
    removeClassFromSelection("#ctxCopyBorder", "disabled");
    removeClassFromSelection("#ctxCopyFilter", "disabled");

    if(ttsel==0){
        addClassForSelection("#ctxCut", "disabled");
        addClassForSelection("#ctxCopy", "disabled");
        addClassForSelection("#ctxDelete", "disabled");
    }else if(ttsel==1){
        //..
    }else{
        addClassForSelection("#ctxCopyFill", "disabled");
        addClassForSelection("#ctxCopyBorder", "disabled");
        addClassForSelection("#ctxCopyFilter", "disabled");
    }
    //console.log("showMenu");
}

function _copyAttrCTX(attr ){
    var e=document.querySelector(".selectable");
    var type, extra, opacity, 
    linejoin=e.getAttribute( "stroke-linejoin" ),
    linecap=e.getAttribute( "stroke-linecap" ), 
    paintorder=e.getAttribute( "paint-order" ), 
    strokew=e.getAttribute( "stroke-width" ), 
    value=e.getAttribute( attr );
    if(value!=null){
        if( value.includes("(#") ){      //degree
            value = value.match(/\(#(.*?)\)/)[1];
            if( checkID(value) ){
                extra=document.getElementById(value).outerHTML;
                extra=extra.replace( 'id="'+value+'"', "***id***" );
            }
            type="degree";
            if(attr=="filter")type="filter";
        }else{ 
            type="color";
            opacity=e.getAttribute( attr+"-opacity" );
        }
    }
    return { 'type':type, 'value':value, 'opacity':opacity, 'extra':extra, 'strokew':strokew, 'linejoin':linejoin, 'linecap':linecap, 'paintorder':paintorder  };
}

function copyFillStyle(){
    visibilityForSelection(".wrapper", "none");
    clipboardFill=_copyAttrCTX("fill");
}
function copyBorderStyle(){
    visibilityForSelection(".wrapper", "none");
    clipboardBorder=_copyAttrCTX("stroke");
}
function copyFilterStyle(){
    visibilityForSelection(".wrapper", "none");
    clipboardFilter=_copyAttrCTX("filter");
}

function pasteFillStyle(){
    if(clipboardFill){
        if(clipboardFill['type']=="color" ){
            [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {
                element.setAttribute("fill", clipboardFill['value']);
                element.setAttribute("fill-opacity", clipboardFill['opacity']);
            });
        }else if(clipboardFill['type']=="degree" ){
            [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {
                var f=clipboardFill['value'];
                var typeDegree="fill-linear-";
                if( f.includes("fill-radial-") )typeDegree="fill-radial-";
                element.setAttribute("fill", "url(#"+typeDegree+element.id+")" );
                element.removeAttribute("fill-opacity" );
                var fill=clipboardFill['extra'];
                fill=fill.replace("***id***", 'id="'+typeDegree+element.id+'"' );
                removeID(typeDegree+element.id);
                DEFS.insertAdjacentHTML( "beforeend", fill );
            });
        }
    }
}
function pasteBorderStyle(){
    if(clipboardBorder){
        if(clipboardBorder['type']=="color" ){
            [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {
                element.setAttribute("stroke", clipboardBorder['value']);
                element.setAttribute("stroke-opacity", clipboardBorder['opacity']);
                element.setAttribute("stroke-width", clipboardBorder['strokew']);
            });
        }else if(clipboardBorder['type']=="degree" ){
            [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {
                var f=clipboardBorder['value'];
                var typeDegree="stroke-linear-";
                if( f.includes("stroke-radial-") )typeDegree="fill-radial-";
                element.setAttribute("stroke", "url(#"+typeDegree+element.id+")" );
                element.removeAttribute("stroke-opacity" );
                element.setAttribute("stroke-width", clipboardBorder['strokew']);
                element.setAttribute("stroke-linejoin", clipboardBorder['linejoin']);
                element.setAttribute("stroke-linecap", clipboardBorder['linecap']);
                element.setAttribute("paint-order", clipboardBorder['paintorder']);
                var fill=clipboardBorder['extra'];
                fill=fill.replace("***id***", 'id="'+typeDegree+element.id+'"' );
                removeID(typeDegree+element.id);
                DEFS.insertAdjacentHTML( "beforeend", fill );
                console.log(fill);
            });
        }
    } 
}
function pasteFilterStyle(){
    if(clipboardFilter){
        if(clipboardFilter['type']=="filter" ){
            [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {
                var f=clipboardFilter['value'];
                var filter=clipboardFilter['extra'];
                element.setAttribute("filter", "url(#filter-"+element.id+")" );
                filter=filter.replace("***id***", 'id="filter-'+element.id+'"' );

                removeID("filter-"+element.id);
                DEFS.insertAdjacentHTML( "beforeend", filter );
                console.log(f);
            });
        }
    }  
}

function changeBackgroundGenerator(event){
    var v=event.target.value;
    if( v==0 ) {
        visibilityForSelection("#tbConfigWaves", 'table');
        visibilityForSelection("#tbConfigMandala", 'none');
    }
    if( v==1 ) {
        visibilityForSelection("#tbConfigWaves", 'none');
        visibilityForSelection("#tbConfigMandala", 'table');
    }
    removeAllFromSelection(".preview");
    mandalaLayerSaveConfig();
}

function changeLayerMandala(event){
    var layer=event.target.value;
    var info='';
    if(layer!=0){
        visibilityForSelection("#mandalaConfig", "");
        document.querySelector("#selectShapeMandala1 button").innerText="Select Shape Layer #"+layer;
        document.getElementById("mandalaLayerTxt").innerText="Layer #"+layer;
        info=document.querySelector("#tbConfigMandala [change='changeLayerMandala'] option[value='"+layer+"']").getAttribute("info");
        var infor = info.split(",");
        //console.log(infor);
        document.getElementById("mandalaItems").value=infor[1] ;        
        document.getElementById("mandalaSize").value=infor[2] ;       
        document.getElementById("mandalaAngle").value=infor[3] ;      
        document.getElementById("mandalaLayerSize").value=infor[4] ;   
        document.getElementById("mandalaLayerAngle").value=infor[5] ;
        if(infor[6]==1){
            document.getElementById("mandalaFill").checked=true;
        }else{
            document.getElementById("mandalaFill").checked=false;
        }
        if(infor[7]==1){
            document.getElementById("mandalaStroke").checked=true;
        }else{
            document.getElementById("mandalaStroke").checked=false;
        }

        var svgsel=document.querySelector("#listMandala1 li:nth-child("+infor[0]+") svg");
        removeClassFromSelection("#listMandala1 svg", "sel");
        svgsel.classList.add("sel");
        mandalaLayerSaveConfig();
    }else{
        visibilityForSelection("#mandalaConfig", "none");
    }
    
}

function openComboCustomSelect(event){  
    var list=event.target.nextElementSibling;
    list.toggleClass('show');
}
  
function selectMandalaShape(event){
    removeClassFromSelection("#listMandala1 svg", "sel");
    event.target.querySelector("svg").classList.add("sel");
    document.getElementById("listMandala1").toggleClass('show');
    mandalaLayerSaveConfig()
}

function mandalaLayerSaveConfig(){
    var layer=document.querySelector("#tbConfigMandala [change='changeLayerMandala']").value;
    if(layer=='0')return;
    var opt=document.querySelector("#tbConfigMandala [change='changeLayerMandala'] option[value='"+layer+"']");

    var shape=document.querySelector("#selectShapeMandala1 svg.sel").getAttribute("pos");
    var items=document.getElementById("mandalaItems").value;
    var size=document.getElementById("mandalaSize").value ;
    var angle=document.getElementById("mandalaAngle").value ;
    var items2=document.getElementById("mandalaLayerSize").value ;
    var angle2=document.getElementById("mandalaLayerAngle").value ;
    var fill=document.getElementById("mandalaFill").checked ;       if(fill==true)fill=1;else fill=0;
    var stroke=document.getElementById("mandalaStroke").checked ;   if(stroke==true)stroke=1;else stroke=0;

    var info=shape+','+items+','+size+','+angle+','+items2+','+angle2  +','+fill+','+stroke;
    opt.setAttribute("info", info);
    mandalaPreview();
}

function mandalaPreview(){
    removeAllFromSelection(".preview");

    [...document.querySelectorAll("#tbConfigMandala [change='changeLayerMandala'] option")].forEach((element, index, array) => {
        var info=element.getAttribute("info");
        if(info!=null){
            var infor = info.split(",");
            if( infor[0]!='1' ){
                var d=document.querySelector("#listMandala1 li:nth-child("+infor[0]+") svg path").getAttribute("d");
                var newID=createID("path");
                var sf=createSVGElement("path", true, newID );
                sf.setAttributeNS(null, 'd',  d );
                sf.classList.add("preview");
                _hnd['svgHandler'].appendChild( sf );                
                var bb=transformedBoundingBox(newID);
                sf.scale(bb.width*infor[2], bb.height*infor[2] );               
                bb=transformedBoundingBox(newID);

                var center=centerScreen();
                sf.moveTo( center[0]-(bb.width/2) , center[1]-(bb.height/2)-infor[4] );
                sf.rotate(infor[3]);
                sf=document.getElementById(newID);
                var stepAngle=360/infor[1];
                
                for(var i=0; i<Number(infor[1]); i++ ){
                    var idCopy=createID("path");
                    var copy=sf.cloneNode(true);
                    copy.id=idCopy;
                    copy.setAttribute("fill-rule", "evenodd");
                    copy.setAttribute("fill-opacity", "1");
                    copy.classList.add( "mandalayer-"+index );
                    if(infor[6]==1){
                        copy.setAttribute("fill", "#000000");
                    }else{
                        copy.setAttribute("fill", "none");
                    }
                    if(infor[7]==1){
                        copy.setAttribute("stroke", "#000000");
                    }else{
                        copy.setAttribute("stroke", "none");
                    }
                    _hnd['svgHandler'].appendChild( copy );
                    copy.rotate( (stepAngle*i)+stepAngle, center[0], center[1] );                      
                }
                rotateSVGselection( ".mandalayer-"+index, infor[5], center[0], center[1]  );
                sf.remove();
            }
        }
        
    });
}

function createMandala(){
    var id=createID("group");
    groupElements2("preview", 1, id);
    changeClassFromSelection(".preview", "grouped");
    addClassForSelection("#"+id, "cosito");
    controlPointZ( "new", document.getElementById(id) );

    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    removeClassFromSelection(".btnTool.sel", "sel");
    sTool='';
}
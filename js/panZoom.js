function changeSizeW(event){
    _workSetup['width']=event.target.value;
    setupJobSize(true);
    console.log("changeW:"+_workSetup['width']);
}

function changeSizeH(event){
    _workSetup['height']=event.target.value;
    setupJobSize(true);
    console.log("changeH");
}

function setupJobSize( _start ){
    removeID( 'gridLines' );
    removeID( 'ruleH' );
    removeID( 'ruleV' );
    removeID( 'transformXY' );
        
    var ancho=Number( _workSetup['width'] );
    var alto=Number( _workSetup['height'] );
    if( _workSetup['zeroPos']!=99 ){
        var transF=createSVGElement( 'g', false, 'transformXY');
        _hnd['svgHandler'].appendChild( transF );
    }    

    var viewbox = _hnd['svgHandler'].getAttributeNS(null, "viewBox").split(" ");
    viewbox[0]=Number(viewbox[0]);  viewbox[1]=Number(viewbox[1]);  viewbox[2]=Number(viewbox[2]);  viewbox[3]=Number(viewbox[3]);
    if (typeof _start !== 'undefined' && _start){            
        viewbox[2]=ancho*1.25;
        viewbox[3]=alto*1.25;            
        viewbox[0]=-25;
        viewbox[1]=-25;            
        _hnd['svgHandler'].setAttributeNS(null, "viewBox", viewbox.join(' ') );
        document.getElementById("workMain").setAttributeNS(null, "width", ancho );
        document.getElementById("workMain").setAttributeNS(null, "height", alto );
        document.querySelector("input[change='changeSizeW']").value=ancho;
        document.querySelector("input[change='changeSizeH']").value=alto;
    }
    
    var zoom=parseFloat(viewbox[3]);
    var dLine=10, fzoom=230, fontSZ=4;
    if( workSize=='mm' && zoom>fzoom  ){
        dLine=50;
        fontSZ=9;
    }
    if( workSize=='inch' ){
                
    }

    if( _workSetup['zeroPos']!=99 ){
        var nokiX1=-20;
        var nokiX2=40;
        var nokiY1=-20;
        var nokiY2=-25;

        var arwH=SVGdraw( 'line', {'x1':nokiX1, 'y1':nokiY1, 'x2':nokiX2, 'y2':nokiY1, stroke:'#c96161ab','stroke-width':'3','vector-effect':'non-scaling-stroke' }); 
        var arwpH=SVGdraw( 'polygon', {'points':'0 0, 10 5, 0 10', stroke:'#c96161ab','fill':'#c96161ab','stroke-width':'3','vector-effect':'non-scaling-stroke' }).move(nokiX2, nokiY2);
        transF.add(arwH);  transF.add(arwpH);
        
        var arwV=SVGdraw( 'line', { 'x1':-20, 'y1':-20, 'x2':-20, 'y2':40, stroke:'#6ab96aa8','stroke-width':'3','vector-effect':'non-scaling-stroke' }); 
        var arwpV=SVGdraw( 'polygon', { 'points':'0 0, 10 0, 5 10', stroke:'#6ab96aa8','fill':'#6ab96aa8','stroke-width':'3','vector-effect':'non-scaling-stroke' }).move(-25, 40);
        transF.add(arwV);  transF.add(arwpV);
        
        var arwC=SVGdraw( 'circle', { 'cx':-25, 'cy':-25, 'r':10, stroke:'none','fill':'#5a5ae3','stroke-width':'3','vector-effect':'non-scaling-stroke' });      
        transF.add(arwC);
    }    

    _workSetup['width']=Number(_workSetup['width']);
    _workSetup['height']=Number(_workSetup['height']);
    if( _workSetup['zeroPos']!=99 ){        // compatibilidad Modo CNC
        if( _workSetup['zeroPos']==2 ){
            transF.x(_workSetup['width']-50);
            flip("transformXY", 1);            
        }
        if( _workSetup['zeroPos']==3 ){
            transF.move(_workSetup['width']-50, _workSetup['height']-50 );
            flip("transformXY", 1);
            flattenSimple( "transformXY" );
            flip("transformXY", 2);
        }
        if( _workSetup['zeroPos']==4 ){
            transF.y( _workSetup['height']-50 );
            flip("transformXY", 2);
        }
        if( _workSetup['zeroPos']==5 ){
            arwH.move( 0, _workSetup['height']/2 ).width( _workSetup['width'] );
            arwV.move( _workSetup['width']/2, 0 ).height( _workSetup['height'] );
            arwC.remove();
            arwpH.remove();
            arwpV.remove();
            //transF.remove();
        }else{
            areaWorker.add(transF);
        }
    }else{                                  // modo Diseño Grafico

    }
    
    updateRuler();
}

function drawGrid(viewbox, step){
    _workSetup['width']=Number( _workSetup['width']);
    _workSetup['height']=Number( _workSetup['height']);

    var fzoom = _workSetup['width']+'x'+_workSetup['height']+'x'+viewbox[2]+'x'+viewbox[3] ;
    if( fzoom==_workSetup['fzoom'] )return;
    _workSetup['fzoom']=fzoom;

    removeID('gridLinesV');
    removeID('gridLinesH');
    var gridLinesH=createSVGElement( 'g', false, 'gridLinesH');
    _hnd['svgHandler'].appendChild( gridLinesH );
    var gridLinesV=createSVGElement( 'g', false, 'gridLinesV');
    _hnd['svgHandler'].appendChild( gridLinesV );
    
    var i=0;

    for( i=0; i<=_workSetup['width']; i+=step){
        if(i>0 && i<Number( _workSetup['width']) ){
            var id=createID('line');
            var lh=SVGdraw( 'line', { 'id':id, 'x1':i, 'y1':0, 'x2':i, 'y2':_workSetup['height']} );
            gridLinesV.add(lh);
        }      
    }

    for( i=0; i<=_workSetup['height']; i+=step){
        if(i>0 && i<Number( _workSetup['height']) ){
            var id=createID('line');
            var lh=SVGdraw( 'line', { 'id':id, 'x1':0, 'y1':i, 'x2':_workSetup['width'], 'y2':i } );
            gridLinesH.add(lh);
        }      
    }
    areaWorker.add(gridLinesH);
    areaWorker.add(gridLinesV);
}

function updateRuler(){

    var viewbox = _hnd['svgHandler'].getAttributeNS(null, "viewBox").split(" ").map(d => Number(d) || d);;
    viewbox[0]=Number(viewbox[0]);  viewbox[1]=Number(viewbox[1]);  viewbox[2]=Number(viewbox[2]);  viewbox[3]=Number(viewbox[3]);        
         
    var step=5;
    if( viewbox[2]>3000 )step=200;
    else if( viewbox[2]>1750 )step=100;
    else if( viewbox[2]>500 )step=50;
    else if( viewbox[2]>300 )step=25;
    else if( viewbox[2]>100 )step=10;
    else if( viewbox[2]>50 )step=5;

    drawGrid(viewbox, step);
    updateRulerTop2( step );
    updateRulerLeft2( step  );  
}

function updateRulerTop2( step ){
    pHandler.x=0; 
    pHandler.y=0;    
    var pto2= pHandler.matrixTransform(_hnd['svgHandler'].getScreenCTM());
    var offsetX=pto2.x;

    pHandler.x=step;
    var pto= pHandler.matrixTransform(_hnd['svgHandler'].getScreenCTM());
    var sizeStep=pto.x-offsetX;
    offsetX=pto2.x-58;   
    //console.log("offsetX:"+offsetX+" sizeStep:"+sizeStep );
    //console.log( pto2 );
    var isFF=false, userAgent = navigator.userAgent;
    if(userAgent.match(/firefox|fxios/i)){
        isFF=true;
    }

    var ctaL=0 ;
    var canvasRuleTop = document.getElementById("canvasTop");
    var ctx = canvasRuleTop.getContext("2d");
    if(isFF==false){
        ctx.reset();
    }else{
        ctx.clearRect(0, 0, 2000, 60);
    }
    ctx.font = "12px Arial";
    //ctx.fillText( "xxx", offsetX, 10);
    for(var i=0; i<=2000; i+=step){
        var noki=fourCartesian('x', i, 0);
        var px= offsetX + (ctaL*sizeStep);   
        ctx.fillText( noki.toString(), px, 12);
        ctaL++;
        if(px>1800)break;
    }
    ctaL=0 ;
    for(var i=0; i>=-2000; i-=step){
        var noki=fourCartesian('x', i, 0);
        var px= offsetX - (ctaL*sizeStep); 
        ctx.fillText( noki.toString(), px, 12);
        ctaL++;
        if(px<0)break;
    }

}
function updateRulerLeft2( step ){
    pHandler.x=0; 
    pHandler.y=0;    
    var pto2= pHandler.matrixTransform(_hnd['svgHandler'].getScreenCTM());
    var offsetY=pto2.y;

    pHandler.x=step;
    var pto= pHandler.matrixTransform(_hnd['svgHandler'].getScreenCTM());
    var sizeStep=pto.x-pto2.x;
    offsetY=pto2.y-46;   

    var isFF=false, userAgent = navigator.userAgent;
    if(userAgent.match(/firefox|fxios/i)){
        isFF=true;
    }

    var ctaL=0 ;
    var canvasRuleLeft = document.getElementById("canvasLeft");
    var ctx = canvasRuleLeft.getContext("2d");
    if(isFF==false){
        ctx.reset();
    }else{
        ctx.clearRect(0, 0, 60, 2000);
    }
    ctx.font = "12px Arial";
    //ctx.fillText( "yyy", offsetY, 10);
    
    for(var i=0; i<=2000; i+=step){
        var noki=fourCartesian('x', i, 0);
        var py= offsetY + (ctaL*sizeStep); 

        ctx.save();
        ctx.textAlign="center";
        ctx.textBaseline="middle";  
        ctx.translate(7,py);
        ctx.rotate(90 * (Math.PI / 180));
        ctx.fillText( noki.toString(), 0, 0);
        ctx.restore();

        ctaL++;
        if(py>1800)break;
    }
    ctaL=0 ;
    for(var i=0; i>=-2000; i-=step){
        var noki=fourCartesian('x', i, 0);
        var py= offsetY - (ctaL*sizeStep); 
        
        ctx.save();
        ctx.textAlign="center";
        ctx.textBaseline="middle";  
        ctx.translate(7,py);
        ctx.rotate(90 * (Math.PI / 180));
        ctx.fillText( noki.toString(), 0, 0);
        ctx.restore();

        ctaL++;
        if(py<0)break;
    }

}
function clickCanvas(e){
    console.log( e.offsetX+","+e.offsetY )
}

function realSizeViewZoom(){
    //ancho real del area visible del viewport. 
    //este valor depende del zoom. 
    pHandler.x = window.innerWidth-1; 
    pHandler.y = window.innerHeight- document.getElementById("divPalette").offsetHeight -1 ;
    var pto = pHandler.matrixTransform( _hnd['awHandler'].getScreenCTM().inverse() );
    return pto;
}

function zoomMore(event){    
    var pClickX=_evtMsg['clientX'];
    var pClickY=_evtMsg['clientY'];
    var isShortcut=event.target.getAttribute("mouseUp");
    if( isShortcut!='undefined' && isShortcut!=null ){
        var center=centerWorkArea();
        pClickX=center[0];
        pClickY=center[1];
    }
    removeClassFromSelection("#svgWorkerArea", "wait");
    
    var cEvent = new Event('mousewheel');
    cEvent.detail = 0;
    cEvent.clientX = pClickX;
    cEvent.clientY = pClickY;
    cEvent.wheelDeltaY = 120;
    cEvent.wheelDeltaX = 0;

    if (cEvent.wheelDeltaY) {
    cEvent.wheelDelta = 120;
    } else if (cEvent.wheelDeltaX) {
    cEvent.wheelDelta = 0;
    }
    window.dispatchEvent(cEvent); 
}

function zoomMinus(event){
    var pClickX=_evtMsg['clientX'];
    var pClickY=_evtMsg['clientY'];
    var isShortcut=event.target.getAttribute("mouseUp");
    if( isShortcut!='undefined' && isShortcut!=null ){
        var center=centerWorkArea();
        pClickX=center[0];
        pClickY=center[1];
    }
    removeClassFromSelection("#svgWorkerArea", "wait");

    var cEvent = new Event('mousewheel');
    cEvent.detail = 0;
    cEvent.clientX = pClickX;
    cEvent.clientY = pClickY;
    cEvent.wheelDeltaY = -120;
    cEvent.wheelDeltaX = 0;

    if (cEvent.wheelDeltaY) {
    cEvent.wheelDelta = -120;
    } else if (cEvent.wheelDeltaX) {
    cEvent.wheelDelta = 0;
    }
    window.dispatchEvent(cEvent);
}
function zoomFit(){
    var wDoc=_workSetup['width'];
    var hDoc=_workSetup['height'];
    var wh=realSizeViewZoom();
    var left=( (Number(wh.x)-Number(wDoc))/2 )*-1;

    _hnd['svgHandler'].setAttributeNS(null, "viewBox", left+" 0 "+Math.round(wh.x)+" "+hDoc );
    //var fzoom = _workSetup['width']+'x'+_workSetup['height']+'x'+wDoc+'x'+hDoc ;
    //_workSetup['fzoom']=fzoom;

    updateRuler();
    //console.log( "fzoom:"+fzoom+" svgW:"+wDoc+" svgH: "+hDoc+" viewbos: "+viewbox.join(' ') );
}
function zoomHand(){

}
    
function dragScreen(evt, _mode){
    //console.log("dragScreen mode:"+_mode);
    if( (_mode=='move' || _mode=='up') && _evtMsg['isDragScreen']==false ){ 
        _evtMsg['isDragScreen']=false; 
        _evtMsg['dragSP']=null; 
        return; 
    }else if( _mode=='down' && evt.shiftKey && _evtMsg['isDragScreen']==false ){
        _evtMsg['dragSP']=cursorPoint(evt, _hnd['awHandler']);
        _evtMsg['isDragScreen']=true;
        return;
    }else if( _mode=='move' && evt.shiftKey && _evtMsg['isDragScreen']==true ){
        var viewbox = _hnd['svgHandler'].getAttributeNS(null, "viewBox").split(" ").map(d => Number(d) || d); 
        viewbox[0]=Number(viewbox[0]);  viewbox[1]=Number(viewbox[1]);  viewbox[2]=Number(viewbox[2]);  viewbox[3]=Number(viewbox[3]);     
        viewbox[0] =parseFloat(viewbox[0]);
        viewbox[1] =parseFloat(viewbox[1]);

        var mx=viewbox[0], my=viewbox[1];
        var p=cursorPoint(evt, _hnd['awHandler']);
        var movX=Number(_evtMsg['dragSP'].x)-Number(p.x);
        var movY=Number(_evtMsg['dragSP'].y)-Number(p.y);
        viewbox[0] = mx+movX;
        viewbox[1] =parseFloat(my+movY);            
        //console.log(viewbox);
        _hnd['svgHandler'].setAttributeNS(null, "viewBox", viewbox.join(' ') );
        updateRuler();
        return true;        
    }else if( _mode=='up' && _evtMsg['isDragScreen']==true ){
        _evtMsg['isDragScreen']=false;
        _evtMsg['dragSP']=null;
    }
    return false;    
}  
    
function zoom(evt){         
    if(evt.shiftKey==false ){                  //ctrlKey   shiftKey
        //NO Mover el documento
        return;
    }
    
    var viewbox = _hnd['svgHandler'].getAttributeNS(null, "viewBox").split(" ").map(d => Number(d) || d);
    viewbox[0]=Number(viewbox[0]);  viewbox[1]=Number(viewbox[1]);  viewbox[2]=Number(viewbox[2]);  viewbox[3]=Number(viewbox[3]);
       
    var cssObj = window.getComputedStyle(_hnd['svgHandler'], null);
    var w=parseFloat( cssObj.getPropertyValue("width") );    
    var h=parseFloat( cssObj.getPropertyValue("height") );
    var ratio=h/w;

    var scale=1.075;
    
    if (evt.wheelDelta > 0 || evt.detail < 0) {
        scale=0.925;
        if( viewbox[2]<=22 )return;
    } else {
        if( viewbox[2]>=3600 )return;         
    }
    var ppt = cursorPoint(evt, _hnd['awHandler']);    
    viewbox[2] = Math.round(viewbox[2]*scale);
    viewbox[3] = Math.round(viewbox[2]*ratio);   

    var zn=viewbox.join(' ');
    _hnd['svgHandler'].setAttributeNS(null, "viewBox", viewbox.join(' ') );
    var ppt2 = cursorPoint(evt, _hnd['awHandler']);
    
    var descX=Number(ppt.x) - Number(ppt2.x);
    var descY=Number(ppt.y) - Number(ppt2.y);        
    viewbox[0]=viewbox[0]+descX;
    viewbox[1]=viewbox[1]+descY;
    _hnd['svgHandler'].setAttributeNS(null, "viewBox", viewbox.join(' ') );
    updateRuler();         
    //Ayuda()
}
   
function drawSelector(evt, _mode){
       if( _evtMsg['isDragScreen']==true || _evtMsg['jxWork']==true )return;
       if( _selector['SELTOOL']=='DRAWHANDLINE' )return;
       if( _selector['SELTOOL']=='DRAWTABS' )return;
       if( _selector['FLAGDRAWSELECTOR']==true )return;
       
       if( _mode=='down' && _evtMsg['isDrawSelector']==false ){
            _evtMsg['dragSPsel']=cursorPoint(evt, _hnd['awHandler']);
            [...document.getElementsByClassName('drawSelector')].forEach((element, index, array) => {
                element.remove();
            });
            
            _evtMsg['isDrawSelector']=true;
            _hnd['selector']=createSVGElement('rect');       
            _hnd['selector'].setAttribute('fill', 'none');         
            _hnd['selector'].setAttribute('stroke-width', '0.5');
            _hnd['selector'].setAttribute('stroke', 'red');     
            _hnd['selector'].setAttribute('stroke-dasharray', '4 3'); 
            _hnd['selector'].setAttribute('vector-effect','non-scaling-stroke');
            _hnd['selector'].classList.add('drawSelector');
            _hnd['selector'].setAttribute('id', 'drawSelector');
            _hnd['svgHandler'].appendChild(_hnd['selector']);
            if( _selector['SELTOOLM']=='line' )drawSelectorLine(_mode);    
            if( _selector['SELTOOLM']=='rect' )drawSelectorRect(_mode);
            if( _selector['SELTOOLM']=='ellipse' )drawSelectorEllipse(_mode);             
            //console.log('DrawSelector:START'+_mode);
            return;
        }
        
        if( _mode=='move' && _evtMsg['isDrawSelector']==true ){
            var p=cursorPoint(evt, _hnd['awHandler']);
            _evtMsg['mousePOS']=p;
            var movX=Number(p.x) - Number(_evtMsg['dragSPsel'].x);
            var movY=Number(p.y) - Number(_evtMsg['dragSPsel'].y);
            var dez=  Math.abs(movX)+ Math.abs(movY);
            if( dez>0.1 ) busyON('drawSelector()');
            
            if( movX>0 && movY>0 ){
                _hnd['selector'].setAttribute('x', _evtMsg['dragSPsel'].x);
                _hnd['selector'].setAttribute('y', _evtMsg['dragSPsel'].y);
                _hnd['selector'].setAttribute('height', movY);
                _hnd['selector'].setAttribute('width', movX);
                _evtMsg['selectorPos']=1;
            }
            if( movX>0 && movY<0 ){
                _hnd['selector'].setAttribute('x', _evtMsg['dragSPsel'].x);
                _hnd['selector'].setAttribute('y', Number(_evtMsg['dragSPsel'].y) - Math.abs(movY) );
                _hnd['selector'].setAttribute('height', Math.abs(movY));
                _hnd['selector'].setAttribute('width', movX);
                _evtMsg['selectorPos']=2;
            }            
            if( movX<0 && movY>0 ){
                _hnd['selector'].setAttribute('x', Number(p.x)  );
                _hnd['selector'].setAttribute('y', _evtMsg['dragSPsel'].y );
                _hnd['selector'].setAttribute('height', Math.abs(movY));
                _hnd['selector'].setAttribute('width', Math.abs(movX) );
                _evtMsg['selectorPos']=4;
            }            
            if( movX<0 && movY<0 ){
                _hnd['selector'].setAttribute('x', Number(p.x)  );
                _hnd['selector'].setAttribute('y', Number(p.y) );
                _hnd['selector'].setAttribute('height', Math.abs(movY));
                _hnd['selector'].setAttribute('width', Math.abs(movX) );
                _evtMsg['selectorPos']=1;
            }
            if( _selector['SELTOOLM']=='line' )drawSelectorLine(_mode);
            if( _selector['SELTOOLM']=='rect' )drawSelectorRect(_mode);
            if( _selector['SELTOOLM']=='ellipse' )drawSelectorEllipse(_mode);
            //console.log('movX:'+movX+' == movY:'+movY);
            //console.log('DrawSelector:MOVE'+_mode);
            return;        
        }
        
        if( _mode=='up' && _evtMsg['isDrawSelector']==true ){
            var selBox=_hnd['selector'].getBBox();
            var selDistance=selBox.width+selBox.height;
            if( _selector['SELTOOLM']=='line' )drawSelectorLine(_mode);
            if( _selector['SELTOOLM']=='rect' )drawSelectorRect(_mode);
            if( _selector['SELTOOLM']=='ellipse' )drawSelectorEllipse(_mode);
            if( selDistance==0 )busyOFF();            
            _evtMsg['isDrawSelector']=false;
            _evtMsg['dragSPsel']=null;
            _hnd['selector'].remove();
            _hnd['selector']=null;
            busyOFF();
            if( selDistance<0.1 )return;
            selectObjects(selBox);            
        }
}

function selectObjects(selBox){       
    var els = document.getElementsByClassName('cosito');  
    var seles=0;
    var selItems=Number(document.querySelectorAll('.selectable').length) + 1;      
    Array.from(els).forEach((el) => {
        var id=el.getAttribute('id');
        var bbox=transformedBoundingBox(id);
        if(bbox!=null || bbox!='undefined'){
            if( bbox.x>selBox.x && bbox.y>selBox.y && (bbox.x+bbox.width)<(selBox.x+selBox.width) && (bbox.y+bbox.height)<(selBox.y+selBox.height) ){
                el.classList.add('selectable');
                el.setAttribute('selItem',selItems );
                selItems++;
                seles++;
            }
        }        
    });
    if( seles>0 )makeSelection(true);
}

function drawSelectorLine(_mode){ 
    var shape=_selector['SELTOOLM'];
    if( _mode=='down' ){
        var newID=createID(shape);
        _evtMsg['selectorShapeSVG']=createSVGElement(shape, true, newID); 
        _hnd['svgHandler'].appendChild(_evtMsg['selectorShapeSVG']);

        _evtMsg['selectorShapeSVG'].setAttribute('x1', _evtMsg['mousePOS'].x); 
        _evtMsg['selectorShapeSVG'].setAttribute('y1', _evtMsg['mousePOS'].y);
        _evtMsg['selectorShapeSVG'].setAttribute('x2', _evtMsg['mousePOS'].x); 
        _evtMsg['selectorShapeSVG'].setAttribute('y2', _evtMsg['mousePOS'].y);
    }
    if( _mode=='move' || _mode=='up' ){
        _evtMsg['selectorShapeSVG'].setAttribute('x2', _evtMsg['mousePOS'].x); 
        _evtMsg['selectorShapeSVG'].setAttribute('y2', _evtMsg['mousePOS'].y);
    }
    if( _mode=='up' ){
        _evtMsg['selectorShapeSVG'].setAttribute('class','cosito');
        _selector['SELTOOLM']=null;   
        controlPointZ("new", _evtMsg['selectorShapeSVG']);   
        _selector['SELTOOL']="SELROJO";  
    }
}

function drawSelectorRect(_mode){ 
    var shape=_selector['SELTOOLM'];
    if( _mode=='down' ){
        var newID=createID(shape);
        _evtMsg['selectorShapeSVG']=createSVGElement(shape, true, newID);      
        _hnd['svgHandler'].appendChild(_evtMsg['selectorShapeSVG']);
    }
    if( _mode=='down' || _mode=='move' || _mode=='up'  ){
        var rectx = _hnd['selector'].getAttribute('x') ==null ? 0.0001 : _hnd['selector'].getAttribute('x');
        var recty = _hnd['selector'].getAttribute('y') ==null ? 0.0001 : _hnd['selector'].getAttribute('y');
        var rectw = _hnd['selector'].getAttribute('width') ==null ? 0.0001 : _hnd['selector'].getAttribute('width');
        var recth = _hnd['selector'].getAttribute('height') ==null ? 0.0001 : _hnd['selector'].getAttribute('height');
        _evtMsg['selectorShapeSVG'].setAttribute('x', rectx ); 
        _evtMsg['selectorShapeSVG'].setAttribute('y', recty ); 
        _evtMsg['selectorShapeSVG'].setAttribute('width', rectw );  
        _evtMsg['selectorShapeSVG'].setAttribute('height', recth );
    }
    if( _mode=='up' ){
        var idNewShape = _evtMsg['selectorShapeSVG'].getAttribute('id');
        _evtMsg['selectorShapeSVG'].setAttribute('class','cosito');
        _selector['SELTOOLM']=null;
        var s=shape2path( idNewShape , 'cosito');
        controlPointZ("new", s);

        removeClassFromSelection("#divLeftMenu .features-item", "sel");
        addClassForSelection('#btnSelect', "sel");
        _selector['SELTOOL']="SELROJO";
    }
}

function drawSelectorEllipse(_mode){ 
    var shape=_selector['SELTOOLM'];
    if( _mode=='down' ){
        var newID=createID(shape);
        _evtMsg['selectorShapeSVG']=createSVGElement(shape, true, newID);           //createSVGElement(name, _isCosito, _newID)
        _hnd['svgHandler'].appendChild(_evtMsg['selectorShapeSVG']);
        _evtMsg['selectorShapeSVG'].setAttribute('cx', _evtMsg['mousePOS'].x ); 
        _evtMsg['selectorShapeSVG'].setAttribute('cy', _evtMsg['mousePOS'].y ); 
    }
    if( _mode=='down' || _mode=='move' || _mode=='up'  ){        
        if(_hnd['selector'].getAttribute('width')!==null && _hnd['selector'].getAttribute('width')>0) _evtMsg['selectorShapeSVG'].setAttribute('rx', _hnd['selector'].getAttribute('width') );  
        if(_hnd['selector'].getAttribute('height')!==null && _hnd['selector'].getAttribute('height')>0)_evtMsg['selectorShapeSVG'].setAttribute('ry', _hnd['selector'].getAttribute('height') );
    }
    if( _mode=='up' ){
        var idNewShape = _evtMsg['selectorShapeSVG'].getAttribute('id');
        _evtMsg['selectorShapeSVG'].setAttribute('class','cosito');
        _selector['SELTOOLM']=null;
        var s=shape2path( idNewShape , 'cosito');
        controlPointZ("new", s);

        removeClassFromSelection("#divLeftMenu .features-item", "sel");
        addClassForSelection('#btnSelect', "sel");
        _selector['SELTOOL']="SELROJO";
    }
}
function drawHandLine(){ 
//https://stackoverflow.com/questions/40324313/svg-smooth-freehand-drawing   
    var buffer = [];
    var bufferSize = 12;
    var strPath;
    var path = null;  

    var getMousePosition = function () {
        return {
            x: _evtMsg['mousePOS'].x,
            y: _evtMsg['mousePOS'].y
        }
    };
    
    var appendToBuffer = function (pt) {
        buffer.push(pt);
        while (buffer.length > bufferSize) {
            buffer.shift();
        }
    };
    
    var getAveragePoint = function (offset) {
        var len = buffer.length;
        if (len % 2 === 1 || len >= bufferSize) {
            var totalX = 0;
            var totalY = 0;
            var pt, i;
            var count = 0;
            for (i = offset; i < len; i++) {
                count++;
                pt = buffer[i];
                totalX += pt.x;
                totalY += pt.y;
            }
            return {
                x: totalX / count,
                y: totalY / count
            }
        }
        return null;
    };
    
    var updateSvgPath = function () {
        var pt = getAveragePoint(0);        
        if (pt) {
            strPath += " L" + pt.x + " " + pt.y;
            var tmpPath = "";
            for (var offset = 2; offset < buffer.length; offset += 2) {
                pt = getAveragePoint(offset);
                tmpPath += " L" + pt.x + " " + pt.y;
            }
            path.setAttribute("d", strPath + tmpPath);
        }
    };
    
    document.onmousedown=function(){
        path=null;
        var strokeWidth = 2;   
        var newID=createID("path") ;
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute("id", newID);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#000");
        path.setAttribute("stroke-width", strokeWidth);
        buffer = [];
        var pt = getMousePosition();
        appendToBuffer(pt);
        strPath = "M" + pt.x + " " + pt.y;
        path.setAttribute("d", strPath);
        _hnd['svgHandler'].appendChild(path);

        document.onmousemove=function(){            
            if (path) {
                appendToBuffer(getMousePosition());
                updateSvgPath();
            }
        }

        document.onmouseup=closeLine;
        function closeLine(){            
            document.onmousedown=null;
            document.onmousemove=null;
            document.onmouseup=null; 
            addClassForSelection("#"+newID, "cosito");

            var pathOK=reducePathSmooth( newID, 1.5, 0.15, false );
            path.setAttribute("d", pathOK);

            _evtMsg['selectorShapeSVG']=null;
            _selector['SELTOOL']='SELROJO';

            if (path) { path = null;  }
            strPath='';
            removeClassFromSelection("#divLeftMenu .features-item", "sel");
            addClassForSelection('#btnSelect', "sel");
            controlPointZ( "new", document.getElementById(newID) );
        }        

    }
}

function drawHandLineXXX(){
    document.onmousedown=function(){
        var last="M"+_evtMsg['mousePOS'].x+','+_evtMsg['mousePOS'].y;
        _evtMsg['selectorShapePoints']='';
        var newID=createID('path');
        _evtMsg['selectorShapeSVG']=createSVGElement('path', true, newID); 
        _evtMsg['selectorShapeSVG'].setAttributeNS( null, 'd', last );               
        _hnd['svgHandler'].appendChild(_evtMsg['selectorShapeSVG']);       
        removeClassFromSelection("#"+newID, "cosito");
        var firstPoint=[ _evtMsg['mousePOS'].x, _evtMsg['mousePOS'].y ];
        var closePoint=false;        

        document.onmousemove=function(){            
            last=_evtMsg['mousePOS'].x+','+_evtMsg['mousePOS'].y;          
            var d=_evtMsg['selectorShapeSVG'].getAttributeNS(null, 'd' );
            _evtMsg['selectorShapeSVG'].setAttribute('d', d+' '+last );
            if( closePoint==false ){
                var dIni=distance( firstPoint[0], firstPoint[1], _evtMsg['mousePOS'].x, _evtMsg['mousePOS'].y );
                if(dIni>10){
                    var closeCircle=bolita( firstPoint[0], firstPoint[1], 4, "red");
                    closeCircle.setAttribute("id", "closePoint");
                    closeCircle.onmousemove=function(){
                        last=firstPoint[0]+','+firstPoint[1];          
                        var d=_evtMsg['selectorShapeSVG'].getAttributeNS(null, 'd' );
                        _evtMsg['selectorShapeSVG'].setAttribute('d', d+' '+last );
                        closeLine();
                    };
                    closePoint=true;
                }
            } 
        }

        document.onmouseup=closeLine;
        function closeLine(){
            removeAllFromSelection("#closePoint");
            document.onmousedown=null;
            document.onmousemove=null;
            document.onmouseup=null;            
            
            var rc = simplifyPath (newID, 3 );
            var dc=rPoly2Path(rc);
            _evtMsg['selectorShapeSVG'].setAttribute('d', dc );

            addClassForSelection("#"+newID, "cosito");
            _evtMsg['selectorShapeSVG']=null;
            _selector['SELTOOL']='SELROJO';
        }
    }

}

function drawPolygon(evt, _mode){
    if( _selector['SELTOOL']!='DRAWPOLY' )return;
    if( _selector['SELTOOLM']!='path' )return;         
        
    if( _mode=='click' ){
        if( _evtMsg['selectorShapePointsTT']==0 ){
            _evtMsg['selectorShapePoints']='';
            var newID=createID('path');
            _evtMsg['selectorShapeSVG']=createSVGElement('path', true, newID);                
            _hnd['svgHandler'].appendChild(_evtMsg['selectorShapeSVG']);
            removeClassFromSelection("#"+newID, "cosito");
            
            removeID('closePoly');
            var bolaClose=createSVGElement('circle', false, 'closePoly');
            bolaClose.setAttribute('cx', _evtMsg['mousePOS'].x );
            bolaClose.setAttribute('cy', _evtMsg['mousePOS'].y );
            bolaClose.setAttribute('r', "0.75%" );
            bolaClose.setAttribute('style', "fill: red; stroke: black; stroke-width: 0.2px;" );
            _hnd['svgHandler'].appendChild(bolaClose);
            bolaClose.onclick=closePolyIni;
            
            Ayuda("Red Point Click: Close Polygon@@ESC, CTR, ALT Key: End Line");
        }
        _evtMsg['selectorShapePoints']+=_evtMsg['mousePOS'].x+','+_evtMsg['mousePOS'].y+' ';
        _evtMsg['selectorShapePointsTT']++;           
    }
    if( _mode=='move' && _evtMsg['selectorShapePointsTT']>0 ){             
        var ctrlDown = evt.ctrlKey||evt.metaKey;
        if( ctrlDown ){
            closeDrawPoly('');
            return;
        }
        var last='';
        last=_evtMsg['mousePOS'].x+','+_evtMsg['mousePOS'].y+'Z';          
        var d='M'+_evtMsg['selectorShapePoints']+last;
        _evtMsg['selectorShapeSVG'].setAttribute('d', d );
    }  
        function closePolyIni(){
            var b=document.getElementById("closePoly");
            var cx=b.getAttributeNS(null, 'cx');
            var cy=b.getAttributeNS(null, 'cy');
            _evtMsg['selectorShapePoints']+=cx+','+cy+' ';
            _evtMsg['selectorShapePointsTT']++;
            closeDrawPoly('');
            return;
        }                  
}

function closeDrawPoly(last){
    if(_evtMsg['selectorShapeSVG']==null || _evtMsg['selectorShapeSVG']=='' || _evtMsg['selectorShapeSVG']=='undefined' )return;
    if( checkID(_evtMsg['selectorShapeSVG'].id)==false )return;

    var d='M'+_evtMsg['selectorShapePoints']+last;
    if( _evtMsg['selectorShapeSVG'] !=null)_evtMsg['selectorShapeSVG'].setAttribute('d', d );
    if( _evtMsg['selectorShapeSVG'] !=null)_evtMsg['selectorShapeSVG'].setAttribute('class', 'cosito' );
    _selector['SELTOOL']='SELROJO';
    _selector['SELTOOLM']='';
    _evtMsg['selectorShapePointsTT']=0;
    document.getElementById("AYUDA").style.display="none";
    removeID('closePoly');
    controlPointZ("new", _evtMsg['selectorShapeSVG']);
    _evtMsg['selectorShapeSVG']=null;

    removeClassFromSelection("#divLeftMenu .features-item", "sel");
    addClassForSelection('#btnSelect', "sel");
}

function drawTabs(e){
    if( _selector['SELTOOL']!='DRAWTABS' )return;
    var idSelection=e.id;

    document.onmousemove = function(){
        var rta=isOverLine(_evtMsg['mousePOS'], e);
        if(rta==true){
            addClassForSelection("#"+idSelection, "overLine");
            document.body.style.cursor = 'crosshair';
            document.onclick = function(event){
                //check si click sobre TabNode
                var over=checkOverTabNode(idSelection);
                var ctrlDown = event.ctrlKey||event.metaKey;
                var btn= event.shiftKey || ctrlDown;
                if( btn==false ){
                    var idTab=createID("nodeTab");
                    var tab=createSVGElement("circle", false);
                    tab.setAttributeNS(null, 'cx', _evtMsg['mousePOS'].x);
                    tab.setAttributeNS(null, 'cy', _evtMsg['mousePOS'].y);
                    tab.setAttributeNS(null, 'r', 5);
                    tab.setAttribute("class", 'oneTab '+idSelection );
                    tab.setAttribute("id", idTab );
                    _hnd['svgHandler'].appendChild( tab );
    
                    var tabsGroup=null;
                    var isGroup=checkID('tabs-'+idSelection);
                    if( isGroup==false ){
                        tabsGroup= groupElementbySelection(".oneTab."+idSelection, 0, 'tabs-'+idSelection);
                    }else{
                        groupElementsAdd('tabs-'+idSelection, tab );
                    }
                }                
            }
        }else{
            removeClassFromSelection("#"+idSelection, "overLine");
            document.body.style.cursor = 'auto';
            document.onclick = null;
        }        
    }
}

function checkOverTabNode(id){
    var sel='.'+id;
    [...document.querySelectorAll( sel )].forEach((element, index, array) => {
        var bbox=transformedBoundingBox( element.id );
        if( _evtMsg['mousePOS'].x>bbox.x && _evtMsg['mousePOS'].x<bbox.x+bbox.width && _evtMsg['mousePOS'].y>bbox.y && _evtMsg['mousePOS'].y<bbox.y+bbox.height ){
           element.remove();
           return true;
        }
    });
    return false;
}


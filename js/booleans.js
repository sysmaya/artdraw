function selection2clipper(useSelItem){
    var rta='', clip1='';
    var ttSel=document.querySelectorAll(".cosito.selectable").length;
    //console.log("TTsek:"+ttSel);
    [...document.querySelectorAll(".cosito.selectable")].forEach((element, index, array) => {
        var selItem=e.getAttribute("selItem");
        if( (useSelItem==1 && selItem==1) || (useSelItem==99 && selItem==ttSel)   ){
            clip1=getClipperPath(element.id, 1);
        }else{
            rta+=getClipperPath(element.id, 1);
        }
        
    });
    rta = rta.replaceAll("][", ",");
    rta=JSON.parse(rta) ;
    console.log(clip1);
    console.log(rta);
    
}

function booleanMergePreview(){ 
    //se requieen 2 elementos. No 1, ni 3 ni 4...
    removeAllFromSelection(".preview");
    if( document.querySelectorAll(".cosito.selectable").length<2){        
        return;
    }
    var cliptype;
    var tipeMerge=document.querySelector("input[type='radio'][name=boolTP]:checked").value;
    if(tipeMerge=='INTERSECTION')       cliptype = ClipperLib.ClipType.ctIntersection;
    else if(tipeMerge=='UNION')         cliptype = ClipperLib.ClipType.ctUnion;
    else if(tipeMerge=='DIFFERENCE')    cliptype = ClipperLib.ClipType.ctDifference;
    else if(tipeMerge=='XOR')           cliptype = ClipperLib.ClipType.ctXor;
        
    var cpr=null, path1="";
    cpr = new ClipperLib.Clipper();
    cpr.Clear();
    var scale=100;   
    
    var rta="", cta=0;
    var ttSel=document.querySelectorAll(".selectable").length;
    [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {        
        cta++;
        var id=element.id;
        if(cta==1){
            path1=getClipperPath(id, 0);
            ClipperLib.JS.ScaleUpPaths(path1, scale);
            cpr.AddPaths(path1, ClipperLib.PolyType.ptSubject, true);
        }else{
            rta+=getClipperPath(id, 1);
        }     
    });
    rta = rta.replaceAll("][", ",");
    rta=JSON.parse(rta) ;    

    var cleandelta = 0.1; // 0.1 should be the appropriate delta in different cases
    ClipperLib.JS.ScaleUpPaths(rta, scale);
    rta = ClipperLib.Clipper.SimplifyPolygons(rta, ClipperLib.PolyFillType.pftNonZero);    
    rta = ClipperLib.JS.Clean(rta, cleandelta * scale);
    cpr.AddPaths(rta, ClipperLib.PolyType.ptClip, true);
 
    var solution_paths = new ClipperLib.Paths();

    var subjectFillType=1;
    var clipFillType=1;
    cpr.Execute( cliptype, solution_paths, subjectFillType, clipFillType);
    var rtaf=paths2string(solution_paths, scale) ;
    drawSolutionPreview(rtaf, "blue", 1, "url(#patternBool)");     

    e.setAttribute("stroke-linejoin", "round");
    e.setAttribute("stroke-linecap", "round");
}

function booleanOffsetPreview(){
    //esta es exclusiva para dibujar por el usuario. dibuja la vista previa del borde
    removeAllFromSelection(".preview");
    if( document.querySelectorAll(".cosito.selectable").length==0){        
        return;
    }
    var _typeOffset=document.querySelector("input[name='offsetPath']").checked;  
    var offset=document.getElementById("offsetPathDis").value;

    offset=Math.abs(offset)*100;
    if(_typeOffset==2)offset=offset*-1;  
    var rta='', scale=100;
    
    [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {        
        var id=element.id;
        rta+=getClipperPath(id, 1);
    });
    rta = rta.replaceAll("][", ",");
    rta=JSON.parse(rta) ;

    var cleandelta = 0.1; // 0.1 should be the appropriate delta in different cases
    ClipperLib.JS.ScaleUpPaths(rta, scale);
    rta = ClipperLib.Clipper.SimplifyPolygons(rta, ClipperLib.PolyFillType.pftNonZero);    
    rta = ClipperLib.JS.Clean(rta, cleandelta * scale);

    var co = new ClipperLib.ClipperOffset( 2, 0.25 );
    co.Clear();
    co.AddPaths( rta, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon); 

    var solution_paths = new ClipperLib.Paths();    
    co.Execute(solution_paths, offset); 
    
    var rtaf=paths2string(solution_paths, scale) ;
    drawSolutionPreview(rtaf, "blue", 1, "none");

    var e=document.querySelector(".preview");                 
    var doki=reducePathSmooth( e.id, 0.1, 0.01, false );
    e.dSet( doki );   

    e.setAttribute("stroke-linejoin", "round");
    e.setAttribute("stroke-linecap", "round");
}

function booleanOffset(offset, _typeOffset, _delete, _draw, _outMode, _eid){
    //esta es exclusiva para generar Paths de corte
    //console.log("Offset:"+offset+' TypeOffset:'+_typeOffset+' Delete:'+_delete+" draw:"+_draw+" OutMode:"+_outMode+" eid:"+_eid);
    offset=Math.abs(offset)*100;
    if(_typeOffset==2)offset=offset*-1;  
    var rta='', scale=100;
    
    if(_eid && _eid!='undefined'){
        rta+=getClipperPath(_eid, 1);
    }else{
        [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {        
            var id=element.id;
            rta+=getClipperPath(id, 1);
        });
    }

    rta = rta.replaceAll("][", ",");
    rta=JSON.parse(rta) ;

    var cleandelta = 0.1; // 0.1 should be the appropriate delta in different cases

    ClipperLib.JS.ScaleUpPaths(rta, scale);
    rta = ClipperLib.Clipper.SimplifyPolygons(rta, ClipperLib.PolyFillType.pftNonZero);    
    rta = ClipperLib.JS.Clean(rta, cleandelta * scale);

    var co = new ClipperLib.ClipperOffset( 2, 0.25 );
    co.Clear();
    co.AddPaths( rta, ClipperLib.JoinType.jtRound, ClipperLib.EndType.etClosedPolygon); 

    var solution_paths = new ClipperLib.Paths();    
    co.Execute(solution_paths, offset); 
    
    var rtaf=paths2string(solution_paths, scale) ;
    if(_draw==true) drawSolution(rtaf); 
    if(_delete==true ) removeAllFromSelection(".toRemove");
    if(_outMode==1)return rtaf;   
}

function booleanMerge(tipeMerge, el1, el2, outMode){ 
    //se requieen 2 elementos. No 1, ni 3 ni 4...
    //outMode 0=return elemento, crae nuevo elemento path *** outMode1=return path string no crea nada
    var cliptype;
    if(tipeMerge=='INTERSECTION')       cliptype = ClipperLib.ClipType.ctIntersection;
    else if(tipeMerge=='UNION')         cliptype = ClipperLib.ClipType.ctUnion;
    else if(tipeMerge=='DIFFERENCE')    cliptype = ClipperLib.ClipType.ctDifference;
    else if(tipeMerge=='XOR')           cliptype = ClipperLib.ClipType.ctXor;
        
    var cpr=null;
    cpr = new ClipperLib.Clipper();
    cpr.Clear();
    var scale=100, pass=1;        
    
    var id1=el1.getAttribute('id');
    var path1=getClipperPath(id1, 0);
    ClipperLib.JS.ScaleUpPaths(path1, scale);
    cpr.AddPaths(path1, ClipperLib.PolyType.ptSubject, true);

    var id2=el2.getAttribute('id');
    var path2=getClipperPath(id2, 0);
    ClipperLib.JS.ScaleUpPaths(path2, scale);
    cpr.AddPaths(path2, ClipperLib.PolyType.ptClip, true);
   
    console.log('merge.'+tipeMerge);   
    var solution_paths = new ClipperLib.Paths();
    //ClipperLib.PolyFillType.pftEvenOdd=0 ClipperLib.PolyFillType.pftNonZero=1
    //ClipperLib.PolyFillType.pftPositive=2 ClipperLib.PolyFillType.pftNegative=3
    var subjectFillType=1;
    var clipFillType=1;
    cpr.Execute( cliptype, solution_paths, subjectFillType, clipFillType);
    var rtaf=paths2string(solution_paths, scale) ;
    if(outMode==0){        
        drawSolution(rtaf); 
        return;
    }        
    return rtaf;         
}

function getClipperPath(id, _return){
    //_return==0 array  ==1 string;
    var points=null ; 
    flattenSimple( id );        
    var p2p=path2Poly( document.getElementById(id) );
    points=JSON.parse('['+JSON.stringify(p2p.pClipper)+']');

    //console.log( '['+JSON.stringify(p2p.pClipper)+']' );
    if (_return==0 || _return=='0' ) return points;    
    return '['+JSON.stringify(p2p.pClipper)+']';
}

function drawSolutionPreview(rtaf,strokeColor, strokeWidth, fillColor){
    const rpaths = rtaf.split("M");
    var i, tx='', p='', path=null;
    for( i=0; i<rpaths.length; i++ ){
        if( rpaths[i].length>3 ){
            p='M'+rpaths[i].toString();
            path=createSVGElement("path", false, createID() );
            path.setAttribute('d', p );
            path.setAttribute('class', 'preview' );
            path.setAttribute('stroke', strokeColor );            
            path.setAttribute('vector-effect', 'non-scaling-stroke' );
            path.setAttribute('stroke-width', strokeWidth );
            path.setAttribute('fill', fillColor ); 
            _hnd['svgHandler'].appendChild( path );          
        }
    }
}

function drawSolution(rtaf){
    const rpaths = rtaf.split("M");
    var i, tx='', p='', path=null;
    for( i=0; i<rpaths.length; i++ ){
        if( rpaths[i].length>3 ){
            p='M'+rpaths[i].toString();
            p='M'+rpaths[i].toString();
            path=createSVGElement("path", false, createID() );
            path.setAttribute('d', p );
            path.setAttribute('class', 'cosito selectable' );
            path.setAttribute('stroke', '#000000' );            
            path.setAttribute('vector-effect', 'non-scaling-stroke' );
            path.setAttribute('stroke-width', '1' );
            path.setAttribute('fill', colorA ); 
            path.setAttribute('fill-opacity', '0.25' ); 
            _hnd['svgHandler'].appendChild( path ); 
        }
    }
    //console.log(rtaf);
    //makeSelection(true);
    //return path;
}

function wavesDraw(){    
    removeAllFromSelection(".preview");
    var hwave=Number(document.getElementById("wavesHeight").value);
    var wwave=Number(document.getElementById("wavesWidth").value);
    var balance=Number(document.getElementById("wavesBalance").value);
    var levels=Number(document.getElementById("waveLevels").value);
    var waves=Number(document.getElementById("wavePeaks").value);
    var noise=Number(document.getElementById("waveNoise").value);
    var amplitude=Number(document.getElementById("waveAmplitude").value);
    var stack=Number(document.getElementById("waveStack").value);
    var border=Number(document.getElementById("wavesBorder").value);
    var center=centerScreen();
    var X=center[0]-(wwave/2);
    var Y=center[1]+(hwave/2);
    var mxY=9999999;
    var colorBack= document.getElementById("waveColorBack").value;
    var colorStar=parseColor( document.getElementById("waveColorStar").value, 'ARRAYD');
    var colorEnd=parseColor( document.getElementById("waveColorEnd").value, 'ARRAYD');

    for(var f=0; f<levels; f++){
        var idTMP=createID("path")
        var wave=createSVGElement("polygon", false, idTMP);

        var hwavef=(hwave/levels)*(f+1);
        var hY=Y-hwavef;
        var stackZ=Math.floor(Math.random() * hwavef ) ;
        stackZ=(stack*stackZ)/100;
        var modeStack=true;
        if( Math.floor(Math.random() * 1000000)>500000 )modeStack=false;

        if(modeStack==true){
            var stky=hY+stackZ;
            var points=X+","+Y+" "+X+","+stky+" ";
            mxY=stky;
        }else{
            var points=X+","+Y+" "+X+","+hY+" ";
            mxY=hY;
        }
        
        var disX=Number(wwave/(waves+1));
        var px=X, flag=false, sizew=(hwavef*amplitude)/100;
        for(var i=0; i<waves; i++){
            px+=disX;
            var sizewtmp=sizew;
            if(flag==false){
                flag=true;
            }else{
                flag=false;
                sizewtmp=sizewtmp*-1;
            }
            var py=hY+sizewtmp;
            var zx=Math.floor(Math.random() * (disX/2) ) ;
            var zy=Math.floor(Math.random() * (sizewtmp/2) ) ;
            zx=(noise*zx)/100;
            zy=(noise*zy)/100;

            if( Math.floor(Math.random() * 1000000)>500000 )zx=zx*-1;
            if( Math.floor(Math.random() * 1000000)>500000 )zy=zy*-1;
            var pxx=px+zx;
            var pyy=py+zy;
            //bolita(pxx, pyy, 3, "red");
            var perDisX=( (pxx-X)/wwave)*100;
            if(modeStack==true){
                perDisX=100-perDisX;
                pyy=pyy+  ((perDisX/100)*stackZ);
            }else{
                pyy=pyy+  ((perDisX/100)*stackZ);
            }
            if(pyy>=Y){
                pyy=Y-2;
            }
            if(pyy<mxY)mxY=pyy;
            points+=pxx+","+pyy+" ";
        }
        var xF=X+wwave;
        if(modeStack==true){
            points+=xF+","+hY+" "+xF+","+Y;
        }else{
            var stky=hY+stackZ;
            points+=xF+","+stky+" "+xF+","+Y;
        }       
        
        var per=normalize( pyy, 0, 1, Y-hwave, Y );  
        var colorm= interpolateColor(colorStar, colorEnd, per);
        //console.log("Per:"+per+" colorm:"+colorm);

        wave.setAttribute("points", points);
        wave.setAttribute("fill", "rgb("+colorm[0]+","+colorm[1]+","+colorm[2]+")" );
        wave.setAttribute("fill-opacity", "1");
        wave.setAttribute("stroke", "#000000");
        wave.setAttribute("stroke-opacity", "1");
        wave.setAttribute("stroke-width", border);
        wave.setAttribute("class", "grouped preview");
        _hnd['svgHandler'].appendChild( wave );
        flattenSimple(idTMP);
        wave=document.getElementById(idTMP);
        var segments = wave.getPathData({normalize: true});
        //console.log(segments);
        for(var n=1; n<segments.length-2; n++){
            var px=segments[n]['values'][4];
            var pxNext=segments[n+1]['values'][4];
            var pxAnt=segments[n-1]['values'][4];
            var py=segments[n]['values'][5];
            
            //bolita(px, py, 3, "red");
            if(n>1){
                var disN=px-pxAnt;
                segments[n]['values'][2]=px-(disN/2);
            }
            if(n<segments.length-3){
                var disN=pxNext-px;
                segments[n+1]['values'][0]=px+(disN/2);
            }
        }
        wave.setPathData(segments);
        wave.back();
        document.getElementById("areaWorker").back();
    }
    var heightWaves=Y-mxY;
    //var balanceH= (balance/100)*hwave;
    var backSquare=(heightWaves*100)/balance;

    var idTMPsq=createID("path");
    var square=createSVGElement("polygon", false, idTMPsq);
    var squareTop=Y-backSquare;
    var xF=X+wwave;
    var pointsq=X+","+Y+" "+X+","+squareTop+" "+xF+","+squareTop+" "+xF+","+Y  ;
    square.setAttribute("points", pointsq);
    var colorOK=parseColor(colorBack, "ARRAY");

    square.setAttribute("fill", "rgb("+colorOK[2]['red']+","+colorOK[2]['green']+","+colorOK[2]['blue']+")" );
    square.setAttribute("fill-opacity", "1");
    square.setAttribute("stroke", "#000000");
    square.setAttribute("stroke-width", border);
    square.setAttribute("stroke-opacity", "1");
    square.setAttribute("class", "grouped preview");
    _hnd['svgHandler'].appendChild( square );
    flattenSimple(idTMPsq);
    document.getElementById(idTMPsq).back();
    document.getElementById("areaWorker").back();    

    resizeSVGselection(".grouped.preview", wwave, hwave);
    moveSVGselection(".grouped.preview", X, Y-hwave);

    var idwaves=createID("waves");
    var gw=groupElementbySelection( ".grouped.preview", 0, idwaves );
    removeClassFromSelection(".grouped.preview", "preview");
    addClassForSelection("#"+idwaves, "preview");
    // (15/100) x 200
}

function createBackgroundWaves(){
    if( document.querySelectorAll('.preview').length==0 ){
        mensaje("No Backgrounds", "Select object for border Offset", "OK");
        return;
    }
      
    addClassForSelection('.preview', "cosito selectable");
    removeClassFromSelection(".preview", "preview");
    makeSelection(true); 
    removeClassFromSelection(".btnTool.sel", "sel");
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    sTool=''; 
    
    controlPointZ("new");
}

function loadScript(url, id, callback) {
    // thanks ChatGPT
    if (document.getElementById(id)) {
      console.log('El script ya se ha cargado anteriormente');
      return;
    }
  
    // crear un nuevo elemento script
    var script = document.createElement('script');
    script.src = url;
    script.id = id;
    document.body.appendChild(script);
    script.onload = callback;
  }
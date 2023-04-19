    ////////////// CONVERSION UTILS
function shape2path(idshape, _class){
    //solo x compatibilidad, todas las convesiones se hacen OK x flattenSimple. resolviendo transforms
    flattenSimple(idshape);
    var e=document.getElementById(idshape);
    e.classList=_class;
    return e;
}

function flattenSimple(_id){
    var e=document.getElementById(_id);
    if( e.setPathData ){
        var p =e.getPathData({normalize: true}); 
        e.setPathData( p );
    }    
    var newPath = flatten(e, true, false, false, 1);    //4 decimals
}  

function rPoly2Path(_r){
    var d='M';
    for(var i=0; i<_r.length; i++){
        d+=_r[i][0]+','+_r[i][1]+' ';
    }
    d=d.trim();
    return d;
}

function path2Poly(_e){
    var step;
    if( _workSetup['units']=='mm' ){
        step=0.85;
    }else{
        step=0.079375;
    }
    var segments = _e.getPathData({normalize: true});
    //console.log(segments);
    var rPoints=[], lastPoint=[], d='';

    for(var i=0; i<segments.length; i++){
        //setTimeout(() => { }, 10);
        if(i==0){
            rPoints.push( [ segments[0].values[0], segments[0].values[1] ] );
            lastPoint=[ segments[0].values[0], segments[0].values[1] ];
            d='M'+segments[0].values[0]+' '+segments[0].values[1]+', ';
        }else{
            var type=segments[i].type;
            if(type=='L'){
                rPoints.push( [ segments[i].values[0], segments[i].values[1] ] );
                lastPoint=[ segments[i].values[0], segments[i].values[1] ];
                d+=segments[i].values[0]+' '+segments[i].values[1]+', ';
            }
            if(type=='Z'){
                rPoints.push( [ segments[0].values[0], segments[0].values[1] ] );
                lastPoint=[ segments[0].values[0], segments[0].values[1] ];
                d+=segments[0].values[0]+' '+segments[0].values[1];
            }
            if(type=='C'){
                if( segments[i-1].values[4]==segments[i].values[0] && segments[i-1].values[5]==segments[i].values[1] &&
                    segments[i].values[2]==segments[i].values[4] && segments[i].values[3]==segments[i].values[5]  ){
                        rPoints.push( [ segments[i].values[4], segments[i].values[5] ] );
                        lastPoint=[ segments[i].values[4], segments[i].values[5] ];
                        d+=segments[i].values[4]+' '+segments[i].values[5]+', ';
                }else{
                    var pt='M'+lastPoint[0]+' '+lastPoint[1];
                    pt+='C'+segments[i].values[0]+' '+segments[i].values[1]+' '+segments[i].values[2]+' '+segments[i].values[3]+' '+segments[i].values[4]+' '+segments[i].values[5];
                    var p=createSVGElement('path', true, 'ps234' );
                    p.setAttributeNS(null, 'd', pt);
                    var lenp=p.getTotalLength();

                    for( var j=0; j<=lenp; j+=step){
                        var point = p.getPointAtLength(j);
                        var pz=[ point.x, point.y ];
                        rPoints.push( pz );
                        d+=pz[0]+' '+pz[1]+', ';
                    }
                    rPoints.push( [segments[i].values[4], segments[i].values[5]] );
                    d+=segments[i].values[4]+' '+segments[i].values[5]+', ';

                    lastPoint=[ segments[i].values[4], segments[i].values[5] ];
                }
                
            }
        }
    }
    d=d.replace(/, $/, '');

    //quitar puntos repetidos
    var rPointsTMP=[];
    rPointsTMP.push(rPoints[0]);
    var l=rPoints.length-1;
    for( i=1; i<l; i++ ){
        //setTimeout(() => { }, 10);
        if( rPoints[i][0]!=rPoints[i-1][0] || rPoints[i][1]!=rPoints[i-1][1] ){
            rPointsTMP.push(rPoints[i]);
        }
    }
    rPointsTMP.push(rPoints[rPoints.length-1]);
    rPoints=rPointsTMP;

    var d2, pClipper=[], pointsOK=[];
    pClipper.push( { "X":rPoints[0][0], "Y":rPoints[0][1]}  ) ;   

    pointsOK.push(rPoints[0]);
    d2='M'+rPoints[0][0]+' '+rPoints[0][1]+', ';
    for( i=1; i<rPoints.length-1; i++ ){
        //setTimeout(() => { }, 10);
        if( (rPoints[i-1][0] == rPoints[i][0] && rPoints[i][0] == rPoints[i+1][0]) ||
            (rPoints[i-1][1] == rPoints[i][1] && rPoints[i][1] == rPoints[i+1][1]) /*||
            pointOnLine(rPoints[i-1], rPoints[i+1], rPoints[i]) == true*/  ){

            }else{
            pointsOK.push( rPoints[i] );
            d2+=rPoints[i][0]+' '+rPoints[i][1]+', ';
            pClipper.push( { "X":rPoints[i][0], "Y":rPoints[i][1]}  ) ;  
        }     
    }
    pointsOK.push(rPoints[rPoints.length-1]);
    d2+=rPoints[rPoints.length-1][0]+' '+rPoints[rPoints.length-1][1];
    pClipper.push( { "X":rPoints[rPoints.length-1][0], "Y":rPoints[rPoints.length-1][1]}  ) ; 
    
    _output={
        pClipper:pClipper,
        pointsOK:pointsOK,
        rPoints:rPoints,
        pathOK:d2
    }
    /*console.log(pClipper);
    console.log(pointsOK);
    console.log(rPoints);
    console.log(d2);*/ 

    return _output;
}

function pointOnLine(pt1, pt2, pt3) {
    d1=distance( pt1[0], pt1[1], pt2[0], pt2[1] );
    d2=distance( pt1[0], pt1[1], pt3[0], pt3[1] );
    d3=distance( pt3[0], pt3[1], pt2[0], pt2[1] );
    var s = (d1 + d2 + d3)/2;
    var area =  Math.sqrt(s*((s-d1)*(s-d2)*(s-d3)));
    console.log('area:'+area);
    return area<0.001 ? true : false;
}

function __insertPointInPath(_path, _addPoint, _disClick){
    //disClick es la distancia donde esta el punto a insertar. se usa xra encontrar el nodo donde insertar el pto
    //console.log( "__insertPointInPath" );
    //console.log( _path );
    //console.log( _addPoint );
    //console.log( "disClick:"+ _disClick );
    var pdata=_path.getAttributeNS(null, "d"); //console.log(pdata);
    var segments = _path.getPathData({normalize: true});
    var npos=_path.getPathSegAtLength(_disClick);
    /*var pInicio=segments[npos];
    var controlPoints=null;
    if( npos== 1)controlPoints=[[segments[npos-1].values[0], segments[npos-1].values[1]], [pInicio.values[0],pInicio.values[1]], [pInicio.values[2],pInicio.values[3]], [pInicio.values[4],pInicio.values[5]]];
            else controlPoints=[[segments[npos-1].values[4], segments[npos-1].values[5]], [pInicio.values[0],pInicio.values[1]], [pInicio.values[2],pInicio.values[3]], [pInicio.values[4],pInicio.values[5]]];
    var target=[ _addPoint.x, _addPoint.y ];
    var b=findBestBezierTangent( target, controlPoints );
    console.log( "findBestBezierTangent: target:"+target+" controlPoints:" );
    console.log( controlPoints );
    console.log(b);
    var r = { type: "C", values: [ b[0][0], b[0][1] ,  b[3][0], b[3][1] ,  b[5][0], b[5][1] ] };
    segments.splice( npos, 0, r );
    segments[npos+1].values[0] = b[4][0]; 
    segments[npos+1].values[1] = b[4][1];
    segments[npos+1].values[2] = b[2][0]; 
    segments[npos+1].values[3] = b[2][1];*/

    var r = { type: "L", values: [ _addPoint.x, _addPoint.y ] };
    segments.splice( npos, 0, r );
    _path.setPathData( segments );  
}

function insertPointInPath(_path, _addPoint, _lenTab){
    var maxDistance=9999999999;
    //console.log(_path);
    var lenPath=_path.getTotalLength();
    var step=0, disClick=null;;
    if( _workSetup['units']=='mm' ){
        step=0.1;
    }else{
        step=0.01;
    }
    //console.log("units:"+_workSetup['units']+" step:"+step);
    for( var i=1; i<lenPath-1; i+=step ){
        p=_path.getPointAtLength(i);
        var d=distance(p.x, p.y, _addPoint[0], _addPoint[1]);
        if(d<maxDistance){
            maxDistance=d;
            //pointVerified=p;
            disClick=i;
        }
    }
    var point1=_path.getPointAtLength( disClick-_lenTab/2 );
    var point2=_path.getPointAtLength( disClick+_lenTab/2 );
    //bolita( point1.x, point1.y, 3, 'red');
    //bolita( point2.x, point2.y, 3, 'green');

    var distOK=distance(point1.x, point1.y, point2.x, point2.y );
    var per=(distOK/_lenTab)*100; 
    //if( per>70 && per<130 ){
        __insertPointInPath(_path, point1, disClick-_lenTab/2 ); 
        __insertPointInPath(_path, point2, disClick+_lenTab/2 );
        _tabPoints.push( { "point1":{"X":point1.x, "Y":point1.y},  "point2":{"X":point2.x, "Y":point2.y} } );

   // }  
}

function createTabsPath(_path){
    var tabPoints=[]; 
    var idGtabs=_path.getAttribute("idGtabs");
    var spath=idGtabs.replace( 'tabs-', '' );

    [...document.querySelectorAll(".oneTab."+spath)].forEach((element, index, array) => {
        var idNodeTab=element.id; 
        element.classList.remove("hide");
        var bbox=transformedBoundingBox(idNodeTab);
        var cx=bbox.x+(bbox.width/2);
        var cy=bbox.y+(bbox.height/2);
        tabPoints.push( [cx, cy] );
        element.classList.add("hide");
    });
    _tabPoints=[];      //llimpiar array para comenzar de cero

    for(var i=0; i<tabPoints.length; i++){
        insertPointInPath( _path, tabPoints[i], _pathConfig.tabsLength );
    }
}

function path2Gcode(_path, _grouPath){
    var id=_path.id;
    flattenSimple( id );
    _path=document.getElementById(id);
    var t='';
    t=_path.getAttributeNS( null, "transform");
    if(t && t!=='undefined' && t!=null){
        if( t.length>10 ){
            console.log(t);
        }
    }
        

    createShapes2Cut(_path, _grouPath);
    _path.setAttribute("work", JSON.stringify( _pathConfig ) );    
    
    setTimeout(() => { 
        document.getElementById('btnCutJobSave').style.display =''; 
        document.getElementById('btnCutJobCancel').style.display ='';
        document.getElementById('preloadCutJob').style.display ='none'; 
    }, 1500);
    return;    
}

function createShapes2Cut(_e, _grouPath){
    var idPathCutA, tag=_e.tagName, id=_e.id;
    var d=null,pAp=null, pathA=null;

    if(tag=="g"){
        var spath=id.replace( 'tabs-', '' );            
        pathA=document.getElementById(spath); 
        id=spath;      
    }else{
        pathA=_e;
    }

    if( _pathConfig['offsetDir'] !=3){
        d=booleanOffset(_pathConfig._toolSelect.toolPassDepth, _pathConfig.offsetDir, false, false, 1, id);
        drawCutPathA(d);
    }else{
        var r=path2Poly(pathA);
        drawCutPathA(r.pathOK);
    }
        function drawCutPathA(_d){        
            idPathCutA=createID("gPath");
            pathA=createSVGElement("path", false, idPathCutA);
            pathA.setAttributeNS(null, 'd', _d );          
            pathA.setAttributeNS(null, "marker-end", 'url(#pointCut)' );
            pathA.setAttribute("id", idPathCutA );
            pathA.setAttribute("class", 'gPath '+_grouPath ); 
            pathA.setAttribute("groupcut", _grouPath );
            _hnd['svgHandler'].appendChild( pathA );             
        }
    
    var useTabs=false;
    if( _pathConfig.useTabs==true  ){
        var totalTabs=document.querySelectorAll(".oneTab."+spath).length;
        if(totalTabs>0){
            pathA.setAttribute("idGtabs", _e.id );
            createTabsPath(pathA);            //inserta los tabs al pathRojo y crea array _tabPoints
            pathA.setAttribute("tabs", JSON.stringify( _tabPoints ) );
            useTabs=true;
            //console.log( pbp. )
        }        
    } 
    pathA.setAttribute("work", JSON.stringify( _pathConfig ) );
    
    var _path2Cut={
        pathA:pathA,        // e svg final. linea roja.
        pAp:pAp,            // 4 arrays. Clipper, pathOK, pointsOK, rPoints   devueltos x path2poly
        useTabs:useTabs
    }
    return _path2Cut;
}

function paths2string (paths, scale) {
    // Converts Paths to SVG path string and scales down the coordinates
    var svgpath = "", i, j;
    if (!scale) scale = 1;
    for(i = 0; i < paths.length; i++) {
        for(j = 0; j < paths[i].length; j++){
            if (!j) svgpath += "M";
            else svgpath += "L";
            svgpath += (paths[i][j].X / scale) + ", " + (paths[i][j].Y / scale);
        }
        svgpath += "Z";
    }
    if (svgpath=="") svgpath = "M0,0";
    return svgpath;
}


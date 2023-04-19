function closeEditNodes(){
    document.querySelectorAll(".editNode").forEach(el => el.remove());
    document.querySelectorAll(".editNodeSub").forEach(el => el.remove());
    document.querySelectorAll(".nodeLine").forEach(el => el.remove());
    [...document.getElementsByClassName('editableNodes')].forEach((element, index, array) => {
        element.onmousemove=null;
        element.ondblclick=null;
        element.onmouseleave=null;
    });
    [...document.getElementsByClassName('cosito')].forEach((element, index, array) => {
        element.classList.remove('editableNodes');
    });
    _evtMsg['isEditNodes']=false;
}

function activateEditNodes(){    
    //console.log("activateEditNodes");
    //console.log( _selector['SELTOOL']  );

    var id=document.querySelector(".cosito.selectable").id;   
    flattenSimple(id);

    var pathEditNodes = document.getElementById(id);
    var segments = pathEditNodes.getPathData({normalize: true});
    pathEditNodes.classList.add( 'editableNodes' );

    var updateP=false, lpth=segments.length;
    if( trunc(segments[ lpth-1 ]['values'][4],1)==trunc(segments[ lpth-2 ]['values'][4],1) && 
        trunc(segments[ lpth-1 ]['values'][5],1)==trunc(segments[ lpth-2 ]['values'][5],1) &&
        trunc(segments[ lpth-1 ]['values'][2],1)==trunc(segments[ lpth-1 ]['values'][4],1) && 
        trunc(segments[ lpth-1 ]['values'][3],1)==trunc(segments[ lpth-1 ]['values'][5],1) ){
        segments.pop();
        updateP=true;
    }
    
    if( segments.length>1 ){
        for( index=0; index<segments.length; index++ ){
            if(index>0){
                var p0=trunc(segments[index]['values'][0], 1);
                var p1=trunc(segments[index]['values'][1], 1);
                var p2=trunc(segments[index]['values'][2], 1);
                var p3=trunc(segments[index]['values'][3], 1);
                var p4=trunc(segments[index]['values'][4], 1);
                var p5=trunc(segments[index]['values'][5], 1);
                
                if( p2==p4 && p3==p5  ){
                    if(index==1){
                        var ant4=trunc(segments[index-1]['values'][0], 1);
                        var ant5=trunc(segments[index-1]['values'][1], 1);
                    }else{
                        var ant4=trunc(segments[index-1]['values'][4], 1);
                        var ant5=trunc(segments[index-1]['values'][5], 1);
                    }
                    
                    if( p0==ant4 && p1==ant5 ){
                        var pm=midpoint(ant4, ant5, p4, p5);
                        segments[index]['values'][2]=pm[0];
                        segments[index]['values'][3]=pm[1];
                        //bolita( pm[0], pm[1], 3, "red" ); //nodo trasero
                        updateP=true;
                    }                    
                }               
            }
        }
    }
    if( segments.length>1 ){
        for( index=0; index<segments.length; index++ ){
            if( index<segments.length-1 ){
                if( index==0 ){
                    var p4=trunc(segments[index]['values'][0], 1);
                    var p5=trunc(segments[index]['values'][1], 1);
                }else{
                    var p4=trunc(segments[index]['values'][4], 1);
                    var p5=trunc(segments[index]['values'][5], 1);
                }
                
                var q0=trunc(segments[index+1]['values'][0], 1);
                var q1=trunc(segments[index+1]['values'][1], 1);
                var q2=trunc(segments[index+1]['values'][2], 1);
                var q3=trunc(segments[index+1]['values'][3], 1);
                var q4=trunc(segments[index+1]['values'][4], 1);
                var q5=trunc(segments[index+1]['values'][5], 1);

                if( p4==q0 && p5==q1 && (q2==q4 || q3==q5) ){
                    var pm=midpoint(q4, q5, p4, p5);
                    segments[index+1]['values'][0]=pm[0];
                    segments[index+1]['values'][1]=pm[1];
                    //bolita( pm[0], pm[1], 3, "blue" );      //nodo delante
                    updateP=true;
                }else if( p4==q0 && p5==q1 && index<segments.length-2 ){
                    var r0=trunc(segments[index+2]['values'][0], 1);
                    var r1=trunc(segments[index+2]['values'][1], 1);
                    if(q4==r0 && q5==r1){
                        var pm=midpoint(q4, q5, p4, p5);
                        segments[index+1]['values'][0]=pm[0];
                        segments[index+1]['values'][1]=pm[1];
                        //bolita( pm[0], pm[1], 3, "blue" );      //nodo delante
                        updateP=true;
                        //console.log("extra");
                    }
                }
            }
        }
    }
    if(updateP==true){
        pathEditNodes.setPathData(segments);
    } 
        
    if( segments.length>1 ){
        for( index=0; index<segments.length; index++ ){                
            var p=segments[index];
            var pn=null;
            if(index<segments.length-1) pn=segments[index+1];
            var type=p.type;
            if(index==0){                     
                drawNode(  p.values[0],  p.values[1], type, 0, 0,  id, 'editNode', 1, null  );
            }else if(index==segments.length-1){                     
                drawNode( p.values[4], p.values[5], type, index, 4,  id, 'editNode', 1, null  );
            }else{                    
                if( p.values[4]!=null && p.values[5]!=null ){
                    drawNode( p.values[4], p.values[5], type, index, 4,  id, 'editNode', 1, null  );
                }
                
            } 
        }         
    }

    pathEditNodes.onmousemove = function(){
        const point = _hnd['svgHandler'].createSVGPoint();
        point.x = _evtMsg['mousePOS'].x;
        point.y = _evtMsg['mousePOS'].y;
          if( pathEditNodes.isPointInStroke(point) ){
            document.body.style.cursor = 'crosshair';
            pathEditNodes.ondblclick = function(){
                var lenPath=pathEditNodes.getTotalLength();
                var maxDistance=9999999999;
                var pset=null;
                pclick=_evtMsg['mousePOS'];
                var segments = pathEditNodes.getPathData({normalize: true});

                var disClick=null;
                for( var i=1; i<lenPath-1; i++){
                    p=pathEditNodes.getPointAtLength(i);
                    var d=distance(p.x, p.y, pclick.x, pclick.y);
                    if(d<maxDistance){
                        maxDistance=d;
                        pset=p;
                        disClick=i;
                    }
                }
                if( pset!==null ){
                    var npos=pathEditNodes.getPathSegAtLength(disClick);                    
                    var pInicio=segments[npos];
                    var controlPoints=null;
                    if( npos== 1)controlPoints=[[segments[npos-1].values[0],segments[npos-1].values[1]],[pInicio.values[0],pInicio.values[1]],[pInicio.values[2],pInicio.values[3]],[pInicio.values[4],pInicio.values[5]]];
                            else controlPoints=[[segments[npos-1].values[4],segments[npos-1].values[5]],[pInicio.values[0],pInicio.values[1]],[pInicio.values[2],pInicio.values[3]],[pInicio.values[4],pInicio.values[5]]];
                    var target=[ pset.x, pset.y ];
                    var b=findBestBezierTangent( target, controlPoints );
                    //console.log( controlPoints );
                    //console.log( 'FirstSeg:'+npos+' besTangent:'+ b    );
                    var r = { type: "C", values: [ b[0][0], b[0][1] ,  b[3][0], b[3][1] ,  b[5][0], b[5][1] ] };
                    segments.splice( npos, 0, r );
                    segments[npos+1].values[0] = b[4][0]; 
                    segments[npos+1].values[1] = b[4][1];
                    segments[npos+1].values[2] = b[2][0]; 
                    segments[npos+1].values[3] = b[2][1];
                    pathEditNodes.setPathData( segments );                    
                    closeEditNodes();
                    activateEditNodes();
                }                
                //console.log('dblckick lentPath:'+lenPath+' minD:'+maxDistance+' disClick:'+disClick+' npos:'+npos  );
                //console.log(pset);
            };
        }else{
            document.body.style.cursor = 'auto';
            pathEditNodes.ondblclick=null;
        }
    };
    pathEditNodes.onmouseleave = function(){
        document.body.style.cursor = 'auto';
    };

    _evtMsg['isEditNodes']=true;
}

function findBestBezierTangent( target, points ){
    console.log('target');  console.log(target);
    console.log('points');  console.log(points);
    var bestr=null, bestd=99999999999;
    for( var i=0; i<=1; i+=0.01 ){
      rta=__tangentBezier( i, target, points);
      if( rta[6]<bestd ){
        bestr=rta;
        bestd=rta[6];
      }
    }  
    function __tangentBezier(t, _target, _points){
      let helperPoints = [];
      for(let i = 1; i < 4; i++){
        let p = lerp(_points[i-1],_points[i],t); 
        helperPoints.push(p);
      }
      helperPoints.push(lerp(helperPoints[0],helperPoints[1],t));//3
      helperPoints.push(lerp(helperPoints[1],helperPoints[2],t));//4
      helperPoints.push(lerp(helperPoints[3],helperPoints[4],t));//5
   
      function lerp(A,B,t){
        let ry = [
          ((B[0] - A[0])  * t) + A[0],//x
          ((B[1] - A[1])  * t) + A[1] //y
          ]
          return ry;
      }  
      const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
      var d=distance( helperPoints[5][0], helperPoints[5][1], _target[0], _target[1] );
      helperPoints.push(d);
      return helperPoints;
    }
    
    //bolita( bestr[0][0], bestr[0][1], 3, '#00e3ff' );
    //bolita( bestr[1][0], bestr[1][1], 3, '#3286c9' );     // este punto no se usa
    //bolita( bestr[2][0], bestr[2][1], 3, '#3286c9' );
    //bolita( bestr[3][0], bestr[3][1], 1, 'red' );
    //bolita( bestr[4][0], bestr[4][1], 1, 'orange' );
    //bolita( bestr[5][0], bestr[5][1], 3, 'fuchsia' );
    //console.log('BEST:'+bestd);
    //console.log(bestr);
    return bestr;
}

function __drawNode(x, y, type, index, subE, idPath, classN, isRoot, owner ){
    var idTMP=createID('editNode');        
    var circle=createSVGElement('circle');
    circle.setAttributeNS(null, 'cx', x);        
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'r', '1%');  //0.5ch
    circle.setAttribute("type", type );        
    circle.setAttribute("index", index );
    circle.setAttribute("subE", subE );
    circle.setAttribute("idPath", idPath );
    circle.setAttribute("class", classN );
    circle.setAttribute("isRoot", isRoot );
    if(owner && owner!==null)circle.setAttribute("owner", owner );
    circle.setAttribute("id", idTMP );
    _hnd['svgHandler'].appendChild( circle );
    _evtMsg['lastID']=idTMP;
    return circle;
}

function __drawLine(x1, y1, x2, y2, owner, sOwner ){
    var idTMP=createID('lineNode');    
    var linea=createSVGElement('line');
        linea.setAttributeNS(null, 'x1', x1);           linea.setAttributeNS(null, 'y1', y1);
        linea.setAttributeNS(null, 'x2', x2);           linea.setAttributeNS(null, 'y2', y2);
        linea.setAttributeNS(null, 'style', 'stroke:#707070;stroke-width:0.5px;vector-effect:non-scaling-stroke;pointer-events:none;' );
        linea.setAttribute("class", 'nodeLine' );
        linea.setAttribute("owner", owner );
        linea.setAttribute("sOwner", sOwner );
        linea.setAttribute("id", idTMP );
        _hnd['svgHandler'].appendChild( linea );
        return linea;
}

function drawNode(x, y, type, index, subE, idPath, classN, isRoot, owner ){    
    var circle=__drawNode(x, y, type, index, subE, idPath, classN, isRoot, owner);
    var idNode=circle.id;

    //click(circle);
    function click(){
        //console.log('click:'+idNode+' isRoot:'+isRoot+' selNodeIndex:'+_evtMsg['selNodeIndex'] );
        if(_evtMsg['selNodeIndex']!==idNode && isRoot==1 ){
            [...document.getElementsByClassName('editNodeSub')].forEach((element, index, array) => {
                element.remove();
            });
            [...document.querySelectorAll('line.nodeLine')].forEach((element, index, array) => {
                element.remove();
            });

            //console.log('DISTINTO:'+isRoot);
            _evtMsg['selNodeIndex']=idNode;

            var path = document.getElementById(idPath);
            var segments = path.getPathData({normalize: true});
            var segment=segments[index];
            
            [...document.getElementsByClassName('editNode')].forEach((element, index, array) => {
                element.classList.remove('sel');
            });
            circle.classList.add("sel");   

            var n1=null, n2=null, sbx=null, sby=null;
            if(index==0){
                x=segment.values[0];    y=segment.values[1];
                sbx=segments[index+1].values[0];    sby=segments[index+1].values[1];
                n1=drawNode(sbx, sby, segment.type, 1, 0, idPath, 'editNodeSub', 0, idNode );
                __drawLine( x, y, sbx, sby, idNode, _evtMsg['lastID'] );                
            }else if(index==segments.length-1){
                sbx=segment.values[2];    sby=segment.values[3];
                n1=drawNode(sbx, sby, segment.type, index, 2, idPath, 'editNodeSub', 0, idNode );
                __drawLine( x, y, sbx, sby, idNode, _evtMsg['lastID'] ); 
                //console.log(segment);
                //console.log(segments[index+1]);           
            }else{
                sbx=segment.values[2];    sby=segment.values[3];
                n1=drawNode(sbx, sby, segment.type, index, 2, idPath, 'editNodeSub', 0, idNode );
                __drawLine( x, y, sbx, sby, idNode, _evtMsg['lastID'] );
                sbx=segments[index+1].values[0];    sby=segments[index+1].values[1];
                n2=drawNode(sbx, sby, segment.type, index+1, 0, idPath, 'editNodeSub', 0, idNode );
                __drawLine( x, y, sbx, sby, idNode, _evtMsg['lastID'] );
            }
                        
        }
    }

    drag(circle);  
    function drag(e){
        e.onmousedown = dragMouseDown;
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;                        
        }
        function closeDragElement(){
            document.onmouseup = null;
            document.onmousemove = null;
            click();
        }
        function elementDrag(){
            _evtMsg['isDrawSelector']=false;
            var path = document.getElementById(idPath);
            circle.setAttributeNS(null, 'cx', _evtMsg['mousePOS'].x);
            circle.setAttributeNS(null, 'cy', _evtMsg['mousePOS'].y);             
            //recalcular el path
            console.log("drag Node Bezier");
            var pathData = path.getPathData({normalize: true}); 
            pathData[index].values[subE]=  _evtMsg['mousePOS'].x;   x=_evtMsg['mousePOS'].x;
            pathData[index].values[subE+1]=_evtMsg['mousePOS'].y;   y=_evtMsg['mousePOS'].y;
            path.setPathData(pathData);
            //dibujar lineas
            if( isRoot==1 ){
                var els=document.querySelectorAll("line[owner='"+circle.id+"']" );
                [...els].forEach((element, index, array) => {
                    element.setAttributeNS(null, 'x1', _evtMsg['mousePOS'].x);
                    element.setAttributeNS(null, 'y1', _evtMsg['mousePOS'].y); 
                });
            }else{
                var els=document.querySelectorAll("line[sOwner='"+circle.id+"']" );
                [...els].forEach((element, index, array) => {
                    element.setAttributeNS(null, 'x2', _evtMsg['mousePOS'].x);
                    element.setAttributeNS(null, 'y2', _evtMsg['mousePOS'].y); 
                });
            }
        }        
    }            
}

// reduce Path Points - return points array funciona 3/4 ...
function simplifyPath (_id, tolerance, highestQuality) {
    var r=path2Poly( document.getElementById(_id) );
    var points=r["pointsOK"];
    //console.log(points);

    if (points.length <= 2) return points;
    var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;
    points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
    points = simplifyDouglasPeucker(points, sqTolerance);

    function getSqDist (p1, p2) {
        var dx = p2[0] - p1[0];
        var dy = p2[1] - p1[1];  
        return dx * dx + dy * dy;
    }

    function getSqSegDist (p, p1, p2) {  
        var x = p1[0];
        var y = p1[1];
        var dx = p2[0] - x;
        var dy = p2[1] - y;
    
        if (dx !== 0 || dy !== 0) {  
        var t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);  
        if (t > 1) {
            x = p2[0];
            y = p2[1];
        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
        }  
        dx = p[0] - x;
        dy = p[1] - y;  
        return dx * dx + dy * dy;
    }

    function simplifyRadialDist (points, sqTolerance) {  
        var prevPoint = points[0];
        var newPoints = [prevPoint];
        var point;
    
        for (var i = 1, len = points.length; i < len; i++) {
            point = points[i];  
            if (getSqDist(point, prevPoint) > sqTolerance) {
                newPoints.push(point);
                prevPoint = point;
            }
        }
    
        if (prevPoint !== point) newPoints.push(point);  
        return newPoints;
    }
    
    function simplifyDPStep (points, first, last, sqTolerance, simplified) {
        var maxSqDist = sqTolerance;
        var index;
    
        for (var i = first + 1; i < last; i++) {
            var sqDist = getSqSegDist(points[i], points[first], points[last]);        
            if (sqDist > maxSqDist) {
                index = i;
                maxSqDist = sqDist;
            }
        }
    
        if (maxSqDist > sqTolerance) {
            if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
            simplified.push(points[index]);
            if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
        }
    }

    function simplifyDouglasPeucker (points, sqTolerance) {
        var last = points.length - 1;
    
        var simplified = [points[0]];
        simplifyDPStep(points, 0, last, sqTolerance, simplified);
        simplified.push(points[last]);
    
        return simplified;
    }
    return points;
}

function reducePathSmooth(_id, tolerance, _smoothing, drawTMP){
    var points = simplifyPath( _id, tolerance, true );
    
    var lineProperties = (pointA, pointB) => {
        var lengthX = pointB[0] - pointA[0]
        var lengthY = pointB[1] - pointA[1]
        return {
            length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
            angle: Math.atan2(lengthY, lengthX)
        }
    }

    var controlPointCalc = (current, previous, next, reverse) => {
        var c = current;
        var p = previous ? previous : c;
        var n = next ? next : c;
        //const smoothing = 0.05;
        var smoothing = _smoothing !== undefined ? _smoothing : 0.1;
        var o = lineProperties(p, n);
        var rev = reverse ? Math.PI : 0;

        var x = c[0] + Math.cos(o.angle + rev) * o.length * smoothing;
        var y = c[1] + Math.sin(o.angle + rev) * o.length * smoothing;

        return [x, y];
    }

    var svgPathRender = points => {      
        var d = points.reduce((acc, e, i, a) => {
            if (i > 0) {
                var cs = controlPointCalc(a[i - 1], a[i - 2], e);
                var ce = controlPointCalc(e, a[i - 1], a[i + 1], true);
                return `${acc} C ${cs[0]},${cs[1]} ${ce[0]},${ce[1]} ${e[0]},${e[1]}`
            } else {
                return `${acc} M ${e[0]},${e[1]}`
            }
        },'')

        //return `<path d="${d}" fill="none" stroke="black" />`
        return d;
    }
    var ptmp=svgPathRender(points);

    if(drawTMP==true){
        var newID=createID("path");
        var epath=createSVGElement("path", true, newID);
        addClassForSelection("#"+newID, "pathTMP");
        epath.setAttributeNS( null, "d", ptmp );
        _hnd['svgHandler'].appendChild( epath );
    }
    return ptmp;
}

function paperReduceNodes(id, tolerance, draw){   //tolerance default 2.5
    paper.install(window);
    let newCanvas = document.createElement('canvas');
    paper.setup( newCanvas );

    var e=document.getElementById(id);                   
    //console.log("paperReduceNodes Anodes:"+countNodes("#"+e.id) );
    var base=new Path( e.dGet() );
    base.simplify(tolerance);
    //e.dSet(base.pathData);
    var nid=createID();
    if(draw) SVGdraw("path", {"id":nid, "d":base.pathData, "class":"preview", "stroke":"blue", "stroke-width":1, "fill":"none" } );
    //console.log("Bnodes:"+countNodes("#"+nid) );

    return base.pathData;
}

function countNodes(_query){
    var ttotal=0;
    function getAllDescendants(node) {
        var all = [];
        getDescendants(node);
    
        function getDescendants(node) {
            for (var i = 0; i < node.childNodes.length; i++) {
                var child = node.childNodes[i];
                var tag=node.tagName;
                getDescendants(child);
                all.push(child);
            }
        }
        return all;
    }

    function ttNodes(id){
        var e = document.getElementById(id);
        var segments = e.getPathData({normalize: true});
        return segments.length;
    }
    
    Array.prototype.forEach.call(document.querySelectorAll( _query ), function(node) {
        var id=node.id;
        var tag=node.tagName;
        
        if(tag!="g"){
            if(tag=="path")ttotal+=ttNodes(id);
            //console.log(tag+" -- "+id);
        }else{
            var ch=getAllDescendants(node);
            ch.forEach(function(item){
                var xid=item.id;
                var xtag=item.tagName;
                if(xtag=="path")ttotal+=ttNodes(xid);
                //console.log("** "+xtag+" -- "+xid);
            });
            //console.log(ch);
        }        
    });
    //console.log("Total Nodes:"+ttotal);
    return ttotal;
}

function reducePath(_id, _draw){
    var c=isShapeCombined(_id);
    var dok='', path=document.getElementById(_id).dGet();
    if( c==false){
        dok=inflexionPoints(path, 0.5, 6 );
    }else{
        var paths = path.split(/(?=[Mm])/);
        for( var i=0; i<paths.length; i++ ){
            dok+=inflexionPoints(paths[i], 0.5, 6 );
        }
    }
    if(_draw==true){
        document.getElementById(_id).dSet(dok);
    }else{
        return dok;
    }
    
}
function inflexionPoints(_d, step, div){
    var id=createID();
    var e=SVGdraw("path", {"id":id, "d":_d, "fill":"none", "stroke-width":1} );
    //var e=document.getElementById(id);
    //var d=e.dGet();
    const length = e.getTotalLength();

    //var step=5;
    var pip=step*0.5;
    let firstPoint = e.getPointAtLength(0);
    let points = [firstPoint];
    var uPoints=[];
    var ulen=0, dir=0, d="M"+firstPoint.x+" "+firstPoint.y ;    

    for( var i=0; i<length; i+=step ){
        var point = e.getPointAtLength(i);
        addFixArray(point);
        var udir=getDir();

        if( udir!=dir ){
            var l=points.length-1;
            var p1 = {x:points[l]['x'], y: points[l]['y']};

            points.push(point);
            dir=udir;            
            //bolita( point.x, point.y, 3, "red" );
            var B=e.getPointAtLength( (i+ulen)/2 );
            //bolita( B.x, B.y, 3, "green" );

            var B  = {x: B.x, y: B.y}, p3 = {x:point.x, y: point.y };
            var d1=distance(p1.x, p1.y, p3.x, p3.y)/div;
            var zz=Bezier.cubicFromPoints(p1, B, p3, 0.5, d1 );
            zz=zz.points;

            d+=" C"+zz[1].x+" "+zz[1].y+" "+zz[2].x+" "+zz[2].y+" "+zz[3].x+" "+zz[3].y;
            //document.getElementById(idp).dSet(d);

            ulen=i;
        }
    }
    var l=points.length-1;
    var p1 = {x:points[l]['x'], y: points[l]['y']};
    var B=e.getPointAtLength( (length+ulen)/2 );
    var point = e.getPointAtLength(length);
    var B  = {x: B.x, y: B.y}, p3 = {x:point.x, y: point.y };
    var d1=distance(p1.x, p1.y, p3.x, p3.y)/div;
    var zz=Bezier.cubicFromPoints(p1, B, p3, 0.5, d1 );
    zz=zz.points;
    d+=" C"+zz[1].x+" "+zz[1].y+" "+zz[2].x+" "+zz[2].y+" "+zz[3].x+" "+zz[3].y;
    
    removeID(id);
    return d;
    /*if(_draw==false){        
        return d;
    }else{
        var idp=createID();
        return SVGdraw( "path", { "id":idp, "d":d, "stroke":"blue", "stroke-width":1, "class":"cosito", "fill":"red", "fill-opacity":0.5 } );
    }*/

    function addFixArray(p){
        uPoints.push(p);
        if (uPoints.length > 3) {
            uPoints.shift();
          }
    }

    function getDir(){
        if (uPoints.length < 3)return 0;
              if( uPoints[0]['y']<uPoints[1]['y'] && uPoints[1]['y']<uPoints[2]['y'] && uPoints[2]['y']-uPoints[0]['y']>pip ){           // 12     1
                      if( uPoints[0]['x']>uPoints[1]['x'] && uPoints[1]['x']>uPoints[2]['x'] && uPoints[0]['x']-uPoints[2]['x']>pip ){   // 1.5    2
                        return 2;
                }else if( uPoints[0]['x']<uPoints[1]['x'] && uPoints[1]['x']<uPoints[2]['x'] && uPoints[2]['x']-uPoints[0]['x']>pip ){   // 10.5   8
                        return 8;
                }
                return 1;
        }else if( uPoints[0]['y']>uPoints[1]['y'] && uPoints[1]['y']>uPoints[2]['y'] && uPoints[0]['y']-uPoints[2]['y']>pip ){           // 6      5 
                      if( uPoints[0]['x']>uPoints[1]['x'] && uPoints[1]['x']>uPoints[2]['x'] && uPoints[0]['x']-uPoints[2]['x']>pip ){   // 4.5    4
                        return 4;
                }else if( uPoints[0]['x']<uPoints[1]['x'] && uPoints[1]['x']<uPoints[2]['x'] && uPoints[2]['x']-uPoints[0]['x']>pip ){   // 7.5    6
                        return 6;
                }
                return 5;
        }else if( uPoints[0]['x']>uPoints[1]['x'] && uPoints[1]['x']>uPoints[2]['x'] && uPoints[0]['x']-uPoints[2]['x']>pip ){           // 3      3 
                      if( uPoints[0]['y']<uPoints[1]['y'] && uPoints[1]['y']<uPoints[2]['y'] && uPoints[2]['y']-uPoints[0]['y']>pip ){   // 1.5    2
                        return 2;
                }else if( uPoints[0]['y']>uPoints[1]['y'] && uPoints[1]['y']>uPoints[2]['y'] && uPoints[0]['y']-uPoints[2]['y']>pip ){   // 4.5    4
                        return 4;
                }
                return 3;
        }else if( uPoints[0]['x']<uPoints[1]['x'] && uPoints[1]['x']<uPoints[2]['x'] && uPoints[2]['x']-uPoints[0]['x']>pip ){           // 9      7 
                      if( uPoints[0]['y']<uPoints[1]['y'] && uPoints[1]['y']<uPoints[2]['y'] && uPoints[2]['y']-uPoints[0]['y']>pip ){   // 10.5   8
                        return 8;
                }else if( uPoints[0]['y']>uPoints[1]['y'] && uPoints[1]['y']>uPoints[2]['y'] && uPoints[0]['y']-uPoints[2]['y']>pip ){   // 7.5    6
                        return 6;
                }
                return 7;
        }
        return 0;
    }
}




function loadFileonLoad(){
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    var file=params["file"];
    var magic=params["magic"];

    if(magic){
        magicTask();
    }
    if(file=='undefined' || file==null)return;
    //console.log( file );
    if( file ){
      //console.log("SI tiene file");
      document.getElementById("urlFileImport").value=file;
      importFromURL();
    }
}

function importFromLocalDisk(){
    var input = document.getElementById("pathFileImport");
    var filename=input.files[0].name;
    var ext = filename.split('.').pop();
    ext =  ext.toLowerCase();
    if( ext!="svg" && ext!="jpg" && ext!="jpeg" && ext!="png" && ext!="gif"  && ext!="bmp"  && ext!="webp" ){
        Dialog("Image Error", "The selected file is not an image.<br>Supported formats: <b>SVG</b> JPG, JPEG, PNG, GIF, BMP, WEBP", "OKI" );
        return false;
    }
    if(ext=="svg"){
        var txt=readInputFile(input, showImportFileSVG, 0);        
    }else{
        importImages(input);
        closeModal('frmOpenDocument');
    }
}

function readInputFile(input, callback, indexf){
    if(indexf==null || indexf=='undefined')indexf=0;
    var reader = new FileReader();
    reader.onload = function(){
        fnCall(callback, reader.result);
    };
    reader.readAsText(input.files[indexf]);
}

function showImportFileSVG(txt){
    var info=cleanSVGtxt(txt);
    renderSVGtxt(info);
    closeModal('frmOpenDocument');
}

function showImportFileIMG(txt, w, h){
    var Nsize=scaleImage( w, h, _workSetup['width']*0.95, _workSetup['height']*0.95 );

    var newID=createID("image");
    var posX=(_workSetup['width']-Nsize['width'])/2; 
    var posY=(_workSetup['height']-Nsize['height'])/2;           
    var strImg="<image id='"+newID+"' class='cosito' width='"+Nsize['width']+"' height='"+Nsize['height']+"' x='"+posX+"' y='"+posY+"' xlink:href='"+txt+"' ></image>";
    _hnd['svgHandler'].insertAdjacentHTML( "beforeend", strImg );
}

function importFromURL(callback){
    var url=document.getElementById("urlFileImport").value;
    var isBase64=false, start=url.substring(0,11);
    if(start=="data:image/")isBase64=true;

    document.getElementById("btnImportUrl").hide(); 
    document.getElementById("btnImportUrlPreload").show(); 

    var img = new Image();
    img.onload = function() { 
        if(isBase64==true){
            showImportFileIMG(url, img.width, img.height);
            closeModal('frmOpenDocument');
        }else{
            fetch( "https://artdraw.org/cnc/loadFile.php?f="+url )
            .then(response => response.text())
            .then(data =>{
                start=data.substring(0,15);
                if(data=="0"){
                    errorLoadImage();
                    return; 
                }else if(start=="data:image/jpg;"){
                    showImportFileIMG(data, img.width, img.height);
                    closeModal('frmOpenDocument');
                }else{
                    showImportFileSVG(data);
                }
                if( callback!='undefinded' && callback!=null){
                    //fnCall(callback);
                    eval(callback);
                }
            });
        }    
        document.getElementById("btnImportUrl").show(); 
        document.getElementById("btnImportUrlPreload").hide();      
    };
    img.onerror = function() { 
        errorLoadImage();       
        document.getElementById("btnImportUrl").show(); 
        document.getElementById("btnImportUrlPreload").hide();  
    };
    img.src=url;
    
    function errorLoadImage(){
        Dialog("URL Error", "Could not import from URL<br>For best results, first download the image to your computer and then import it.", "OKI");
        closeModal('frmOpenDocument');
    }    
} 

async function MCKbtnSaveFileClick(event){
    var a = document.getElementById("lkDownFile");
    var file = svg2Blob("text");
    //a.href = URL.createObjectURL(file);          
    //a.download = name;
    //a.setAttribute("download","CNCvector.svg");

    if( window.showSaveFilePicker ) {
        const opts = {
            types: [{
              description: 'SVGimage',
              accept: {'image/svg+xml': ['.svg']},
            }],
            suggestedName: 'ArtDrawImage',
          };
        var handle = await showSaveFilePicker(opts);
        var writable = await handle.createWritable();
        await writable.write( file );
        writable.close();
    }else{
        var filename = prompt("Define your file name.");
        saveFile(filename+".svg", URL.createObjectURL(file) );    
        function saveFile(fileName, urlFile){
            let a = document.createElement("a");
            a.style = "display: none";
            document.body.appendChild(a);
            a.href = urlFile;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(urlFile);
            a.remove();
        } 
    }
     
};  

function OpenImageNewTab(){
    //var a = document.getElementById("lkDownFile");
    var file = svg2Blob("image/svg+xml");

    var link=URL.createObjectURL(file);
    var w=window.open( link, "_blank");
    w.print();
}

function svg2Blob(type){
    var e=document.getElementById("svgWorkerArea");
    var copy=e.cloneNode(false);
    copy.setAttributeNS(null, "viewBox", "0 0 "+_workSetup['width']+" "+_workSetup['height'] );
    copy.style.background='white';
    [...document.querySelectorAll(".cosito, .gPath, #svgWorkerArea defs")].forEach((element, index, array) => {
        if( element.id!="defsdoc" && element.id!="patternBool" ){
            flattenSimple(element.id);  
        }                 
    });
    [...document.querySelectorAll(".cosito, .gPath, #svgWorkerArea defs")].forEach((element, index, array) => {
        //var str+=element.outerHTML;
        var c=element.cloneNode(true);
        //c.setAttribute("fill", "none");
        copy.appendChild( c );            
    });

    var file = new Blob([copy.outerHTML], {type: type});
    return file;
}

function svg2Text(_background, _w, _h ){
    var e=document.getElementById("svgWorkerArea");
    var copy=e.cloneNode(false);
    var width = _w || _workSetup['width'];
    var height = _h || _workSetup['height'];
    copy.setAttributeNS(null, "viewBox", "0 0 "+width+" "+height );
    copy.removeAttribute("worksetup");
    copy.style.background=_background;
    [...document.querySelectorAll(".cosito, .gPath, #svgWorkerArea defs")].forEach((element, index, array) => {
        var c=element.cloneNode(true);
        copy.appendChild( c );            
    });

    return copy.outerHTML;
}

function svgSelection2Text(_background){
    var e=document.getElementById("svgWorkerArea");
    var copy=e.cloneNode(false);
    var bboxg=getBBoxFromSelection(".selectable");
    var px=(bboxg.x).toFixed(2);
    var py=(bboxg.y).toFixed(2);

    moveSVGselection(".selectable",0,0);
    copy.setAttributeNS(null, "viewBox", "0 0 "+bboxg.width+" "+bboxg.height );
    copy.removeAttribute("worksetup");
    copy.style.background=_background;
    [...document.querySelectorAll(".cosito.selectable, #svgWorkerArea defs")].forEach((element, index, array) => {
        var c=element.cloneNode(true);
        copy.appendChild( c );            
    });
    moveSVGselection(".selectable",px,py);
    return copy.outerHTML;
}
  
function importImages(input){
    var reader = new FileReader();
    reader.onload = function(e) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function(){
            var w=img.width;
            var h=img.height;

            var Nsize=scaleImage( w, h, _workSetup['width']*0.95, _workSetup['height']*0.95 );

            canvas.width=Nsize['width'];
            canvas.height=Nsize['height'];
            ctx.drawImage(img, 0, 0, Nsize['width'], Nsize['height']);

            var newID=createID("image");
            var posX=(_workSetup['width']-Nsize['width'])/2; 
            var posY=(_workSetup['height']-Nsize['height'])/2;           
            var strImg="<image id='"+newID+"' class='cosito' width='"+Nsize['width']+"' height='"+Nsize['height']+"' x='"+posX+"' y='"+posY+"' xlink:href='"+canvas.toDataURL()+"' ></image>";
            _hnd['svgHandler'].insertAdjacentHTML( "beforeend", strImg );
        }
        img.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
}

function scaleImage(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);        
    return { width: srcWidth*ratio, height: srcHeight*ratio };
}

function showTabs(event){
    removeClassFromSelection("#importShapesList .tablinks", "active");
    event.target.toggleClass("active");
    var folder=event.target.getAttribute("folder");
    document.getElementById("shpFrames").innerHTML  = "<center><img src='https://artdraw.org/svg/images/preload2.gif'></center>";
    var formData = new FormData();
    formData.append('folder', folder);
    fetch('https://artdraw.org/images/shp/load.php', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("shpFrames").innerHTML = data;
    });
    /*$.ajax({
        type: 'POST',
        url: "https://artdraw.org/images/shp/load.php",
        data: 'folder='+folder,
        success: function(data) {
            document.getElementById("shpFrames").innerHTML = data;
        }
    });*/
}  
 
function MCKselectShape(event){
    var e = event.target;
    removeClassFromSelection('.oneTHshp', 'active');
    e.classList.add('active');
}  

function MCKbtnImport1ShapeClick(event){
    var text=document.querySelectorAll(".oneTHshp.active svg")[0].outerHTML;
    var rta=cleanSVGtxt(text);
    renderSVGtxt(rta);
    closeModal('frmImportShapes');
}

function cleanSVGtxtV2(text){    
    //console.log(text);
    text=text.replace(/<g>\s*<\/g>/gs, "");
    var temp = document.createElement('div');
    temp.insertAdjacentHTML( 'beforeend', text );

    var svgTOimport=temp.querySelectorAll("svg")[0];
    var fillColorSVG=svgTOimport.getAttribute("fill");
    var strokeColorSVG=svgTOimport.getAttribute("stroke");
    var strokeWidthSVG=svgTOimport.getAttribute("stroke-width");

    var svgTXTok='', defsTXTok='', style='', defs=[], els=[];
    [...temp.childNodes].forEach(elm =>{
       if(elm.nodeType!=1 && elm.tagName!="text"){
            elm.parentNode.removeChild(elm);
       }
    });
}

function cleanSVGtxt(text){    
    //console.log(text);
    text=text.replace(/<g>\s*<\/g>/gs, "");
    var temp = document.createElement('div');
    temp.insertAdjacentHTML( 'beforeend', text );

    var svgTOimport=temp.querySelectorAll("svg")[0];
    var fillColorSVG=svgTOimport.getAttribute("fill");
    var strokeColorSVG=svgTOimport.getAttribute("stroke");
    var strokeWidthSVG=svgTOimport.getAttribute("stroke-width");

    var svgTXTok='', defsTXTok='', style='', defs=[], els=[];
    [...temp.childNodes].forEach(elm =>{
       if(elm.nodeType!=1 && elm.tagName!="text"){
            elm.parentNode.removeChild(elm);
       }
    });
    //console.log(temp);//return; 
    [...temp.querySelectorAll("*")].forEach((element, index, array) => {
        var tag=element.tagName;        
        var id=element.id;        
        var tagRoot=element.parentNode.tagName;
        var etmp=element;
        var display=element.getAttribute("display");
        var newID=createID(tag+'Imp');
        //if(tag=='g') console.log(etmp);

        if(tag=="path"){
            var p =element.getPathData({normalize: true}); 
            element.setPathData( p );
        }
        
        if(tagRoot!="defs" && (id==null || id=='') )etmp.id=newID;
        if(tag=="style"){
            style=element.innerHTML;
        }

        if( tagRoot=="svg" && display!="none" ){            
            [...etmp.childNodes].forEach(elm =>{ 
                if(elm.nodeType!=1 && tag!="text"){
                    elm.parentNode.removeChild(elm);
                }
            });
                      
            if(tag=="g"){
                //cleanG(etmp);
                els.push(etmp);
            }else if(tag=='defs'){
                for (var i = 0; i < etmp.childNodes.length; i++) {
                    var idd=etmp.childNodes[i].id;
                    var tdf=etmp.childNodes[i].tagName;
                    if( tdf!='style'){
                        defs.push( etmp.childNodes[i] );
                    }                    
                }
            }else if(tag=='script'){
                //none
            }else if(tag=='metadata'){
                //none
            }else{
                els.push(etmp);
            }
        }
    });    
    //apply styles to tag
    if(style!='' && style!=null && style!='undefined'){
        if(style.length>8){
            var styles='', styleR=parseCSStxt(style);            

            els.forEach(element => {
                if( element.outerHTML!='undefined' && element.outerHTML!=null ){
                    var t=element.id;
                    styles='';
                    styles+=getCSSrValue(styleR, "#"+t );
                    element.classList.forEach(function(value) {
                        styles+=getCSSrValue(styleR, "."+value );
                    }); 
                    element.setAttribute("style", styles);
                }        
            });
        }
    }
    //clean tags
    els.forEach( function(element, index) {
        var display=element.getAttribute("display");
        var xsx=element.getAttribute("fill-opacity");
        //console.log("IMP: "+element.tagName+" id:"+element.id+" display:"+display);

        if( isGraphSVGe(element)==false || display=="none" )  {
            els.splice(index, 1);
        }           
        
    });
    //default colors
    els.forEach( function(element, index) {
        if( fillColorSVG!=null ){
            var fillElement=element.getAttribute("fill");
            if( fillElement==null){
                element.setAttribute("fill", fillColorSVG);
            }
        }
        if( strokeColorSVG!=null ){
            var strokeElement=element.getAttribute("stroke");
            if( strokeElement==null){
                element.setAttribute("stroke", strokeColorSVG);
            }
        }
        if( strokeWidthSVG!=null ){
            var strokewElement=element.getAttribute("stroke");
            if( strokewElement==null){
                element.setAttribute("stroke-width", strokeWidthSVG);
            }
        }
        var fillElementF=element.getAttribute("fill");
        if( fillElementF==null ){
            var xf=element.getAttribute("style");
            if(xf!=null){
                if(xf.includes("fill:"))fillElementF=xf;
            }            
        }
        if(fillElementF==null && element.tagName!='g'){
            //element.setAttribute("fill", "rgb(145, 145, 145)");
            //element.setAttribute("fill-opacity", "0.25");
        }           
    });
 
    defs.forEach(element => {
        if( element.outerHTML!='undefined' && element.outerHTML!=null ){            
            defsTXTok+=element.outerHTML;
        }        
    });
    els.forEach(element => {
        if( element.outerHTML!='undefined' && element.outerHTML!=null ){
            var t=element.tagName;
            var r=element.parentNode.tagName;
            element.classList="grouped importsvg";
            svgTXTok+=element.outerHTML;
        }        
    });
    
    

    function cleanG(e ){
        //console.log(e);
        var newID, etmp=e; 
        [...etmp.childNodes].forEach(elm => elm.nodeType != 1 && elm.parentNode.removeChild(elm));
        var childs = etmp.children.length;
        var tag=etmp.tagName;
        var id=etmp.id;

        var filter=etmp.getAttribute("filter");
        var clip=etmp.getAttribute("clip-path");
        if(filter!=null || clip!=null){
            if(id==null){ etmp.id=createID(tag+'Imp'); }            
            els.push(etmp);
            return;
        }

        var transform=etmp.getAttribute("transform");
        if( transform!=null && tag=="g" ){
            rt=passTransform(etmp, transform);
            if(rt==true)transform=null;
        }
        if(transform!=null){
            if(id==null){ etmp.id=createID(tag+'Imp'); }
            els.push(etmp);
            return;
        }

        if( childs==0 ){
            if(tag=="g")return;
            if(id==null){ etmp.id=createID(tag+'Imp'); }
            els.push(etmp);
        }else if( childs==1 ){            
            var tagChild=etmp.firstChild.tagName;  
            if( tagChild!="g" ){
                if(id==null){ etmp.id=createID(tag+'Imp'); }
                els.push(etmp.firstChild);
                return;
            } else{                
                cleanG(etmp.firstChild);
            }        
        }else {
            for (var i = 0; i < e.childNodes.length; i++) {
                cleanG( e.childNodes[i] );
            }            
        }
    } 
    
    function passTransform(element, transform){
        var cta=0;
        for (var i = 0; i < element.childNodes.length; i++) {
            var trf=element.childNodes[i].getAttribute("transform");
            if(trf!=null)cta++;
        } 
        if(cta==0){
            for (var i = 0; i < element.childNodes.length; i++) {
                element.childNodes[i].setAttribute("transform", transform);
            }
            element.removeAttribute("transform");
            return true;
        }
        return false;
    }

    var out={defs:defs, els:els, defsTXTok:defsTXTok, svgTXTok:svgTXTok };
    return out;
}

function renderSVGtxt(text, perWidth){
    _hnd['svgHandler'].insertAdjacentHTML("beforeend", text['svgTXTok']);
    var idtmp=createID("fileImp");
    var groupImp=groupElements2("importsvg", 0, idtmp);
    groupImp.classList="cosito";

    /*var bb=transformedBoundingBox(idtmp);
    var widthPer = perWidth || 0.98;
    var Nsize=scaleImage( bb.width, bb.height, _workSetup['width']*widthPer, _workSetup['height']*widthPer );
    var posX=(_workSetup['width']-Nsize['width'])/2; 
    var posY=(_workSetup['height']-Nsize['height'])/2; */    

    removeClassFromSelection(".importsvg.grouped", "importsvg");
    for (var i = 0; i < text['defs'].length; i++) {
        var idef=text['defs'][i].id;
        if( checkIDwhere(idef, _hnd['svgHandler'])==false ){
            DEFS.insertAdjacentHTML( "beforeend", text['defs'][i].outerHTML );
        }
    } 

    /*var elsel=document.getElementById(idtmp);
    elsel.scale(Nsize['width'], Nsize['height']);
    elsel.moveTo(posX, posY);*/
}

function getCSSrValue(rCSS, selector){
    var st='';
    for (var i = 0; i < rCSS.length; i++){
        var k=rCSS[i]['s'];
        k.forEach(ss => {
            if(ss==selector){
                for( var zx=0; zx<rCSS[i]['sv'].length; zx++ ){
                    var vr=rCSS[i]['sv'][zx]; 
                    st+=vr +'; ';
                }                
            }
        });
    }
    st=st.replace(/,/g, ":");
    return st;
}

function parseCSStxt(cssXTX){
    var p2=[], p1=cssXTX.split("}");
    p1.forEach(element => {
        var rtmp=element.split("{") ;
        if( rtmp.length>1 && Array.isArray(rtmp) ){
            var s=rtmp[0].split(",");
            var v=rtmp[1].split(";");
            const notNil = (i) => !(typeof i === 'undefined' || i === null || i=='');
            s = s.filter(notNil);
            v = v.filter(notNil);
            var sv=[];
            v.forEach(kv => {
                var rkv=kv.split(':');
                sv.push(rkv);
            });
            for( var i=0; i<s.length; i++ ){
                var us=s[i];
                us=us.trim();
                us=us.replace('\s\t', '');
                us=us.replace('\t', '');
                us=us.trim();
                s[i]=us;
            }
            p2.push( {s,sv} );
        }        
    });
    p1=null;
    return p2;
}

function drawImageTrace(_traced){
    _hnd['svgHandler'].insertAdjacentHTML("beforeend", _traced);
    document.getElementById("frameTrace").src='';

    var idtmp=createID("traced");
    var gt=groupElements2("traced", 0, idtmp);

    //addClassForSelection(".cosito.traced", "grouped");
    removeClassFromSelection( ".cosito.traced", "cosito" );
    addClassForSelection( ".traced", "grouped" );
    removeClassFromSelection( ".traced.grouped", "traced" );
    addClassForSelection( "#"+idtmp, "cosito" );

    var bb=transformedBoundingBox(idtmp);
    var Nsize=scaleImage( bb.width, bb.height, _workSetup['width']*0.75, _workSetup['height']*0.75 );
    var posX=(_workSetup['width']-Nsize['width'])/2; 
    var posY=(_workSetup['height']-Nsize['height'])/2; 
    gt.scale(Nsize['width'], Nsize['height']);
    gt.moveTo(posX, posY);

    closeModal("frmTraceDialog");
}

function publishWebOpen(event){
    
}

function clearStage(){
    removeAllFromSelection(".cosito");
    var d=document.getElementById("defsdoc");
    d.innerHTML ='';
    var fgroup='<pattern id="patternBool" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">';
    fgroup+='<circle cx="5" cy="5" r="4" style="stroke: none;fill: #ff000070;"></circle></pattern>';
    DEFS.insertAdjacentHTML( "beforeend", fgroup );
}

function masterUpload(){
    var fs=document.getElementById("multiplesvg").files;
    var ttfiles=fs.length;
    //console.log("ttfiles:"+ttfiles);
    var info=document.getElementById("masupInfo");
    var album=document.getElementById("masupAlbum").value;
    var tagen=document.getElementById("masupTagen").value;
    var tages=document.getElementById("masupTages").value;
    
    for(var i=0; i<ttfiles; i++){
        var file=fs[i];
        var ext = file.name.split(".").pop();
        ext=ext.toLowerCase();    
        //console.log(file.name+" *** "+ext);

        if(ext=="svg"){
            var txt=readSyncBinaryString(file);
            //console.log( txt );
            var info=cleanSVGtxt(txt);

            /*var viewBox = (/viewBox="([^"]+)"/.exec(txt)||'')[1] ;
            if(viewBox!='undefined'){
                viewBox=viewBox.trim();
                var vw=viewBox.split(" ");
                vw[2]=Number(vw[2]);  vw[3]=Number(vw[3]);
                _workSetup['width']=vw[2];
                _workSetup['height']=vw[3];
                console.log( vw ) ;
            }else{
                _workSetup['width']=400;
                _workSetup['height']=400;
            }*/
            _workSetup['width']=400;
            _workSetup['height']=400;
            setupJobSize(true);

            renderSVGtxt(info, 0.95);
            var svgtxt = svg2Text('white');

            var formData = new FormData();
            formData.append('title', file.name);
            formData.append('album', album);
            formData.append('tagen', tagen);
            formData.append('tages', tages);
            formData.append('svg', svgtxt);

            const request = new XMLHttpRequest();
            request.open("POST", "https://artdraw.org/querys/svg/uploadMaster.php", true);
            request.onreadystatechange = () => {
                if (request.readyState === 4 && request.status === 200) {
                    console.log(request.responseText);
                    info.innerText=i+" / "+ttfiles;
                }
            };
            request.send(formData);
            clearStage();
            
        }
        closeModal("frmMasterUpload");
    }   
    
    function readSyncBinaryString(file){
        var url=URL.createObjectURL(file);//Create Object URL
        var xhr=new XMLHttpRequest();
        xhr.open("GET",url,false);//Synchronous XMLHttpRequest on Object URL
        xhr.overrideMimeType("text/plain; charset=x-user-defined");//Override MIME Type to prevent UTF-8 related errors
        xhr.send();
        URL.revokeObjectURL(url);
        var returnText="";
        for (var i=0;i<xhr.responseText.length;i++){
        returnText+=String.fromCharCode(xhr.responseText.charCodeAt(i)&0xff);};//remove higher byte
        return returnText;
    }

}

function publishWeb(silent){
    var f=svg2Text('white');
    var name=document.getElementById("exportFileName").value;
    var description=document.getElementById("exportFileDesc").value;
    var album=document.getElementById("exportAlbum").value;
    var tagen=document.getElementById("exportTags").value;
    var uid=document.getElementById("exportUID").value;

    if( name.length<8 ){
        Dialog( "IMAGE NAME", "Must have at least 8 letters", "OKI" );
        closeModal("frmPublisWeb");
        return;
    }
    if( description.length<16 ){
        /*Dialog( "IMAGE DESCRIPTION", "Must have at least 16 letters", "OKI" );
        closeModal("frmPublisWeb");
        return;*/
    }
    if( album.length<3 ){
        //Dialog( "ALBUM NAME", "Must have at least 5 letters", "OKI" );
        //closeModal("frmPublisWeb");
        album="ArtDraw SVG Vectors";
        //return;
    }
    document.getElementById("exportPreload").style="display:block";

    const xhr = new XMLHttpRequest();  
    xhr.addEventListener("load", transferComplete);
    xhr.addEventListener("error", transferFailed);
    xhr.open("POST", 'https://artdraw.org/querys/svg/publishWeb.php', true); 
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.send(
        JSON.stringify({
            name : name,
            description : description,
            album : album,
            tagen : tagen,
            uid : uid,
            mail : Cookies.get('SVGuserMail'),
            hash : Cookies.get('SVGuserHash'),
            file : f
        })
    );

    function transferComplete(event){
        if( silent==true )return;
        //console.log(xhr.responseText);
        var response = JSON.parse(xhr.responseText);        
        try { var rta = JSON.parse( JSON.stringify(response) );  }
        catch(err) {
            closeModal("frmPublisWeb");
            console.log(err);
            Dialog( "ERROR", "Error posting image.<br>Try again", "OKI" );
            document.getElementById("exportPreload").style="display:none";
            return;
        }
        Dialog( rta.STATUS, rta.MSG, "OKI" );

        if(rta.STATUS=="OK"){
            closeModal("frmPublisWeb");
            document.getElementById("exportPreload").style="display:none";
            document.getElementById("exportUID").value=rta.ID;
            window.open(rta.URL, '_blank');
        }

        closeModal("frmPublisWeb");
        document.getElementById("exportPreload").style="display:none";
    }
    function transferFailed(event){
        console.log(event);        
    }
}

function svg2png(idsvg){
    //Only One element
    flattenSimple(idsvg);
    var svg=document.getElementById(idsvg);
   
    var canvas = document.createElement('canvas');    
    var bb=transformedBoundingBox(svg.id);
    canvas.width = bb.width;
    canvas.height = bb.height;

    var clone = svg.cloneNode(true);
    clone.id = "cloneTMP";
    clone.removeAttribute("class");
    if(clone.tagName=="text"){
        clone.removeAttribute("transform");
        clone.setAttribute("x", 0 );
        clone.setAttribute("y", (bb.height*0.85)  );
    }else if(clone.tagName=="path"){
        clone.setAttribute("transform", "matrix(1 0 0 1 "+(bb.x*-1)+" "+(bb.y*-1)+")");
    }
    _hnd['svgHandler'].appendChild(clone);

    
    var data = new XMLSerializer().serializeToString(clone);
    data="<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='"+bb.width+"' height='"+bb.height+"' viewbox='0 0 "+bb.width+" "+bb.height+"'>"+data+"</svg>";
    var blob = new Blob([data], { type: 'image/svg+xml' });
       
    let reader = new FileReader();
    reader.readAsDataURL(blob); 

    reader.onload = function() {
        var img = new Image();
        img.onload = function () {
            canvas.getContext('2d').drawImage(img, 0, 0);
            
            var newID=createID("image");            
            var strImg="<image id='"+newID+"' class='cosito' width='"+bb.width+"' height='"+bb.height+"' x='0' y='0' xlink:href='"+canvas.toDataURL()+"' ></image>";
            _hnd['svgHandler'].insertAdjacentHTML( "beforeend", strImg );
            console.log("img load");
        };
        img.src = reader.result;
        console.log(reader.result); 
    };

    clone.remove();
}

function SVG2PNG (svgText, margin,fill, _width, _height) {
    // convert an svg text (ALL Document) to png using the browser
    return new Promise(function(resolve, reject) {
      try {
        // can use the domUrl function from the browser
        var domUrl = window.URL || window.webkitURL || window;
        if (!domUrl) {
          throw new Error("(browser doesnt support this)")
        }
        
        // figure out the height and width from svg text        
        var width = _width || Number(_workSetup['width']);
        var height = _height || Number(_workSetup['height']);
        width=Number(width);
        height=Number(height);
        margin = margin || 0;

        // create a canvas element to pass through
        var canvas = document.createElement("canvas");
        canvas.width = width+margin*2;
        canvas.height = height+margin*2;
        var ctx = canvas.getContext("2d");
        
        
        // make a blob from the svg
        var svg = new Blob([svgText], {
          type: "image/svg+xml;charset=utf-8"
        });
        
        // create a dom object for that image
        var url = domUrl.createObjectURL(svg);
        
        // create a new image to hold it the converted type
        var img = new Image;
        
        // when the image is loaded we can get it as base64 url
        img.onload = function() {
          // draw it to the canvas
          ctx.drawImage(this, margin, margin);
          
          // if it needs some styling, we need a new canvas
          if (fill) {
            var styled = document.createElement("canvas");
            styled.width = canvas.width;
            styled.height = canvas.height;
            var styledCtx = styled.getContext("2d");
            styledCtx.save();
            styledCtx.fillStyle = fill;   
            //styledCtx.fillRect(-100,-100,canvas.width+100,canvas.height+100);
            //styledCtx.strokeRect(-100,-100,canvas.width+100,canvas.height+100);
            styledCtx.restore();
            styledCtx.drawImage (canvas, 0-margin,0-margin);
            canvas = styled;
          }
          // we don't need the original any more
          domUrl.revokeObjectURL(url);
          // now we can resolve the promise, passing the base64 url
          resolve(canvas.toDataURL());
        };
        
        // load the image
        img.src = url;
        
      } catch (err) {
        reject('failed to convert svg to png ' + err);
      }
    });
}

function MCKbtnExportPNG(){   
    var ratiow=Number(_workSetup['height'])/Number(_workSetup['width']);
    var ratioh=Number(_workSetup['width'])/Number(_workSetup['height']);
    document.getElementById("exportALLw").value=_workSetup['width'];
    document.getElementById("exportALLh").value=_workSetup['height'];
    document.getElementById("exportALLw").setAttribute("ratio", ratiow);
    document.getElementById("exportALLh").setAttribute("ratio", ratioh);

    var bboxg=getBBoxFromSelection(".selectable");
    if(bboxg.x==null || bboxg.y==null || bboxg.width==null || bboxg.height==null ){
        var wsel=0;  
        var hsel=0;
        ratiow=0;
        ratioh=0;
        document.getElementById("exportONLYw").disabled = true;
        document.getElementById("exportONLYh").disabled = true;
        document.getElementById("exportONLYratio").disabled = true;
        document.getElementById("exportONLYpng").disabled = true;
    }else{
        var wsel=Math.ceil( (bboxg.width).toFixed(2) );  
        var hsel=Math.ceil( (bboxg.height).toFixed(2) );
        ratiow=hsel/wsel;
        ratioh=wsel/hsel;
        document.getElementById("exportONLYw").disabled = false;
        document.getElementById("exportONLYh").disabled = false;
        document.getElementById("exportONLYratio").disabled = false;
        document.getElementById("exportONLYpng").disabled = false;
    }
    
    document.getElementById("exportONLYw").value=wsel;
    document.getElementById("exportONLYh").value=hsel;
    document.getElementById("exportONLYw").setAttribute("ratio", ratiow);
    document.getElementById("exportONLYh").setAttribute("ratio", ratioh);

    showModal("frmExportPNG");
}

function updateExportSize(event){
    var vr=0, n=event.target.id;
    var ratioALL=document.getElementById("exportALLratio");
    var ratioONLY=document.getElementById("exportONLYratio");
    var exportALLw=document.getElementById("exportALLw").value;       
    var exportALLh=document.getElementById("exportALLh").value;
    var exportONLYw=document.getElementById("exportONLYw").value;
    var exportONLYh=document.getElementById("exportONLYh").value;

    var exportALLwR=document.getElementById("exportALLw").getAttribute("ratio");       
    var exportALLhR=document.getElementById("exportALLh").getAttribute("ratio");
    var exportONLYwR=document.getElementById("exportONLYw").getAttribute("ratio");
    var exportONLYhR=document.getElementById("exportONLYh").getAttribute("ratio");

    if(n=="exportALLw"){        
        if(ratioALL.checked==true){
            vr=Math.ceil(exportALLwR*exportALLw); 
            document.getElementById("exportALLh").value=vr;
        }
    }
    if(n=="exportALLh"){        
        if(ratioALL.checked==true){
            vr=Math.ceil(exportALLhR*exportALLh); 
            document.getElementById("exportALLw").value=vr;
        }
    }

    if(n=="exportONLYw"){        
        if(ratioONLY.checked==true){
            vr=Math.ceil(exportONLYwR*exportONLYw); 
            document.getElementById("exportONLYh").value=vr;
        }
    }
    if(n=="exportONLYh"){        
        if(ratioONLY.checked==true){
            vr=Math.ceil(exportONLYhR*exportONLYh); 
            document.getElementById("exportONLYw").value=vr;
        }
    }

    if(n=="ratioALL"){        
        if(ratioALL.checked==true){
            vr=Math.ceil(exportALLwR*exportALLw); 
            document.getElementById("exportALLh").value=vr;
        }
    }
    if(n=="ratioALL"){        
        if(ratioONLY.checked==true){
            vr=Math.ceil(exportONLYwR*exportONLYw); 
            document.getElementById("exportONLYh").value=vr;
        }
    }

    
}

async function MCKbtnExportPNG2(event){   
    var mode=event.target.getAttribute("mode");
    visibilityForSelection("#exportPreload", "") ;
    visibilityForSelection("#exportALLpng", "none") ;
    visibilityForSelection("#exportONLYpng", "none") ;
    var exportTransparent = document.getElementById("exportTransparent");
    var exportMargin = Number(document.getElementById("exportMargin").value);
    if(exportMargin==null)exportMargin=0;

    var backGround="rgba(0,0,0,0)";
    var backsvg="none";
    if(exportTransparent.checked==false){
        backGround="rgba(255,255,255,1)";
        backsvg="rgb(255,255,255)";
    }

    if(mode=="ALL"){
        var w=document.getElementById("exportALLw").value;
        var h=document.getElementById("exportALLh").value;
        var t=svg2Text( backsvg );
    }else{
        var w=document.getElementById("exportONLYw").value;
        var h=document.getElementById("exportONLYh").value;
        var t=svgSelection2Text( backsvg );
    }
    
    var promise=SVG2PNG (t, exportMargin, backGround, w, h ).then (function(data) {
        var file = makeblob(data);        
        savePNGimg(file);
        visibilityForSelection("#exportALLpng", "") ;
        visibilityForSelection("#exportONLYpng", "") ;
        visibilityForSelection("#exportPreload", "none") ;
        closeModal("frmExportPNG");
    })
    .catch (function (err) {
      console.log("promise error");
    });

    async function savePNGimg(file){
        if( window.showSaveFilePicker ) {
            const opts = {
                types: [{
                  description: 'SVGimage',
                  accept: {'image/png': ['.png']},
                }],
                suggestedName: 'ArtDrawImage',
              };
            var handle = await showSaveFilePicker(opts);
            var writable = await handle.createWritable();
            await writable.write( file );
            writable.close();
        }else{
            var filename = prompt("Define your file name.");
            saveFile(filename+".svg", URL.createObjectURL(file) );    
            function saveFile(fileName, urlFile){
                let a = document.createElement("a");
                a.style = "display: none";
                document.body.appendChild(a);
                a.href = urlFile;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(urlFile);
                a.remove();
            } 
        }
    }
    
}

function makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}
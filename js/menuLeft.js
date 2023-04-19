
function MCKbtnSelectClick(event){
    restoreKeys();
    _selector['SELTOOL']='SELROJO';
    makeSelection();
    removeClassFromSelection("#divLeftMenu .features-item", "sel");
    addClassForSelection("#btnSelect", "sel"); 
}

function MCKbtnHandLineClick(event){
    if(_selector['SELTOOL']=='DRAWHANDLINE' && _selector['SELTOOLM']=='handLine'){
        removeClassFromSelection("#"+event.target.id, "sel");
        _evtMsg['selectorShapeSVG']=null;
        _selector['SELTOOL']='SELROJO';
        document.onmousedown=null;
        return;
    }
    
    _selector['SELTOOL']='DRAWHANDLINE';
    _selector['SELTOOLM']='handLine';
    removeClassFromSelection("#divLeftMenu .features-item", "sel");
    addClassForSelection('#'+event.target.id, "sel");  
    drawHandLine();
}

function MCKbtnRectClick(event){
    _selector['SELTOOL']='DRAWSHAPE';
    _selector['SELTOOLM']='rect';
    removeClassFromSelection("#divLeftMenu .features-item", "sel");
    addClassForSelection('#'+event.target.id, "sel");
}

function MCKbtnEllipseClick(event){
    _selector['SELTOOL']='DRAWSHAPE';
    _selector['SELTOOLM']='ellipse';
    removeClassFromSelection("#divLeftMenu .features-item", "sel");
    addClassForSelection('#'+event.target.id, "sel");
}

function MCKbtnPolyClick(event){
    _evtMsg['selectorShapePointsTT']=0;
    _selector['SELTOOL']='DRAWPOLY';
    _selector['SELTOOLM']='path'; 
    removeClassFromSelection("#divLeftMenu .features-item", "sel");
    addClassForSelection('#'+event.target.id, "sel");
}

function MCKbtnTextClick(event){
    deletePreviewTMP();
    var id=event.target.id;
    if( checkVisibility( document.getElementById("panelText") )==true ){  
        removeAllFromSelection(".preview");
        removeClassFromSelection(".btnTool.sel", "sel");
        [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
            element.hide();
        });
        sTool='';
    }else{
        if( checkID('imageFonts')==false ){
            var head = document.querySelector('head');
            var link = '<link id="imageFonts" rel="preload" href="https://artdraw.org/svg/fonts/fonts.webp" as="image">';
            head.insertAdjacentHTML('beforeend', link);
        }
        if( checkID('scriptOpenType')==false ){
            loadScript('https://artdraw.org/svg/js/opentype.min.js', 'scriptOpenType', function() {
                 document.getElementById("preloadScriptOpenType").hide();
                 document.getElementById("drawText").show();
            });
        }
        selecTool(id, 'panelText', 'DRAW TEXT'); 
        selectText();
    }          
}

function MCKbtnShapesClick(event){
    showModal("frmImportShapes");
}



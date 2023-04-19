addListenerFunSelector( "click",  "#btnEditNodes", btnEditNodesClick);
function btnEditNodesClick(){
  if( _selector['SELTOOL']!="SELROJO"  ){
    MCKbtnSelectClick();
    return;
  }

  var e=document.querySelectorAll(".cosito.selectable")[0];
  if( e.tagName=="g" ){
    Confirm("Shape has Tabs", "Edit Nodes delete all Tabs.", "CONTINUE", "CANCEL", confirmDeleteTabs);
    function confirmDeleteTabs(){

    }
    return;
  }else{
    _selector['SELTOOL']="EDITBEZIER";
    HideSelector();
    activateEditNodes();
    Ayuda("ESC, CTR, ALT Key ==> Exit Node Edit");
  }
  
};

function MCKbtnToPathClick(event){
  deletePreviewTMP();
  var id=event.target.id;  
    document.getElementById("infoPanel").hide();
    selecTool(id, 'panelToolpath', 'TOOLPATH');  
};

///////////  SHOW PANELS  tool-type-select
function MCKbtnOpenConfigureToolClick(){
    showModal("frmConfigureTool");
}

function MCKOpenPublishForm(event){
  if( IS_USER==true ){
    visibilityForSelection( "button[mouseup=publishWeb]", "flex" );
    visibilityForSelection( "button[mouseup=publishWeb] + p", "none" );
  }else{
    visibilityForSelection( "button[mouseup=publishWeb]", "none" );
    visibilityForSelection( "button[mouseup=publishWeb] + p", "block" );
  }
  showModal("frmPublisWeb");
}


function MCKbtnGroupClick(event){   
  var ttItems=document.querySelectorAll(".selectable").length;
    if(ttItems==1){
      var tag= document.querySelectorAll(".selectable")[0].tagName;
      var id= document.querySelectorAll(".selectable")[0].id;
      if(tag=="g"){
        flattenSimple(id);
        unGroupElements( id, 'cosito selectable' );
        makeSelection(true);
        controlPointZ("ungroup", null, id);
        removeClassFromSelection("#liGroup", "sel"); 
        return;
      }
    }
    if( ttItems<2 ){
        Dialog("Group Elements", "To Group, Select 2 or more objects<br>To Ungroup, Select a Group", " OK ");
        return;
    }
    groupElements('selectable', false, 'cosito selectable', true, "grouped");  
    controlPointZ("group");  
    addClassForSelection("#liGroup", "sel");
}

function MCKbtnCombineClick(){
  HideSelector();  
  var e= combinePaths('selectable', true, true, null); 
    HideSelector();          
    makeSelection(true);
}

function MCKselectLineStyleClick(event){     
    var dashPoints=event.target.querySelectorAll("svg line")[0].style['stroke-dasharray'];
    [...document.querySelectorAll("#svgWorkerArea .selectable")].forEach((element, index, array) => {       
      element.setAttributeNS( null, "stroke-dasharray", dashPoints );  
      element.style['stroke-dasharray'] =  dashPoints; 
    });
    document.getElementById("styleBorderLine").toggleClass('show');
};

function toggleInfoPanelClick(event){  
  if( checkVisibility( document.querySelector("#InfoPanel .card-body") )==true ){
    document.querySelector("#InfoPanel .card-body").slideUp(250);
  }else{
    document.querySelector("#InfoPanel .card-body").slideDown(250);
  }
};


function fontSelect(event){
  //console.log(event.target) ;
  event.stopPropagation();  
  document.getElementById("font").value="/fonts/"+event.target.getAttribute("font");
  var font=document.getElementById("font").value;

  var arrayUrl = font.split('/');
  var ff = arrayUrl[arrayUrl.length - 1];
  ff = ff.split(".")[0];
  ff = ff.replace("-", " ");
  var src="url(https://artdraw.org/svg"+font+")";

  var myfont = new FontFace(ff, src );
  myfont.load().then(function(loadedFont) {
    document.fonts.add(loadedFont);
    document.getElementById("selectFontBtn").style.fontFamily = ff;
  }).catch(function(error) {
    // error occurred
  });

  closeModal("frmSelectFont");
};
function MCKmodeDrawText(event){
  if(event.target.getAttribute("value")=='1' ){
    document.getElementById("textSimpleControls").show();
  }else{
    document.getElementById("textSimpleControls").hide();
  }
  //console.log(event.target);
}
function MCKtextAlignClick(event){
  var attr=event.target.getAttribute("rel-atr");
  if( attr=="bold" || attr=="italic"  ){
    event.target.classList.toggle("sel");
  }else{
    removeClassFromSelection( "#textSimpleControls .align", "sel" );
    event.target.classList.toggle("sel");
  }
  
}
function MCKdrawTextClick(){    
    var font=document.getElementById("font").value;
    var text=document.getElementById("txt2path").value; 
    
    if( radioValue("textMode")=='2' ){
      drawTextOpenType(font, text);
    }else{
      drawTextGoogleFonts(font, text);
    }    
    //drawText();
}

function MCKbtnOutlClick(event){
  deletePreviewTMP();
  var id=event.target.id;
    if( checkVisibility( document.getElementById("panelOffset") )==true ){  
      removeClassFromSelection(".btnTool.sel", "sel");
      [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
          element.hide();
      });
      sTool='';
    }else{
      selecTool(id, 'panelOffset', 'BORDER OFFSET');
      booleanOffsetPreview();
    }       
}

function MCKapplyOffsetClick(){  
    if( document.querySelectorAll('.preview').length==0 ){
      Dialog("No Offset", "Select object for border Offset", "OK");
      return;
    }
    var reduce=document.getElementById('offsetReduceNodes').checked; document.querySelectorAll('.preview');
    if(reduce==true){
      var id=document.querySelector(".preview").id;
      var dok=reducePath(id, false);
      document.getElementById(id).dSet(dok);
    }
    var delOffset=document.getElementById('offsetPathDel').checked;
    if( delOffset==true ){
      removeAllFromSelection(".cosito.selectable");
    }else{
      removeClassFromSelection(".cosito", "selectable");
    }
    
    addClassForSelection('.preview', 'cosito selectable');
    setAttributeForSelection('.preview', {"fill":colorA, "fill-opacity":"0.25", "stroke":"#000000"} );
    removeClassFromSelection(".preview", "preview");
    makeSelection(true);
    booleanOffsetPreview();

    controlPointZ( "new", ".cosito.selectable" );
}

function MCKbtnBooleanClick(event){
  var id=event.target.id; 
  var e=document.getElementById("panelBoolean");
  if( checkVisibility( e )==true ){
    removeClassFromSelection(".btnTool.sel", "sel");
    e.slideUp(250);
    sTool='';
  }else{
    selecTool(id, 'panelBoolean', 'BOOLEANS');
    booleanMergePreview();
  }
}

function MCKapplyBooleanClick(){
  if( document.querySelectorAll('.preview').length==0 ){
    Dialog("No Boolean", "Select object for Boolean merge", "OK");
    return;
  }
  var reduce=document.getElementById('booleanReduceNodes').checked; document.querySelectorAll('.preview');
  if(reduce==true){
    var id=document.querySelector(".preview").id;
    var dok=reducePath(id, false);
    document.getElementById(id).dSet(dok);
  }
  var delOrigen=document.getElementById('booleanDeleteOriginal').checked;
  if( delOrigen==true ){
    removeAllFromSelection(".cosito.selectable");
  }else{
    removeClassFromSelection(".cosito", "selectable");
  }  

  addClassForSelection('.preview', 'cosito selectable');
  setAttributeForSelection('.preview', {"fill":colorA, "fill-opacity":"0.25", "stroke":"#000000"} );
  removeClassFromSelection(".preview", "preview");
  makeSelection(true);
  booleanMergePreview();    
  
  controlPointZ( "new", ".cosito.selectable" );
}

function MCKbtnRoundClick(event){
  deletePreviewTMP();
  var id=event.target.id;
  if( checkVisibility( document.getElementById("panelRound") )==true ){ 
    removeClassFromSelection(".btnTool.sel", "sel");
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    sTool='';
  }else{
    selecTool(id, 'panelRound', 'ROUND CORNERS');
    roundBBoxPreview();
  }
}

function MCKapplyRoundClick(){  
  if( document.querySelectorAll('.preview').length==0 ){
    Dialog("No Round Border", "Select object for Round Borders", "OK");
    return;
  }
  var delOrigen=document.getElementById('roundBorderOriginalDel').checked;  
  if( delOrigen==true ){
    removeAllFromSelection(".cosito.selectable");
  }else{
    removeClassFromSelection(".cosito", "selectable");
  }
  
  addClassForSelection('.preview', "cosito selectable");
  setAttributeForSelection( '.preview', { "fill":colorA, "fill-opacity":"0.25", "stroke":"#000000" } )

  removeClassFromSelection(".preview", "preview");
  makeSelection(true);  
}
////  ALIGN TOOL
function MCKbtnAlignTClick(event){
  deletePreviewTMP();
  var id=event.target.id;
  if( checkVisibility( document.getElementById("panelAlign") )==true ){       
    removeClassFromSelection(".btnTool.sel", "sel");
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    sTool='';
  }else{
    selecTool(id, 'panelAlign', 'ALIGN TOOL');
    alignShapesPreview();
  }
}

function MCKapplyAlignClick(event){  
    if( document.querySelectorAll(".selectable").length==0 ){   
      return;
    }
    alignShapesPreview(true);
    makeSelection(true);
}
////  FLIP MIRROR
function MCKapplyMirrorClick(event){  
    if( document.querySelectorAll(".selectable").length==0 )return;
    var mirrorType=event.target.getAttribute("mirrorType");
    if( mirrorType=='vertical' ){
      flipXSelection(".selectable");
    }else{
      flipYSelection(".selectable");  
    }
}
/*function xxxMCKapplyMirrorClick(event){  
  var ttItems=document.querySelectorAll(".selectable").length ;
    if( ttItems==0 ){
      Dialog("Flip Mirror", "First select an object to apply Flip Mirror", "OK");
      return
    };
    var mirrorType=event.target.getAttribute("mirrorType");
    var e=null, i=null, eflip=null, idFlip=null;
    if( ttItems==1 ){
        idFlip=document.querySelector(".selectable").id;
        //eflip = document.getElementById(id);
    }else{
        idFlip=groupElements('selectable', 1, 'groupTMP cosito', false, 'groupItemTMP');
    }
    
    flattenSimple( idFlip );
    eflip = document.getElementById(idFlip);
    var bbox=eflip.getBBox();
    var cx=(bbox.x*2) + (bbox.width);
    var cy=(bbox.y*2) + (bbox.height);        
    
    var matrix = mirrorType == 'vertical' ? 'matrix(-1,0,0,1,'+cx+',0)' : 'matrix(1,0,0,-1,0,'+cy+')';
    eflip.setAttribute("transform", matrix );
    flattenSimple( idFlip );
    unGroupElements( idFlip, "cosito" );
}*/
////  Z-ORDER
function MCKapplyZorder(event, shortcut){  
    var z, ttItems=document.querySelectorAll(".selectable").length;
    if( ttItems==0 ){
      Dialog("Z Order", "First select an object to change its positionZ", "OK");
      return
    };
    
    if( event!=false){
      z=event.target.getAttribute("toposition");
    }else{
      z=shortcut;
    }
    

    if( z=="front" ){
      //SVG('.selectable').front();
      [...document.querySelectorAll('.selectable')].forEach((element, index, array) => {
          element.front();
      });
    }else if( z=="forward" ){
      //SVG('.selectable').forward();
      [...document.querySelectorAll('.selectable')].forEach((element, index, array) => {
          element.forward();
      });
    }else if( z=="backward" ){
      //SVG('.selectable').backward();
      [...document.querySelectorAll('.selectable')].forEach((element, index, array) => {
          element.backward();
      });
    }else if( z=="back" ){
      //SVG('.selectable').back();
      [...document.querySelectorAll('.selectable')].forEach((element, index, array) => {
          element.back();
      });
    }

    UpdateZorderDoc();
    makeSelection(true);
}
////  TRACE IMAGE 
function MCKbtnTraceImageClick(){
  var ttItems=document.querySelectorAll(".selectable").length;
  if( ttItems==0 ){
      Dialog( "Image to Vectors", "First select an Image to convert to vectors.<br>You can <b>import</b> images from your local drive or from a URL.", "OKI");
      return;
  }
  document.getElementById("frameTrace").src="https://artdraw.org/svg/trace.html";
  showModal("frmTraceDialog");
}

function callBackTrace(){
  var seles=document.getElementsByClassName('selectable');  
  if(seles.length>0){
    var imgDataForTrace=seles[0].getAttribute("xlink:href");
    return imgDataForTrace;
  }
  return false;
}

function __showModal(event){
  //console.log(event);
  var idModal=event.target.getAttribute("idModal");
  if(!idModal || idModal===null || idModal=='undefined')return;
  showModal(idModal);
}
function showModal(_idModal){
  var modal = document.getElementById(_idModal);
  modal.style.display = "flex";

  addListenerFunSelector( "click", "#"+_idModal+" .closeModal", closeModal );
  function closeModal(event) {
    modal.style.display = "none";
  }

  var force=getAttributeFromID(_idModal, "force");
  if( Number(force)!==1 ){
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  } 
}
function closeModal(_idModal){
  var modal = document.getElementById(_idModal);
  modal.style.display = "none";
}

function MCKshowUserLogin(event){
  if( IS_USER==true ){
    showModal("frmUserLogin");
  }else{
    OAUTHclient.requestAccessToken();
  }  
}

function CloseGoogleSession(){
  Cookies.remove('SVGuserMail');
  Cookies.remove('SVGuserHash');
  IS_USER=false;
  checkLogin();
  closeModal("frmUserLogin");
}

function MCKbtnSaveJobConfigClick(){  
  var w=document.getElementById("jobW").value;
  var h=document.getElementById("jobH").value;
  var thk=document.getElementById("jobThick").value;
  var zsf=document.getElementById("jobZsafe").value;
  var zp=radioValue('zeroPos');
  var zpz=radioValue('zeroPosZ');
  var u=radioValue('unitSwitch');
  updateWorkSetup(w, h, thk, zp, zpz, u, zsf);         
  setupJobSize(true);        
}

function updateWorkSetup(w, h, thk, zp, zpz, u, zsf){
  _workSetup['width']=w; 
  _workSetup['height']=h;
  _workSetup['thick']=thk;
  _workSetup['zeroPos']=zp;
  _workSetup['zeroPosZ']=zpz;
  _workSetup['units']=u;
  _workSetup['zSafe']=zsf;  
  _hnd['svgHandler'].setAttribute( "worksetup", JSON.stringify(_workSetup) );

  localStorage.setItem("ws-width", w );
  localStorage.setItem("ws-height", h );
  localStorage.setItem("ws-thick", thk );
  localStorage.setItem("ws-zeroPos", zp);
  localStorage.setItem("ws-zeroPosZ", zpz);
  localStorage.setItem("ws-units", u);
}

//addListenerFunSelector( "click", "#btnTabs", btnTabsClick );
function MCKbtnTabsClick(event){
  //console.log("draw tabs");
  if( _selector['SELTOOL']=='DRAWTABS' ){
    _selector['SELTOOL']='SELROJO';
    closeEditTabs();  
    return;
  } 
  if( _selector['SELTOOL']=='EDITBEZIER' ){
    closeEditNodes();
  } 
  
  var e=document.querySelectorAll(".cosito.selectable")[0]; 
  var tag=e.tagName; 
  if(tag=="g"){    
    var idg=e.id;
    flattenSimple( idg );
    var path=idg.replace( 'tabs-', '' );
    e=document.getElementById(path);
    groupRemoveElement("tabs-"+path, e );
    e.classList.add("cosito");
    removeClassFromSelection(".oneTab."+path, "hide");
  }else{
    var idf=e.id;
    flattenSimple( idf );
    e=document.getElementById(idf);
  }

  _selector['HND']=e;
  e.classList.add("tabsEdit");
  e.classList.remove("selectable");
  _selector['SELTOOL']='DRAWTABS';
  HideSelector();
  drawTabs(e);
  console.log( _selector['SELTOOL'] )
};

function openRoughPanel(event){//makeRough
  deletePreviewTMP();
  var id=event.target.id;
  if( checkVisibility( document.getElementById("panelRough") )==true ){  
    removeClassFromSelection(".btnTool.sel", "sel");
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    sTool='';    
  }else{
    sTool='panelRough';    
    selecTool(id, 'panelRough', 'ROUGH PANEL');
    previewRough();
  } 
}

function MCKopenWavesEditor(){
  deletePreviewTMP();
  var id=event.target.id;
  if( checkVisibility( document.getElementById("panelWaves") )==true ){ 
    removeClassFromSelection(".btnTool.sel", "sel");
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    sTool='';    
  }else{
    sTool='panelWaves';    
    selecTool(id, 'panelWaves', 'ROUGH PANEL');
    document.getElementById("wavesWidth").value=_workSetup['width']/2;
    document.getElementById("wavesHeight").value=_workSetup['height']/2;
    wavesDraw();
  }
}

function MCKopenRotateEditor(event){
  deletePreviewTMP();
  var id=event.target.id;
  if( checkVisibility( document.getElementById("panelArray") )==true ){ 
    removeClassFromSelection(".btnTool.sel", "sel");
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    sTool='';    
  }else{
    sTool='panelArray';    
    selecTool(id, 'panelArray', 'ARRAY PANEL');
    mainPanelArray();
  }
}

function MCKopenEffectsEditor(){
  deletePreviewTMP();
  var id=event.target.id;
  if( checkVisibility( document.getElementById("panelEffects") )==true ){  
    restoreFilters();
    removeClassFromSelection(".btnTool.sel", "sel");
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    sTool='';    
  }else{
    sTool='panelEffects';    
    selecTool(id, 'panelEffects', 'EFFECTS PANEL');
    loadFilter();
  }
}



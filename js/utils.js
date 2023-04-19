var _hnd=[];
var _points={};
var _colors={};
var _workSetup={};
var _evtMsg={};
var _ctrlZ=[];
var _selector=[];
var _toolSelect=[];
var _pathConfig=[];
var _tabPoints=[];
var _tabPoints=[];
var DOC={};
DOC['hnd']=_hnd;
DOC['points']=_points;
DOC['colors']=_colors;
DOC['evtMsg']=_evtMsg;
DOC['workSetup']=_workSetup;
DOC['selector']=_selector;
DOC['ctrlZ']=_ctrlZ;
_workSetup['width']=600; _workSetup['height']=600; _workSetup['zeroPos']=99; _workSetup['zeroPosZ']="top"; _workSetup['units']='mm'; _workSetup['zSafe']=10;_workSetup['showGuide']=6;_workSetup['guides']=false;
_evtMsg['isDragScreen']=false; _evtMsg['dragSP']=null; _rdius=3;  _evtMsg['isDrawSelector']=false; _evtMsg['dragSPsel']=null; _workSetup['fzoom']=0; 
_evtMsg['jxWork']=false; _evtMsg['mousePOS']=null; _evtMsg['busy']=false; _evtMsg['selectorShape']=null; _evtMsg['selectorPos']=null;_evtMsg['clientX']=0;_evtMsg['clientX']=0;
_evtMsg['selectorShapeSVG']=null; _evtMsg['selectorShapePoints']=null; _evtMsg['selectorShapePointsTT']=0; _evtMsg['waitFor']=null; _evtMsg['tmp']=null; _evtMsg['keycode']=null;
_evtMsg['selNodeIndex']=null; _evtMsg['lastID']=null; _selector['SELTOOL']='SELROJO'; _selector['SELTOOLM']=''; _selector['HND']=null;_selector['propSel']=[];
_evtMsg['isEditNodes']=false; _urlDownFile=null;_useHelp=true; DEFS=''; IS_USER=false; PUBWEB={'name':'', 'description':'', 'album':'', 'tagen':''};
var contextMenu, shareMenu, auth2, basura=0;
var _FILTERS=[
'<filter id="[idfilter]" x="-100%" y="-100%" width="300%" height="300%" class="preview"><feGaussianBlur mod="m1" in="SourceAlpha" stdDeviation="[stdDeviation;range;5;0;30;m1;0.5]" result="desenfoque" /><feOffset in="desenfoque" mod="m2" dx="[dx;range;0;-30;30;m2;1]" dy="[dy;range;0;-30;30;m2;1]" result="sombra" /><feMerge><feMergeNode in="sombra" /><feMergeNode in="SourceGraphic" /></feMerge></filter>',
'<filter id="[idfilter]" x="-100%" y="-100%" width="300%" height="300%" class="preview"><feOffset in="SourceGraphic" mod="m1" dx="[dx;range;3;-30;30;m1;1]" dy="[dy;range;3;-30;30;m1;1]" /><feGaussianBlur mod="m2" stdDeviation="[stdDeviation;range;5;0;20;m2;0.5]" result="blur" /><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>',
'<filter id="[idfilter]" x="-100%" y="-100%" width="300%" height="300%" class="preview"><feFlood result="color1" mod="m1" flood-color="[flood-color;color;#444444;0;0;m1;px]"></feFlood><feConvolveMatrix order="8,8" mod="m1" divisor="[divisor;range;3;0;15;m1;0.5]" kernelMatrix="1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 " in="SourceAlpha" result="extrude"></feConvolveMatrix><feComposite in="color1" in2="extrude" result="comp-extrude" operator="in"></feComposite><feOffset mod="m2" dx="[dx;range;7;-50;50;m2;px]" dy="[dy;range;7;-50;50;m2;px]" in="comp-extrude" result="offset-extrude"></feOffset><feMerge><feMergeNode in="offset-extrude"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>',
'<filter id="[idfilter]" x="-100%" y="-100%" width="300%" height="300%" class="preview"><feMorphology operator="erode" mod="m0" radius="[radius;range;1;0.5;5;m0;0.1]" in="SourceAlpha" result="alpha-erode"></feMorphology><feConvolveMatrix order="3,3" divisor="1" kernelMatrix="0 1 0 1 1 1 0 1 0" in="alpha-erode" result="alpha-round"></feConvolveMatrix><feMorphology operator="dilate" mod="m1" radius="[radius;range;3.5;0;7;m1;0.1]" in="alpha-round" result="dilate-shadow"></feMorphology><feGaussianBlur in="dilate-shadow" mod="m2" stdDeviation="[stdDeviation;range;1.5;0;15;m2;0.5]" result="shadow"></feGaussianBlur><feFlood mod="m3" flood-color="[flood-color;color;#ffffff;0;20;m3;px]" result="flood-sticker"></feFlood><feComposite operator="in" in="flood-sticker" in2="alpha-round" result="comp-sticker"></feComposite><feMorphology operator="dilate" mod="m4" radius="[radius;range;3;0;8;m4;0.1]" in="comp-sticker" result="morph-sticker"></feMorphology><feConvolveMatrix order="3,3" divisor="1" kernelMatrix="0 1 0 1 1 1 0 1 0" in="morph-sticker" result="sticker"></feConvolveMatrix><feMerge><feMergeNode in="shadow"></feMergeNode><feMergeNode in="sticker"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>',
'<filter id="[idfilter]" x="-100%" y="-100%" width="300%" height="300%" class="preview"><feMorphology in="SourceGraphic" operator="dilate" mod="m1" radius="[radius;range;2;0;20;m1;px]" result="outline" /><feComposite operator="out" in="outline" in2="SourceAlpha" /></filter>',
'<filter id="[idfilter]" x="-100%" y="-100%" width="300%" height="300%" class="preview"><feConvolveMatrix in="SourceGraphic" result="extrude" order="9,9" divisor="1" kernelMatrix="1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 " /><feFlood mod="m1" flood-color="[flood-color;color;#990000;0;0;m1;px]" result="flood-extrude" /><feComposite operator="in" in="flood-extrude" in2="extrude" result="extrude-color" /><feOffset mod="m2" dx="[dx;range;6;-30;30;m2;1]" dy="[dy;range;6;-30;30;m2;1]" in="extrude-color" result="extrude-offset" /><feColorMatrix in="SourceGraphic" result="stroke" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 " /><feColorMatrix in="SourceGraphic" result="fill" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 " /><feConvolveMatrix in="stroke" result="inner-shadow" order="5,5" divisor="1" kernelMatrix="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 " /><feOffset mod="m3" dx="6" dy="6" in="inner-shadow" result="offset" /><feComposite operator="in" in="offset" in2="SourceAlpha" result="comp" /><feFlood mod="m4" flood-color="[flood-color;color;#000000;0;0;m4;px]" result="flood3" /><feComposite operator="in" in="flood3" in2="comp" result="comp2" /><feColorMatrix in="comp2" result="comp3" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0 " /><feFlood mod="m5" flood-color="[flood-color;color;#ff0000;0;0;m5;px]" result="flood1" /><feComposite operator="in" in="flood1" in2="fill" result="fill2" /><feFlood mod="m6" flood-color="#ffffff" result="flood2" /><feComposite operator="in" in="flood2" in2="stroke" result="stroke2" /><feMerge result="obj"><feMergeNode in="extrude-offset" /><feMergeNode in="fill2" /><feMergeNode in="comp3" /></feMerge><feConvolveMatrix in="SourceAlpha" result="shadow" order="9,9" divisor="1" kernelMatrix="1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 " /><feOffset mod="m2" dx="6" dy="6" in="shadow" result="shadow-offset" /><feFlood flood-color="#444444" result="flood-shadow" /><feComposite operator="in" in="flood-shadow" in2="shadow-offset" result="shadow-color" /><feMerge><feMergeNode in="shadow-color" /><feMergeNode in="obj" /></feMerge></filter>',
'<filter id="[idfilter]" x="-100%" y="-100%" width="300%" height="300%" class="preview" primitiveUnits="objectBoundingBox"><feFlood mod="m1" flood-color="[flood-color;color;#704601;0;0;m1;px]" result="flood" /><feComposite operator="in" in="flood" in2="SourceAlpha" result="flood-in" /><feImage width="100%" height="100%" x="0" y="0" preserveAspectRatio="none" xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzODQuODI4MTI1IiBoZWlnaHQ9Ijc1IiB2aWV3Qm94PSIwIDAgMzg0LjgyODEyNSA3NSI+IDxkZWZzPiA8bGluZWFyR3JhZGllbnQgaWQ9InJlZmxlY3QtZ3JhZGllbnQiIHgxPSIwIiB4Mj0iMCIgeTE9IjAiIHkyPSIxIj4gPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmNGI3IiBzdG9wLW9wYWNpdHk9IjAuMCIvPiA8c3RvcCBvZmZzZXQ9IjAuMyIgc3RvcC1jb2xvcj0iI2ZmZjRiNyIgc3RvcC1vcGFjaXR5PSIwLjAiLz4gPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmNGI3IiBzdG9wLW9wYWNpdHk9IjAuOSIvPiA8L2xpbmVhckdyYWRpZW50PiA8L2RlZnM+IDxwYXRoIGQ9Ik0wIDAgTDAgMzMuNzUgUTE5Mi40MTQwNjI1IDQ4Ljc1IDM4NC44MjgxMjUgMzMuNzUgTDM4NC44MjgxMjUgMCBaIiBmaWxsPSJ1cmwoI3JlZmxlY3QtZ3JhZGllbnQpIi8+IDwvc3ZnPg==" result="image"></feImage><feComposite operator="in" in="image" in2="SourceAlpha" result="image-in" /><feGaussianBlur in="flood-in" stdDeviation="0.003 0.03" result="blur" /><feOffset in="blur" mod="m2" dx="[dx;range;0;-0.25;0.25;m2;0.01]" dy="[dy;range;0.03;-0.25;0.25;m2;0.01]" result="offset" /><feComponentTransfer in="offset" result="comp"><feFuncA type="linear" mod="m3" slope="[slope;range;0.5;0;1;m3;0.05]" intercept="0" /></feComponentTransfer><feMerge><feMergeNode in="comp" /><feMergeNode in="SourceGraphic" /><feMergeNode in="image-in" /></feMerge></filter>',
'<filter id="[idfilter]" x="-100%" y="-100%" width="300%" height="300%" class="preview"><feFlood mod="m1" flood-color="[flood-color;color;#ff0000;0;0;m1;px]" flood-opacity="[flood-opacity;range;0.5;0;1;m1;0.05]" result="c1"></feFlood> <feFlood mod="m2" flood-color="[flood-color;color;#00ff00;0;0;m2;px]" flood-opacity="[flood-opacity;range;0.5;0;1;m2;0.05]" result="c2"></feFlood> <feFlood mod="m3" flood-color="[flood-color;color;#0000ff;0;0;m3;px]" flood-opacity="[flood-opacity;range;0.5;0;1;m3;0.05]" result="c3"></feFlood><feComposite operator="in" in="c1" in2="SourceAlpha" result="text-c1"></feComposite><feComposite operator="in" in="c2" in2="SourceAlpha" result="text-c2"></feComposite><feComposite operator="in" in="c3" in2="SourceAlpha" result="text-c3"></feComposite><feOffset in="text-c1" mod="m4" dx="[dx;range;-10;-30;30;m4;1]" dy="[dy;range;0;-30;30;m4;1]" result="text1"></feOffset><feOffset in="text-c2" mod="m5" dx="[dx;range;10;-30;30;m5;1]" dy="[dy;range;0;-30;30;m5;1]" result="text2"></feOffset> <feOffset in="text-c3" mod="m6" dx="[dx;range;0;-30;30;m6;1]" dy="[dy;range;0;-30;30;m6;1]" result="text3"></feOffset><feMerge><feMergeNode in="text1"></feMergeNode><feMergeNode in="text2"></feMergeNode><feMergeNode in="text3"></feMergeNode></feMerge></filter>',
'<filter id="[idfilter]" x="-100%" y="-100%" width="500%" height="500%" class="preview"> <feFlood mod="m1" flood-color="[flood-color;color;#4CFED7;0;0;m1;px]" flood-opacity="1" result="COL_green-l"></feFlood><feFlood mod="m3" flood-color="[flood-color;color;#2A9B83;0;0;m3;px]" flood-opacity="1" result="COL_green-d"></feFlood> <feFlood mod="m4" flood-color="[flood-color;color;#FA5C71;0;0;m4;px]" flood-opacity="1" result="COL_red-l"></feFlood> <feFlood mod="m5" flood-color="[flood-color;color;#A5122B;0;0;m5;px]" flood-opacity="1" result="COL_red-d"></feFlood> <feMorphology operator="dilate" radius="10" in="SourceAlpha" result="GREEN-BEVEL-1_10"></feMorphology> <feConvolveMatrix order="9,9" divisor="1" kernelMatrix="1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1" in="GREEN-BEVEL-1_10" result="GREEN-BEVEL-1_20"></feConvolveMatrix> <feComposite operator="in" in="COL_green-d" in2="GREEN-BEVEL-1_20" result="GREEN-BEVEL-1_30"></feComposite> <feComposite operator="in" in="COL_green-l" in2="GREEN-BEVEL-1_10" result="GREEN-FRONT-1_0"></feComposite> <feOffset mod="m6" dx="[dx;range;4;-30;30;m6;1]" dy="[dy;range;4;-30;30;m6;1]" in="GREEN-FRONT-1_0" result="GREEN-FRONT-1_10"></feOffset> <feSpecularLighting surfaceScale="0" mod="m6a" specularConstant="0.75" specularExponent="30" lighting-color="#white" in="GREEN-FRONT-1_10" result="GREEN-FRONT-1_20"> <fePointLight x="0" y="-30" z="400"></fePointLight> </feSpecularLighting> <feComposite operator="out" in2="GREEN-FRONT-1_20" in="GREEN-FRONT-1_10" result="GREEN-FRONT-1_30"></feComposite> <feMorphology operator="dilate" radius="7" in="SourceAlpha" result="GREEN-BEVEL-2_0"></feMorphology> <feConvolveMatrix order="9,9" divisor="1" kernelMatrix="1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1" in="GREEN-BEVEL-2_0" result="GREEN-BEVEL-2_10"></feConvolveMatrix> <feComposite operator="in" in="COL_green-d" in2="GREEN-BEVEL-2_10" result="GREEN-BEVEL-2_20"></feComposite> <feOffset mod="m7" dx="[dx;range;9;-30;30;m7;1]" dy="[dy;range;9;-30;30;m7;1]" in="GREEN-BEVEL-2_20" result="GREEN-BEVEL-2_30"></feOffset> <feOffset mod="m8" dx="[dx;range;18;-30;30;m8;1]" dy="[dy;range;18;-30;30;m8;1]" in="GREEN-BEVEL-2_0" result="GREEN-FRONT-2_10"></feOffset> <feComposite operator="in" in="COL_green-l" in2="GREEN-FRONT-2_10" result="GREEN-FRONT-2_20"></feComposite> <feSpecularLighting surfaceScale="0" mod="m6a" specularConstant="0.75" specularExponent="40" lighting-color="#white" in="GREEN-FRONT-2_20" result="GREEN-FRONT-2_30"> <fePointLight x="120" y="170" z="500"></fePointLight> </feSpecularLighting> <feComposite operator="in" in2="GREEN-FRONT-2_10" in="GREEN-FRONT-2_30" result="GREEN-FRONT-2_40"></feComposite> <feMerge result="SHADED-BEVELS_0"> <feMergeNode in="GREEN-BEVEL-1_10"></feMergeNode> <feMergeNode in="GREEN-FRONT-1_30"></feMergeNode> <feMergeNode in="GREEN-BEVEL-2_30"></feMergeNode> <feMergeNode in="GREEN-FRONT-2_20"></feMergeNode> <feMergeNode in="GREEN-FRONT-2_40"></feMergeNode> </feMerge> <feSpecularLighting surfaceScale="0" mod="m6a" specularConstant="0.75" specularExponent="30" lighting-color="#white" in="SHADED-BEVELS_0" result="SHADED-BEVELS_10"> <fePointLight x="320" y="-20" z="400"></fePointLight> </feSpecularLighting> <feComposite operator="in" in2="SHADED-BEVELS_0" in="SHADED-BEVELS_10" result="SHADED-BEVELS_30"></feComposite> <feConvolveMatrix order="4,4" divisor="1" kernelMatrix="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1" in="SourceAlpha" result="RED-BEVEL-0_0"></feConvolveMatrix> <feComposite in="COL_red-d" in2="RED-BEVEL-0_0" operator="in" result="RED-BEVEL-0_10"></feComposite> <feOffset mod="m9" dx="[dx;range;20;-30;30;m9;1]" dy="[dy;range;20;-30;30;m9;1]" in="RED-BEVEL-0_10" result="RED-BEVEL-0_20"></feOffset> <feComposite operator="in" in="COL_red-l" in2="SourceAlpha" result="RED-FRONT-0_0"></feComposite> <feOffset mod="m10" dx="[dx;range;24;-30;30;m10;1]" dy="[dy;range;24;-30;30;m10;1]" in="RED-FRONT-0_0" result="RED-FRONT-0_10"></feOffset> <feSpecularLighting surfaceScale="0" mod="m6a" specularConstant="[specularConstant;range;0.75;0.05;2;m6a;0.05]" specularExponent="30" lighting-color="#white" in="RED-FRONT-0_10" result="RED-FRONT-0_20"> <fePointLight x="20" y="180" z="300"></fePointLight> </feSpecularLighting> <feComposite operator="in" in2="RED-FRONT-0_10" in="RED-FRONT-0_20" result="RED-FRONT-0_30"></feComposite> <feMorphology radius="4" in="SourceAlpha" result="INNER-LINE_0"></feMorphology> <feMorphology radius="5" in="SourceAlpha" result="INNER-LINE_10"></feMorphology> <feComposite operator="out" in="INNER-LINE_0" in2="INNER-LINE_10" result="INNER-LINE_20"></feComposite> <feComposite operator="in" in="COL_green-l" in2="INNER-LINE_20" result="INNER-LINE_30"></feComposite> <feOffset mod="m10" dx="24" dy="24" in="INNER-LINE_30" result="INNER-LINE_40"></feOffset> <feMerge result="extruded-m"> <feMergeNode in="SHADED-BEVELS_0"></feMergeNode> <feMergeNode in="SHADED-BEVELS_30"></feMergeNode> <feMergeNode in="RED-BEVEL-0_20"></feMergeNode> <feMergeNode in="RED-FRONT-0_10"></feMergeNode> <feMergeNode in="RED-FRONT-0_30"></feMergeNode> <feMergeNode in="INNER-LINE_40"></feMergeNode> </feMerge> </filter>',
'<filter id="[idfilter]" x="-100%" y="-100%" width="300%" height="300%" class="preview"><feFlood mod="m1" flood-color="[flood-color;color;#797549;0;0;m1;px]" result="flood" /><feMorphology operator="dilate" mod="m2" radius="[radius;range;2;0;10;m2;0.1]" in="SourceGraphic" result="outline" /><feComposite operator="in" in="flood" in2="outline" result="outline2" /><feGaussianBlur mod="m3" stdDeviation="[stdDeviation;range;4;0;20;m3;0.5]" in="SourceAlpha" result="blur" /><feSpecularLighting mod="m4" surfaceScale="[surfaceScale;range;2;0;15;m4;0.5]" specularConstant="[specularConstant;range;0.7;0;5;m4;0.1]" specularExponent="[specularExponent;range;10;0;20;m4;0.5]" lighting-color="#white" in="blur" result="specular"><fePointLight x="200" y="-1000" z="300" /></feSpecularLighting><feComposite operator="in" in="specular" in2="SourceGraphic" result="specular2" /><feComposite in="SourceGraphic" in2="specular2" operator="arithmetic" k1="3" k2="2" k3="1" k4="0" result="specular3" /><feMerge><feMergeNode in="outline2" /><feMergeNode in="specular3" /></feMerge></filter>',
'<filter id="[idfilter]" x="-100%" y="-100%" width="300%" height="300%" class="preview"><feFlood result="color" mod="m0" flood-color="[flood-color;color;#ff0000;0;0;m0;px]" in="GraphicAlpha"></feFlood><feImage xlink:href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAwcHgiIGhlaWdodD0iMTAwMHB4Ij4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIiB3aWR0aD0iNS4zMDAwMDAwMDAwMDAwMDEiIGhlaWdodD0iNS4zMDAwMDAwMDAwMDAwMDEiPgogICAgICA8Y2lyY2xlIGN4PSIyLjY1MDAwMDAwMDAwMDAwMDQiIGN5PSIyLjY1MDAwMDAwMDAwMDAwMDQiIHI9IjIuMSIgZmlsbD0icmVkIi8+CiAgICA8L3BhdHRlcm4+CiAgPC9kZWZzPgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz4KPC9zdmc+" x="0" y="0" width="1000" height="1000" result="image"></feImage> <feTile in="image" result="tile"></feTile> <feComposite operator="in" in="SourceGraphic" in2="tile" result="dot"></feComposite><feComposite operator="in" in="dot" in2="SourceGraphic" result="dotted"></feComposite><feGaussianBlur in="dotted" mod="m1" stdDeviation="[stdDeviation;range;0.8;0;3;m1;0.1]"></feGaussianBlur><feComponentTransfer result="cutoff"><feFuncA type="linear" mod="m2" slope="[slope;range;10;3;15;m2;0.5]" intercept="[intercept;range;-3;-6;0;m2;0.1]"></feFuncA></feComponentTransfer></filter>'
];
var COLORPALETT=[ 
        ['#bfbfbf', '#808080', '#404040', '#000000', '#6699ff', '#3366cc', '#003399', '#99cc33', '#00cc00', '#669900', '#ffcc00', '#ff9900', '#ff6600', '#cc0000' ], 
        [   '#05285b', '#073984', '#094bac', '#0b5cd5', '#0d6efd', '#3485fd', '#5a9cfe', '#81b4fe', '#a8cbfe', 
            '#250657', '#35087e', '#450ba5', '#560dcb', '#6610f2', '#7e36f4', '#975cf6', '#af83f8', '#c8a9fa',
            '#05285b', '#073984', '#094bac', '#0b5cd5', '#0d6efd', '#3485fd', '#5a9cfe', '#81b4fe', '#a8cbfe',
            '#05285b', '#073984', '#094bac', '#0b5cd5', '#0d6efd', '#3485fd', '#5a9cfe', '#81b4fe', '#a8cbfe',
            '#05285b', '#073984', '#094bac', '#0b5cd5', '#0d6efd', '#3485fd', '#5a9cfe', '#81b4fe', '#a8cbfe',
            '#05285b', '#073984', '#094bac', '#0b5cd5', '#0d6efd', '#3485fd', '#5a9cfe', '#81b4fe', '#a8cbfe',
            '#05285b', '#073984', '#094bac', '#0b5cd5', '#0d6efd', '#3485fd', '#5a9cfe', '#81b4fe', '#a8cbfe',
            '#05285b', '#073984', '#094bac', '#0b5cd5', '#0d6efd', '#3485fd', '#5a9cfe', '#81b4fe', '#a8cbfe',
            '#05285b', '#073984', '#094bac', '#0b5cd5', '#0d6efd', '#3485fd', '#5a9cfe', '#81b4fe', '#a8cbfe' ], 
        ['#bfbfbf', '#808080', '#404040', '#000000', '#6699ff', '#3366cc', '#003399', '#99cc33', '#00cc00', '#669900', '#ffcc00', '#ff9900', '#ff6600', '#cc0000'],
        ['#affc41', '#d36135', '#95a3b3', '#264653', '#f4a261', '#eabfcb', '#c191a1', '#a4508b', '#5f0a87', '#2f004f', '#233d4d', '#fe7f2d', '#fcca46', '#a1c181', '#619b8a', '#dcedff', '#94b0da', '#8f91a2', '#505a5b', '#343f3e', '#2f323a', '#77567a', '#c47ac0', '#e39ec1', '#debac0', '#1f363d', '#40798c', '#70a9a1', '#9ec1a3', '#cfe0c3', '#4c6085', '#39a0ed', '#36f1cd', '#13c4a3', '#32322c', '#f2ff49', '#ff4242', '#fb62f6', '#645dd7', '#b3fffc', '#e1ca96', '#aca885', '#918b76', '#626c66', '#434a42', '#340068', '#ff6978', '#fffcf9', '#b1ede8', '#6d435a', '#36393b', '#a5d8ff', '#afd0d6', '#bfb6bb', '#c49799', '#000501', '#73ab84', '#99d19c', '#79c7c5', '#ade1e5', '#820263', '#d90368', '#eadeda', '#2e294e', '#ffd400', '#d6e681', '#babf95', '#c4ad83', '#c6b677', '#dbb957', '#ddd1c7', '#c2cfb2', '#8db580', '#7e8987', '#4b4a67', '#89d2dc', '#6564db', '#232ed1', '#101d42', '#0d1317', '#fffd82', '#ff9b71', '#e84855', '#b56b45', '#2b3a67', '#edcb96', '#f7c4a5', '#9e7682', '#605770', '#4d4861', '#221d23', '#4f3824', '#d1603d', '#ddb967', '#d0e37f', '#3d348b', '#7678ed', '#f7b801', '#f18701', '#f35b04','#dfbbb1', '#f56476', '#e43f6f', '#be3e82', '#5e4352',
         '#320e3b', '#4c2a85', '#6b7fd7', '#bcedf6', '#ddfbd2', "#d8cfaf", "#e6b89c", "#ed9390", "#f374ae", "#32533d", 
         "#f9b9f2", "#bca0bc", "#2b3d41", "#4c5f6b", "#83a0a0", "#5b2333", "#f7f4f3", "#564d4a", "#f24333", "#ba1b1d",
         "#bdfffd", "#9ffff5", "#7cffc4", "#6abea7", "#5e6973", "#5c0029", "#61304b", "#857c8d", "#94bfbe", "#acf7c1",
         "#1d2f6f", "#8390fa", "#fac748", "#f9e9ec", "#f88dad", "#000000", "#fffffc", "#beb7a4", "#ff7f11", "#ff1b1c",
         "#f433ab", "#cb04a5", "#934683", "#65334d", "#2d1115", "#bad1cd", "#f2d1c9", "#e086d3", "38332ac", "#462749",
         "#423629", "#4f5d2f", "#7d7e75", "#b0b2b8", "#cfd6ea", "#3b1f2b", "#db162f", "#dbdfac", "#5f758e", "#383961",
         "#9f84bd", "#c09bd8", "#ebc3db", "#ede3e9", "#e6e4ce", "#306b34", "#1c5253", "#f3ffc6", "#c3eb78", "#b6174b",
         "#0a2463", "#3e92cc", "#fffaff", "#d8315b", "#1e1b18", "#c9c9ee", "#baabbd", "#9f838c", "#8d7471", "#816f68",
         "#442b48", "#726e60", "#98b06f", "#b6dc76", "#dbff76", "#06aed5", "#086788", "#f0c808", "#fff1d0", "#dd1c1a",
         "#404e4d", "#63595c", "#646881", "#62bec1", "#5ad2f4", "#466365", "#b49a67", "#ceb3ab", "#c4c6e7", "#baa5ff",
         "#3a4f41", "#b9314f", "#d5a18e", "#dec3be", "#e1dee3", "#ca2e55", "#ffe0b5", "#8a6552", "#462521", "#bdb246",
         "#5bba6f", "#3fa34d", "#2a9134", "#137547", "#054a29", "#ffb8d1", "#e4b4c2", "#e7cee3", "#e0e1e9", "#ddfdfe", 
         "#1e91d6", "#0072bb", "#8fc93a", "#e4cc37", "#e18335", "#764248", "#dda3b2", "#ffadc6", "#e3c5bb", "#dfe2cf", 
         "#dee5e5", "#9dc5bb", "#17b890", "#5e807f", "#082d0f", "#4c5b5c", "#ff715b", "#f9cb40", "#bced09", "#2f52e0",
         "#001427" ,"#708d81" ,"#f4d58d" ,"#bf0603" ,"#8d0801" ,"#242038" ,"#725ac1" ,"#8d86c9" ,"#cac4ce" ,"#f7ece1", 
         "#d5b0ac" ,"#cea0ae" ,"#684551" ,"#402e2a" ,"#9cd08f" ,"#ff7477" ,"#e69597" ,"#ceb5b7" ,"#b5d6d6" ,"#9cf6f6",
         "#9aadbf" ,"#6d98ba" ,"#d3b99f" ,"#c17767" ,"#210203" ,"#000500" ,"#362417" ,"#92817a" ,"#f1dabf" ,"#fffbff",
         "#0a2342" ,"#2ca58d" ,"#84bc9c" ,"#fffdf7" ,"#f46197" ,"#272727" ,"#2b50aa" ,"#ff9fe5" ,"#ffd4d4" ,"#ff858d",
         "#050505" ,"#004fff" ,"#31afd4" ,"#902d41" ,"#ff007f" ,"#ef3e36" ,"#17bebb" ,"#2e282a" ,"#edb88b" ,"#fad8d6", 
         "#355070" ,"#6d597a" ,"#b56576" ,"#e56b6f" ,"#eaac8b" ,"#36453b" ,"#596869" ,"#515751" ,"#f5f9e9" ,"#c2c1a5",
         "#102542" ,"#f87060" ,"#cdd7d6" ,"#b3a394" ,"#ffffff" ,"#256eff" ,"#46237a" ,"#3ddc97" ,"#fcfcfc" ,"#ff495c",
         "#948d9b" ,"#b279a7" ,"#d387ab" ,"#e899dc" ,"#fec9f1" ,"#c1a5a9" ,"#f08cae" ,"#9a4c95" ,"#4d2d52" ,"#1d1a31",
         "#1f0318" ,"#e5f2c9" ,"#7f534b" ,"#8c705f" ,"#1e1a1d" ,"#211103" ,"#3d1308" ,"#7b0d1e" ,"#9f2042" ,"#f8e5ee",
         "#ea526f" ,"#070600" ,"#f7f7ff" ,"#23b5d3" ,"#279af1" ,"#bfc3ba" ,"#a9aca9" ,"#60495a" ,"#3f3244" ,"#2f2235",
         "#e5d4ed" ,"#6d72c3" ,"#5941a9" ,"#514f59" ,"#1d1128" ,"#ffaf87" ,"#ff8e72" ,"#ed6a5e" ,"#4ce0b3" ,"#377771",
         "#4b3b47" ,"#6a6262" ,"#9c9990" ,"#cfd2b2" ,"#e0d8de" ,"#050517" ,"#cf5c36" ,"#efc88b" ,"#f4e3b2" ,"#d3d5d7",
         "#82d4bb" ,"#82c09a" ,"#82ac9f" ,"#829298" ,"#94778b" ,"#b8c480" ,"#d4e79e" ,"#922d50" ,"#501537" ,"#3c1b43",
         "#49416d" ,"#a882dd" ,"#e08d79" ,"#e0efde" ,"#b3f2dd" ,"#293132" ,"#474044" ,"#4f5165" ,"#547aa5" ,"#50d8d7",
         "#333333" ,"#48e5c2" ,"#fcfaf9" ,"#f3d3bd" ,"#5e5e5e" ,"#def6ca" ,"#f8bdc4" ,"#f497da" ,"#f679e5" ,"#f65be3",
         "#fcfcfc" ,"#d2f898" ,"#f6f930" ,"#2f2f2f" ,"#000000" ,"#22577a" ,"#38a3a5" ,"#57cc99" ,"#80ed99" ,"#c7f9cc",
         "#476a6f" ,"#519e8a" ,"#7eb09b" ,"#c5c9a4" ,"#ecbeb4" ,"#5bc0eb" ,"#fde74c" ,"#9bc53d" ,"#c3423f" ,"#211a1e",
         "#fb6107" ,"#f3de2c" ,"#7cb518" ,"#5c8001" ,"#fbb02d" ,"#a31621" ,"#bfdbf7" ,"#053c5e" ,"#1f7a8c" ,"#db222a",
         "#243010" ,"#87a330" ,"#a1c349" ,"#cad593" ,"#2a3c24" ,"#acadbc" ,"#9b9ece" ,"#6665dd" ,"#473bf0" ,"#000500",
         "#beb8eb" ,"#5299d3" ,"#0b5563" ,"#a2bce0" ,"#5e5c6c" ,"#000000" ,"#839788" ,"#eee0cb" ,"#baa898" ,"#bfd7ea",
         "#a31621" ,"#fcf7f8" ,"#ced3dc" ,"#4e8098" ,"#90c2e7" ,"#fa7921" ,"#fe9920" ,"#b9a44c" ,"#566e3d" ,"#0c4767",
         "#dec5e3" ,"#cdedfd" ,"#b6dcfe" ,"#a9f8fb" ,"#81f7e5" ,"#25ced1" ,"#ffffff" ,"#fceade" ,"#ff8a5b" ,"#ea526f",
         "#7a5c58" ,"#8d80ad" ,"#99b2dd" ,"#9dfff9" ,"#64f58d" ,"#a31621" ,"#fcf7f8" ,"#ced3dc" ,"#4e8098" ,"#90c2e7",
         "#ffffff" ,"#84dcc6" ,"#a5ffd6" ,"#ffa69e" ,"#ff686b" ,"#272727" ,"#d4aa7d" ,"#efd09e" ,"#d2d8b3" ,"#90a9b7",
         "#ed254e" ,"#f9dc5c" ,"#c2eabd" ,"#011936" ,"#465362" ,"#4f000b" ,"#720026" ,"#ce4257" ,"#ff7f51" ,"#ff9b54",
         "#dde392" ,"#afbe8f" ,"#7d8570" ,"#646f58" ,"#504b3a" ,"#083d77" ,"#ebebd3" ,"#f4d35e" ,"#ee964b" ,"#f95738",
         "#82ff9e" ,"#a9fbc3" ,"#b594b6" ,"#935fa7" ,"#9b489b" ,"#dec5e3" ,"#cdedfd" ,"#b6dcfe" ,"#a9f8fb" ,"#81f7e5",
         "#022f40" ,"#38aecc" ,"#0090c1" ,"#183446" ,"#046e8f" ,"#e8e9f3" ,"#cecece" ,"#a6a6a8" ,"#272635" ,"#b1e5f2",
         "#5603ad" ,"#8367c7" ,"#b3e9c7" ,"#c2f8cb" ,"#f0fff1" ,"#97ead2" ,"#8cc7a1" ,"#816e94" ,"#74226c" ,"#4b2142",
         "#6e2594" ,"#ecd444" ,"#808080" ,"#000000" ,"#ffffff" ,"#7cfef0" ,"#6bffb8" ,"#2ceaa3" ,"#28965a" ,"#2a6041",
         "#b07156" ,"#ab4e68" ,"#533745" ,"#9d9171" ,"#c4a287" ,"#628395" ,"#96897b" ,"#dfd5a5" ,"#dbad6a" ,"#cf995f"
        ]
        ];

var areaWorker=null, desktopMain=null, workMain=null, infoXY=null, clipboard=null; clipboardFill=null;clipboardBorder=null;clipboardFilter=null; ruleTop=null; ruleLeft=null; ruleTopG=null; ruleLeftG=null;
var cncTable, canvas, shapeDraw=null, sTool=null, xElem=null, xDraggable=null, svgHandler=null, pHandler=null, awHandler=null ;
var colorA='rgb(145, 145, 145)', colorB='none', workSize='mm';

//document.getElementById("myText").value  
function getAttributeFromID(_id, _attr){
    var e=document.getElementById(_id);
    return e.getAttribute(_attr);
}
function getAttributeFromSelection(_query, _attr){
    var e=document.querySelectorAll(_query)[0];
    return e.getAttribute(_attr);
}
function setAttributeForSelection(_query, _attr, _value){
    if(typeof _attr === "object" && _attr !== null && _value==null){
        [...document.querySelectorAll(_query)].forEach((element, index, array) => {
            element.attr(_attr);
        });
        return;
    }
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        element.setAttribute(_attr, _value);
    });
}
function setStyleForID(_id, _style, _value ){
    var e=document.getElementById(_id);
    e.style[_style]=_value;
}
function removeAllFromSelection(_query){
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        element.remove();
    });
}
function removeClassFromSelection(_query, _class2Remove){
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        element.classList.remove(_class2Remove);
    });
}
function removeStyleFromSelection(_query, _style2Remove){
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        element.style.removeProperty(_style2Remove);
    });
}
function changeClassFromSelection(_query, _newClass){
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        element.setAttribute( "class", _newClass );
    });
}
function addClassForSelection(_query, _newClass){
    var cls = _newClass.split(/\s+/);
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {        
        cls.forEach(function(_class) {
            element.classList.add(_class);
        });
    });
}
function hasClass(_query, _class){
    if( document.querySelector(_query).classList.contains(_class) )return true;
    return false;
}
function removeID(_id ){ 
    var e=document.getElementById(_id);
    if(e!==null) e.remove();
}
function checkID(_id ){ 
    var e=document.getElementById(_id);
    if(e!==null) return true;
    return false;
}
function checkIDwhere(_id, where ){ 
    var e=where.getElementById(_id);
    if(e!==null) return true;
    return false;
}
function getStyleFromID(_id, _style){
    var e = document.getElementById( _id );
    if(e==null)return;
    var css = window.getComputedStyle(e, null);
    return css.getPropertyValue(_style);
}
function getStyleFromElement(_e, _style){
    var css = window.getComputedStyle(_e, null);
    return css.getPropertyValue(_style);
}
function cloneSelection(_query, _newClass){
    //solo para align tool preview
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        var copy=element.cloneNode(true);
        copy.id=createID("shapeCopy");
        copy.setAttribute("class", _newClass );
        if( copy.tagName=="g"){
            var oneTabs = copy.querySelectorAll('.oneTab');
            oneTabs.forEach((oneTab) => {
                oneTab.parentNode.removeChild(oneTab);
            });
            copy.querySelectorAll("path, circle").forEach(function(element) {
                element.setAttribute("class", _newClass); 
                element.setAttribute("stroke", "blue");
                element.setAttribute("fill", "#9acd324a");
            });
        }else{
            copy.setAttribute("stroke", "blue" );
            copy.setAttribute("fill", "#9acd324a" );
        }
        
        _hnd['svgHandler'].appendChild( copy );          
    });
}
function radioValue(_name){
    return document.querySelector("input[name="+_name+"]:checked")?.value;
}
function visibilityForSelection(_query,_ver){
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        element.style.display=_ver;
    });
}
function checkVisibility(e) {
    const computedStyle = window.getComputedStyle(e);

    if (computedStyle.display === 'none' ) {
        return false;
    } else if (computedStyle.visibility !== 'visible') {
        return false;
    }

    return true; 
  }
function getAllDescendants(e, includeRoot) {
    var all = [];
    if(includeRoot==true)all.push(e);
    getDescendants(e);

    function getDescendants(e) {
        for (var i = 0; i < e.childNodes.length; i++) {
            var child = e.childNodes[i];
            getDescendants(child);
            all.push(child);
        }
    }
    return all;
}
function clearListener(_id){
    var c=document.getElementById(_id);
    var cr=c.parentNode;
    var cp=c.cloneNode(false);
    cr.appendChild(cp);
    c.remove();
}
function isDomEntity(entity) {
    if(typeof entity  === 'object' && entity.nodeType === 1){
       return true;
    }
    return false;
}
function isGraphSVGe(e){
    var tag=e.tagName;
    if(tag=='path' || tag=='circle' || tag=='ellipse' || tag=='rect' || tag=='polygon' || tag=='polyline' || tag=='line' || tag=='text' || tag=='image' || tag=='g' )return true;
    return false;
}
function isNumeric(num){
    let value1 = num.toString();
    let value2 = parseFloat(num).toString();
    return (value1 === value2);
}
Element.prototype.toggleClass = function ( className ) {
    // document.getElementById( 'subforms' ).toggleClass( 'hide' );
    if( this.className.split( ' ' ).indexOf( className ) == -1 ) {
        this.className = ( this.className + ' ' + className ).trim();
    } else {
        this.className = this.className.replace( new RegExp( '(\\s|^)' + className + '(\\s|$)' ), ' ' ).trim();
    };
    return this;
};
Element.prototype.hide = function (  ) {
    this.style.display = 'none';
    return this;
};
Element.prototype.show = function (  ) {
    this.style.display = '';
    return this;
};
Element.prototype.text = function ( txt ) {
    this.innerText  = txt;
    return this;
};
Element.prototype.hasClass = function ( className ) {
    if( this.classList.contains(className) )return true;
    return false;
};
Element.prototype.slideUp = function ( duration, callback ) {
    this.style.transitionProperty = 'height, margin, padding';
    this.style.transitionDuration = duration + 'ms';
    this.style.boxSizing = 'border-box';
    this.style.height = this.offsetHeight + 'px';
    this.offsetHeight;
    this.style.overflow = 'hidden';
    this.style.height = 0;
    this.style.paddingTop = 0;
    this.style.paddingBottom = 0;
    this.style.marginTop = 0;
    this.style.marginBottom = 0;
    window.setTimeout( () => {
        this.style.display = 'none';
        this.style.removeProperty('height');
        this.style.removeProperty('padding-top');
        this.style.removeProperty('padding-bottom');
        this.style.removeProperty('margin-top');
        this.style.removeProperty('margin-bottom');
        this.style.removeProperty('overflow');
        this.style.removeProperty('transition-duration');
        this.style.removeProperty('transition-property');
    }, duration);
};
Element.prototype.slideDown = function ( duration ) {
    this.style.removeProperty('display');
    let display = window.getComputedStyle(this).display;
    if (display === 'none') display = 'block';
    this.style.display = display;
    let height = this.offsetHeight;
    this.style.overflow = 'hidden';
    this.style.height = 0;
    this.style.paddingTop = 0;
    this.style.paddingBottom = 0;
    this.style.marginTop = 0;
    this.style.marginBottom = 0;
    this.offsetHeight;
    this.style.boxSizing = 'border-box';
    this.style.transitionProperty = "height, margin, padding";
    this.style.transitionDuration = duration + 'ms';
    this.style.height = height + 'px';
    this.style.removeProperty('padding-top');
    this.style.removeProperty('padding-bottom');
    this.style.removeProperty('margin-top');
    this.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
        this.style.removeProperty('height');
        this.style.removeProperty('overflow');
        this.style.removeProperty('transition-duration');
        this.style.removeProperty('transition-property');
    }, duration);
};

SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement ||  function(toElement) {
    return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM()); 
};
SVGElement.prototype.moveTo = SVGElement.prototype.moveTo ||  function(x, y) {    
    if(this.tagName=="g"){
        flattenSimple(this.id);
        var bb=transformedBoundingBox(this.id);
        [...this.querySelectorAll("path")].forEach((element, index, array) => {
            var bbs=transformedBoundingBox(element.id);
            var dx=x+(bbs.x-bb.x);
            var dy=y+(bbs.y-bb.y);
            //var mx=x+dx
            element.moveTo(dx, dy);
        });
        return;
    }

    var d=this.getAttributeNS(null, "d"), transform=this.getAttributeNS(null, "transform") ;
    if(d==null || d=='')return;
    
    if(transform!=null && transform!='undefined'){
        d=SVGPATH(d).transform(transform).toString();        
        this.removeAttribute("transform");
        this.setAttributeNS(null, "d", d);
    }
    var bb=transformedBoundingBox(this.id);
    x=x-bb.x;
    y=y-bb.y;

    d=SVGPATH(d).translate(x,y).round(4).toString();
    this.setAttributeNS(null, "d", d);
    //console.log("x:"+x+" y:"+y+" transform:"+transform+" bb:"+bb);
};
SVGElement.prototype.move = SVGElement.prototype.move ||  function(x, y) {
    if(this.tagName=="g"){
        flattenSimple(this.id);
        [...this.querySelectorAll("path")].forEach((element, index, array) => {
            element.move(x, y);
        });
        return;
    }

    var d=this.getAttributeNS(null, "d"), transform=this.getAttributeNS(null, "transform");
    if(transform!=null && transform!='undefined'){
        d=SVGPATH(d).transform(transform).toString();
        this.removeAttribute("transform");
    }
    d=SVGPATH(d).translate(x,y).round(4).toString();
    this.setAttributeNS(null, "d", d);
    //console.log("x:"+x+" y:"+y+" transform:"+transform+" rta:"+rta);
};
SVGElement.prototype.scale = SVGElement.prototype.scale ||  function(sx, sy) {
    if(this.tagName=="g"){
        flattenSimple(this.id);
        var bb=transformedBoundingBox(this.id);
        sx=sx/bb.width;
        sy=sy/bb.height;
        this.setAttributeNS(null, "transform", "scale("+sx+","+sy+")" );
        flattenSimple(this.id);
        return;
    }
    
    var d=this.getAttributeNS(null, "d"), transform=this.getAttributeNS(null, "transform");
    if(transform!=null && transform!='undefined'){
        d=SVGPATH(d).transform(transform).toString();
        this.removeAttribute("transform");
    }
    var bb=transformedBoundingBox(this.id);
    sx=sx/bb.width;
    sy=sy/bb.height;
    d=SVGPATH(d).scale(sx,sy).round(4).toString();
    this.setAttributeNS(null, "d", d);
    //console.log("x:"+x+" y:"+y+" transform:"+transform+" rta:"+rta);
};
SVGElement.prototype.front = SVGElement.prototype.front ||  function() {
    this.parentElement.appendChild(this);
};
SVGElement.prototype.forward = SVGElement.prototype.forward ||  function() {
    var next=this.nextSibling.nextSibling;
    _hnd['svgHandler'].insertBefore( this, next );
};
SVGElement.prototype.backward = SVGElement.prototype.backward ||  function() {
    var ant=this.previousSibling;
    _hnd['svgHandler'].insertBefore( this, ant );
};
SVGElement.prototype.back = SVGElement.prototype.back ||  function() {
    var fchild = _hnd['svgHandler'].firstChild;
    _hnd['svgHandler'].insertBefore( this, fchild )
};
SVGElement.prototype.rotate = SVGElement.prototype.rotate ||  function(degrees, cx, cy) {
    var transform=this.getAttribute("transform");
    if(transform!=null)flattenSimple(this.id);

    if(cx==null || cy==null){
        var bb=transformedBoundingBox(this.id);
        cx=bb.x+(bb.width/2);
        cy=bb.y+(bb.height/2);
    }
    //Mode1 rotate https://github.com/fontello/svgpath  //fails Group !!
    //var d=this.getAttributeNS(null, "d");
    //d=SVGPATH(d).rotate( degrees, cx, cy ).round(4).toString();
    //this.setAttributeNS(null, "d", d);

    //mode2 use transform & flatten
    this.setAttributeNS(null, "transform", "rotate("+degrees+","+cx+","+cy+")" );    
    flattenSimple(this.id);
    //console.log("x:"+x+" y:"+y+" transform:"+transform+" rta:"+rta);
};
SVGElement.prototype.flipX = SVGElement.prototype.flipX ||  function() {
    var id=this.id;
    flattenSimple( id );
    var eflip = document.getElementById(id);
    var bbox=eflip.getBBox();
    var cx=(bbox.x*2) + (bbox.width);
    var matrix = 'matrix(-1,0,0,1,'+cx+',0)';
    eflip.setAttribute("transform", matrix );
    flattenSimple( id );
};
SVGElement.prototype.flipY = SVGElement.prototype.flipY ||  function() {
    var id=this.id;
    flattenSimple( id );
    var eflip = document.getElementById(id);
    var bbox=eflip.getBBox();
    var cy=(bbox.y*2) + (bbox.height);
    var matrix = 'matrix(1,0,0,-1,0,'+cy+')';
    eflip.setAttribute("transform", matrix );
    flattenSimple( id );
};
SVGElement.prototype.add = SVGElement.prototype.add ||  function(e) {
    if(this.tagName=="g" || this.tagName=="svg" ){
        this.appendChild(e);
    }
    return this;
};
SVGElement.prototype.attr = SVGElement.prototype.attr ||  function(attrs) {
    if( attrs==null || attrs=='undefined' || attrs==''  )return;
    Object.keys(attrs).forEach(key => {
        if( this.tagName=="g" ){
            [...document.querySelectorAll("#"+this.id+" :not(.ignore-me)")].forEach((el, index, array) => {
                if(key!='id') el.setAttribute(key, attrs[key] );
            });
            if(key=='id')this.setAttribute(key, attrs[key] );
        }else{
            this.setAttribute(key, attrs[key] );
        }        
    });
    return this;
};
SVGElement.prototype.dGet = SVGElement.prototype.dGet ||  function(rarray) {
    var d=this.getAttributeNS(null, "d");
    if( rarray==true){
        var dpath=SVGPATH( d );
        return dpath.segments;
    }
    return d;
};
SVGElement.prototype.dSet = SVGElement.prototype.dSet ||  function(d) {
    this.setAttributeNS(null, "d", d);
};


Array.prototype.orderBy = function(selector, desc = false) {
    return [...this].sort((a, b) => {
      a = selector(a);
      b = selector(b);
  
      if (a == b) return 0;
      return (desc ? a > b : a < b) ? -1 : 1;
    });
};
Array.prototype.insert = function ( index, ...items ) {
    this.splice( index, 0, ...items );
};
//////////////////////////////// END VAINILA
function SVGnew(id, _root, attrs){
    var element = document.createElementNS('http://www.w3.org/2000/svg', "svg");
    element.setAttribute('id', id);
    element.setAttribute( 'xmlns', "http://www.w3.org/2000/svg");
    element.setAttribute('version', '1.1');
    element.setAttribute( 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
    element.setAttribute( 'xmlns:artdraw', 'https://artdraw.org');
    element.setAttributeNS( null, 'viewBox', '-25 -25 750 750');
    element.setAttribute( 'width', '100%');
    element.setAttribute( 'height', '100%');
    element.setAttribute( 'style', 'background: rgb(155, 155, 155);');
    Object.keys(attrs).forEach(key => {
        element.setAttribute(key, attrs[key] );
    });
    _root.appendChild( element );
    return element;
}

function SVGdraw( element, attrs ){
    var path=createSVGElement(element, false, attrs['id'] );
    Object.keys(attrs).forEach(key => {
        path.setAttribute(key, attrs[key] );
    });
    _hnd['svgHandler'].appendChild( path );
    return path;
}

function toRadians (degrees, precision ) {
    if(precision==null)precision=2;
    return parseFloat(((parseFloat(degrees) * Math.PI) / 180).toFixed(precision));
};

function rand(min, max) { return min + Math.random() * (max - min); }

function flipXSelection(_query){
    var bb=getBBoxFromSelection(_query);
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        var bbe=getBBoxFromSelection("#"+element.id);
        var dx=(bb.x+bb.width) - (bbe.x+bbe.width);
        element.flipX();
        var px=bb.x + dx;
        var e=document.getElementById(element.id);
        e.moveTo(px, bbe.y);
    });
}

function flipYSelection(_query){
    var bb=getBBoxFromSelection(_query);
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        var bbe=getBBoxFromSelection("#"+element.id);
        var dy=(bb.y+bb.height) - (bbe.y+bbe.height);
        element.flipY();
        var py=bb.y + dy;
        var e=document.getElementById(element.id);
        e.moveTo(bbe.x, py);
    });
}

function rotateSVGselection(_query, degrees, x, y){
    // x hacer
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        element.rotate(degrees, x, y);
    });
}

function moveSVGselection(_query, x, y){
    var bb=getBBoxFromSelection(_query);
    var dx=x-bb.x;
    var dy=y-bb.y;
    var xElemz = subjx( _query );
    var xDrag = xElemz.drag();
    xDrag.exeDrag( { dx:dx, dy:dy } );
    xDrag.disable();
}

function resizeSVGselection(_query, width, height){
    var bb=getBBoxFromSelection(_query);
    var dx=width-bb.width;
    var dy=height-bb.height;
    var xElemz = subjx( _query );
    var xResizr = xElemz.drag();
    xResizr.exeResize( { dx:dx, dy:dy } );
    xResizr.disable();
}

function getBBoxFromSelection(_query){
    var x=null, y=null, width=null, height=null;
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        var id=element.id;
        var bb=transformedBoundingBox(element.id);
        if( x==null || bb.x<x)x=bb.x;
        if( y==null || bb.y<y)y=bb.y;
        var iw=bb.x+bb.width;
        var ih=bb.y+bb.height;
        if( width==null  || iw>width)width=iw;
        if( height==null || ih>height)height=ih;
    });
    width=width-x;
    height=height-y;
    return {x:x, y:y, width:width, height:height };
}

function drawTextOpenType(_fontURL, _text, _id, _callback){
    //console.log(_fontURL+' ** '+_text);
    var gid=createID('text');
    if( _id!=null && _id!='undefined' )gid=_id;

    const createShape = (font, content) => {
        var pathString = '';
        const fontPaths = font.getPaths(content, 0, 0, 100);      //Font.getPath(text, x, y, fontSize, options)
        const paths = fontPaths.map(fontPath => {
            var path = fontPath.toSVG();
            var id=createID('letter');
            if(path!=null && path!='undefined'){
                if(path.length>3){
                    path=path.replace('<path','<path id="'+id+'" class="letter" stroke="#000000" vector-effect="non-scaling-stroke" stroke-width="1" fill-opacity="0.25" fill="rgb(145, 145, 145)"' );
                    _hnd['svgHandler'].insertAdjacentHTML( "beforeend", path );
                    var e=_hnd['svgHandler'].getElementById(id);    
                    if( e.hasAttribute("d") ){
                        var d=e.getAttributeNS(null, "d");
                        if(d==null || d=='undefined' || d.length<8){
                            e.remove();
                        }
                    }
                    pathString += path;
                    return pathString; 
                }
            }                           
        });

        var text=groupElements2("letter", 0, gid );
        text.setAttribute("class", "cosito");
        removeClassFromSelection("#"+gid+" .letter", "letter");

        var fw=transformedBoundingBox(gid);
        var px=(_workSetup['width']-fw.width)/2;
        var py=(_workSetup['height']-fw.height)/2;

        var elsel=document.getElementById(gid);
        elsel.moveTo(px, py);

        elsel=document.getElementById(gid);
        controlPointZ( "new", elsel );
        if( _callback!=null && _callback!='undefined' )_callback(elsel);
    }                
    const draw = (font) => {
        createShape(font, _text);
    }               
    opentype.load( "https://artdraw.org/svg" + _fontURL, (err, font) => draw(font));
}

function selectText(){
    if(sTool!="panelText")return;
    var ttsel=document.querySelectorAll("text.selectable").length;

    if(ttsel==0 || ttsel>1){
        document.getElementById("txt2path").value=""; 
        document.getElementById("drawText").textContent="Create Text"; 
    }
    if(ttsel==1 ){
        var txtSel= document.querySelector("text.selectable");
        var txt=cleanText(txtSel);

        document.getElementById("txt2path").value=txt; 
        document.getElementById("drawText").textContent="Modify Text";
        var ffm=txtSel.style["font-family"];
        var fsz=txtSel.style["font-size"];
        var fst=txtSel.style["font-style"];
        var fwe=txtSel.style["font-weight"];
        var txa=txtSel.style["text-anchor"];
        var txa1=txtSel.style['textAnchor'];
        var txa=document.querySelector("text.selectable tspan").style['textAnchor'];
        if(txa1==null && txa==null){
            txa="start";
        }else if(txa==null){
            txa=txa1;            
        }

        fsz = fsz.replace(/[^0-9.]/g, '');
        document.getElementById("panelTextFontSize").value=fsz;
        if(fst=='italic' && document.getElementById("drawtextItalic").hasClass("sel")==false )document.getElementById("drawtextItalic").classList.toggle("sel");
        if(fwe=='bold' && document.getElementById("drawTextBold").hasClass("sel")==false )document.getElementById("drawTextBold").classList.toggle("sel");
        removeClassFromSelection("#textSimpleControls .align", "sel");
        addClassForSelection("#textSimpleControls [rel-atr='"+txa+"']", "sel");
     
    }

    function cleanText(textElement){
        var textos = [];

        for (var i = 0; i < textElement.childNodes.length; i++) {
            var childNode = textElement.childNodes[i];
            if (childNode.nodeName === "#text") {
                // El nodo es texto no etiquetado
                var texto = childNode.nodeValue.trim();
                if (texto !== "") {
                    textos.push(texto);
                }
            } else if (childNode.nodeName === "tspan") {
                // El nodo es una etiqueta tspan
                var texto = childNode.textContent.trim();
                if (texto !== "") {
                    textos.push(texto);
                }
            }
        }
        return textos.join('\n');
    }
}

function text2SVGtext(e, txt, align){
    txt=txt.trim();
    var t='', lines = txt.split("\n");
    if(align==null)align="start";
    lines.forEach(function(value, index) {
        var v = value.replace(/\u200B/g, "");
        t+="<tspan x='0' dy='1em' style='text-anchor:"+align+"'>"+v+"​</tspan>";
        console.log(value);
    });
    if(e!=null)e.innerHTML=t;
    //console.log(t);
    return t;
}

function drawTextGoogleFonts( font, text ){
    var ttsel=document.querySelectorAll(".selectable").length;
    var fz=document.getElementById("panelTextFontSize").value;
    var fw="normal";
    if( document.getElementById("drawTextBold").hasClass("sel")==true )fw="bold";
    var fi="normal";
    if( document.getElementById("drawtextItalic").hasClass("sel")==true )fi="italic";
    var align=document.querySelector("#textSimpleControls .align.sel").getAttribute("rel-atr");

    var arrayUrl = font.split('/');
    var family = arrayUrl[arrayUrl.length - 1];
    family = family.split(".")[0];
    family = family.replace("-", " ");

    var style="@font-face { font-family: '"+family+"'; src: url(https://artdraw.org/svg"+font+"); }";
    _STYLES.append(style);

    if(ttsel==0){
        if ( text.length==0 ){
            Dialog( "Text", "Write some text.", "OK");
        }
        var newID=createID("text"); 
        var c=centerScreen(); 
        var t=text2SVGtext( null, text );     

        var str="<text id='"+newID+"' class='cosito selectable' fill='rgb(175, 252, 65)' stroke='rgb(0, 0, 0)' stroke-width='1' style='font-family:"+family+";font-weight:"+fw+";text-anchor:"+align+";font-style:"+fi+";font-size:"+fz+";fill:rgb(175, 252, 65);stroke:rgb(0, 0, 0);stroke-width:1;stroke-linejoin:round;'>"+t+"</text>";
        _hnd['svgHandler'].insertAdjacentHTML("beforeend", str);
        var bb=transformedBoundingBox(newID) ;
        var tx=c[0]-(bb.width/2);
        var ty=c[1]-(bb.height/2);
        var tfm="matrix( 1, 0, 0, 1, "+tx+", "+ty+")";
        document.getElementById(newID).setAttributeNS(null, "transform", tfm);
        UpdateZorderDoc();
        makeSelection(true);
    }else{
        var e=document.querySelectorAll("text.selectable")[0];

        text2SVGtext( e, text, align );
        var style="font-family:"+family+";font-weight:"+fw+";text-anchor:"+align+";font-style:"+fi+";font-size:"+fz+";";
        e.attr( {"style":style} );
        makeSelection(true);
    }   
    
}

function flatteearSel(){
    [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {
        flattenSimple( element.id );
    });
}

function createID(pref){
   if (typeof pref !== 'undefined' && pref)pref=pref+'-';
   else  pref='shape-';
   return pref+Math.floor(Math.random() * 1000000000);
}

function pathLengthFromID(_id){
    return document.getElementById(_id).getTotalLength();
}

function pathLengthFromPATH(pathArray){    
    const el = document.createElement('path');
    el.setAttribute('id', 'pathtmp');
    el.setAttribute('d', pathArray);
    document.body.appendChild(e);
    var largo=document.getElementById('pathtmp').getTotalLength();
}

function getParserPath(pathArray){
    var path = document.createElement('path');
    path.setAttribute('d',pathArray[0].toString() );
    return path;
}

function getPointAtLength(_id, _length){
    var p=document.getElementById(_id);
    var point = p.getPointAtLength(_length);
    return point;
}

function cursorPoint(evt, element) {
    pHandler.x = evt.clientX; 
    pHandler.y = evt.clientY;
    _evtMsg['clientX']= evt.clientX; 
    _evtMsg['clientY']= evt.clientY;
    
    var pto;         
    if (element === null){
        pto= pHandler.matrixTransform(_hnd['svgHandler'].getScreenCTM().inverse());
    }else{
        pto = pHandler.matrixTransform(element.getScreenCTM().inverse());
        //console.log("x:", pHandler.x+" y:"+pHandler.y);
    }
    pto.x=(pto.x).toFixed(4);
    pto.y=(pto.y).toFixed(4);
    return pto;    
}

function mouseMoveAreaWork(evt) {
      var cursorpt = cursorPoint(evt, _hnd['awHandler']);
      _evtMsg['mousePOS']=cursorpt;
      var nokiX=fourCartesian('x', cursorpt.x, 0);
      var nokiY=fourCartesian('y', cursorpt.y, 0);
      var p = 'X: ' + (nokiX).toFixed(2) + '  Y: ' + (nokiY).toFixed(2) + ' ' +_workSetup['units'] ;      
      infoXY.textContent =  p;   
}

function fourCartesian(_axis, _value, _mode){
    _value=Number(_value);
    if( _mode==0 ){
        if( _workSetup['zeroPos']==99 ) {
            if(_axis=='x')return _value;
            return _value;
        }else if( _workSetup['zeroPos']==1 ) {
            if(_axis=='x')return _value;
            return -_value;
        }else if( _workSetup['zeroPos']==2 ) {
            if(_axis=='x')return _value - _workSetup['width'];
            return -_value;
        }else if( _workSetup['zeroPos']==3 ) {
            if(_axis=='x')return _value - _workSetup['width'];
            return _workSetup['height'] - _value;
        }else if( _workSetup['zeroPos']==4 ) {
            if(_axis=='x')return _value;
            return _workSetup['height'] - _value;
        }else if( _workSetup['zeroPos']==5 ) {
            if(_axis=='x')return _value - _workSetup['width']/2;
            return _workSetup['height']/2 - _value;
        }
    }else{
        if( _workSetup['zeroPos']==99 ) {
            if(_axis=='x')return _value;
            return _value;
        }else if( _workSetup['zeroPos']==1 ) {
            if(_axis=='x')return _value;
            return -_value;
        }else if( _workSetup['zeroPos']==2 ) {
            if(_axis=='x')return _workSetup['width'] - ( -_value );
            return -_value;
        }else if( _workSetup['zeroPos']==3 ) {
            if(_axis=='x')return  _workSetup['width'] + _value ;
            return _workSetup['height'] - _value;
        }else if( _workSetup['zeroPos']==4 ) {
            if(_axis=='x')return _value;
            return _workSetup['height'] - _value;
        }else if( _workSetup['zeroPos']==5 ) {
            if(_axis=='x')return  _workSetup['width']/2 + _value;
            return _workSetup['height']/2 + (-_value);
        }
    }
    
}

function toClipboard(_delete){
    var caller=toClipboard.caller.name;
    clipboard='';
    [...document.getElementsByClassName("selectable")].forEach((element, index, array) => {
        clipboard+=element.outerHTML;
    });
    if(_delete==true || caller=='fnCall' ){
        [...document.getElementsByClassName("selectable")].forEach((element, index, array) => {
            element.remove();
        });
        HideSelector();
    }
}
function copyctxElement(){
    toClipboard(false);
}
    
function pasteClipboard(evt){
    //var caller=toClipboard.caller.name;
    var t=clipboard;
    if(t==null)return;

    var v=0;
    [...document.querySelectorAll(".frmModal")].forEach((element, index, array) => {        
        if( checkVisibility(element)==true )v++;
    });
    if( v>0 )return;  

    //console.log(t);
    var ids='';
    t = t.replace(/ id=".*?"/g, function(match, contents, offset, input_string){
        let n=createID('path');
        ids+="#"+n+",";
        return ' id="'+n+'"'  ;
    });
    ids=ids.slice(0, -1);

    if( evt.shiftKey==false){
        var idGroup=createID('groupTMP');
        _hnd['svgHandler'].insertAdjacentHTML("beforeend", "<g id='"+idGroup+"'>"+t+"</g>");
        var elsel=document.getElementById(idGroup);
        elsel.moveTo( _evtMsg['mousePOS'].x, _evtMsg['mousePOS'].y );
        unGroupElements(idGroup);
    }else{
        _hnd['svgHandler'].insertAdjacentHTML("beforeend", t); 
        addClassForSelection(ids, "copiedShapes");
    }
        
    controlPointZ("new", ".copiedShapes");
    removeClassFromSelection(ids, "copiedShapes" );
}

function transformedBoundingBox(id){
      //https://stackoverflow.com/questions/10623809/get-bounding-box-of-element-accounting-for-its-transform
      if(checkID(id)==false )return;
      var el=document.getElementById(id);

      //console.log( el.tagName+" > "+el.id );
      var bb  = el.getBBox(),
          svg = el.ownerSVGElement,
          m   = el.getTransformToElement(el.parentNode);
    
      // Create an array of all four points for the original bounding box
      var pts = [
        svg.createSVGPoint(), svg.createSVGPoint(),
        svg.createSVGPoint(), svg.createSVGPoint()
      ];
      pts[0].x=bb.x;          pts[0].y=bb.y;
      pts[1].x=bb.x+bb.width; pts[1].y=bb.y;
      pts[2].x=bb.x+bb.width; pts[2].y=bb.y+bb.height;
      pts[3].x=bb.x;          pts[3].y=bb.y+bb.height;
    
      // Transform each into the space of the parent,
      // and calculate the min/max points from that.    
      var xMin=Infinity,xMax=-Infinity,yMin=Infinity,yMax=-Infinity;
      pts.forEach(function(pt){
        pt = pt.matrixTransform(m);
        xMin = Math.min(xMin,pt.x);
        xMax = Math.max(xMax,pt.x);
        yMin = Math.min(yMin,pt.y);
        yMax = Math.max(yMax,pt.y);
      });
    
      // Update the bounding box with the new values
      bb.x = xMin; bb.width  = xMax-xMin;
      bb.y = yMin; bb.height = yMax-yMin;

      if(el.tagName=="text"){
        var bbcr=el.getBoundingClientRect();
        bb.width=bbcr.width;
        bb.height=bbcr.height;
      }

      return bb;
}

function alignShapesPreview(_finish){         
    removeAllFromSelection(".preview");
    if( document.querySelectorAll(".cosito.selectable").length==0){        
        return;
    }
    var moveTO=document.querySelector("input[name='alignT']:checked").value;
    var moveTOx=Number(document.getElementById('moveTOx').value);
    var moveTOy=Number(document.getElementById('moveTOy').value);
    var selItems=document.querySelectorAll(".selectable").length;
    var cta=0, bbLast=null, bbox=null, g="", mX=0, mY=0;

    if( selItems==1 ){
         bbox = transformedBoundingBox("workMain");
         addClassForSelection('.selectable', "moveTO");
    }else{       
        [...document.querySelectorAll(".selectable")].forEach((element, index, array) => {        
            cta++;
            if( cta==1 ){
                bbLast=element.id; 
                bbox = transformedBoundingBox(bbLast);
            }else{
                element.classList.add('moveTO'); 
            } 
        }); 
    }

    if(_finish===true){
        g=groupElements2("moveTO", 0, "xxx" );
        g.setAttribute("class","preview");
    }else{
        cloneSelection(".moveTO", "preview");
        g=groupElements2("preview", 0, "xxx" );
        g.setAttribute("class","preview");
    }    
         
    if( moveTO==1 || moveTO==7 || moveTO==8 )mX=bbox.x;
    if( moveTO==2 || moveTO==9 || moveTO==6 )mX=bbox.x+(bbox.width/2);
    if( moveTO==3 || moveTO==4 || moveTO==5 )mX=bbox.x+bbox.width;
         
    if( moveTO==1 || moveTO==2 || moveTO==3 )mY=bbox.y;
    if( moveTO==4 || moveTO==8 || moveTO==9 )mY=bbox.y+(bbox.height/2);
    if( moveTO==5 || moveTO==6 || moveTO==7 )mY=bbox.y+bbox.height;

    var bb=transformedBoundingBox("xxx");
    var w=0, h=0;
    w=bb.width/2;
    h=bb.height/2;
    var elsel=document.getElementById("xxx");
    elsel.moveTo( mX - w + moveTOx  , mY - h + moveTOy );
    unGroupElements( "xxx"  );

    removeClassFromSelection(".selectable", "moveTO");
    if(_finish===true){
        //console.log("finish");
    }
}

function roundBBoxPreview(){
    removeAllFromSelection(".preview");
    if( document.querySelectorAll(".cosito.selectable").length==0){        
        return;
    }
    var roundB1=Number(document.getElementById('roundB1').value);  
    var roundB2=Number(document.getElementById('roundB2').value);  
    var roundB3=Number(document.getElementById('roundB3').value);  
    var roundB4=Number(document.getElementById('roundB4').value);  
        
    var roundB1r=document.getElementById('roundB1r').checked;  
    var roundB2r=document.getElementById('roundB2r').checked;
    var roundB3r=document.getElementById('roundB3r').checked;
    var roundB4r=document.getElementById('roundB4r').checked;
         
    var id=document.querySelector('.selectable').getAttribute('id');
    var bbox = transformedBoundingBox(id);
        
    var p=null, rm='1';
    var yr=bbox.y+roundB1;
    rm='1';
    if( roundB1r==true )rm='0';
    if( roundB1>0 ){
        p='M'+bbox.x+','+yr+' a '+roundB1+','+roundB1+' 0 0 '+rm+' '+roundB1+',-'+roundB1+' ';
    }else{
        p='M'+bbox.x+','+bbox.y+' ';
    }
    rm='1';
    if( roundB2r==true )rm='0';
    var wx=bbox.width-(roundB2+roundB1);
    if( roundB2>0 ){
        p+='h '+wx+' a '+roundB2+','+roundB2+' 0 0 '+rm+' '+roundB2+','+roundB2+' ';
    }else{
        p+='h '+wx+' ';
    }
    rm='1';
    if( roundB3r==true )rm='0';
    var hy=bbox.height-(roundB2+roundB3);
    if( roundB3>0 ){
        p+='v '+hy+' a '+roundB3+','+roundB3+' 0 0 '+rm+' -'+roundB3+','+roundB3+' ';
    }else{
        p+='v '+bbox.height+' ';
    }
    rm='1';
    if( roundB4r==true )rm='0';
    var c4=bbox.width-(roundB3+roundB4); 
    if( roundB4>0 ){
        p+='h '+-c4+' a '+roundB4+','+roundB4+' 0 0 '+rm+' -'+roundB4+',-'+roundB4+' ';
    }else{
        p+='h '+-c4+' ';
    }
    p+='Z';
    //console.log(p);         
    drawSolutionPreview(p, "blue", 0.5, "#9acd324a");
}

function groupElements(_class, _selectGroup, _newClass, _removeClass, _childClass){
    //_selectGroup=0 return element, 1 return id  
    var idGroup=createID('group');
    var group = createSVGElement('g', idGroup);        
    
    //console.log('agrupado clase:'+_class+' => id:'+idGroup); 
    group.setAttribute("id", idGroup );    
    if (typeof _newClass !== 'undefined' && _newClass)group.setAttribute("class", _newClass );
        
    var els = document.getElementsByClassName(_class);     
    //console.log('els hallados:'+els.length);  
    Array.from(els).forEach((el) => {
        if(_removeClass==true) el.classList.remove('cosito', 'selectable', 'groupTMP');
        if (typeof _childClass !== 'undefined' && _childClass)el.classList.add(_childClass);
        group.appendChild(el);
    });
    _hnd['svgHandler'].appendChild(group);
    if( _selectGroup==0 ) return group;
    return idGroup;
}

function groupElements2(_class, _selectGroup, _newID){
    //_selectGroup=0 return element, 1 return id  
    var group = createSVGElement('g');        
    group.setAttribute("id", _newID );    
        
    var els = document.getElementsByClassName(_class);     //console.log('els hallados:'+els.lngth);  
    Array.from(els).forEach((el) => {
        group.appendChild(el);
    });
    _hnd['svgHandler'].appendChild(group);
    if( _selectGroup==0 ) return group;
    return _newID;
}

function groupElementbySelection(_query, _selectGroup, _newID){
    //_selectGroup=0 return element, 1 return id
    //console.log("groupElementbySelection query:"+_query+" selectGroup:"+_selectGroup+" newID:"+_newID);
    var cta=0, ok=false, group=null; 
    [...document.querySelectorAll(_query)].forEach((element, index, array) => {
        if(cta==0){
            group = createSVGElement('g', true, _newID);        
            ok=true;
        }
        group.appendChild(element);
        cta++;
    });
    if(ok==true){
        _hnd['svgHandler'].appendChild(group);
    }
    if( _selectGroup==0 ) return group;
    return _newID;
}

function groupElementsAdd(_idGroup, _element ){
    var group=document.getElementById(_idGroup);
    if(group!==null){
        group.appendChild(_element);
    }
    return group;
}

function groupRemoveElement(_idGroup, _element ){
    var group=document.getElementById(_idGroup);
    if(group!==null){
        _hnd['svgHandler'].appendChild(_element);
    }
    return _element;
}

function unGroupElements(_id, _childClass ){
    //console.log('desagrupando id:'+_id);
    if( document.getElementById(_id).tagName != "g" )return;
    if(_id==null || _id=='undefined' || _id==''){
        console.log("No se puede desagrupar elemento sin ID");
        return;
    }
    var parent = document.getElementById(_id);
    var childrens = parent.childNodes;
    //console.log("total childs:"+childrens.length);
    [...childrens].forEach((element, index, array) => {         
        if( isDomEntity(element)==true ){
            var id=element.id;
            if(id==null || id=='undefined' || id==''){
                id=createID("impTMP");
                element.id=id;
            }
            if (typeof _childClass !== 'undefined' && _childClass)element.setAttribute("class", _childClass );
            flattenSimple( id );
            _hnd['svgHandler'].appendChild(element);
        }                
    });
    parent.remove();
}
function unGroupElementsE(_e, _childClass ){
    var parent = _e;
    var childrens = parent.childNodes; 

    [...childrens].forEach((element, index, array) => {
         if (typeof _childClass !== 'undefined' && _childClass)element.setAttribute("class", _childClass );
         var tag=element.tagName;
         var id=element.id;
         if(tag=='undefined' || tag==null){
            console.log("error");
            console.log(element);
         }else{
            
            flattenSimple( id );
            //_hnd['svgHandler'].appendChild(element);
            console.log("agregar");
            console.log(element);
         }
         
    });
    parent.remove();
}

function createSVGElement(name, _isCosito, _newID) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', name);
    element.setAttribute('id', _newID);
    if( _isCosito===true ){
        if(name!="g")element.setAttribute('stroke-width', '1');         
        if(name!="g")element.setAttribute('vector-effect', 'none');
        if(name!="g")element.setAttribute('stroke', '#000000');  
        if(name!="g")element.setAttribute('stroke-opacity', '1');   
        if(name!="g") element.setAttribute('fill', colorA); 
        if(name!="g")element.setAttribute('fill-opacity', "0.25");
        element.setAttribute('class', 'cosito');        
    }    
    return element;
}

function bolita(x,y, radius, cl){
    var circle=createSVGElement('circle');
    circle.setAttributeNS(null, 'cx', x);
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'r', radius);
    circle.setAttributeNS(null, 'style', 'fill: '+cl+'; stroke: black; stroke-width: 0.2px;' );
    circle.setAttribute("class", 'cosito' );
    _hnd['svgHandler'].appendChild( circle ); 
    return circle;
}

function restoreKeys(){
    _evtMsg['isDrawSelector']=false;
    _evtMsg['dragSPsel']=null;
    if(_hnd['selector']!=null && _hnd['selector']!='undefined' ) _hnd['selector'].remove();
    _hnd['selector']=null;
    closeEditNodes();
    closeEditTabs();
    closeDrawPoly('');
    _selector['SELTOOL']='SELROJO'; 
    _evtMsg['selectorShapeSVG']=null;
    document.onmousedown=null;
    removeClassFromSelection("#btnHandLine", "sel");

    HideSelector();
    removeClassFromSelection(".cosito.selectable", "selectable");
    setAttributeForSelection(".cosito.selectable", 'selItem', 0);
    noneSelected();

    [...DEFS.querySelectorAll("filter, linearGradient, radialGradient, pattern")].forEach((element, index, array) => {
        var idf=element.id;
        if(element.id!='patternBool'){
            if( element.tagName=="filter" ){
                if( document.querySelectorAll('[filter="url(#'+idf+')"').length==0 )element.remove();
            }else{
                var f=document.querySelectorAll('[fill="url(#'+idf+')"').length;
                f+=document.querySelectorAll('[stroke="url(#'+idf+')"').length;
                if( f==0 )element.remove();
            }
        }
    });
}

function busyON(author) {     
    //console.log('BUSY ON Autor:'+author);
    _evtMsg['busy']=true;    
}

function busyOFF() {     
   setTimeout(function () { _evtMsg['busy']=false;  }, 100); 
}

const distancer = (p1, p2) => Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
const midpoint = (x1, y1, x2, y2) => [(x1 + x2) / 2, (y1 + y2) / 2];

function moveUp(element) {
  if(element.previousElementSibling)
    element.parentNode.insertBefore(element, element.previousElementSibling);
}

function moveDown(element) {
  if(element.nextElementSibling)
    element.parentNode.insertBefore(element.nextElementSibling, element);
}

function combinePaths(_class, _deleteOrigin, _createElement, _return){
    var path='';
    var ttSel=document.querySelectorAll(".cosito.selectable").length;

    if( ttSel==0 ){
        Dialog("Combine - Split Shapes", "<b>To Combine:</b> Select 2 or more shapes.<br><b>To Split:</b> Select ONE combined shape", "OK" );
        return;
    }
    if( ttSel==1 ){
        var isOK=isShapeCombined(document.querySelectorAll(".cosito.selectable")[0].id);
        if(isOK==false){
            Ayuda( "SPLIT: The selected shape is not merged !!" );
            return;
        }
        controlPointZ("iniDRR");
        splitShapes( document.querySelectorAll(".cosito.selectable")[0].id );
        controlPointZ("uncombine");
    }
    if( ttSel>1 ){
        _createElement=true;
        controlPointZ("iniDRR");
        combineShapes( );
        controlPointZ("combine");
    }

    function splitShapes(_id){
        flattenSimple(_id);
        var e=document.getElementById(_id);
        var d=e.getAttributeNS( null, 'd');
        var dr=d.split('M');
        dr.forEach(function(item){
            //console.log(item.length);
            if(item.length>0){
                var newID=createID("path");
                var s=createSVGElement("path", true, newID);
                s.setAttribute( 'd', 'M'+item );
                _hnd['svgHandler'].appendChild(s);
                addClassForSelection("#"+newID, "selectable");  
            }            
        });
        e.remove();
        removeClassFromSelection("#liCombine", "sel");
    }

    function combineShapes(){
        [...document.getElementsByClassName(_class)].forEach((element, index, array) => {
            flattenSimple(element.id);
        });
        [...document.getElementsByClassName(_class)].forEach((element, index, array) => {
            path+=element.getAttributeNS( null, 'd')+"Z";
        });
        if( _createElement===true ){
            var id=createID('shape');
            var e=createSVGElement('path', true, id);
            e.setAttributeNS(null, 'd', path);
            e.setAttributeNS(null, 'fill-rule', "evenodd");
            _hnd['svgHandler'].appendChild(e);
            if(_return!==null && _return){
                _return.path=path;
                _return.id=id;
            } 
            if(_deleteOrigin===true){
                [...document.getElementsByClassName('selectable')].forEach((element, index, array) => {
                    element.remove(  );
                });
            }   
            addClassForSelection("#"+id, "selectable");        
            return e;
        }
        addClassForSelection("#liCombine", "sel");
    }
    
    //return path;
}

function isShapeCombined(_id){
    var e=document.getElementById(_id);
    var d=e.getAttributeNS( null, 'd');
    if(d==null || d=='undefined')return;
    d=d.trim();
    var l=d.length;
    var pos1=d.indexOf("M", 1);
    var pos2=d.indexOf("m", 1);
    //console.log("len:"+l+" pos1:"+pos1+" pos2="+pos2);
    if( (pos1<l-1 && pos1>1) || (pos2<l-1 && pos2>1) )return true;
    return false;    
}

function flip(_id, _mirrorType){
    var eflip = document.getElementById(_id);
    var bbox=eflip.getBBox();
    var cx=(bbox.x*2) + (bbox.width);
    var cy=(bbox.y*2) + (bbox.height);        
    
    var matrix = _mirrorType == 1 ? 'matrix(-1,0,0,1,'+cx+',0)' : 'matrix(1,0,0,-1,0,'+cy+')';
    eflip.setAttribute("transform", matrix );
}

function isOverLine(_point, e){ 
    const point = _hnd['svgHandler'].createSVGPoint();
    point.x = _point.x;
    point.y = _point.y; 
    var isOver=e.isPointInStroke(point);
    if( isOver==false)return false;  
    return true;
}

function closeEditTabs(){
    [...document.querySelectorAll(".tabsEdit")].forEach((element, index, array) => {
      element.classList.remove("tabsEdit");   
  
      var totalTabs=document.querySelectorAll(".oneTab."+element.id).length;
      if(totalTabs==0){
        element.classList.remove("subCosito");
        element.classList.add("cosito");
      }else{
        element.classList.remove("cosito");
        element.classList.add("subCosito");
        var g=groupElementsAdd('tabs-'+element.id, element );
        g.classList.add("cosito");
        addClassForSelection(".oneTab", "hide");
      }
    });
    document.onmousemove=null;
    document.onclick=null;
}

function roundShow(number){
    number=Number(number);
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 4, minimumFractionDigits: 4, useGrouping: false }).format(number);
}

function trunc(num, dec) {
    const pow = 10 ** dec
    return Math.trunc(num * pow) / pow
}

function Ayuda(text){
    if(_useHelp==false)return;
    const regex = /@@/ig;
    text=text.replaceAll(regex, '<br>');
    document.getElementById("AYUDA").show().innerHTML = text;
}

function Confirm(title, msg, $true, $false, funCallback) { 
        var $content =  "<div class='dialog-ovelay'>" +
                        "<div class='dialog'><header>" +
                         " <h3> " + title + " </h3> " +
                         "<i class='fa fa-close'></i>" +
                     "</header>" +
                     "<div class='dialog-msg'>" +
                         " <p> " + msg + " </p> " +
                     "</div>" +
                     "<footer>" +
                         "<div class='controls'>" +
                             " <button class='button button-danger doAction'>" + $true + "</button> " +
                             " <button class='button button-default cancelAction'>" + $false + "</button> " +
                         "</div>" +
                     "</footer>" +
                  "</div>" +
                "</div>";

        document.body.insertAdjacentHTML('afterbegin', $content);

        document.querySelectorAll('.doAction').forEach(function(element) {
            element.addEventListener('click', function() {
              eval(funCallback());
              var overlay = this.closest('.dialog-ovelay');
              overlay.parentNode.removeChild(overlay);
            });
        });

        const cancelActions = document.querySelectorAll('.cancelAction, .fa-close');
        cancelActions.forEach(function(cancelAction) {
            cancelAction.addEventListener('click', function() {
            const dialog = this.closest('.dialog-ovelay');
            dialog.style.display = 'none';
            dialog.parentNode.removeChild(dialog);
            });
        });     
}

function Dialog(_title, _msg, _boton){
    document.querySelector("#frmGenericDialog .modal-header h2").textContent = _title;
    document.querySelector("#frmGenericDialog .modal-body").innerHTML = _msg;
    document.querySelector("#btnGenericDialogCancel").innerHTML = " &nbsp; " + _boton + " &nbsp; ";
    showModal("frmGenericDialog");
}

function normalize( vr,  d1,  d2,  x_min,  x_max ){   
    var rta;
    if(x_max==x_min)x_max+=0.00001;
    rta=( ( (vr-x_min)*(d2-d1) ) / (x_max-x_min) ) + d1;
    return(rta);
 }

function centerScreen(){
    var e=document.getElementById("workMain");
    var w=Number(e.getAttribute("width"));
    var h=Number(e.getAttribute("height"));
    return [w/2, h/2];
}

function centerWorkArea(){
    var e=document.getElementById("svgWorkerArea");
    var cssObj = window.getComputedStyle(e, null);
    var w = parseFloat( cssObj.getPropertyValue("width") ); 
    var h = parseFloat( cssObj.getPropertyValue("height") );
    console.log("w:"+w+" h:"+h);
    return [w/2, h/2];
}

function UpdateZorderDoc(){
    areaWorker.back();
}

function previewRough(){
    //removeAllFromSelection(".preview");
    if(sTool!='panelRough')return;
    var tagName=null, ttSel=document.querySelectorAll(".cosito.selectable").length;
    if(ttSel>0){
        tagName=document.querySelectorAll(".cosito.selectable")[0].tagName;
    }
    
    if(ttSel==0 || ttSel>1 || tagName!="path"){
        visibilityForSelection("#tbConfigRough", "none");
        visibilityForSelection("#roughNoSel", "block");
        return;
    }
    visibilityForSelection("#tbConfigRough", "block");
    visibilityForSelection("#roughNoSel", "none");

    var fillStyle=document.getElementById("roughStyle").value;
    var fill=document.getElementById("fillColorRough").value;   
    var stroke=document.getElementById("borderColorRough").value;
    var fillWeight=document.getElementById("fillWeightRough").value;
    var strokeWidth=document.getElementById("strokeWidthRough").value;
    var bowing=document.getElementById("bowingRough").value;
    var hachureGap=document.getElementById("hachureGapRough").value;
    var roughness=document.getElementById("roughnessRough").value;

    var colorOK=parseColor(fill, "ARRAY");
    var opacityFillOK=colorOK[2]["alpha"];
    fill="rgb("+colorOK[2]['red']+","+colorOK[2]['green']+","+colorOK[2]['blue']+")";

    var strokeOK=parseColor(stroke, "ARRAY");
    var opacityStrokeOK=strokeOK[2]["alpha"];
    stroke="rgb("+strokeOK[2]['red']+","+strokeOK[2]['green']+","+strokeOK[2]['blue']+")";
    
    removeClassFromSelection(".cosito.hidetmp", "hidetmp");
    flattenSimple( document.querySelectorAll(".cosito.selectable")[0].id );
    var path=document.querySelectorAll(".cosito.selectable")[0].getAttribute("d");
    addClassForSelection(".cosito.selectable", "hidetmp");
    
    const rc = rough.svg(_hnd['svgHandler']);
    var x= rc.path( path, { 
        fillStyle:fillStyle,
        fill: fill, 
        stroke:stroke, 
        fillWeight:fillWeight, 
        strokeWidth:strokeWidth,         
        bowing:bowing, 
        hachureGap:hachureGap, 
        roughness:roughness, 
        seed:12345 
    });
    x.id=createID("group");
    x.classList="preview";
    [...x.querySelectorAll("path")].forEach((element, index, array) => {
        element.id=createID("path");
        element.classList="grouped";
        var strokeC=element.getAttribute("stroke");
        if(strokeC==fill){
            element.setAttribute("stroke-opacity", opacityFillOK );
        }else if(strokeC==stroke){
            element.setAttribute("stroke-opacity", opacityStrokeOK );
        }else{
            element.setAttribute("stroke-opacity", "1" );
        }
    });

    _hnd['svgHandler'].appendChild(x);
}

function applyRough(){
    if(sTool!='panelRough')return;
    var ttSel=document.querySelectorAll(".cosito.selectable").length;
    if(ttSel==0 || ttSel>1){
        visibilityForSelection("#tbConfigRough", "none");
        visibilityForSelection("#roughNoSel", "block");
        return;
    }
    visibilityForSelection("#tbConfigRough", "block");
    visibilityForSelection("#roughNoSel", "none");

    addClassForSelection('.preview', "cosito selectable");
    controlPointZ("new", ".preview");
    removeClassFromSelection(".preview", "preview");
    removeAllFromSelection(".hidetmp");    
    
    makeSelection(true); 
    [...document.querySelectorAll(".toolPanel")].forEach((element, index, array) => {        
        element.hide();
    });
    sTool="";
}

function loadFilter(){
    restoreFilters();
    if(sTool!="panelEffects")return;
    var ttsel=document.querySelectorAll(".selectable").length;
    if(ttsel==0){
        visibilityForSelection("#filtersNO", "block");
        visibilityForSelection("#tbConfigFilters", "none");
        return;
    }
    var element=document.querySelectorAll(".selectable")[0];
    var typeFilter=document.getElementById("typeFilter").value;
    visibilityForSelection("#filtersNO", "none");
    visibilityForSelection("#tbConfigFilters", "block");
    visibilityForSelection("#removeFilter", "none");
    visibilityForSelection("#applyFilter", "");
    document.getElementById('typeFilter').disabled = false;

    var update=false, fx=element.getAttribute("idfilter");
    if(fx!=null){
        document.getElementById("typeFilter").value=fx;
        visibilityForSelection("#removeFilter", "");
        visibilityForSelection("#applyFilter", "none");
        document.getElementById('typeFilter').disabled = true;
        typeFilter=fx;
        update=true;  
    }
    
    if(typeFilter==-1)visibilityForSelection("#applyFilter", "none");
    
    var controlCon=document.getElementById("effectsParams");
    controlCon.innerHTML="";
    
    var idFilter="filter-"+element.id;
    document.getElementById("applyFilter").setAttribute("idFilter", idFilter);
    document.getElementById("removeFilter").setAttribute("idFilter", idFilter);
    if(update==false){
        removeID(idFilter);
    }    

    if(typeFilter==-1)return;
    var filter=_FILTERS[typeFilter];
    document.getElementById("applyFilter").setAttribute("fx", typeFilter);
    document.getElementById("removeFilter").setAttribute("fx", typeFilter);

    reg = /([^[]+(?=]))/g;   
    filter.match(reg).forEach(element => {
        loadEffectParam(element, update);         
    });
    if(update==false){
        writeEffects();
    }
    

    function loadEffectParam(params, upd){
        var r = params.split(";");
        var attr=r[0];
        if(attr=='idfilter') return;

        var val=r[2];
        var min=r[3];
        var max=r[4];
        var mod=r[5];
        var control='';
        var idv=mod+"-"+attr;
        if(upd==true){
            
            val=document.querySelector( "#"+idFilter+" [mod='"+mod+"']" ).getAttributeNS(null, attr);
        }

        var step=( Number(max)-Number(min) )/100;
        var attrTxt=attr;
        if(attr=="flood-color")attrTxt="Color";
        if(attr=="flood-opacity")attrTxt="Opacity";

        if(r[6]!="px")step=r[6];

        if( r[1]=="number" ){
            control='<table class="w-100"><tr><td>'+attrTxt+'</td><td><input idv="'+idv+'" change="updateEffectParams" thefilter="'+idFilter+'" mod="'+mod+'" attr="'+attr+'" type="number" value="'+val+'" min="'+min+'" max="'+max+'" step="'+step+'" style="width:96%;"></td><td id="'+idv+'">'+val+'</td></tr></table>';
        }else if( r[1]=="range" ){
            control='<table class="w-100"><tr><td>'+attrTxt+'</td><td><input idv="'+idv+'" change="updateEffectParams" thefilter="'+idFilter+'" mod="'+mod+'" attr="'+attr+'" type="range" value="'+val+'" min="'+min+'" max="'+max+'" step="'+step+'" style="width:96%;"></td><td id="'+idv+'">'+val+'</td></tr></table>';
        }else if( r[1]=="color" ){
            control='<table class="w-100"><tr><td>'+attrTxt+'</td><td><input idv="'+idv+'" change="updateEffectParams" thefilter="'+idFilter+'" mod="'+mod+'" attr="'+attr+'" type="color" value="'+val+'" style="width:96px;"></td></tr></table>';
        }
        controlCon.insertAdjacentHTML( "beforeend", control );
        filter=filter.replace("["+params+"]", val);
    }

    function writeEffects(){
        var f=filter;
        f=f.replace("[idfilter]", idFilter);
        //console.log(f);
        DEFS.insertAdjacentHTML( "beforeend", f );
        element.setAttributeNS(null, "filter", "url(#"+idFilter+")" );
    }
}

function updateEffectParams(event){
    var idFilter=event.target.getAttribute("thefilter");
    var mod=event.target.getAttribute("mod");
    var attr=event.target.getAttribute("attr");
    var idv=event.target.getAttribute("idv");
    var value=event.target.value;
    //document.querySelectorAll("#"+idFilter+" [mod='"+mod+"']" )[0].setAttributeNS(null, attr, value );
    setAttributeForSelection("#"+idFilter+" [mod='"+mod+"']", attr, value );
    document.querySelectorAll("#"+idv)[0].innerHTML=value;
    //console.log(event.target);
}

function applyFilter(event){
    var idfilter=event.target.getAttribute("idfilter");
    var fx=event.target.getAttribute("fx");
    removeClassFromSelection("#"+idfilter, "preview");
    setAttributeForSelection("#removeFilter", "idfilter", idfilter);
    visibilityForSelection("#removeFilter", "");
    visibilityForSelection("#applyFilter", "none");
    var idf=idfilter.replace("filter-", "");
    setAttributeForSelection("#"+idf, "idfilter", fx);
}

function removeFilter(event){
    var idfilter=event.target.getAttribute("idfilter");
    removeID(idfilter);
    document.querySelectorAll(".selectable" )[0].removeAttribute( "filter" );
    document.querySelectorAll(".selectable" )[0].removeAttribute( "idfilter" );
    visibilityForSelection("#removeFilter", "none");
}

function restoreFilters(){
    var ttf=document.querySelectorAll("filter.preview").length;
    if( ttf>0 ){
        [...document.querySelectorAll("filter.preview")].forEach((element, index, array) => {
            var idf=element.id;
            idf=idf.replace("filter-", "");
            var e=document.getElementById(idf);
            if(e!=null)e.removeAttribute("filter");
        });
    }
}

function trilateration(points, distances) {
    // Inicializar las variables
    var n = points.length;
    var A = new Array(n - 1);
    var b = new Array(n - 1);
    var x = new Array(n);
  
    // Calcular las distancias relativas entre los puntos
    for (var i = 0; i < n - 1; i++) {
      A[i] = new Array(2);
      b[i] = (Math.pow(distances[i], 2) - Math.pow(distances[n - 1], 2) +
              Math.pow(points[n - 1][0], 2) - Math.pow(points[i][0], 2) +
              Math.pow(points[n - 1][1], 2) - Math.pow(points[i][1], 2)) / 2;
      A[i][0] = points[i][0] - points[n - 1][0];
      A[i][1] = points[i][1] - points[n - 1][1];
    }
  
    // Resolver el sistema de ecuaciones
    var AT = numeric.transpose(A);
    var ATA = numeric.dot(AT, A);
    var ATb = numeric.dot(AT, b);
    x = numeric.solve(ATA, ATb);
  
    // Calcular la posición del objeto
    var x1 = points[n - 1][0] + x[0];
    var y1 = points[n - 1][1] + x[1];
    return [x1, y1];
}

function path2ArraySimple(d, error ){
    var d=document.querySelector(".selectable").getAttribute('d');
    var r=SVGPATH(d);
    r=r['segments'];
    //console.log(r);
    var x=[];
    for(var i=0; i<r.length-1; i++){
        var s=r[i];
        if( s.length==3 ){
            x.push( [ s[1], s[2] ] );
        }else{
            for(j=1; j<s.length-1; j+=2){
                var p=[ s[j], s[j+1] ];
                x.push(p);
            }
        }
        
    }
    bezierCurves = fitCurve(x, error);
    var dx= 'M'+bezierCurves.toString();

    SVGdraw( 'path', { "id":createID(), "d":dx, "stroke":"red", "fill":"none", "class":"preview" } );

}

function loadScript(url, id, callback) {
    if (document.getElementById(id)) {
      return;
    }
  
    var script = document.createElement('script');
    script.src = url;
    script.id = id;
  
    if (callback && typeof callback === 'function') {
      script.addEventListener('load', callback);
    }
  
    document.body.appendChild(script);
  }
    /////////////// CLIPPER UTILS
    // PATH tuto OK https://css-tricks.com/svg-path-syntax-illustrated-guide/
    // ver paths https://svg-path-visualizer.netlify.app/
    //crear nuevo path en base a transformaciones   https://github.com/fontello/svgpath
    // manejo fuentes   SVG  https://github.com/kartsims/easysvg aplica matrix transformacion al path OJO PHP ??
    // APLICAR TRANSFORMACIONES al PATH perfecto !!   http://jsfiddle.net/nrjvmqur/   flatten(document.getElementById('svg'));
    //http://output.jsbin.com/ivomiq/7. 
    //convertir path a poligonos  https://github.com/Phrogz/svg-path-to-polygons
    // manejode fuentes texto OPENTYPEJS  https://stackoverflow.com/questions/71252755/create-svg-path-using-svg-js-and-opentype-js
function convertPolyToPath(points){
    // HACK convierte un path x,y x,y ... a formato ML00Z
    points = points.split(/\s+|,/);
    var x0=points.shift(), y0=points.shift();
    var pathdata = 'M'+x0+','+y0+'L'+points.join(' ');
    pathdata+='z';
    return pathdata;
}

function normalize_clipper_poly(polystr, quiet) {
//convierte un PATH SIN CURVAS al formato clipper
    if (typeof (polystr) != "string") return false;
    polystr = polystr.trim();
    var np, txt;
    if (polystr.substr(0, 1).toUpperCase() === "M") {
      np = svgpath_to_clipper_polygons(polystr);
      if (np === false) {
        txt = "Unable to parse SVG path string.\n";
        txt += "Click OK to continue.\n";
        if (!quiet) alert(txt);
        return false;
      }
      else return JSON.stringify(np);
    }
    polystr = polystr.replace(/[\s,]+/g, ",");
    if (polystr.substr(0, 1) !== "[") polystr = "[" + polystr;
    if (polystr.substr(-1, 1) !== "]") polystr = polystr + "]";
    try {
      polystr = polystr.replace(/X/gi, '"X"').replace(/Y/gi, '"Y"').replace(/""/g, '"'); // if " is missing
      var poly = JSON.parse(polystr);
    }
    catch (err) {
      txt = "Unable to parse polygon string.\n";
      txt += "Error: " + err.message + "\n";
      txt += "Click OK to continue.\n";
      if (!quiet) alert(txt);
      return false;
    }
    // if only points without "X" and "Y"
    var temp_n = [],
      i;
    if (isArray(poly) && poly.length && typeof (poly[0]) == "number") {
      var len = poly.length;
      for (i = 0; i < len; i = i + 2) {
        temp_n.push({
          X: poly[i],
          Y: poly[i + 1]
        });
      }
      poly = temp_n;
    }
    // if an array of array of points without "X" and "Y"
    var temp_n2 = [],
      i, j, len, len2;
    if (isArray(poly) && poly.length && isArray(poly[0]) && typeof (poly[0][0]) != "undefined" &&
      typeof (poly[0][0].X) == "undefined" &&
      typeof (poly[0][0].x) == "undefined") {
      len2 = poly.length;
      for (j = 0; j < len2; j++) {
        temp_n = [];
        len = poly[j].length;
        for (i = 0; i < len; i = i + 2) {
          temp_n.push({
            X: poly[j][i],
            Y: poly[j][i + 1]
          });
        }
        temp_n2.push(temp_n);
      }
      poly = temp_n2;
    }
    // if not array of arrays, convert to array of arrays
    if (isArray(poly) && poly.length > 0 && !isArray(poly[0])) poly = [poly];
    var pp, n = [
        []
      ],
      m, pm, x, y;
    np = [
      []
    ];
    for (i = 0, m = poly.length; i < m; i++) {
      np[i] = [];
      for (j = 0, pm = poly[i].length; j < pm; j++) {
        pp = {};
        y = null;
        x = null;
        if (typeof (poly[i][j].X) != "undefined" && !isNaN(Number(poly[i][j].X))) x = Number(poly[i][j].X);
        else if (typeof (poly[i][j].x) != "undefined" && !isNaN(Number(poly[i][j].x))) x = Number(poly[i][j].x);
        if (typeof (poly[i][j].Y) != "undefined" && !isNaN(Number(poly[i][j].Y))) y = Number(poly[i][j].Y);
        else if (typeof (poly[i][j].y) != "undefined" && !isNaN(Number(poly[i][j].y))) y = Number(poly[i][j].y);
        if (y !== null && x !== null) {
          pp.X = x;
          pp.Y = y;
          np[i].push(pp);
        }
        else {
          txt = "Unable to parse polygon string.\n";
          txt += "Error: Coordinates are not in a right form.\n";
          txt += "Click OK to continue.\n";
          if (!quiet) alert(txt);
          return false;
        };
      }
    }
    return JSON.stringify(np);
  }
  // helper function for normalize_clipper_poly()
function svgpath_to_clipper_polygons(d) {
  //console.log("Esta funcion se llama por usar Poligonos que empiezan con M 8como paths");
  //console.log(d);
        var arr;
        d = d.trim();
        arr = Raphael.parsePathString(d); // str to array
        arr = Raphael._pathToAbsolute(arr); // mahvstcsqz -> uppercase
        var str = Array.prototype.concat.apply([], arr).join(" ");
        var paths = str.replace(/M/g, '|M').split("|");
        var k, polygons_arr = [],
          polygon_arr = [];
        for (k = 0; k < paths.length; k++) {
          if (paths[k].trim() === "") continue;
          arr = Raphael.parsePathString(paths[k].trim());
          polygon_arr = [];
          var i = 0,
            j, m = arr.length,
            letter = "",
            x = 0,
            y = 0,
            pt = {},
            subpath_start = {};
          subpath_start.x = "";
          subpath_start.y = "";
          for (; i < m; i++) {
            letter = arr[i][0].toUpperCase();
            if (letter != "M" && letter != "L" && letter != "Z") continue;
            if (letter != "Z") {
              for (j = 1; j < arr[i].length; j = j + 2) {
                if (letter == "V") y = arr[i][j];
                else if (letter == "H") x = arr[i][j];
                else {
                  x = arr[i][j];
                  y = arr[i][j + 1];
                }
                pt = {};
                pt.X = null;
                pt.Y = null;
                if (typeof (x) != "undefined" && !isNaN(Number(x))) pt.X = Number(x);
                if (typeof (y) != "undefined" && !isNaN(Number(y))) pt.Y = Number(y);
                if (pt.X !== null && pt.Y !== null) {
                  polygon_arr.push(pt);
                }
                else {
                  return false;
                }
              }
            }
            if ((letter != "Z" && subpath_start.x === "") || letter == "M") {
              subpath_start.x = x;
              subpath_start.y = y;
            }
            if (letter == "Z") {
              x = subpath_start.x;
              y = subpath_start.y;
            }
          }
          polygons_arr.push(polygon_arr);
        }
        return polygons_arr;
}
    
    function round_to(num, dec){
		if (typeof (num) == "undefined" || typeof (dec) == "undefined" || isNaN(dec)){
			alert("Cannot round other than number");
			return false;
		}
		else return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	}
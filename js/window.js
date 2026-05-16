var svgNS = "http://www.w3.org/2000/svg";
var id = 1;
var point1 = null;
var point2 = null;
var line = null;
var drawLockout = false;

var factory;
var gradients;
var windows = {};

var layout = { name: "You have a lot of layouts", key: "ntLayoutXXX" }

// init this layout
newLayout();

//------------------------------------

window.onbeforeunload = function () { return "Exit NoiseTool?"; }

document.getElementById("mySVG").onclick = function (e)
{
  cancelLine();
}

function cancelLine()
{
  if (point1 && line)
  {
    document.getElementById("mySVG").removeChild(line);
    point1 = null;
    point2 = null;
    line = null;
  }
};

function getPos(el)
{
  for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return { x: lx, y: ly+10 };
}

document.onmousemove = function (e)
{
  if (moving) { windowMove(e); return; }
  if (sizing) { windowSize(e); return; }

  e = e || window.event;

  if (line) {
    line.setAttribute("x2", e.pageX - 1);
    line.setAttribute("y2", e.pageY -1);
  }
};

var i = 1;
var z = 20;
var types = [];
types[1] = ["Billow", "Checkerboard", "Constant", "Cylinders", "Gradient", "Perlin", "Ridged Multifractal", "Spheres", "Voronoi"];
types[2] = ["Turbulence", "Displace", "Invert Input", "Rotate", "Scale", "Translate"];
types[3] = ["Absolute", "Clamp", /*"Curve",*/ "Exponent", "Invert", "ScaleBias", /*"Terrace",*/ "Cache"];
types[4] = ["Add", "Max", "Min", "Multiply", "Power", "Blend", "Select"];
var points = [0.5, 0.2, 0.8, 0.65];

function getCreateLoc()
{
  var ret = { X: 100, Y: 100 };
  var app = document.getElementById("app");

  for (var w in windows)
  {
    if (windows[w].offsetLeft == ret.X && windows[w].offsetTop == ret.Y) { ret.X += 30; ret.Y += 30; }
    if (ret.X+300 > app.parentNode.clientWidth) ret.X = 115;
    if (ret.Y+200 > app.parentNode.clientHeight) ret.Y = 115;
  }

  return ret;
}

function newWindow(type)
{
  // create div with canvas and widgets in it
  // make it click draggable
  // make it zorder
  // make it resize

  if (i == 1 && document.getElementById("title")) document.getElementById("app").removeChild(document.getElementById("title"));

  var glyph = "";
  if (type == 1) glyph = "<span class=\"glyphicon glyphicon-unchecked\"></span>";
  if (type == 2) glyph = "<span class=\"glyphicon glyphicon-log-in\"></span>";
  if (type == 3) glyph = "<span class=\"glyphicon glyphicon-log-out\"></span>";
  if (type == 4) glyph = "<span class=\"glyphicon glyphicon-sound-stereo\"></span>";

  var loc = getCreateLoc();
  var w = document.createElement("div");
  w.setAttribute("id", "window" + i);
  w.setAttribute("class", "noisewindow");
  w.style.left = loc.X + "px";
  w.style.top  = loc.Y + "px";
  w.style.zIndex = z++;
  var buf = "\
  <li class=\"nav dropdown\">\
  <button type=\"button\" class=\"dropdown-toggle\" data-toggle=\"dropdown\"> "+glyph+" Type: <span class=\"caret\"></span></button>\
  <ul class=\"dropdown-menu\" role=\"menu\">";
  for (var t in types[type])
    buf += "<li><a href=\"#\" onclick=\"setWindowType('window"+i+"', '" + types[type][t] + "');\">" + types[type][t] + "</a></li>";
  buf += "</ul></li>";
  w.innerHTML = buf;
  w.addEventListener('mousedown', function (e) { windowPress(e, w); }, false);
  w.oncontextmenu=new Function ("return false")
  document.getElementById("app").appendChild(w);
  w.windowid = i;
  w.ntWindowType = type;
  w.ntSeed = Math.random();
  windows[i] = w;

  // extra button
  var eb = document.createElement("div");
  eb.setAttribute("id", "window" + i + "extrabutton");
  eb.setAttribute("class", "extrabutton");
  eb.style.left = "125px";
  eb.style.top = "183px";
  eb.addEventListener('mousedown', function (e) { extraPress(e, w); }, false);
  w.ntExraButton = eb;
  w.appendChild(eb);

  // extra div
  var ed = document.createElement("div");
  ed.setAttribute("id", "window" + i + "extra");
  ed.setAttribute("class", "extra");
  ed.style.left = "100px";
  ed.style.top = "200px";
  ed.style.display = 'none';
  ed.innerHTML = "<input type='checkbox' id='window" + i + "shadow' onClick='toggleShadow(selected);'>Shadow</input><br><input  id='window" + i + "norm' onClick='drawSingle(selected, true);' type='checkbox'>Normalize</input><br><input  id='window" + i + "grad' onClick='setCustomGradient(selected);' type='checkbox'>Own Color</input><br><button onClick='selected.ntSeed = Math.random(); draw(selected);'>New Seed</button><br><button onClick='save(\"window" + i + "\");'>Save</button><input id='window" + i + "size' size=\"1\" value=\"512\"/><br><button onClick='renderToSourceCode(" + i + ");'>Code</button>";
  w.ntExtra = ed;
  w.appendChild(ed);

  // the canvas
  var cv = document.createElement("canvas");
  cv.style.position = "absolute";
  cv.style.top = "25px";
  cv.style.left = "10px";
  cv.width = w.clientWidth - 20;
  cv.height = (w.clientHeight-35);
  w.appendChild(cv);
  w.ntCanvas = cv;
  w.ntContext = cv.getContext('2d');

  // Module name label
  var n = document.createElement("div");
  n.setAttribute("id", "window" + i+"name");
  n.style.position = "absolute";
  n.style.top = "3px";
  n.style.left = "90px";
  n.innerText = "None";
  w.appendChild(n);
  w.ntName = n;

  // drag thumb
  var t = document.createElement("div");
  t.setAttribute("class", "glyphicon glyphicon-signal lightup dragthumb");
  t.style.position = "absolute";
  t.style.top = "178px";
  t.style.right = "0px";
  t.addEventListener('mousedown', function (e) { windowStartSize(e, w); }, false);
  w.appendChild(t);
  w.ntThumb = t;

  // close
  var c = document.createElement("div");
  c.setAttribute("class", "glyphicon glyphicon-remove-circle lightup");
  c.style.position = "absolute";
  c.style.top = "0px";
  c.style.right = "0px";
  c.addEventListener('mousedown', function (e) { windowClose(e, w); }, false);
  w.appendChild(c);
  w.ntClose = c;

  // event icons - drawing and skip
  var d = document.createElement("div");
  d.setAttribute("class", "drawing");
  d.style.width = "80px";
  d.style.height = "75px";
  d.style.display = 'none';
  w.appendChild(d);
  w.ntDrawing = d;

  var nd = document.createElement("div");
  nd.setAttribute("class", "notdrawing");
  nd.style.width = "80px";
  nd.style.height = "75px";
  nd.style.display = 'none';
  w.appendChild(nd);
  w.ntNotDrawing = nd;
  w.ntSkipDraw = false;

  i += 1;
}

function toggleShadow(w)
{
  if (w.ntModule.parameters[w.ntModule.parameters.length - 1].Name == "Elevation")
  {
    w.ntModule.parameters = w.ntModule.parameters.slice(0, -4);
  }
  else
  {
    w.ntModule.parameters.push({ Name: "Intensity", Min: 0, Max: 5, Incr: 0.1, Rounding: 1 });
    w.ntModule.parameters.push({ Name: "Contrast", Min: 0, Max: 5, Incr: 0.1, Rounding: 1 });
    w.ntModule.parameters.push({ Name: "Azimuth", Min: 0, Max: 360, Incr: 1, Rounding: 0 });
    w.ntModule.parameters.push({ Name: "Elevation", Min: 0, Max: 90, Incr: 0, Rounding: 0 });

    if (!w.ntModule.module.Intensity) w.ntModule.module.Intensity = 2;
    if (!w.ntModule.module.Contrast) w.ntModule.module.Contrast = 3;
    if (!w.ntModule.module.Azimuth) w.ntModule.module.Azimuth = 45;
    if (!w.ntModule.module.Elevation) w.ntModule.module.Elevation = 45;
  }
  drawSingle(w, true);
}

function setWindowType(name, type)
{
  var w = document.getElementById(name);
  document.getElementById(w.id + "name").innerText = type;

  var oldmodule = "";
  var exists = 0;
  if (w.ntModule) {
    exists = w.ntModule.points;
    oldmodule = w.ntModule.name;
  }

  w.ntModule = factory.getModule(type);
  if (!w.ntModule) return;

  // input - up to 4
  if (!w.ntIn) w.ntIn = [];

  // reset the tooltip on the dots that will remain
  for (var p = 0; p < exists; ++p)
  {
    w.ntIn[p].innerHTML = "<span>" + w.ntModule.pointNames[p] + "</span>";
  }

  // if there is not enough dots, add some more
  for (var p = exists; p < w.ntModule.points; ++p)
  {
    var input = document.createElement("div");
    input.id = w.id + "in" + p;
    input.setAttribute("class", "glyphicon glyphicon-record lightup dropt");
    input.style.position = "absolute";
    input.style.top = (w.offsetHeight*points[p]) + "px";
    input.style.left = "0px";
    input.ntNum = p;
    input.innerHTML = "<span>" + w.ntModule.pointNames[p] + "</span>";
    w.appendChild(input);
    input.addEventListener('mousedown', function (e) { windowStopLine(e, w); }, false);
    w.ntIn.push(input);
  }

  // displace is particularly irksome. We need to rearrange some lines for this.
  // point 1 becomes point 0 if no longer displace
  if (type != "Displace" && oldmodule == "LibNoise.DisplaceInput") {
    if (w.ntIn[1].ntLine) {
      w.ntSkipDraw = true;
      var source = w.ntIn[1].ntLine.ntPoint1;
      windowStopLine({ currentTarget: w.ntIn[1] }, w); // erase line
      windowStartLine({ currentTarget: source }, source.parentNode);      // click on the source out again
      windowStopLine({ currentTarget: w.ntIn[0] }, w);      // click on our point 1
      w.ntSkipDraw = false;
    }
  }

  // if there is too many dots, remove some
  for (var p = exists-1; p >= w.ntModule.points; --p)
  {
    windowStopLine({ currentTarget: w.ntIn[p] }, w);
    w.removeChild(w.ntIn[p]);
    w.ntIn.splice(p);
  }

  // displace is particularly irksome. We need to rearrange some lines for this.
  // point 0 becomes 1
  if (type == "Displace" && oldmodule != "LibNoise.DisplaceInput")
  {
    if (w.ntIn[0].ntLine)
    {
      w.ntSkipDraw = true;
      var source = w.ntIn[0].ntLine.ntPoint1;
      windowStopLine({ currentTarget: w.ntIn[0] }, w); // erase line
      windowStartLine({ currentTarget: source }, source.parentNode);      // click on the source out again
      windowStopLine({ currentTarget: w.ntIn[1] }, w);      // click on our point 1
      w.ntSkipDraw = false;
    }
  }

  // output
  if (!w.ntOut)
  {
    var output = document.createElement("div");
    output.id = w.id + "out";
    output.setAttribute("class", "glyphicon glyphicon-record lightup");
    output.style.position = "absolute";
    output.style.top = (w.offsetHeight * 0.5) + "px";
    output.style.right = "0px";
    output.addEventListener('mousedown', function (e) { windowStartLine(e, w); }, false);
    w.appendChild(output);
    w.ntOut = output;
  }

  windowSelect(w);
  draw(w);
}

function redraw()
{
  for (var i in windows) drawSingle(windows[i]);
}

function draw(w, cache)
{
  if (drawLockout) return;

  // draw this window
  drawSingle(w, cache);

  // draw all its windows that its feeding
  for (var c in w.ntOut.ntLine)
  {
    var line = w.ntOut.ntLine[c];
    if (line.ntPoint2)
    {
      var child = line.ntPoint2.parentNode;
      draw(child, cache);
    }
  }
}

function save(id)
{
  var w = document.getElementById(id);
  if (!w) return;
  var size = document.getElementById(id + "size").value;
  drawSingle(w, false, size);
}

var saveCanvas = null;

function setCustomGradient(check)
{
  if (!selected) return;
  if (check)
  {
    // get the gradient from gradientlist
    selected.ntCustomGradient = gradients.current.name;
  }
  else
  {
    selected.ntCustomGradient = null;
    drawSingle(w);
  }
}

function drawSingle(w, cache, size)
{
  if (drawLockout) return;

  if (saveCanvas) return;
  if (!w.ntModule) return;

  if (size)
  {
    saveCanvas = document.createElement('canvas');
    saveCanvas.width = size;
    saveCanvas.height = size;    
  }
  else
    if (w.ntSkipDraw) return;

  w.ntDrawing.style.display = 'block';
  w.ntCanvas.width = w.clientWidth - 20;   // for some reason these lines blank the canvas and let
  w.ntCanvas.height = w.clientHeight - 35; // the drawing icon show through

  var params = {
    id: w.windowid,
    usecache: cache ? true : false,
    newW: size ? size : w.clientWidth - 20,
    newH: size ? size : w.clientHeight - 35,
    startx: parseFloat(document.getElementById("xbound").value),
    starty: parseFloat(document.getElementById("ybound").value),
    sizex: parseFloat(document.getElementById("wbound").value),
    sizey: parseFloat(document.getElementById("hbound").value),
    normalize: { on: document.getElementById(w.id + "norm").checked, min: w.ntMin, max: w.ntMax },
    gradient: w.ntCustomGradient ? gradients.getGradient(w.ntCustomGradient) : gradients.current,
    modules: createModuleState(),
    imagedata: size ? saveCanvas.getContext('2d').getImageData(0, 0, size, size) : w.ntContext.getImageData(0, 0, w.ntCanvas.width, w.ntCanvas.height)
  };
  if (size) params.nocachesave = true;
  if (w.ntModule.parameters.length > 0)
    params.shadow = (w.ntModule.parameters[w.ntModule.parameters.length - 1].Name == "Elevation" ? true : false);

  if (!w.ntWorker)
  {
    w.ntWorker = new Worker("js/drawthread.js");
    w.ntWorker.onmessage = fromDrawThread;
  }
  w.ntWorker.postMessage(params);
}

function fromDrawThread(e)
{
  var w = windows[e.data.id];
  if (!w) return;

  if (w.ntDrawing.style.display == 'none') return;

  if (e.data.percent)
  {
    w.ntContext.beginPath();
    w.ntContext.arc(w.ntCanvas.offsetWidth / 2, 40, 36, 0, 0.02 * (e.data.percent > 100.0 ? e.data.percent - 100.0 : e.data.percent) * Math.PI);
    w.ntContext.lineWidth = 5;
    w.ntContext.strokeStyle= e.data.percent > 100.0 ? "red" : "green";
    w.ntContext.stroke();
    return;
  }

  if (saveCanvas) {
    saveCanvas.getContext('2d').putImageData(e.data.imagedata, 0, 0);
    var data =  saveCanvas.toDataURL()
    download("image.bmp",data);
    saveCanvas = null;
    w.ntDrawing.style.display = 'none';
    // we now need to redraw the canvas, lets use the save image but we have to scale it using an image
//    w.ntContext.putImageData(e.data.imagedata, 0, 0, 0, 0, w.clientWidth - 20, w.clientHeight - 35);
    var imageObject = new Image();
    imageObject.onload = function ()
    {
      var size = document.getElementById("window" + e.data.id + "size").value;
      w.ntContext.clearRect(0, 0, w.ntCanvas.width, w.ntCanvas.height);
      w.ntContext.scale(w.ntCanvas.width / size, w.ntCanvas.height / size);
      w.ntContext.drawImage(imageObject, 0, 0);
    }
    imageObject.src = data;
    return;
  }
  else
  {
    w.ntContext.putImageData(e.data.imagedata, 0, 0);
    if (e.data.min) w.ntMin = e.data.min;
    if (e.data.max) w.ntMax = e.data.max;
  }

  w.ntDrawing.style.display = 'none';

  windowSetRange(w);
}

function createModuleState()
{
  var ret = {};

  for (var i in windows)
  {
    if (!windows[i].ntModule) continue;
    var mod = windows[i].ntModule;
    var desc = {};
    desc.id = windows[i].windowid;
    desc.name = mod.module.Name;
    desc.seed = windows[i].ntSeed;
    for (var p = 0; p < mod.points; ++p)
      if (windows[i].ntIn[p] && windows[i].ntIn[p].ntLine) desc["in" + p] = windows[i].ntIn[p].ntLine.ntPoint1.parentNode.windowid;//inm.Name;
    desc.params = {};
    for (var p in mod.parameters) desc.params[mod.parameters[p].Name] = mod.module[mod.parameters[p].Name];
    ret[i] = desc;
  }
  return ret;
}

function renderToSourceCode(modid)
{
  console.log(toSourceCode(modid, createModuleState()));
  alert("Code written to console");
}

function toSourceCode(modid, mods)
{
  var mod = mods[modid];
  var name = "mod" + modid;
  var buf = "var " + name + " = new " + mod.name + "();\n";
  buf += name + ".Seed = "+ (mod.seed * 10000000000000000)+";\n";
  for (var property in mod.params)
    if (mod.params.hasOwnProperty(property)) buf += name + "." + property + " = " + mod.params[property] + ";\n";
  for (var i = 0; i < 4; ++i)
    if (mod["in" + i]) buf += name + ".setInput(" + i + ", mod" + mod["in" + i] + ");\n";
  for (var i = 0; i < 4; ++i)
    if (mod["in" + i]) buf = toSourceCode(mod["in" + i], mods) + "\n" + buf;
  return buf;
}

var moving = null;
var sizing = null;
var selected = null;
var lastx = 0;
var lasty = 0;
function windowClose(e, w)
{
  if (e)
  {
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  // remove all w.ntOut, remove w.ntIn
  for (var p in w.ntIn)
    if (w.ntIn[p].ntLine)
    {
      var i = w.ntIn[p].ntLine.ntPoint1.ntLine.indexOf(w.ntIn[p].ntLine);
      if (i != -1) w.ntIn[p].ntLine.ntPoint1.ntLine.splice(i, 1);
      document.getElementById("mySVG").removeChild(w.ntIn[p].ntLine);
    }
  if (w.ntOut)
  {
    for (var i in w.ntOut.ntLine) {
      if (w.ntOut.ntLine[i].ntPoint2) {
        w.ntOut.ntLine[i].ntPoint2.ntLine = null;
        document.getElementById("mySVG").removeChild(w.ntOut.ntLine[i]);
        draw(w.ntOut.ntLine[i].ntPoint2.parentNode);
      }
    }
  }

  document.getElementById("app").removeChild(w);
  delete windows[w.windowid];

  document.getElementById("params").innerHTML = "";
}

function windowStartSize(e,w)
{
  cancelLine();
  e = e || window.event;
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
  sizing = w;
  windowSelect(w);
  w.style.zIndex = z++;
  w.style.border = "4px solid red";
  lastx = e.pageX;
  lasty = e.pageY;
}

function windowSetRange(w)
{
  if (document.getElementById(w.id + "norm").checked) {
    var buf = "Output Range: 0.0 to 1.0";
    document.getElementById("range").innerText = buf;
  }
  else if (w.ntMin || w.ntMax) {
    var buf = "Output Range: " + (Math.round(w.ntMin * 100) / 100) + " to " + (Math.round(w.ntMax * 100) / 100);
    document.getElementById("range").innerText = buf;
  }
}

function windowSelect(w)
{
  if (selected !== w)
  {
    if (selected) selected.style.border = "4px solid black";
    selected = w;
    selected.style.border = "4px solid yellow";
  }

  windowSetRange(w);

  // set the grad
  var e = document.getElementById("gradientlist");
  var gradname = e.options[e.selectedIndex].text;
  if (w.ntCustomGradient && gradname != w.ntCustomGradient)
  {
    // set the gradientlist to the custom one
    for (var i = 0; i < e.options.length; i++)
    {
      if (e.options[i].text === w.ntCustomGradient)
      {
        e.selectedIndex = i;
        break;
      }
    }
  }
  else if (gradients.current.name != gradname)
  {
    // set the gradient list to the global one
    for (var i = 0; i < e.options.length; i++)
    {
      if (e.options[i].text === gradients.current.name)
      {
        e.selectedIndex = i;
        break;
      }
    }
  }

  if (!w.ntModule) return;
  // draw parameters for module
  var buf = "<table>";
  for (var p in w.ntModule.parameters)
  {
    var param = w.ntModule.parameters[p];
    // create names and sliders
    var val = w.ntModule.module[param.Name];
    buf += "<tr>\
<td>" + param.Name + ": </td>\
<td width=120 id='" + param.Name + "' onclick=\"paramSwap(this.id);\"> " + val + " </td>\
<td>\
<input id='" + param.Name + "range' oninput='paramChange(\"" + param.Name + "\", this.value);' style=\"width: 100px\" width=120 type='range' step='" + param.Incr + "' min='" + param.Min + "' max='" + param.Max + "' value='" + val + "'>\
<input id='" + param.Name + "text' style='display: none; width:80px;' onchange='paramChange(\"" + param.Name + "\", this.value);'  value='" + val + "'>\
</td></tr>";
  }
  document.getElementById("params").innerHTML = buf;
}

function paramSwap(id)
{
  var view = document.getElementById(id);
  var text = document.getElementById(id + "text");
  var range = document.getElementById(id + "range");
  // set value of none one to value of block one

  // toggle display for text and range
  if (text.style.display == 'none')
  {
    text.style.display = 'block';
    range.style.display = 'none';
    text.value = range.value;
  }
  else
  {
    range.value = text.value;
    text.style.display = 'none';
    range.style.display = 'block';
  }
}

function paramChange(name, value)
{
  var p = document.getElementById(name);
  if (!p) return;
  p.innerText = value;

  // set value on the selected window's module
  if (!selected) return;
  selected.ntModule.module[name] = parseFloat(value);
}

function windowPress(e, w)
{
  cancelLine();
  windowSelect(w);
  
  e = e || window.event;
  var rightclick = e.which ? (e.which == 3) : (e.button == 2);
  if (rightclick) {
    if (e.preventDefault) e.preventDefault();
    w.ntSkipDraw = !w.ntSkipDraw;
    w.ntNotDrawing.style.display = w.ntSkipDraw ? 'block' : 'none';
    w.ntCanvas.style.display = w.ntSkipDraw ? 'none' : 'block';
    if (!w.ntSkipDraw) draw(w);
  }
  else
  {
    w.style.zIndex = z++;
    w.style.border = "4px solid green";
    moving = w;
    lastx = e.pageX;
    lasty = e.pageY;
  }
}

document.onmouseup = function(e)
{
  if (moving) {
    moving.style.border = "4px solid yellow";
    moving = null;
  }
  if (sizing) {
    sizing.ntCanvas.style.display = 'block';
    sizing.ntCanvas.width = sizing.clientWidth - 20;
    sizing.ntCanvas.height = sizing.clientHeight - 35;
    drawSingle(sizing);
    sizing.style.border = "4px solid yellow";
    sizing = null;
  }
}

function windowMove(e)
{
  e = e || window.event;
  var newX = moving.offsetLeft + (e.pageX - lastx);
  var newY = moving.offsetTop + (e.pageY - lasty);
  moving.style.left = newX + "px";
  moving.style.top = newY + "px";
  lastx = e.pageX;
  lasty = e.pageY;

  moveAdjust(moving, newX, newY);
}

function moveAdjust(w, newX, newY)
{
  for (var i in w.ntIn)
    if (w.ntIn[i].ntLine)
    {
      w.ntIn[i].ntLine.setAttribute("x2", newX);
      w.ntIn[i].ntLine.setAttribute("y2", newY + 10+w.offsetHeight * points[i]);
    }
  if (w.ntOut)
  {
    for (var i in w.ntOut.ntLine) {
      var line = w.ntOut.ntLine[i];
      line.setAttribute("x1", newX + w.offsetWidth);
      line.setAttribute("y1", newY + 10+w.offsetHeight * 0.5);
    }
  }
}

function windowSize(e)
{
  e = e || window.event;

  sizing.ntCanvas.style.display = 'none';

  var newX = sizing.offsetWidth + (e.pageX - lastx);
  var newY = sizing.offsetHeight + (e.pageY - lasty);
  if (newX < 100) newX = 100;
  if (newY < 100) newY = 100;
  sizing.style.width  = newX + "px";
  sizing.style.height = newY + "px";
  lastx = e.pageX;
  lasty = e.pageY;
   
  sizeAdjust(sizing, newX, newY);
}

function sizeAdjust(w, newX, newY)
{
  w.ntExraButton.style.left = (newX / 2 - 25) + "px";
  w.ntExraButton.style.top = (newY - 17) + "px";

  w.ntExtra.style.left = (newX / 2 - 50) + "px";
  w.ntExtra.style.top = (newY) + "px";

  w.ntThumb.style.top = (newY - 20) + "px";
  for (var i in w.ntIn)
    w.ntIn[i].style.top = (newY * points[i]) + "px";
  if (w.ntOut) w.ntOut.style.top = (newY*0.5) + "px";

  for (var i in w.ntIn)
    if (w.ntIn[i].ntLine) {
      w.ntIn[i].ntLine.setAttribute("x2", w.offsetLeft);
      w.ntIn[i].ntLine.setAttribute("y2", w.offsetTop + 10+newY * points[i]);
    }
  if (w.ntOut)
    for (var i in w.ntOut.ntLine)
    {
      var line = w.ntOut.ntLine[i];
      line.setAttribute("x1", w.offsetLeft + newX);
      line.setAttribute("y1", w.offsetTop +10+newY * 0.5);
    }
}

function windowStartLine(e, w)
{
  cancelLine();

  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
  point1 = w.ntOut;

  var myid = id++;
  var pos = getPos(point1);
  line = document.createElementNS(svgNS, "line");
  line.setAttributeNS(null, "id", "line" + id);
  line.setAttributeNS(null, "x1", pos.x + 20);
  line.setAttributeNS(null, "y1", pos.y);
  line.setAttributeNS(null, "x2", pos.x + 20);
  line.setAttributeNS(null, "y2", pos.y);
  line.setAttributeNS(null, "stroke", "yellow");
  line.setAttributeNS(null, "stroke-width", 4);
  document.getElementById("mySVG").appendChild(line);

  if (!point1.ntLine) point1.ntLine = [];
  point1.ntLine.push(line);
  line.ntPoint1 = point1;
}

function windowStopLine(e, w)
{
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
  point2 = e.currentTarget;
 
  if (point2.ntLine) {
    var i =  point2.ntLine.ntPoint1.ntLine.indexOf(point2.ntLine);
    if (i != -1) point2.ntLine.ntPoint1.ntLine.splice(i, 1);
    document.getElementById("mySVG").removeChild(point2.ntLine);
    point2.ntLine = null;
  }

  if (!line) { draw(point2.parentNode); return; }

  var pos = getPos(point2);
  line.setAttribute("x2", pos.x);
  line.setAttribute("y2", pos.y);
  point2.ntLine = line;
  line.ntPoint2 = point2;

  var srcmod = point1.parentNode.ntModule.module;
  var targetmod = point2.parentNode.ntModule.module;
  targetmod.setInput(point2.ntNum, srcmod);

  draw(point2.parentNode);

  point1 = null;
  point2 = null;
  line = null;
}

function extraPress(e, w)
{
  if (w.ntExtra.style.display == 'block')
    w.ntExtra.style.display = 'none';
  else
    w.ntExtra.style.display = 'block';
}

function download(filename, text)
{
  var pom = document.createElement('a');
  pom.setAttribute('href', text); // 'data:application/octet-stream;charset=utf-8,' + text);
  pom.setAttribute('download', filename);
  pom.click();
}

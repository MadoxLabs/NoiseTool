function newLayout(name)
{
  for (var l = 1; l < 1000; ++l) {
    if (!localStorage.getItem('ntLayout' + l)) {
      if (!name) name = "Layout " + l;
      layout = { name: name, key: "ntLayout" + l };
      document.getElementById("layoutname").value = layout.name;
      break;
    }
  }
  makeLayoutList()
}

function makeLayoutList()
{
  var list = JSON.parse(localStorage.getItem('ntLayoutList')); if (!list) return;
  var glist = document.getElementById("layouts"); if (!glist) return;

  var keys = [];

  for (var k in list) {
    if (list.hasOwnProperty(k)) {
      keys.push([k, list[k]]);
    }
  }
  keys.sort(function (a, b) { return ((a[1] == b[1]) ? 0 : ((a[1] > b[1]) ? 1 : -1)); });

  for (var i = glist.options.length - 1; i >= 0; --i) glist.options[i] = null;
  for (var l = 0; l < keys.length; ++l) glist.options[glist.options.length] = new Option(list[keys[l][0]], keys[l][0]);
}

function layoutDelete()
{
  if (!localStorage.getItem('ntLayoutList')) return;

  var glist = document.getElementById("layouts");
  if (glist.selectedIndex == -1) return;
  var name = glist.options[glist.selectedIndex].value;

  var list = JSON.parse(localStorage.getItem('ntLayoutList'));
  delete list[name];
  localStorage.setItem('ntLayoutList', JSON.stringify(list));
  localStorage.removeItem(name);
  makeLayoutList();
}

function layoutLoad()
{
  drawLockout = true;

  if (!localStorage.getItem('ntLayoutList')) return;

  clearBoard();

  var glist = document.getElementById("layouts");
  var name = glist.options[glist.selectedIndex].value;
  layout = JSON.parse(localStorage.getItem(name));
  document.getElementById("layoutname").value = layout.name;

  loadBounds();
  loadWindows();
  loadGradients();

  drawLockout = false;
  redraw();
}

function layoutSave()
{
  if (document.getElementById("layoutname").value != layout.name)
    newLayout(document.getElementById("layoutname").value);

  saveBounds();
  saveWindows();
  saveGradients();

  localStorage.setItem(layout.key, JSON.stringify(layout));

  var list = {};
  if (!localStorage.getItem('ntLayoutList')) {
    list[layout.key] = layout.name;
  }
  else {
    list = JSON.parse(localStorage.getItem('ntLayoutList'));
    list[layout.key] = layout.name;
  }
  localStorage.setItem('ntLayoutList', JSON.stringify(list));
  makeLayoutList();
}

function saveBounds()
{
  var bounds = {
    X: document.getElementById("xbound").value,
    Y: document.getElementById("ybound").value,
    W: document.getElementById("wbound").value,
    H: document.getElementById("hbound").value
  };
  layout.bounds = bounds;
}

function loadBounds()
{
  document.getElementById("xbound").value = layout.bounds.X;
  document.getElementById("ybound").value = layout.bounds.Y;
  document.getElementById("wbound").value = layout.bounds.W;
  document.getElementById("hbound").value = layout.bounds.H;
}

function saveWindows()
{
  var windowsgroup = { z: z };
  var lines = [];

  for (var i in windows)
  {
    var w = windows[i];
    var windowdata = {id: i};

    windowdata.type = w.ntWindowType;
    windowdata.noisetype = document.getElementById(w.id + "name").innerText;
//    windowdata.norm = document.getElementById(w.id + "norm").checked;
//    windowdata.shadow = document.getElementById(w.id + "shadow").checked;
    windowdata.skip = w.ntSkipDraw;
    windowdata.seed = w.ntSeed;
    windowdata.left = w.offsetLeft;
    windowdata.top = w.offsetTop;
    windowdata.width = w.offsetWidth;
    windowdata.height = w.offsetHeight;
    if (w.ntCustomGradient) windowdata.customGradient = w.ntCustomGradient;
    windowdata.z = w.style.zIndex;

    var params = {};
    if (w.ntModule)
    {
      var mod = w.ntModule;
      for (var p in mod.parameters) params[mod.parameters[p].Name] = mod.module[mod.parameters[p].Name];
    }
    windowdata.params = params;
    windowsgroup[i] = windowdata;

    if (w.ntOut)
    {
      for (var n in w.ntOut.ntLine)
      {
        var line = { out: w.ntOut.ntLine[n].ntPoint1.id, in: w.ntOut.ntLine[n].ntPoint2.id }
        lines.push(line);
      }
    }
  }

  layout.windows = windowsgroup;
  layout.lines = lines;
}

function loadWindows()
{
  for (var n in layout.windows)
  {
    if (n == "z") continue;
    var data = layout.windows[n];
    i = data.id | 0;
    newWindow(data.type);
    windows[data.id].ntSeed = data.seed;
    windows[data.id].style.width = data.width + "px";
    windows[data.id].style.height = data.height + "px";
    windows[data.id].style.left = data.left + "px";
    windows[data.id].style.top = data.top + "px";
    windows[data.id].style.zIndex = data.z;
//    document.getElementById("window" + data.id + "norm").checked = data.norm;
//    document.getElementById("window" + data.id + "shadow").checked = data.shadow;
    if (data.customGradient)
    {
      document.getElementById("window" + data.id + "grad").checked = true;
      windows[data.id].ntCustomGradient = data.customGradient;
    }

    if (data.noisetype)
    {
      setWindowType(windows[data.id].id, data.noisetype);
      for (var p in data.params)
      {
        windows[data.id].ntModule.module[p] = data.params[p];
      }
    }

    moveAdjust(windows[data.id], data.left, data.top);
    sizeAdjust(windows[data.id], data.width, data.height);
    windowSelect(windows[data.id]);

    if (data.skip) windowPress({ button: 2 }, windows[data.id]);
  }
  z = layout.windows.z;

  for (var n in layout.lines)
  {
    var point1 = document.getElementById(layout.lines[n].out);
    var point2 = document.getElementById(layout.lines[n].in);
    if (!point1 || !point2) continue;

    windowStartLine({}, point1.parentNode);
    windowStopLine({currentTarget: point2}, point2.parentNode);
  }
}

function saveGradients()
{
  var grads = [];

  for (var g in gradients.gradients)
  {
    var data = { name: gradients.gradients[g].name, points: gradients.gradients[g].Points };
    grads.push(data);
  }
  layout.gradients = grads;
  layout.currentGradient = gradients.current;
}

function loadGradients()
{
  var glist = document.getElementById("gradientlist");
  for (var i = glist.options.length - 1; i >= 0; --i) glist.options[i] = null;

  for (var g in layout.gradients)
  {
    var newg = new ntGradient();
    newg.name = layout.gradients[g].name;
    newg.Points = layout.gradients[g].points;
    gradients.gradients[newg.name] = newg;

    glist.options[glist.options.length] = new Option(newg.name, newg.name);
    newg.index = glist.options.length - 1;

    if (layout.currentGradient == newg.name) glist.selectedIndex = newg.index;
  }

  if (layout.currentGradient) 
    gradients.current = layout.currentGradient;
}

function clearBoard()
{
  // kill all web workers
  for (n in windows) if (windows[n].ntWorker) windows[n].ntWorker.terminate();
  // close all windows - clicking X kills all lines
  for (n in windows) windowClose(null, windows[n]);

  i = 1;
  z = 20;
  id = 1;
  point1 = null;
  point2 = null;
  line = null;
  saveCanvas = null;
  moving = null;
  sizing = null;
  selected = null;
  lastx = 0;
  lasty = 0;
  windows = {};

  document.getElementById("xbound").value = 0;
  document.getElementById("ybound").value = 0;
  document.getElementById("wbound").value = 1;
  document.getElementById("hbound").value = 1;

  // reset gradients
  var glist = document.getElementById("gradientlist");
  for (var i = glist.options.length - 1; i >= 0; --i) glist.options[i] = null;
  gradients = new ntGradients(); 
}
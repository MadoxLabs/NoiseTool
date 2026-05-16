function ntGradient()
{
  this.name = "";
  this.Points = [];
}

ntGradient.prototype.getColor = function(p, c)
{
  var a = null;
  var b = null;

  // find the 2 points we are between
  for (var gg in this.Points)
  {
    var g = this.Points[gg];
    // if exactly a point return it
    if (p == g.Point)
    {
      c.R = g.color.R;
      c.G = g.color.G;
      c.B = g.color.B;
      return;
    }
    if (g.Point < p)
    {
      // candidate for point a
      if (a == null || (p - a.Point > p - g.Point)) a = g;
    } 
    else
    {
      // candidate for point b
      if (b == null || (b.Point - p > g.Point - p)) b = g;
    }
  }
  // off the deep end?
  if (a == null && b == null)
  {
    c.R = 0;
    c.G = 0;
    c.B = 0;
    return;
  }
  if (a == null)
  {
    c.R = b.color.R;
    c.G = b.color.G;
    c.B = b.color.B;
    return;
  }
  if (b == null)
  {
    c.R = a.color.R;
    c.G = a.color.G;
    c.B = a.color.B;
    return;
  }

  // lerp that shit
  var ratio = (p - a.Point) / (b.Point - a.Point);
//  var c = {R: 0, G: 0, B: 0 };
  c.R = (a.color.R * (1 - ratio) + b.color.R * ratio);
  c.G = (a.color.G * (1 - ratio) + b.color.G * ratio);
  c.B = (a.color.B * (1 - ratio) + b.color.B * ratio);
//  return c;
}

function toHex(n)
{
  n = parseInt(n*255, 10);
  if (isNaN(n)) return "00";
  n = Math.max(0, Math.min(n, 255));
  return "0123456789ABCDEF".charAt((n - n % 16) / 16)
       + "0123456789ABCDEF".charAt(n % 16);
}

ntGradient.prototype.getHexFor = function(p)
{
  return toHex(this.Points[p].color.R) + toHex(this.Points[p].color.G) + toHex(this.Points[p].color.B);
}



function ntGradients()
{
  this.gradients = {};

  this.gradientNew("Default");
  this.setCurrent("Default");
}

ntGradients.prototype.getGradient = function (name)
{
  return this.gradients[name];
}

ntGradients.prototype.setCurrent = function (name)
{
  if (selected && selected.ntCustomGradient)
  {
    selected.ntCustomGradient = name;
    drawSingle(selected, true);
  }
  else
  {
    this.current = this.gradients[name];
    for (var i in windows) if (!selected.ntCustomGradient) drawSingle(windows[i], true);
  }
}

ntGradients.prototype.showEditor = function()
{
  var w = document.createElement("div");
  var app = document.getElementById("app");
  w.setAttribute("id", "editor");
  w.setAttribute("class", "editor");
  w.style.zIndex = z++;
  w.style.left = (app.offsetWidth * 0.5 - 150 ) + "px";
  w.style.top = (app.offsetHeight * 0.5 + 150) + "px";
  var buf = "<center>Gradient Manager</center>";
  buf += "<table border=1><tr><td colspan=2>"
  buf += "<select class=\"editorlist\" id=\"editorlist\" onchange=\"gradients.showGradient();\"></select><button onclick=\"gradients.gradientNew();\">New</button><br>";
  buf += "Name: <input id=\"editorname\" size=18 onchange=\"gradients.gradientRename(this.value);\"><button onclick=\"gradients.pointNew();\">Add Point</button>";
  buf += "</td></tr><tr><td>"
  buf += "<div id=\"editorpoints\" class=\"editorpoints\"></div>";
  buf += "</td><td> <div class=\"editorgrad\"><canvas id=\"editorgrad\" height=200 width=20></div> </td></tr></table>";
  w.innerHTML = buf;
  app.appendChild(w);

  // close
  var c = document.createElement("div");
  c.setAttribute("class", "glyphicon glyphicon-remove-circle lightup");
  c.style.position = "absolute";
  c.style.top = "0px";
  c.style.right = "0px";
  c.addEventListener('mousedown', function (e) { gradients.update(); windowClose(e, w); redraw(true);}, false);
  w.appendChild(c);
  w.ntClose = c;

  var list = document.getElementById("editorlist");
  for (g in this.gradients)
    list.options[list.options.length] = new Option(this.gradients[g].name, this.gradients[g].name);
  
  this.context = document.getElementById("editorgrad").getContext('2d');
  this.map = this.context.createImageData(20, 200);

  this.showGradient("Default");
}

ntGradients.prototype.gradientNew = function (name)
{
  var def = new ntGradient();

  var size = 0;
  for (var key in this.gradients) if (this.gradients.hasOwnProperty(key)) size++;

  if (!name) def.name = "Gradient " + size;
  else def.name = name;
  def.Points.push({ Point: -1.0, color: { R: 0, G: 0, B: 0 } });
  def.Points.push({ Point: 1.0, color: { R: 1, G: 1, B: 1 } });
  this.gradients[def.name] = def;

  var glist = document.getElementById("gradientlist");
  if (glist)
  {
    glist.options[glist.options.length] = new Option(def.name, def.name);
    def.index = glist.options.length - 1;
  }

  var list = document.getElementById("editorlist");
  if (list)
  {
    list.options[list.options.length] = new Option(def.name, def.name);
    list.options[list.options.length - 1].selected = "selected";
    this.showGradient(def.name);
  }
}

ntGradients.prototype.gradientRename = function (name)
{
  if (!this.showing) return;
  delete this.gradients[this.showing.name];
  this.showing.name = name;
  this.gradients[name] = this.showing;

  var glist = document.getElementById("gradientlist");
  if (glist) {
    glist.options[this.showing.index].value = name;
    glist.options[this.showing.index].innerText = name;
  }
  var list = document.getElementById("editorlist");
  if (list) {
    list.options[this.showing.index].value = name;
    list.options[this.showing.index].innerText = name;
  }
}

ntGradients.prototype.pointNew = function (name)
{
  if (!this.showing) return;
  this.update();
  this.showing.Points.push({ Point: this.showing.Points.length, color: { R: Math.random(), G: Math.random(), B: Math.random() } });
  this.showGradient(this.showing.name);
}

ntGradients.prototype.pointDelete = function(p)
{
  if (!this.showing) return;
  if (this.showing.Points.length <= 2) return;
  this.showing.Points.splice(p, 1);
  this.showGradient();
}

ntGradients.prototype.showGradient = function(name)
{
  if (!name)
  {
    var list = document.getElementById("editorlist");
    name = this.gradients[list.options[list.selectedIndex].value].name;
  }

  this.showing = this.gradients[name];
  document.getElementById("editorname").value = this.showing.name;
  var buf = "";
  for (var p in this.showing.Points)
    buf += "<div onclick=\"gradients.pointDelete(" + p + ")\" class=\"glyphicon glyphicon-remove-circle lightup\"></div><input id=\"ev" + p + "\" size=1 onchange=\"gradients.update();\" value=\"" + this.showing.Points[p].Point + "\"><input id=\"ec" + p + "\" class=\"color {onImmediateChange:'gradients.update();'}\" value=\"" + this.showing.getHexFor(p) + "\"><br>";
  document.getElementById("editorpoints").innerHTML = buf;
  this.drawPoints();
}

ntGradients.prototype.drawPoints = function ()
{
  var buf = "";
  for (var p in this.showing.Points)
    buf += "<div onclick=\"gradients.pointDelete(" + p + ")\" class=\"glyphicon glyphicon-remove-circle lightup\"></div><input id=\"ev" + p + "\" size=1 onchange=\"gradients.update();\" value=\"" + this.showing.Points[p].Point + "\"><input id=\"ec" + p + "\" class=\"color {pickerPosition:'right'} {onImmediateChange:'gradients.update();'}\" value=\"" + this.showing.getHexFor(p) + "\"><br>";
  document.getElementById("editorpoints").innerHTML = buf;
  jscolor.init();
  this.drawSample();
}

ntGradients.prototype.drawSample = function()
{
  var j = 0;
  var val = this.showing.Points[0].Point;
  var vstep = (this.showing.Points[this.showing.Points.length - 1].Point - val) / 200.0;

  var c = {};

  for (var x = 0; x < 200; x++)
  {
    for (var y = 0; y < 20; y++)
    {
      this.showing.getColor(val,c);
      this.map.data[j++] = c.R * 255;
      this.map.data[j++] = c.G * 255;
      this.map.data[j++] = c.B * 255;
      this.map.data[j++] = 255;
    }
    val += vstep;
  }
  this.context.putImageData(this.map, 0, 0);
}

ntGradients.prototype.update = function()
{
  if (!this.showing) return;
  for (var p in this.showing.Points) {
    this.showing.Points[p].Point = parseFloat(document.getElementById("ev" + p).value);
    var c = document.getElementById("ec" + p).color;
    this.showing.Points[p].color.R = c.rgb[0];
    this.showing.Points[p].color.G = c.rgb[1];
    this.showing.Points[p].color.B = c.rgb[2];
  }
  this.showing.Points = this.showing.Points.sort(function (a, b) { return a.Point - b.Point; });
  this.drawPoints();
}
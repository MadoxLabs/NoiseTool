importScripts('NoiseLib.js', 'gradients.js', 'factory.js');

function extend(obj, base)
{
  for (var property in base)
    if (base.__proto__.hasOwnProperty(property)) obj[property] = base[property];
}

function copyctor(obj, base)
{
  for (var property in base)
    if (base.hasOwnProperty(property)) obj[property] = base[property];
}

function getModule(name)
{
  if (name == "LibNoise.Billow") return new LibNoise.Billow();
  else if (name == "LibNoise.Checkerboard") return new LibNoise.Checkerboard();
  else if (name == "LibNoise.Constant") return new LibNoise.Constant();
  else if (name == "LibNoise.Cylinders") return new LibNoise.Cylinders();
  else if (name == "LibNoise.Gradient") return new LibNoise.Gradient();
  else if (name == "LibNoise.Perlin") return new LibNoise.Perlin();
  else if (name == "LibNoise.RidgedMultifractal") return new LibNoise.RidgedMultifractal();
  else if (name == "LibNoise.Spheres") return new LibNoise.Spheres();
  else if (name == "LibNoise.Voronoi") return new LibNoise.Voronoi();

  else if (name == "LibNoise.AbsoluteOutput") return new LibNoise.AbsoluteOutput();
  else if (name == "LibNoise.ClampOutput") return new LibNoise.ClampOutput();
  else if (name == "LibNoise.CurveOutput") return new LibNoise.CurveOutput();
  else if (name == "LibNoise.ExponentialOutput") return new LibNoise.ExponentialOutput();
  else if (name == "LibNoise.InvertOutput") return new LibNoise.InvertOutput();
  else if (name == "LibNoise.ScaleBiasOutput") return new LibNoise.ScaleBiasOutput();
  else if (name == "LibNoise.TerraceOutput") return new LibNoise.TerraceOutput();
  else if (name == "LibNoise.CacheOutput") return new LibNoise.CacheOutput();

  else if (name == "LibNoise.AddOutput") return new LibNoise.AddOutput();
  else if (name == "LibNoise.LargerOutput") return new LibNoise.LargerOutput();
  else if (name == "LibNoise.SmallerOutput") return new LibNoise.SmallerOutput();
  else if (name == "LibNoise.MultiplyOutput") return new LibNoise.MultiplyOutput();
  else if (name == "LibNoise.PowerOutput") return new LibNoise.PowerOutput();
  else if (name == "LibNoise.BlendOutput") return new LibNoise.BlendOutput();
  else if (name == "LibNoise.SelectOutput") return new LibNoise.SelectOutput();

  else if (name == "LibNoise.Turbulence") return new LibNoise.Turbulence();
  else if (name == "LibNoise.DisplaceInput") return new LibNoise.DisplaceInput();
  else if (name == "LibNoise.InvertInput") return new LibNoise.InvertInput();
  else if (name == "LibNoise.RotateInput") return new LibNoise.RotateInput();
  else if (name == "LibNoise.ScaleInput") return new LibNoise.ScaleInput();
  else if (name == "LibNoise.TranslateInput") return new LibNoise.TranslateInput();
}

function createModule(startid, mods)
{
  var mod = mods[startid];
  var m = getModule(mod.name);
  if (m.Seed !== undefined) m.Seed = mod.seed * 10000000000000000;
  copyctor(m, mod.params);
  // set inputs
  for (var i = 0; i < 4; ++i)
    if (mod["in" + i]) m.setInput(i, createModule(mod["in" + i], mods));
  return m;
}

var noisedata = [];

onmessage = function (e)
{
  var imagedata = e.data.imagedata;

  var stepx = e.data.sizex / e.data.newW;
  var stepy = e.data.sizey / e.data.newH;
  extend(e.data.gradient, new ntGradient());
  var module = createModule(e.data.id, e.data.modules);

  var x = 0;  // these loops are done like this because more optimized stopped working
  var y = 0;
  var j = 0;
  var min = (e.data.normalize.on) ? 1.0 : module.GetValue(e.data.startx, e.data.starty, 0);
  var max = (e.data.normalize.on) ? 0.0 : min;
  var c = { R: 0, G: 0, B: 0 };

  var total = e.data.newH * e.data.newW;
  var sofar = 0;
  var last = 0;
  var nd = 0;

  if (module.Name == "LibNoise.RotateInput") module.SetAngles();

  var cosAzimuth;
  var sinAzimuth;
  var cosElev;
  var sinElev;
  if (module.Azimuth)
  {
    cosAzimuth = Math.cos(module.Azimuth * 0.0174532925);
    sinAzimuth = Math.sin(module.Azimuth * 0.0174532925);
    cosElev = Math.cos(module.Elevation * 0.0174532925);
    sinElev = Math.sin(module.Elevation * 0.0174532925);
  }

  if (e.data.shadow && e.data.usecache == false) {
    // need to recreate the cache
    for (var yy = 0; yy < e.data.newH; yy++, y += stepy) {
      x = 0;
      for (var xx = 0; xx < e.data.newW; xx++, x += stepx) {
        val = module.GetValue(e.data.startx + x, e.data.starty + y, 0);
        noisedata[nd++] = val;  // save an array of raw nose values for processing later (like shadow)
        sofar++;

        var p = (sofar * 100 / total) | 0;
        if (p != last) {
          last = p;
          postMessage({ id: e.data.id, percent: p });
        }
      }
    }
  }

  y = 0;
  last = 0;
  for (var yy = 0; yy < e.data.newH; yy++, y += stepy)
  {
    x = 0;
    for (var xx = 0; xx < e.data.newW; xx++, x += stepx)
    {
      if (e.data.shadow)  // use noisedata values to compute shadow
      {
        var xLeftOffset, xRightOffset, yUpOffset, yDownOffset;
        if (xx == 0)
        {
          xLeftOffset = 0;
          xRightOffset = 1;
        }
        else if (xx == e.data.newW - 1)
        {
          xLeftOffset = -1;
          xRightOffset = 0;
        }
        else
        {
          xLeftOffset = -1;
          xRightOffset = 1;
        }
        if (yy == 0)
        {
          yDownOffset = 0;
          yUpOffset = 1;
        }
        else if (yy == e.data.newH - 1)
        {
          yDownOffset = -1;
          yUpOffset = 0;
        }
        else
        {
          yDownOffset = -1;
          yUpOffset = 1;
        }
        yDownOffset *= e.data.newW;
        yUpOffset *= e.data.newW;

        // Get the noise value of the current point in the source noise map
        // and the noise values of its four-neighbors.
        var nc = noisedata[yy * e.data.newW + xx];
        var nl = noisedata[yy * e.data.newW + xx + xLeftOffset];
        var nr = noisedata[yy * e.data.newW + xx + xRightOffset];
        var nd = noisedata[yy * e.data.newW + xx + yDownOffset];
        var nu = noisedata[yy * e.data.newW + xx + yUpOffset];
        // Now do the lighting calculations.
        var lightIntensity;
        {
          var io = 1.0 * 1.41421356 * sinElev / 2.0;
          var ix = (1.0 - io) * module.Contrast * 1.41421356 * cosElev * cosAzimuth;
          var iy = (1.0 - io) * module.Contrast * 1.41421356 * cosElev * sinAzimuth;
          lightIntensity = (ix * (nl - nr) + iy * (nd - nu) + io);
          if (lightIntensity < 0.0) { lightIntensity = 0.0; }
          lightIntensity *= module.Intensity;
        }
        e.data.gradient.getColor(nc, c);
        imagedata.data[j++] = c.R * lightIntensity * 255;
        imagedata.data[j++] = c.G * lightIntensity * 255;
        imagedata.data[j++] = c.B * lightIntensity * 255;
        imagedata.data[j++] = 255;
      }
      else  // just output a bitmap
      {
        var val;
        if (e.data.usecache && noisedata)
          val = noisedata[(e.data.starty + yy) * e.data.newW + e.data.startx + xx];
        else
        {
          val = module.GetValue(e.data.startx + x, e.data.starty + y, 0);
          if (!e.data.nocachesave) noisedata[nd++] = val;  // save an array of raw nose values for processing later (like shadow)
        }
        if (e.data.normalize.on) val = (val - e.data.normalize.min) / (e.data.normalize.max - e.data.normalize.min);
        if (val < min) min = val;
        if (val > max) max = val;


        e.data.gradient.getColor(val, c);
        imagedata.data[j++] = c.R * 255;
        imagedata.data[j++] = c.G * 255;
        imagedata.data[j++] = c.B * 255;
        imagedata.data[j++] = 255;
      }
      sofar++;

      var p = (sofar * 100 / total)|0;
      if (p != last)
      {
        last = p;
        postMessage( { id: e.data.id, percent: p});
      }
    }
  }

  var ret;
  ret = { id: e.data.id, imagedata: imagedata };
  if (!e.data.normalize.on) { ret.min = min; ret.max = max; }
  postMessage(ret);
}





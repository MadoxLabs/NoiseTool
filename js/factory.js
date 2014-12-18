function ntBillow()
{
  this.points = 0;
  this.pointNames = [];
  this.module = new LibNoise.Billow();
  this.name = "LibNoise.Billow";

  this.parameters = [];
  this.parameters.push( { Name: "Quality", Min: 1, Max: 3, Incr: 1, Rounding: 0, SlideOnly: true } );
  this.parameters.push( { Name: "Octaves", Min: 1, Max: 30, Incr: 1, Rounding: 0, SlideOnly: true });
  this.parameters.push( { Name: "Frequency", Min: 1, Max: 16, Incr: 1, Rounding: 0 });
  this.parameters.push( { Name: "Persistence", Min: 0, Max: 1, Incr: 0.01, Rounding: 2 });
  this.parameters.push( { Name: "Lacunarity", Min: 1, Max: 4, Incr: 0.1, Rounding: 1 });
}

function ntCheckerboard()
{
  this.points = 0;
  this.pointNames = [];
  this.module = new LibNoise.Checkerboard();
  this.name = "LibNoise.Checkerboard";

  this.parameters = [];
}

function ntConstant()
{
  this.points = 0;
  this.pointNames = [];
  this.module = new LibNoise.Constant(0.5);
  this.name = "LibNoise.Constant";

  this.parameters = [];
  this.parameters.push({ Name: "Value", Min: 0, Max: 1, Incr: 0.01, Rounding: 2 });
}

function ntCylinders()
{
  this.points = 0;
  this.pointNames = [];
  this.module = new LibNoise.Cylinders();
  this.name = "LibNoise.Cylinders";

  this.parameters = [];
  this.parameters.push({ Name: "Frequency", Min: 1, Max: 10, Incr: 0.1, Rounding: 1 });
}

function ntNoiseGradient()
{
  this.points = 0;
  this.pointNames = [];
  this.module = new LibNoise.Gradient(1);
  this.name = "LibNoise.Gradient";

  this.parameters = [];
  this.parameters.push({ Name: "Axis", Min: 1, Max: 3, Incr: 1, Rounding: 0, SlideOnly: true });
  this.parameters.push({ Name: "Lower", Min: 0, Max: 1, Incr: 0.01, Rounding: 2 });
  this.parameters.push({ Name: "Upper", Min: 0, Max: 1, Incr: 0.01, Rounding: 2 });
}

function ntPerlin()
{
  this.points = 0;
  this.pointNames = [];
  this.module = new LibNoise.Perlin();
  this.name = "LibNoise.Perlin";

  this.parameters = [];
  this.parameters.push({ Name: "Quality", Min: 1, Max: 3, Incr: 1, Rounding: 0, SlideOnly: true });
  this.parameters.push({ Name: "Octaves", Min: 1, Max: 30, Incr: 1, Rounding: 0, SlideOnly: true });
  this.parameters.push({ Name: "Frequency", Min: 1, Max: 16, Incr: 1, Rounding: 0 });
  this.parameters.push({ Name: "Persistence", Min: 0, Max: 1, Incr: 0.01, Rounding: 2 });
  this.parameters.push({ Name: "Lacunarity", Min: 1, Max: 4, Incr: 0.1, Rounding: 1 });
}

function ntRidged()
{
  this.points = 0;
  this.pointNames = [];
  this.module = new LibNoise.RidgedMultifractal();
  this.name = "LibNoise.RidgedMultifractal";

  this.parameters = [];
  this.parameters.push({ Name: "Quality", Min: 1, Max: 3, Incr: 1, Rounding: 0, SlideOnly: true });
  this.parameters.push({ Name: "Octaves", Min: 1, Max: 30, Incr: 1, Rounding: 0, SlideOnly: true });
  this.parameters.push({ Name: "Frequency", Min: 1, Max: 16, Incr: 1, Rounding: 0 });
  this.parameters.push({ Name: "Lacunarity", Min: 1, Max: 4, Incr: 0.1, Rounding: 1 });
}

function ntSpheres()
{
  this.points = 0;
  this.pointNames = [];
  this.module = new LibNoise.Spheres();
  this.name = "LibNoise.Spheres";

  this.parameters = [];
  this.parameters.push({ Name: "Frequency", Min: 1, Max: 10, Incr: 0.1, Rounding: 1 });
}

function ntVoronoi()
{
  this.points = 0;
  this.pointNames = [];
  this.module = new LibNoise.Voronoi();
  this.name = "LibNoise.Voronoi";

  this.parameters = [];
  this.parameters.push({ Name: "Displacement", Min: 1, Max: 30, Incr: 1, Rounding: 0, SlideOnly: true });
  this.parameters.push({ Name: "Frequency", Min: 1, Max: 16, Incr: 1, Rounding: 0 });
  this.parameters.push({ Name: "Distance", Min: 0, Max: 1, Incr: 1, Rounding: 0 });
}



function ntAbsolute()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.AbsoluteOutput();
  this.name = "LibNoise.AbsoluteOutput";
  this.parameters = [];
}

function ntClamp()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.ClampOutput();
  this.name = "LibNoise.ClampOutput";
  this.parameters = [];
  this.parameters.push( { Name: "Lower", Min: -5, Max: 5, Incr: 0.01, Rounding: 2 });
  this.parameters.push( { Name: "Upper", Min: -5, Max: 5, Incr: 0.01, Rounding: 2 });
}

function ntCurve()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.CurveOutput();
  this.name = "LibNoise.CurveOutput";
  this.parameters = [];
  this.parameters.push( { Name: "PointX", Min: -5, Max: 5, Incr: 0.01, Rounding: 2 });
  this.parameters.push( { Name: "PointY", Min: -5, Max: 5, Incr: 0.01, Rounding: 2 });
  this.parameters.push( { Name: "PointX", Min: -5, Max: 5, Incr: 0.01, Rounding: 2 });
  this.parameters.push( { Name: "PointY", Min: -5, Max: 5, Incr: 0.01, Rounding: 2 });
  this.parameters.push( { Name: "PointX", Min: -5, Max: 5, Incr: 0.01, Rounding: 2 });
  this.parameters.push( { Name: "PointY", Min: -5, Max: 5, Incr: 0.01, Rounding: 2 });
  this.parameters.push( { Name: "PointX", Min: -5, Max: 5, Incr: 0.01, Rounding: 2 });
  this.parameters.push( { Name: "PointY", Min: -5, Max: 5, Incr: 0.01, Rounding: 2 });
}

function ntExponent()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.ExponentialOutput();
  this.name = "LibNoise.ExponentialOutput";
  this.parameters = [];
  this.parameters.push({ Name: "Exponent", Min: 1, Max: 10, Incr: 0.1, Rounding: 1 });
}

function ntInvert()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.InvertOutput();
  this.name = "LibNoise.InvertOutput";
  this.parameters = [];
}

function ntScaleBias()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.ScaleBiasOutput();
  this.name = "LibNoise.ScaleBiasOutput";
  this.parameters = [];
  this.parameters.push( { Name: "Scale", Min: 0, Max: 10, Incr: 0.1, Rounding: 1 });
  this.parameters.push( { Name: "Bias", Min: -5, Max: 5, Incr: 0.1,  Rounding: 1 });
}

function ntTerrace()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.TerraceOutput();
  this.name = "LibNoise.TerraceOutput";
  this.parameters = [];
  this.parameters.push({ Name: "Invert", Min: 0,  Max: 1, Incr: 1,    Rounding: 0, SlideOnly:true });
  this.parameters.push({ Name: "Point",  Min: -5, Max: 5, Incr: 0.01, Rounding: 2 });
}

function ntCache()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.CacheOutput();
  this.name = "LibNoise.CacheOutput";
  this.parameters = [];
}



function ntTurbulence()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.Turbulence();
  this.name = "LibNoise.Turbulence";
  this.parameters = [];
  this.parameters.push({ Name: "Power",     Min: 0, Max: 8,  Incr: 0.1, Rounding: 1 });
  this.parameters.push({ Name: "Roughness", Min: 1, Max: 30, Incr: 1, Rounding: 0, SlideOnly: true });
  this.parameters.push({ Name: "Frequency", Min: 0, Max: 8,  Incr: 0.1, Rounding: 1 });
}

function ntDisplace()
{
  this.points = 4;
  this.pointNames = ['X Displace', 'Source', 'Z Displace', 'Y Displace'];
  this.module = new LibNoise.DisplaceInput();
  this.name = "LibNoise.DisplaceInput";
  this.parameters = [];
}

function ntInvertInput()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.InvertInput();
  this.name = "LibNoise.InvertInput";
  this.parameters = [];
}

function ntRotate()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.RotateInput();
  this.name = "LibNoise.RotateInput";
  this.parameters = [];
  this.parameters.push({ Name: "XAngle", Min: 0, Max: 360, Incr: 1, Rounding: 0 });
  this.parameters.push({ Name: "YAngle", Min: 0, Max: 360, Incr: 1, Rounding: 0 });
  this.parameters.push({ Name: "ZAngle", Min: 0, Max: 360, Incr: 1, Rounding: 0 });
}

function ntScale()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.ScaleInput();
  this.name = "LibNoise.ScaleInput";
  this.parameters = [];
  this.parameters.push({ Name: "X", Min: -10, Max: 10, Incr: 0.1, Rounding: 1 });
  this.parameters.push({ Name: "Y", Min: -10, Max: 10, Incr: 0.1, Rounding: 1 });
  this.parameters.push({ Name: "Z", Min: -10, Max: 10, Incr: 0.1, Rounding: 1 });
}

function ntTranslate()
{
  this.points = 1;
  this.pointNames = ['Source'];
  this.module = new LibNoise.TranslateInput();
  this.name = "LibNoise.TranslateInput";
  this.parameters = [];
  this.parameters.push({ Name: "X", Min: -10, Max: 10, Incr: 0.1, Rounding: 1 });
  this.parameters.push({ Name: "Y", Min: -10, Max: 10, Incr: 0.1, Rounding: 1 });
  this.parameters.push({ Name: "Z", Min: -10, Max: 10, Incr: 0.1, Rounding: 1 });
}

function ntAdd()
{
  this.points = 2;
  this.pointNames = ['Source B', 'Source A'];
  this.module = new LibNoise.AddOutput();
  this.name = "LibNoise.AddOutput";
  this.parameters = [];
}

function ntMax()
{
  this.points = 2;
  this.pointNames = ['Source B', 'Source A'];
  this.module = new LibNoise.LargerOutput();
  this.name = "LibNoise.LargerOutput";
  this.parameters = [];
}

function ntMin()
{
  this.points = 2;
  this.pointNames = ['Source B', 'Source A'];
  this.module = new LibNoise.SmallerOutput();
  this.name = "LibNoise.SmallerOutput";
  this.parameters = [];
}

function ntMultiply()
{
  this.points = 2;
  this.pointNames = ['Source B', 'Source A'];
  this.module = new LibNoise.MultiplyOutput();
  this.name = "LibNoise.MultiplyOutput";
  this.parameters = [];
}

function ntPower()
{
  this.points = 2;
  this.pointNames = ['Source B', 'Source A'];
  this.module = new LibNoise.PowerOutput();
  this.name = "LibNoise.PowerOutput";
  this.parameters = [];
}

function ntBlend()
{
  this.points = 3;
  this.pointNames = ['Source B', 'Source A', 'Weight Module'];
  this.module = new LibNoise.BlendOutput();
  this.name = "LibNoise.BlendOutput";
  this.parameters = [];
}

function ntSelect()
{
  this.points = 3;
  this.pointNames = ['Source B', 'Source A', 'Control'];
  this.module = new LibNoise.SelectOutput();
  this.name = "LibNoise.SelectOutput";
  this.parameters = [];
  this.parameters.push({ Name: "EdgeFalloff", Min: 0, Max: 1, Incr: 0.01, Rounding: 2 });
  this.parameters.push({ Name: "UpperBound", Min: -5, Max: 5, Incr: 0.1, Rounding: 1 });
  this.parameters.push({ Name: "LowerBound", Min: -5, Max: 5, Incr: 0.1, Rounding: 1 });
}

function ntFactory()
{
  this.types = {};
  this.types["Billow"] = ntBillow;
  this.types["Checkerboard"] = ntCheckerboard;
  this.types["Constant"] = ntConstant;
  this.types["Cylinders"] = ntCylinders;
  this.types["Gradient"] = ntNoiseGradient;
  this.types["Perlin"] = ntPerlin;
  this.types["Ridged Multifractal"] = ntRidged;
  this.types["Spheres"] = ntSpheres;
  this.types["Voronoi"] = ntVoronoi;

  this.types["Absolute"] = ntAbsolute;
  this.types["Clamp"] = ntClamp;
  this.types["Curve"] = ntCurve;
  this.types["Exponent"] = ntExponent;
  this.types["Invert"] = ntInvert;
  this.types["ScaleBias"] = ntScaleBias;
  this.types["Terrace"] = ntTerrace;
  this.types["Cache"] = ntCache;

  this.types["Turbulence"] = ntTurbulence;
  this.types["Displace"] = ntDisplace;
  this.types["Invert Input"] = ntInvertInput;
  this.types["Rotate"] = ntRotate;
  this.types["Scale"] = ntScale;
  this.types["Translate"] = ntTranslate;

  this.types["Add"] = ntAdd;
  this.types["Max"] = ntMax;
  this.types["Min"] = ntMin;
  this.types["Multiply"] = ntMultiply;
  this.types["Power"] = ntPower;
  this.types["Blend"] = ntBlend;
  this.types["Select"] = ntSelect;
}

ntFactory.prototype.getModule = function (name)
{
  return new (this.types[name])();
}

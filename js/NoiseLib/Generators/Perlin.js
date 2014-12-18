LibNoise.Perlin = function(seed)
{
  this.Frequency  = 1.0;
  this.Persistence = 0.5;
  this.Quality = LibNoise.NoiseQuality.Standard;
  this.Lacunarity = 2.0;
  this.MaxOctaves = 30;
  this.Seed = 0;
  this.Name = "LibNoise.Perlin";

  var Octaves = 6;
  this.__defineGetter__("Octaves", function () { return Octaves; });
  this.__defineSetter__("Octaves", function (value) { Octaves = LibNoise.NMath.ClampValue(value, 1, this.MaxOctaves); });
}

LibNoise.Perlin.prototype.getInput = getNone;
LibNoise.Perlin.prototype.setInput = setNone;

LibNoise.Perlin.prototype.GetValue = function( x,  y,  z)
{
  var value = 0.0;
  var signal = 0.0;
  var curPersistence = 1.0;
  var seed;

  x *= this.Frequency;
  y *= this.Frequency;
  z *= this.Frequency;

  for (var currentOctave = 0; currentOctave < this.Octaves; currentOctave++)
  {
    seed = (this.Seed + currentOctave) & 0xffffffff;
    signal = LibNoise.NMath.GradientCoherentNoise(x, y, z, seed, this.Quality);
    value += signal * curPersistence;

    x *= this.Lacunarity;
    y *= this.Lacunarity;
    z *= this.Lacunarity;
    curPersistence *= this.Persistence;
  }

  return value;
}
LibNoise.FastBillow = function(seed)
{
  extend(this, new LibNoise.FastMath(seed));
  this.Frequency  = 1.0;
  this.Persistence = 0.5;
  this.Quality = LibNoise.NoiseQuality.Standard;
  this.Lacunarity = 2.0;
  this.MaxOctaves = 30;

  var Octaves = 6;
  this.__defineGetter__("Octaves", function () { return Octaves; });
  this.__defineSetter__("Octaves", function (value) { Octaves = LibNoise.NMath.ClampValue(value, 1, this.MaxOctaves); });
}

LibNoise.FastBillow.prototype.GetValue = function( x,  y,  z)
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
      signal = this.GradientCoherentNoise(x, y, z, seed, this.Quality);
      signal = 2.0 * Math.abs(signal) - 1.0;
      value += signal * curPersistence;

      x *= this.Lacunarity;
      y *= this.Lacunarity;
      z *= this.Lacunarity;
      curPersistence *= this.Persistence;
    }
    value += 0.5;
    return value;
}


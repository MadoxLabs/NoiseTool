LibNoise.FastRidgedMultifractal = function(seed)
{
  extend(this, new LibNoise.FastMath(seed));
  this.Frequency  = 1.0;
  this.Quality = LibNoise.NoiseQuality.Standard;
  this.MaxOctaves = 30;
  this.SpectralWeights = [];

  var Lacunarity = 2.0;
  this.__defineGetter__("Lacunarity", function () { return Lacunarity; });
  this.__defineSetter__("Lacunarity", function (value) { Lacunarity = value; this.CalculateSpectralWeights(); });

  var Octaves = 6;
  this.__defineGetter__("Octaves", function () { return Octaves; });
  this.__defineSetter__("Octaves", function (value) { Octaves = LibNoise.NMath.ClampValue(value, 1, this.MaxOctaves); });

  this.CalculateSpectralWeights();
}

LibNoise.FastRidgedMultifractal.prototype.GetValue = function (x, y, z)
{
  x *= this.Frequency;
  y *= this.Frequency;
  z *= this.Frequency;

  var signal = 0.0;
  var value = 0.0;
  var weight = 1.0;

  // These parameters should be user-defined; they may be exposed in a
  // future version of libnoise.
  var offset = 1.0;
  var gain = 2.0;

  for (var currentOctave = 0; currentOctave < this.Octaves; currentOctave++)
  {

    var seed = (this.Seed + currentOctave) & 0x7fffffff;
    signal = this.GradientCoherentNoise(x, y, z, seed, this.Quality);

    // Make the ridges.
    signal = Math.abs(signal);
    signal = offset - signal;

    // Square the signal to increase the sharpness of the ridges.
    signal *= signal;

    // The weighting from the previous octave is applied to the signal.
    // Larger values have higher weights, producing sharp points along the
    // ridges.
    signal *= weight;

    // Weight successive contributions by the previous signal.
    weight = signal * gain;
    if (weight > 1.0) weight = 1.0;
    if (weight < 0.0) weight = 0.0;

    // Add the signal to the output value.
    value += (signal * this.SpectralWeights[currentOctave]);

    // Go to the next octave.
    x *= this.Lacunarity;
    y *= this.Lacunarity;
    z *= this.Lacunarity;
  }

  return (value * 1.25) - 1.0;
}

LibNoise.FastRidgedMultifractal.prototype.CalculateSpectralWeights = function()
{
    var h = 1.0;

    var frequency = 1.0;
    for (var i = 0; i < this.MaxOctaves; i++)
    {
        // Compute weight for each frequency.
        this.SpectralWeights[i] = Math.pow(frequency, -h);
        frequency *= this.Lacunarity;
    }
}


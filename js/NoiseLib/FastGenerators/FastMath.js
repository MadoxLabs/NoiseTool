LibNoise.FastMath = function(seed) 
{
  if (seed === undefined) seed = 0;
  if (seed < 0) seed = 0;
  this.RandomPermutations = [];
  this.SelectedPermutations = [];
  this.GradientTable = [];
  this.SetSeed(seed);
};

LibNoise.FastMath.prototype.GradientCoherentNoise = function( x,  y,  z,  seed,  noiseQuality)
{
    var x0 = (x > 0.0 ? x : x - 1)|0;
    var y0 = (y > 0.0 ? y : y - 1)|0;
    var z0 = (z > 0.0 ? z : z - 1)|0;
    
    var X = x0 & 255;
    var Y = y0 & 255;
    var Z = z0 & 255;

    var u = 0, v = 0, w = 0;
    switch (noiseQuality)
    {
        case LibNoise.NoiseQuality.Low:
        u = (x - x0);
        v = (y - y0);
        w = (z - z0);
        break;
      case LibNoise.NoiseQuality.Standard:
        u = LibNoise.NMath.SCurve3(x - x0);
        v = LibNoise.NMath.SCurve3(y - y0);
        w = LibNoise.NMath.SCurve3(z - z0);
        break;
      case LibNoise.NoiseQuality.High:
        u = LibNoise.NMath.SCurve5(x - x0);
        v = LibNoise.NMath.SCurve5(y - y0);
        w = LibNoise.NMath.SCurve5(z - z0);
        break;
    }

    var A = this.SelectedPermutations[X] + Y;
    var AA = this.SelectedPermutations[A] + Z;
    var AB = this.SelectedPermutations[A + 1] + Z;
    var B = this.SelectedPermutations[X + 1] + Y;
    var BA = this.SelectedPermutations[B] + Z;
    var BB = this.SelectedPermutations[B + 1] + Z;

    var a = LibNoise.NMath.LinearInterpolate(this.GradientTable[AA], this.GradientTable[BA], u);
    var b = LibNoise.NMath.LinearInterpolate(this.GradientTable[AB], this.GradientTable[BB], u);
    var c = LibNoise.NMath.LinearInterpolate(a, b, v);
    var d = LibNoise.NMath.LinearInterpolate(this.GradientTable[AA + 1], this.GradientTable[BA + 1], u);
    var e = LibNoise.NMath.LinearInterpolate(this.GradientTable[AB + 1], this.GradientTable[BB + 1], u);
    var f = LibNoise.NMath.LinearInterpolate(d, e, v);
    return 　LibNoise.NMath.LinearInterpolate(c, f, w);
}

LibNoise.FastMath.prototype.SetSeed = function(value)
{
    this.Seed = value;

    // Generate new random permutations with this seed.
    var random = new mxRand();
    random.seed(this.Seed, true);

    for (var i = 0; i < 512; i++)        this.RandomPermutations[i] = random.popInt(255);
    for (var i = 0; i < 256; i++)        { this.SelectedPermutations[256 + i] = this.RandomPermutations[i]; this.SelectedPermutations[i] = this.RandomPermutations[i]; }

    // Generate a new gradient table
    var kkf = []
    for (var i = 0; i < 256; i++)        kkf[i] = -1.0 + 2.0 * (i / 255.0);

    for (var i = 0; i < 256; i++)        this.GradientTable[i] = kkf[this.SelectedPermutations[i]];
    for (var i = 256; i < 512; i++)      this.GradientTable[i] = this.GradientTable[i & 255];
}


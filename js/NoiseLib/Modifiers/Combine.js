LibNoise.AddOutput = function(s1, s2)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.Name = "LibNoise.AddOutput";
}

LibNoise.AddOutput.prototype.GetValue = function(x, y, z)
{
  if (!this.SourceModule1 && !this.SourceModule2) return 0;
  return (this.SourceModule1 ? this.SourceModule1.GetValue(x, y, z) : 0) + ( this.SourceModule2 ? this.SourceModule2.GetValue(x, y, z) : 0);
}

LibNoise.AddOutput.prototype.getInput = getTwo;
LibNoise.AddOutput.prototype.setInput = setTwo;


LibNoise.MultiplyOutput = function(s1, s2)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.Name = "LibNoise.MultiplyOutput";
}

LibNoise.MultiplyOutput.prototype.GetValue = function(x, y, z)
{
  if (!this.SourceModule1 && !this.SourceModule2) return 0;
  return (this.SourceModule1 ? this.SourceModule1.GetValue(x, y, z) : 1) * (this.SourceModule2 ? this.SourceModule2.GetValue(x, y, z) : 1);
}

LibNoise.MultiplyOutput.prototype.getInput = getTwo;
LibNoise.MultiplyOutput.prototype.setInput = setTwo;



LibNoise.PowerOutput = function (s1, s2)
{
  this.BaseModule = s1;
  this.PowerModule = s2;
  this.Name = "LibNoise.PowerOutput";
}

LibNoise.PowerOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.BaseModule || !this.PowerModule) return 0;
  return Math.pow(this.BaseModule.GetValue(x, y, z), this.PowerModule.GetValue(x, y, z));
}

LibNoise.PowerOutput.prototype.getInput = function (i)
{
  if (i == 0) return this.BaseModule;
  if (i == 1) return this.PowerModule;
  return null;
}
LibNoise.PowerOutput.prototype.setInput = function (i, mod)
{
  if (i == 0) this.BaseModule = mod;
  if (i == 1) this.PowerModule = mod;
}




LibNoise.BlendOutput = function (s1, s2, w)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.WeightModule = w;
  this.Name = "LibNoise.BlendOutput";
}

LibNoise.BlendOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule1 || !this.SourceModule2 || !this.WeightModule) return 0;
  return LibNoise.NMath.LinearInterpolate(this.SourceModule1.GetValue(x, y, z), this.SourceModule2.GetValue(x, y, z), (this.WeightModule.GetValue(x, y, z) + 1.0) / 2.0);
}

LibNoise.BlendOutput.prototype.getInput = function (i)
{
  if (i == 0) return this.SourceModule1;
  if (i == 1) return this.SourceModule2;
  if (i == 2) return this.WeightModule;
  return null;
}
LibNoise.BlendOutput.prototype.setInput = function (i, mod)
{
  if (i == 0) this.SourceModule1 = mod;
  if (i == 1) this.SourceModule2 = mod;
  if (i == 2) this.WeightModule = mod;
}

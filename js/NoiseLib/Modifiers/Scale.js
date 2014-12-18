LibNoise.ScaleOutput = function(source, scale)
{
  this.SourceModule = source;
  this.Scale = scale;
  this.Name = "LibNoise.ScaleOutput";
}

LibNoise.ScaleOutput.prototype.getInput = getOne;
LibNoise.ScaleOutput.prototype.setInput = setOne;

LibNoise.ScaleOutput.prototype.GetValue = function(x,y,z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x, y, z) * this.Scale;
}




LibNoise.ScaleInput = function (source)
{
  this.SourceModule = source;
  this.X = 1;
  this.Y = 1;
  this.Z = 1;
  this.Name = "LibNoise.ScaleInput";
}

LibNoise.ScaleInput.prototype.getInput = getOne;
LibNoise.ScaleInput.prototype.setInput = setOne;

LibNoise.ScaleInput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x * this.X, y * this.Y, z * this.Z);
}







LibNoise.ScaleBiasOutput = function (source)
{
  this.SourceModule = source;
  this.Scale = 1.0;
  this.Bias = 0.0;
  this.Name = "LibNoise.ScaleBiasOutput";
}

LibNoise.ScaleBiasOutput.prototype.getInput = getOne;
LibNoise.ScaleBiasOutput.prototype.setInput = setOne;

LibNoise.ScaleBiasOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x, y, z) * this.Scale + this.Bias;
}

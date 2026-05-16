LibNoise.InvertInput = function(source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.InvertInput";
}

LibNoise.InvertInput.prototype.GetValue = function(x,y,z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(-x, -y, -z);
}

LibNoise.InvertInput.prototype.getInput = getOne;
LibNoise.InvertInput.prototype.setInput = setOne;




LibNoise.InvertOutput = function(source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.InvertOutput";
}

LibNoise.InvertOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return -this.SourceModule.GetValue(x, y, z);
}

LibNoise.InvertOutput.prototype.getInput = getOne;
LibNoise.InvertOutput.prototype.setInput = setOne;

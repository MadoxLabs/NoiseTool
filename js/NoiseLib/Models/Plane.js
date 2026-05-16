LibNoise.Plane = function(source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.Plane";
}

LibNoise.Plane.prototype.GetValue = function (x, z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x, 0, z);
}

LibNoise.Plane.prototype.getInput = getOne;
LibNoise.Plane.prototype.setInput = setOne;

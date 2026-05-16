LibNoise.Cylinder = function(source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.Cylinder";
}

LibNoise.Cylinder.prototype.GetValue = function (angle, height)
{
  if (!this.SourceModule) return 0;
  var x, y, z;
  x = Math.cos(angle);
  y = height;
  z = Math.sin(angle);
  return this.SourceModule.GetValue(x, y, z);
}

LibNoise.Cylinder.prototype.getInput = getOne;
LibNoise.Cylinder.prototype.setInput = setOne;

LibNoise.Constant = function(value)
{
  this.Value = value;
  this.Name = "LibNoise.Constant";
}

LibNoise.Constant.prototype.getInput = getNone;
LibNoise.Constant.prototype.setInput = setNone;

LibNoise.Constant.prototype.GetValue = function (x, y, z)
{
  return this.Value;
}

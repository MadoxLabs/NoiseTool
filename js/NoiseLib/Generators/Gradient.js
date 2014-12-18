LibNoise.Gradient = function(a)
{
  this.Axis = a;
  this.Lower = 0;
  this.Upper = 0.99;
  this.Name = "LibNoise.Gradient";

}

LibNoise.Gradient.prototype.getInput = getNone;
LibNoise.Gradient.prototype.setInput = setNone;

LibNoise.Gradient.prototype.GetValue = function (x, y, z)
{
  var val = x;
  if (this.Axis == LibNoise.Axis.Y) val = y;
  else if (this.Axis == LibNoise.Axis.Z) val = z;

  if (val < this.Lower) val = this.Lower;
  if (val > this.Upper) val = this.Upper;
  return (val - Math.floor(val)) * 2.0 - 1.0;
}

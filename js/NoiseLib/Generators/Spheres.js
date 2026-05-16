LibNoise.Spheres = function()
{
  this.Frequency = 1.0;
  this.Name = "LibNoise.Spheres";
}

LibNoise.Spheres.prototype.getInput = getNone;
LibNoise.Spheres.prototype.setInput = setNone;

LibNoise.Spheres.prototype.GetValue = function (x, y, z)
{
  x *= this.Frequency;
  y *= this.Frequency;
  z *= this.Frequency;

  var distFromCenter = Math.sqrt(x * x + y * y + z * z);
  var distFromCenter0 = Math.floor(distFromCenter > 0.0 ? distFromCenter : distFromCenter - 1);
  var distFromSmallerSphere = distFromCenter - distFromCenter0;
  var distFromLargerSphere = 1.0 - distFromSmallerSphere;
  var nearestDist = LibNoise.NMath.GetSmaller(distFromSmallerSphere, distFromLargerSphere);
  return 1.0 - (nearestDist * 4.0);
}

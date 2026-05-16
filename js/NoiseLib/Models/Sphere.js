LibNoise.Sphere = function(source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.Sphere";
}

LibNoise.Sphere.prototype.GetValue = function (latitude, longitude)
{
  if (!this.SourceModule) return 0;
  var x = 0, y = 0, z = 0;
  var coords = LibNoise.NMath.LatLonToXYZ(latitude, longitude);
  return this.SourceModule.GetValue(coords.x, coords.y, coords.z);
}

LibNoise.Sphere.prototype.getInput = getOne;
LibNoise.Sphere.prototype.setInput = setOne;

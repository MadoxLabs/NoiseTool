LibNoise.Checkerboard = function()
{
  this.Name = "LibNoise.Checkerboard";
}

LibNoise.Checkerboard.prototype.getInput = getNone;
LibNoise.Checkerboard.prototype.setInput = setNone;

LibNoise.Checkerboard.prototype.GetValue = function(x,y,z)
{
  var x0 = Math.floor(x > 0.0 ? x : x - 1);
  var y0 = Math.floor(y > 0.0 ? y : y - 1);
  var z0 = Math.floor(z > 0.0 ? z : z - 1);

  var result = ((x0 & 1 ^ y0 & 1 ^ z0 & 1));
  if (result > 0) 
    return -1.0;
  else
    return 1.0;
}

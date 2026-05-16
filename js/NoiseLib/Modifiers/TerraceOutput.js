LibNoise.TerraceOutput = function(s1)
{
  this.SourceModule = s1;
  this.Invert = 0;
  this.ControlPoints = [];
  this.Name = "LibNoise.TerraceOutput";
}

LibNoise.TerraceOutput.prototype.getInput = getOne;
LibNoise.TerraceOutput.prototype.setInput = setOne;

LibNoise.TerraceOutput.prototype.GetValue = function(x, y, z)
{
  if (!this.SourceModule) return 0;
  // Get the output value from the source module.
  var sourceModuleValue = this.SourceModule.GetValue(x, y, z);

  var controlPointCount = this.ControlPoints.length;

  // Find the first element in the control point array that has a value
  // larger than the output value from the source module.
  var indexPos;
  for (indexPos = 0; indexPos < controlPointCount; indexPos++)
  {
    if (sourceModuleValue < this.ControlPoints[indexPos])
    {
      break;
    }
  }

  // Find the two nearest control points so that we can map their values
  // onto a quadratic curve.
  var index0 = LibNoise.NMath.ClampValue(indexPos - 1, 0, controlPointCount - 1);
  var index1 = LibNoise.NMath.ClampValue(indexPos, 0, controlPointCount - 1);

  // If some control points are missing (which occurs if the output value from
  // the source module is greater than the largest value or less than the
  // smallest value of the control point array), get the value of the nearest
  // control point and exit now.
  if (index0 == index1)
  {
    return this.ControlPoints[index1];
  }

  // Compute the alpha value used for linear interpolation.
  var value0 = this.ControlPoints[index0];
  var value1 = this.ControlPoints[index1];
  var alpha = (sourceModuleValue - value0) / (value1 - value0);
  if (this.Invert)
  {
    alpha = 1.0 - alpha;

    //swaap
    var tmp = value1;
    value1 = value0;
    value0 = tmp;
  }

  // Squaring the alpha produces the terrace effect.
  alpha *= alpha;

  // Now perform the linear interpolation given the alpha value.
  return LibNoise.NMath.LinearInterpolate(value0, value1, alpha);
}

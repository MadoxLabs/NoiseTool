LibNoise.CurveOutput = function(s1)
{
  this.SourceModule = s1;
  this.ControlPoints = [];
  this.Name = "LibNoise.CurveOutput";
}

LibNoise.CurveOutput.prototype.getInput = getOne;
LibNoise.CurveOutput.prototype.setInput = setOne;

LibNoise.CurveOutput.prototype.GetValue = function(x, y, z)
{
  if (!this.SourceModule) return 0;
  // Get the output value from the source module.
  var sourceModuleValue = this.SourceModule.GetValue(x, y, z);

  var controlPointCount = this.ControlPoints.length;

  // Find the first element in the control point array that has an input value
  // larger than the output value from the source module.
  var indexPos;
  for (indexPos = 0; indexPos < controlPointCount; indexPos++)
  {
    if (sourceModuleValue < this.ControlPoints[indexPos].Input)
    {
      break;
    }
  }

  // Find the four nearest control points so that we can perform cubic
  // interpolation.
  var index0 = LibNoise.NMath.ClampValue(indexPos - 2, 0, controlPointCount - 1);
  var index1 = LibNoise.NMath.ClampValue(indexPos - 1, 0, controlPointCount - 1);
  var index2 = LibNoise.NMath.ClampValue(indexPos, 0, controlPointCount - 1);
  var index3 = LibNoise.NMath.ClampValue(indexPos + 1, 0, controlPointCount - 1);

  // If some control points are missing (which occurs if the value from the
  // source module is greater than the largest input value or less than the
  // smallest input value of the control point array), get the corresponding
  // output value of the nearest control point and exit now.
  if (index1 == index2)
  {
    return this.ControlPoints[index1].Output;
  }

  // Compute the alpha value used for cubic interpolation.
  var input0 = this.ControlPoints[index1].Input;
  var input1 = this.ControlPoints[index2].Input;
  var alpha = (sourceModuleValue - input0) / (input1 - input0);

  // Now perform the cubic interpolation given the alpha value.
  return LibNoise.NMath.CubicInterpolate(
    this.ControlPoints[index0].Output,
    this.ControlPoints[index1].Output,
    this.ControlPoints[index2].Output,
    this.ControlPoints[index3].Output,
    alpha);
}

LibNoise.CurveOutput.prototype.FindInsertionPos = function(inputValue)
{
  var insertionPos;
  var controlPointCount = this.ControlPoints.length;
  for (insertionPos = 0; insertionPos < controlPointCount; insertionPos++)
  {
    if (inputValue < this.ControlPoints[insertionPos].Input) {
      // We found the array index in which to insert the new control point.
      // Exit now.
      break;
    } else if (inputValue == this.ControlPoints[insertionPos].Input) {
      // Each control point is required to contain a unique input value, so
      // throw an exception.
      break;
    }
  }
  return insertionPos;
}

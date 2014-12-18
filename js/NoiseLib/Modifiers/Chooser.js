LibNoise.SmallerOutput = function (s1, s2)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.Name = "LibNoise.SmallerOutput";
}

LibNoise.SmallerOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule1 && !this.SourceModule2) return 0;
  if (!this.SourceModule1) return this.SourceModule2.GetValue(x, y, z);
  if (!this.SourceModule2) return this.SourceModule1.GetValue(x, y, z);
  return LibNoise.NMath.GetSmaller(this.SourceModule1.GetValue(x, y, z), this.SourceModule2.GetValue(x, y, z));
}

LibNoise.SmallerOutput.prototype.getInput = getTwo;
LibNoise.SmallerOutput.prototype.setInput = setTwo;


LibNoise.CacheOutput = function (s1)
{
  this.SourceModule = s1;
  this.cacheX = 0;
  this.cacheY = 0;
  this.cacheZ = 0;
  this.cacheVal = 0;
  this.cached = false;
  this.Name = "LibNoise.CacheOutput";
}

LibNoise.CacheOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  if (this.cached && this.cacheX == x && this.cacheY == y && this.cacheZ == z) return this.cacheVal;

  this.cacheVal = this.SourceModule.GetValue(x, y, z);
  this.cacheX = x;
  this.cacheY = y;
  this.cacheZ = z;
  this.cached = true;
  return this.cacheVal;}

LibNoise.CacheOutput.prototype.getInput = getOne;
LibNoise.CacheOutput.prototype.setInput = setOne;



LibNoise.LargerOutput = function (s1, s2)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.Name = "LibNoise.LargerOutput";
}

LibNoise.LargerOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule1 && !this.SourceModule2) return 0;
  if (!this.SourceModule1) return this.SourceModule2.GetValue(x, y, z);
  if (!this.SourceModule2) return this.SourceModule1.GetValue(x, y, z);
  return LibNoise.NMath.GetLarger(this.SourceModule1.GetValue(x, y, z), this.SourceModule2.GetValue(x, y, z));
}

LibNoise.LargerOutput.prototype.getInput = getTwo;
LibNoise.LargerOutput.prototype.setInput = setTwo;





LibNoise.SelectOutput = function (s1, s2, c)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.ControlModule = c;
  this.Name = "LibNoise.SelectOutput";

  var EdgeFalloff = 0.0;
  this.__defineGetter__("EdgeFalloff", function () { return EdgeFalloff; });
  this.__defineSetter__("EdgeFalloff", function (value) {
    var boundSize = this.UpperBound - this.LowerBound;
    EdgeFalloff = (value > boundSize / 2) ? boundSize / 2 : value;
  });
  var LowerBound = -1.0;
  this.__defineGetter__("LowerBound", function () { return LowerBound; });
  this.__defineSetter__("LowerBound", function (value) { LowerBound = value; this.EdgeFalloff = EdgeFalloff; });
  var UpperBound = 1.0;
  this.__defineGetter__("UpperBound", function () { return UpperBound; });
  this.__defineSetter__("UpperBound", function (value) { UpperBound = value; this.EdgeFalloff = EdgeFalloff; });
}

LibNoise.SelectOutput.prototype.getInput = function (i)
{
  if (i == 0) return this.SourceModule1;
  if (i == 1) return this.SourceModule2;
  if (i == 2) return this.ControlModule;
  return null;
}
LibNoise.SelectOutput.prototype.setInput = function (i, mod)
{
  if (i == 0) this.SourceModule1 = mod;
  if (i == 1) this.SourceModule2 = mod;
  if (i == 2) this.ControlModule = mod;
}


LibNoise.SelectOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule1 || !this.SourceModule2 || !this.ControlModule) return 0;
  var controlValue = this.ControlModule.GetValue(x, y, z);
  var alpha;

  if (this.EdgeFalloff > 0.0)
  {
    if (controlValue < (this.LowerBound - this.EdgeFalloff))
    {
      // The output value from the control module is below the selector
      // threshold; return the output value from the first source module.
      return this.SourceModule1.GetValue(x, y, z);
    }
    else if (controlValue < (this.LowerBound + this.EdgeFalloff))
    {
      // The output value from the control module is near the lower end of the
      // selector threshold and within the smooth curve. Interpolate between
      // the output values from the first and second source modules.
      var lowerCurve = (this.LowerBound - this.EdgeFalloff);
      var upperCurve = (this.LowerBound + this.EdgeFalloff);
      alpha = LibNoise.NMath.SCurve3((controlValue - lowerCurve) / (upperCurve - lowerCurve));
      return LibNoise.NMath.LinearInterpolate(this.SourceModule1.GetValue(x, y, z), this.SourceModule2.GetValue(x, y, z), alpha);
    }
    else if (controlValue < (this.UpperBound - this.EdgeFalloff))
    {
      // The output value from the control module is within the selector
      // threshold; return the output value from the second source module.
      return this.SourceModule2.GetValue(x, y, z);
    }
    else if (controlValue < (this.UpperBound + this.EdgeFalloff))
    {
      // The output value from the control module is near the upper end of the
      // selector threshold and within the smooth curve. Interpolate between
      // the output values from the first and second source modules.
      var lowerCurve = (this.UpperBound - this.EdgeFalloff);
      var upperCurve = (this.UpperBound + this.EdgeFalloff);
      alpha = LibNoise.NMath.SCurve3((controlValue - lowerCurve) / (upperCurve - lowerCurve));
      return LibNoise.NMath.LinearInterpolate(this.SourceModule2.GetValue(x, y, z), this.SourceModule1.GetValue(x, y, z), alpha);
    }
    else
    {
      // Output value from the control module is above the selector threshold;
      // return the output value from the first source module.
      return this.SourceModule1.GetValue(x, y, z);
    }
  }
  else
  {
    if (controlValue < this.LowerBound || controlValue > this.UpperBound)
    {
      return this.SourceModule1.GetValue(x, y, z);
    }
    else
    {
      return this.SourceModule2.GetValue(x, y, z);
    }
  }
}

LibNoise.SelectOutput.prototype.FixFalloff = function (value)
{
  var boundSize = this.UpperBound - this.LowerBound;
  if (this.EdgeFalloff) this.EdgeFalloff = (value > boundSize / 2) ? boundSize / 2 : value;
}
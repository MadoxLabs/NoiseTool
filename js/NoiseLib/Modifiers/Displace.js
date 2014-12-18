LibNoise.DisplaceInput = function(source, xmod, ymod, zmod)
{
  this.SourceModule = source;
  this.XDisplaceModule = xmod;
  this.YDisplaceModule = ymod;
  this.ZDisplaceModule = zmod;
  this.Name = "LibNoise.DisplaceInput";
}

LibNoise.DisplaceInput.prototype.GetValue = function(x,y,z)
{
  if (!this.SourceModule) return 0;
  x += this.XDisplaceModule != null ? this.XDisplaceModule.GetValue(x, y, z) : 0;
  y += this.YDisplaceModule != null ? this.YDisplaceModule.GetValue(x, y, z) : 0;
  z += this.ZDisplaceModule != null ? this.ZDisplaceModule.GetValue(x, y, z) : 0;

  return this.SourceModule.GetValue(x, y, z);
}

LibNoise.DisplaceInput.prototype.getInput = function (i)
{
  if (i == 1) return this.SourceModule;
  if (i == 0) return this.XDisplaceModule;
  if (i == 3) return this.YDisplaceModule;
  if (i == 2) return this.ZDisplaceModule;
  return null;
}
LibNoise.DisplaceInput.prototype.setInput = function (i, mod)
{
  if (i == 1) this.SourceModule = mod;
  if (i == 0) this.XDisplaceModule = mod;
  if (i == 3) this.YDisplaceModule = mod;
  if (i == 2) this.ZDisplaceModule = mod;
}



LibNoise.TranslateInput = function (source)
{
  this.SourceModule = source;
  this.X = 0;
  this.Y = 0;
  this.Z = 0;
  this.Name = "LibNoise.TranslateInput";
}

LibNoise.TranslateInput.prototype.getInput = getOne;
LibNoise.TranslateInput.prototype.setInput = setOne;


LibNoise.TranslateInput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x + this.X, y + this.Y, z + this.Z);
}




LibNoise.RotateInput = function (source)
{
  this.SourceModule = source;
  this.XAngle = 0;
  this.YAngle = 0;
  this.ZAngle = 0;
  this.SetAngles();
  this.Name = "LibNoise.RotateInput";
}

LibNoise.RotateInput.prototype.getInput = getOne;
LibNoise.RotateInput.prototype.setInput = setOne;

LibNoise.RotateInput.prototype.SetAngles = function()
{
  var xCos, yCos, zCos, xSin, ySin, zSin;
  xCos = Math.cos(this.XAngle);
  yCos = Math.cos(this.YAngle);
  zCos = Math.cos(this.ZAngle);
  xSin = Math.sin(this.XAngle);
  ySin = Math.sin(this.YAngle);
  zSin = Math.sin(this.ZAngle);

  this.m_x1Matrix = ySin * xSin * zSin + yCos * zCos;
  this.m_y1Matrix = xCos * zSin;
  this.m_z1Matrix = ySin * zCos - yCos * xSin * zSin;
  this.m_x2Matrix = ySin * xSin * zCos - yCos * zSin;
  this.m_y2Matrix = xCos * zCos;
  this.m_z2Matrix = -yCos * xSin * zCos - ySin * zSin;
  this.m_x3Matrix = -ySin * xCos;
  this.m_y3Matrix = xSin;
  this.m_z3Matrix = yCos * xCos;
}

LibNoise.RotateInput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  var nx = (this.m_x1Matrix * x) + (this.m_y1Matrix * y) + (this.m_z1Matrix * z);
  var ny = (this.m_x2Matrix * x) + (this.m_y2Matrix * y) + (this.m_z2Matrix * z);
  var nz = (this.m_x3Matrix * x) + (this.m_y3Matrix * y) + (this.m_z3Matrix * z);
  return this.SourceModule.GetValue(nx, ny, nz);
}





LibNoise.BiasOutput = function (source, b)
{
  this.SourceModule = source;
  this.Bias = b;
  this.Name = "LibNoise.BiasOutput";
}

LibNoise.BiasOutput.prototype.getInput = getOne;
LibNoise.BiasOutput.prototype.setInput = setOne;

LibNoise.BiasOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x, y, z) + this.Bias;
}





LibNoise.ClampOutput = function (source)
{
  this.SourceModule = source;
  this.Lower = -1;
  this.Upper = 1;
  this.Name = "LibNoise.ClampOutput";
}

LibNoise.ClampOutput.prototype.getInput = getOne;
LibNoise.ClampOutput.prototype.setInput = setOne;

LibNoise.ClampOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  var value = this.SourceModule.GetValue(x, y, z);
  if (value < this.Lower) return this.Lower;
  else if (value > this.Upper) return this.Upper;
  else    return value;
}





LibNoise.AbsoluteOutput = function (source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.AbsoluteOutput";
}

LibNoise.AbsoluteOutput.prototype.getInput = getOne;
LibNoise.AbsoluteOutput.prototype.setInput = setOne;

LibNoise.AbsoluteOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return Math.abs(this.SourceModule.GetValue(x, y, z));
}






LibNoise.ExponentialOutput = function (source, exponent)
{
  this.SourceModule = source;
  this.Exponent = exponent ? exponent : 1;
  this.Name = "LibNoise.ExponentialOutput";
}

LibNoise.ExponentialOutput.prototype.getInput = getOne;
LibNoise.ExponentialOutput.prototype.setInput = setOne;

LibNoise.ExponentialOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return (Math.pow(Math.abs((this.SourceModule.GetValue(x, y, z) + 1.0) / 2.0), this.Exponent) * 2.0 - 1.0);
}





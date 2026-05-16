LibNoise.Line = function(source)
{
  this.SourceModule = source;
  this.Attenuate = true;
  this.m_x0 = 0.0;
  this.m_x1 = 1.0;
  this.m_y0 = 0.0;
  this.m_y1 = 1.0;
  this.m_z0 = 0.0;
  this.m_z1 = 1.0;
  this.Name = "LibNoise.Line";
}

LibNoise.Line.prototype.GetValue = function (p)
{
  if (!this.SourceModule) return 0;
  var x = (this.m_x1 - this.m_x0) * p + this.m_x0;
  var y = (this.m_y1 - this.m_y0) * p + this.m_y0;
  var z = (this.m_z1 - this.m_z0) * p + this.m_z0;
  var value = this.SourceModule.GetValue(x, y, z);

  if (this.Attenuate)  return p * (1.0 - p) * 4 * value;
  else                 return value;
}

LibNoise.Line.prototype.SetStartPoint = function(x,y,z)
{
  this.m_x0 = x;
  this.m_y0 = y;
  this.m_z0 = z;
}

LibNoise.Line.prototype.SetEndPoint = function(x,y,z)
{
  this.m_x1 = x;
  this.m_y1 = y;
  this.m_z1 = z;
}

LibNoise.Line.prototype.getInput = getOne;
LibNoise.Line.prototype.setInput = setOne;

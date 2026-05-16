LibNoise.Turbulence = function (source)
{
  this.SourceModule = source;
  this.Power = 1.0;
  this.XDistort = new LibNoise.Perlin();
  this.YDistort = new LibNoise.Perlin();
  this.ZDistort = new LibNoise.Perlin();
  this.Name = "LibNoise.Turbulence";

  this.__defineGetter__("Frequency", function () { return this.XDistort.Frequency; });
  this.__defineSetter__("Frequency", function (value) { this.XDistort.Frequency = value; this.YDistort.Frequency = value; this.ZDistort.Frequency = value; });

  this.__defineGetter__("Roughness", function () { return this.XDistort.Octaves; });
  this.__defineSetter__("Roughness", function (value) { this.XDistort.Octaves = value; this.YDistort.Octaves = value; this.ZDistort.Octaves = value; });

  this.__defineGetter__("Seed", function () { return this.XDistort.Seed; });
  this.__defineSetter__("Seed", function (value) { this.XDistort.Seed = value; this.YDistort.Seed = value + 1; this.ZDistort.Seed = value + 2; });

  this.Roughness = 3;
  this.Seed = 0;
}

LibNoise.Turbulence.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  var x0, y0, z0;
  var x1, y1, z1;
  var x2, y2, z2;
  x0 = x + (12414.0 / 65536.0);
  y0 = y + (65124.0 / 65536.0);
  z0 = z + (31337.0 / 65536.0);
  x1 = x + (26519.0 / 65536.0);
  y1 = y + (18128.0 / 65536.0);
  z1 = z + (60493.0 / 65536.0);
  x2 = x + (53820.0 / 65536.0);
  y2 = y + (11213.0 / 65536.0);
  z2 = z + (44845.0 / 65536.0);
  var xDistort = x + (this.XDistort.GetValue(x0, y0, z0) * this.Power);
  var yDistort = y + (this.YDistort.GetValue(x1, y1, z1) * this.Power);
  var zDistort = z + (this.ZDistort.GetValue(x2, y2, z2) * this.Power);

  return this.SourceModule.GetValue(xDistort, yDistort, zDistort);
}

LibNoise.Turbulence.prototype.getInput = getOne;
LibNoise.Turbulence.prototype.setInput = setOne;



LibNoise.TurbulenceCustom = function (source)
{
  this.SourceModule = source;
  this.Power = 1.0;
  this.XDistort = new LibNoise.Constant(0);
  this.YDistort = this.XDistort;
  this.ZDistort = this.XDistort;
  this.Name = "LibNoise.TurbulenceCustom";

}

LibNoise.TurbulenceCustom.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  var x0, y0, z0;
  var x1, y1, z1;
  var x2, y2, z2;
  x0 = x + (12414.0 / 65536.0);
  y0 = y + (65124.0 / 65536.0);
  z0 = z + (31337.0 / 65536.0);
  x1 = x + (26519.0 / 65536.0);
  y1 = y + (18128.0 / 65536.0);
  z1 = z + (60493.0 / 65536.0);
  x2 = x + (53820.0 / 65536.0);
  y2 = y + (11213.0 / 65536.0);
  z2 = z + (44845.0 / 65536.0);
  var xDistort = x + (this.XDistort.GetValue(x0, y0, z0) * Power);
  var yDistort = y + (this.YDistort.GetValue(x1, y1, z1) * Power);
  var zDistort = z + (this.ZDistort.GetValue(x2, y2, z2) * Power);
  return this.SourceModule.GetValue(xDistort, yDistort, zDistort);
}

LibNoise.TurbulenceCustom.prototype.getInput = getOne;
LibNoise.TurbulenceCustom.prototype.setInput = setOne;

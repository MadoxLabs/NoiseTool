LibNoise.NoiseQuality = { Low: 1, Standard: 2, High: 3 };
LibNoise.Axis = { X: 1, Y: 2, Z: 3 };

function getNone(i) { return null; }
function setNone(i, mod) { }

function getOne(i)
{
  if (i == 0) return this.SourceModule;
  return null;
}
function setOne(i, mod)
{
  if (i == 0) this.SourceModule = mod;
}


function getTwo(i)
{
  if (i == 0) return this.SourceModule1;
  if (i == 1) return this.SourceModule2;
  return null;
}
function setTwo(i, mod)
{
  if (i == 0) this.SourceModule1 = mod;
  if (i == 1) this.SourceModule2 = mod;
}
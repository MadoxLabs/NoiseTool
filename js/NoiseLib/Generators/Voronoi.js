LibNoise.Voronoi = function()
{
  this.Frequency  = 1.0;
  this.Displacement = 1.0;
  this.Distance = 0;
  this.Seed = 0;
  this.Name = "LibNoise.Voronoi";
}

LibNoise.Voronoi.prototype.getInput = getNone;
LibNoise.Voronoi.prototype.setInput = setNone;

LibNoise.Voronoi.prototype.GetValue = function( x,  y,  z)
{
  x *= this.Frequency;
  y *= this.Frequency;
  z *= this.Frequency;

  var xInt = Math.floor(x > 0.0 ? x : x - 1);
  var yInt = Math.floor(y > 0.0 ? y : y - 1);
  var zInt = Math.floor(z > 0.0 ? z : z - 1);

  var minDist = 2147483647.0;
  var xCandidate = 0;
  var yCandidate = 0;
  var zCandidate = 0;

  // Inside each unit cube, there is a seed point at a random position.  Go
  // through each of the nearby cubes until we find a cube with a seed point
  // that is closest to the specified position.
  for (var zCur = zInt - 2; zCur <= zInt + 2; zCur++)
  {
    for (var yCur = yInt - 2; yCur <= yInt + 2; yCur++)
    {
      for (var xCur = xInt - 2; xCur <= xInt + 2; xCur++)
      {
        // Calculate the position and distance to the seed point inside of
        // this unit cube.
        var xPos = xCur + LibNoise.NMath.ValueNoise(xCur, yCur, zCur, this.Seed);
        var yPos = yCur + LibNoise.NMath.ValueNoise(xCur, yCur, zCur, this.Seed + 1);
        var zPos = zCur + LibNoise.NMath.ValueNoise(xCur, yCur, zCur, this.Seed + 2);
        var xDist = xPos - x;
        var yDist = yPos - y;
        var zDist = zPos - z;
        var dist = xDist * xDist + yDist * yDist + zDist * zDist;

        if (dist < minDist)
        {
          // This seed point is closer to any others found so far, so record
          // this seed point.
          minDist = dist;
          xCandidate = xPos;
          yCandidate = yPos;
          zCandidate = zPos;
        }
      }
    }
  }

  var value;
  if (this.Distance)
  {
    // Determine the distance to the nearest seed point.
    var xDist = xCandidate - x;
    var yDist = yCandidate - y;
    var zDist = zCandidate - z;
    value = (Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist) ) * LibNoise.NMath.Sqrt3 - 1.0;
  }
  else
  {
    value = 0.0;
  }

  var x0 = Math.floor(xCandidate > 0.0 ? xCandidate : xCandidate - 1);
  var y0 = Math.floor(yCandidate > 0.0 ? yCandidate : yCandidate - 1);
  var z0 = Math.floor(zCandidate > 0.0 ? zCandidate : zCandidate - 1);

  // Return the calculated distance with the displacement value applied.
  return value + (this.Displacement * LibNoise.NMath.ValueNoise(x0, y0, z0));
}

using System;
using System.Collections.Generic;
using System.Text;

//
// In mathematics, a <i>Voronoi cell</i> is a region containing all the
// points that are closer to a specific <i>seed point</i> than to any
// other seed point.  These cells mesh with one another, producing
// polygon-like formations.
//
// By default, this noise module randomly places a seed point within
// each unit cube.  By modifying the <i>frequency</i> of the seed points,
// an application can change the distance between seed points.  The
// higher the frequency, the closer together this noise module places
// the seed points, which reduces the size of the cells.  To specify the
// frequency of the cells, call the SetFrequency() method.
//
// This noise module assigns each Voronoi cell with a random constant
// value from a coherent-noise function.  The <i>displacement value</i>
// controls the range of random values to assign to each cell.  The
// range of random values is +/- the displacement value.  Call the
// SetDisplacement() method to specify the displacement value.
//
// To modify the random positions of the seed points, call the SetSeed()
// method.
//
// This noise module can optionally add the distance from the nearest
// seed to the output value.  To enable this feature, call the
// EnableDistance() method.  This causes the points in the Voronoi cells
// to increase in value the further away that point is from the nearest
// seed point.
//
// Voronoi cells are often used to generate cracked-mud terrain
// formations or crystal-like textures

namespace LibNoise
{
    public class Voronoi
        : IModule
    {
        public double Frequency { get; set; }
        public double Displacement { get; set; }
        public bool DistanceEnabled { get; set; }
        public int Seed { get; set; }

        public Voronoi()
        {
            Frequency = 1.0;
            Displacement = 1.0;
            Seed = 0;
            DistanceEnabled = false;
        }

        public double GetValue(double x, double y, double z)
        {
            x *= Frequency;
            y *= Frequency;
            z *= Frequency;

            int xInt = (x > 0.0 ? (int)x : (int)x - 1);
            int yInt = (y > 0.0 ? (int)y : (int)y - 1);
            int zInt = (z > 0.0 ? (int)z : (int)z - 1);

            double minDist = 2147483647.0;
            double xCandidate = 0;
            double yCandidate = 0;
            double zCandidate = 0;

            // Inside each unit cube, there is a seed point at a random position.  Go
            // through each of the nearby cubes until we find a cube with a seed point
            // that is closest to the specified position.
            for (int zCur = zInt - 2; zCur <= zInt + 2; zCur++)
            {
                for (int yCur = yInt - 2; yCur <= yInt + 2; yCur++)
                {
                    for (int xCur = xInt - 2; xCur <= xInt + 2; xCur++)
                    {

                        // Calculate the position and distance to the seed point inside of
                        // this unit cube.
                        double xPos = xCur + NMath.ValueNoise(xCur, yCur, zCur, Seed);
                        double yPos = yCur + NMath.ValueNoise(xCur, yCur, zCur, Seed + 1);
                        double zPos = zCur + NMath.ValueNoise(xCur, yCur, zCur, Seed + 2);
                        double xDist = xPos - x;
                        double yDist = yPos - y;
                        double zDist = zPos - z;
                        double dist = xDist * xDist + yDist * yDist + zDist * zDist;

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

            double value;
            if (DistanceEnabled)
            {
                // Determine the distance to the nearest seed point.
                double xDist = xCandidate - x;
                double yDist = yCandidate - y;
                double zDist = zCandidate - z;
                value = (System.Math.Sqrt(xDist * xDist + yDist * yDist + zDist * zDist) ) * NMath.Sqrt3 - 1.0;
            }
            else
            {
                value = 0.0;
            }

            int x0 = (xCandidate > 0.0 ? (int)xCandidate : (int)xCandidate - 1);
            int y0 = (yCandidate > 0.0 ? (int)yCandidate : (int)yCandidate - 1);
            int z0 = (zCandidate > 0.0 ? (int)zCandidate : (int)zCandidate - 1);

            // Return the calculated distance with the displacement value applied.
            return value + (Displacement * (double)NMath.ValueNoise(x0, y0, z0));
        }
    }
}

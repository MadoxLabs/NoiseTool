using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise
{
    public class Cylinders
        : IModule
    {
        public double Frequency { get; set; }

        public Cylinders()
        {
            Frequency = 1.0;
        }

        public double GetValue(double x, double y, double z)
        {
            x *= Frequency;
            y *= Frequency;

            double distFromCenter = System.Math.Sqrt(x * x + y * y);
            int distFromCenter0 = (distFromCenter > 0.0 ? (int)distFromCenter : (int)distFromCenter - 1);
            double distFromSmallerSphere = distFromCenter - distFromCenter0;
            double distFromLargerSphere = 1.0 - distFromSmallerSphere;
            double nearestDist = NMath.GetSmaller(distFromSmallerSphere, distFromLargerSphere);
            return 1.0 - (nearestDist * 4.0);
        }
    }
}

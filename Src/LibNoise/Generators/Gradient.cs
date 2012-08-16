using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise
{
    public class Gradient
        : IModule
    {
        public Axis Axis { get; set; }
        private double LowerBound { get; set; }
        private double UpperBound { get; set; }

        public Gradient(Axis a)
        {
          Axis = a;
          LowerBound = 0;
          UpperBound = 0.99999999;
        }

        public double GetValue(double x, double y, double z)
        {
          double val = x;
          if (Axis == Axis.Y) val = y;
          else if (Axis == Axis.Z) val = z;

          if (val < LowerBound) val = LowerBound;
          if (val > UpperBound) val = UpperBound;
          return (val - Math.Floor(val)) * 2.0 - 1.0;
        }

        public void SetBounds(double lower, double upper)
        {
//          if (lower > upper)            throw new ArgumentException("The lower bounds must be lower than the upper bounds.");

          LowerBound = lower;
          UpperBound = upper;
        }
    }
}

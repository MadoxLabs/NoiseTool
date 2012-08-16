using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    public class ClampOutput
        : IModule
    {
        public double LowerBound { get; private set; }
        public double UpperBound { get; private set; }

        public IModule SourceModule { get; set; }

        public ClampOutput(IModule sourceModule)
        {
            SourceModule = sourceModule;

            LowerBound = -1;
            UpperBound = 1;
        }

        public double GetValue(double x, double y, double z)
        {
          if (SourceModule == null) return 0;

            double value = SourceModule.GetValue(x, y, z);
            if (value < LowerBound)
            {
                return LowerBound;
            }
            else if (value > UpperBound)
            {
                return UpperBound;
            }
            else
            {
                return value;
            }
        }

        public void SetBounds(double lowerBound, double upperBound)
        {
          //if (lowerBound >= upperBound)                 throw new Exception("Lower bound must be lower than upper bound.");

            LowerBound = lowerBound;
            UpperBound = upperBound;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    public class ExponentialOutput
        : IModule
    {
        public IModule SourceModule { get; set; }

        public double Exponent { get; set; }

        public ExponentialOutput(IModule sourceModule, double exponent)
        {
            SourceModule = sourceModule;
            Exponent = exponent;
        }

        public double GetValue(double x, double y, double z)
        {
          if (SourceModule == null) return 0;

            return (System.Math.Pow(System.Math.Abs((SourceModule.GetValue(x, y, z) + 1.0) / 2.0), Exponent) * 2.0 - 1.0);
        }
    }
}

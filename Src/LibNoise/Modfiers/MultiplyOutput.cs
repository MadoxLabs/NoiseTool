using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    public class MultiplyOutput
        : IModule
    {
        public IModule SourceModule1 { get; set; }
        public IModule SourceModule2 { get; set; }

        public MultiplyOutput(IModule sourceModule1, IModule sourceModule2)
        {
            SourceModule1 = sourceModule1;
            SourceModule2 = sourceModule2;
        }

        public double GetValue(double x, double y, double z)
        {
          if (SourceModule1 == null || SourceModule2 == null) return 0;

            return SourceModule1.GetValue(x, y, z) * SourceModule2.GetValue(x, y, z);
        }
    }
}

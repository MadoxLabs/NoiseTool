using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    public class InvertInput
        : IModule
    {
        public IModule SourceModule { get; set; }

        public InvertInput(IModule sourceModule)
        {
            SourceModule = sourceModule;
        }

        public double GetValue(double x, double y, double z)
        {
          if (SourceModule == null) return 0;
            return SourceModule.GetValue(-x, -y, -z);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    public class ScaleBiasOutput
        : IModule
    {
        public double Scale { get; set; }
        public double Bias { get; set; }

        public IModule SourceModule { get; set; }

        public ScaleBiasOutput(IModule sourceModule)
        {
            SourceModule = sourceModule;

            Bias = 0.0;
            Scale = 1.0;
        }

        public double GetValue(double x, double y, double z)
        {
          if (SourceModule == null) return 0;

            return SourceModule.GetValue(x, y, z) * Scale + Bias;
        }
    }
}

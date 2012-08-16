using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    public class TranslateInput
        : IModule
    {
        public double X { get; set; }
        public double Y { get; set; }
        public double Z { get; set; }

        public IModule SourceModule{get;set;}

        public TranslateInput(IModule sourceModule, double x, double y, double z)
        {
            SourceModule = sourceModule;

            X = x;
            Y = y;
            Z = z;
        }

        public double GetValue(double x, double y, double z)
        {
          if (SourceModule == null) return 0;

            return SourceModule.GetValue(x + X, y + Y, z + Z);
        }                
    }
}

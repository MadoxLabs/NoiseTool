using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    public class PowerOutput
        : IModule
    {
        public IModule BaseModule { get; set; }
        public IModule PowerModule { get; set; }

        public PowerOutput(IModule baseModule, IModule powerModule)
        {
            BaseModule = baseModule;
            PowerModule = powerModule;
        }

        public double GetValue(double x, double y, double z)
        {
          if (BaseModule == null || PowerModule == null) return 0;
            return System.Math.Pow(BaseModule.GetValue(x, y, z), PowerModule.GetValue(x, y, z));
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    public class DisplaceInput
        : IModule
    {
        public IModule SourceModule { get; set; }
        public IModule XDisplaceModule { get; set; }
        public IModule YDisplaceModule { get; set; }
        public IModule ZDisplaceModule { get; set; }

        public DisplaceInput(IModule sourceModule, IModule xDisplaceModule, IModule yDisplaceModule, IModule zDisplaceModule)
        {
            SourceModule = sourceModule;
            XDisplaceModule = xDisplaceModule;
            YDisplaceModule = yDisplaceModule;
            ZDisplaceModule = zDisplaceModule;
        }

        public double GetValue(double x, double y, double z)
        {
          if (SourceModule == null) return 0;

            x += XDisplaceModule != null ? XDisplaceModule.GetValue(x, y, z) : 0;
            y += YDisplaceModule != null ? YDisplaceModule.GetValue(x, y, z) : 0;
            z += ZDisplaceModule != null ? ZDisplaceModule.GetValue(x, y, z) : 0;

            return SourceModule.GetValue(x, y, z);
        }
    }
}

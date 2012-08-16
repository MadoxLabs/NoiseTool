using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    public class CacheOutput
        : IModule
    {
      private double cacheX;
      private double cacheY;
      private double cacheZ;
      private double cacheVal;
      private bool cached;

        public IModule SourceModule { get; set; }

        public CacheOutput(IModule sourceModule)
        {
          cached = false;
          SourceModule = sourceModule;
        }

        public double GetValue(double x, double y, double z)
        {
          if (SourceModule == null) return 0;
          if (cached && cacheX == x && cacheY == y && cacheZ == z) return cacheVal;

          cacheVal = SourceModule.GetValue(x, y, z);
          cacheX = x;
          cacheY = y;
          cacheZ = z;
          cached = true;
          return cacheVal;
        }
    }
}

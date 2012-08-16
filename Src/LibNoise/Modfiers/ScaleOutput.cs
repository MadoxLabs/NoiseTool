using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    public class ScaleOutput
        : IModule
    {
        public IModule SourceModule { get; set; }

        public double Scale { get; set; }

        public ScaleOutput(IModule sourceModule, double scale)
        {
            if (sourceModule == null)
                throw new ArgumentNullException("A source module must be provided.");

            SourceModule = sourceModule;
            Scale = scale;
        }

        public double GetValue(double x, double y, double z)
        {
            if (SourceModule == null)
                throw new NullReferenceException("A source module must be provided.");

            return SourceModule.GetValue(x, y, z) * Scale;
        }
    }
}

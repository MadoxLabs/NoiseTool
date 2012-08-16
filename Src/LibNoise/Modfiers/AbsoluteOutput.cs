using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    // <summary>
    // Module that returns the absolute value of the output of a source module.    
    // </summary>
    public class AbsoluteOutput
        : IModule
    {
        // <summary>
        // The module from which to retrieve noise.
        // </summary>
        public IModule SourceModule { get; set; }

        // <summary>
        // Initialises a new instance of the AbsoluteOutput class.
        // </summary>
        // <param name="sourceModule">The module from which to retrieve noise.</param>
        public AbsoluteOutput(IModule sourceModule)
        {
            SourceModule = sourceModule;
        }

        // <summary>
        // Returns the absolute value of noise from the source module at the given coordinates.
        // </summary>
        public double GetValue(double x, double y, double z)
        {
          if (SourceModule == null) return 0;

            return System.Math.Abs(SourceModule.GetValue(x, y, z));
        }
    }
}

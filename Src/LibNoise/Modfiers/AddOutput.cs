using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    // <summary>
    // Module that returns the output of two source modules added together.
    // </summary>
    public class AddOutput
        : IModule
    {
        // <summary>
        // The first module from which to retrieve noise.
        // </summary>
        public IModule SourceModule1 { get; set; }
        // <summary>
        // The second module from which to retrieve noise.
        // </summary>
        public IModule SourceModule2 { get; set; }

        // <summary>
        // Initialises a new instance of the Add class.
        // </summary>
        // <param name="sourceModule1">The first module from which to retrieve noise.</param>
        // <param name="sourceModule2">The second module from which to retrieve noise.</param>
        public AddOutput(IModule sourceModule1, IModule sourceModule2)
        {
            SourceModule1 = sourceModule1;
            SourceModule2 = sourceModule2;
        }

        // <summary>
        // Returns the output of the two source modules added together.
        // </summary>
        public double GetValue(double x, double y, double z)
        {
          if (SourceModule1 == null || SourceModule2 == null) return 0;

            return SourceModule1.GetValue(x, y, z) + SourceModule2.GetValue(x, y, z);
        }
    }
}

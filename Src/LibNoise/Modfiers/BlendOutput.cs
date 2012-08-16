using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{

    // <summary>
    // Module that blends the output of two source modules using the output
    // of an weight module as the blending weight.
    // </summary>
    public class BlendOutput
        : IModule
    {
        // <summary>
        // The first module from which to retrieve noise to be blended.
        // </summary>
        public IModule SourceModule1 { get; set; }
        // <summary>
        // The second module from which to retrieve noise to be blended.
        // </summary>
        public IModule SourceModule2 { get; set; }
        // <summary>
        // The module from which to retrieve noise to be used as the blending weight.
        // </summary>
        public IModule WeightModule { get; set; }

        // <summary>
        // Initialises a new instance of the Blend class.
        // </summary>
        // <param name="sourceModule1">The first module from which to retrieve noise to be blended.</param>
        // <param name="sourceModule2">The second module from which to retrieve noise to be blended.</param>
        // <param name="weightModule">The module from which to retrieve noise to be used as the blending weight.</param>
        public BlendOutput(IModule sourceModule1, IModule sourceModule2, IModule weightModule)
        {
            SourceModule1 = sourceModule1;
            SourceModule2 = sourceModule2;
            WeightModule = weightModule;
        }

        // <summary>
        // Returns the result of blending the output of the two source modules using the 
        // output of the weight module as the blending weight.
        // </summary>
        public double GetValue(double x, double y, double z)
        {
          if (SourceModule1 == null || SourceModule2 == null || WeightModule == null) return 0;

            return NMath.LinearInterpolate(SourceModule1.GetValue(x, y, z), SourceModule2.GetValue(x, y, z), (WeightModule.GetValue(x, y, z) + 1.0) / 2.0);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    // <summary>
    // Module that biases the output of a source module by adding a given value to the output.
    // </summary>
    public class BiasOutput
        : IModule
    {
        // <summary>
        // The module from which to retrieve noise.
        // </summary>
        public IModule SourceModule { get; set; }

        // <summary>
        // The value to add to the output.
        // </summary>
        public double Bias { get; set; }

        // <summary>
        // Initialises a new instance of the BiasOutput class.
        // </summary>
        // <param name="sourceModule">The module from which to retrieve noise.</param>
        // <param name="bias">The value to add to the output.</param>
        public BiasOutput(IModule sourceModule, double bias)
        {
            if (sourceModule == null)
                throw new ArgumentNullException("A source module must be provided.");

            SourceModule = sourceModule;
            Bias = bias;
        }

        // <summary>
        // Returns the biased output of the source module.
        // </summary>
        // <param name="x"></param>
        // <param name="y"></param>
        // <param name="z"></param>
        // <returns></returns>
        public double GetValue(double x, double y, double z)
        {
            if (SourceModule == null)
                throw new NullReferenceException("A source module must be provided.");

            return SourceModule.GetValue(x, y, z) + Bias;
        }
    }
}

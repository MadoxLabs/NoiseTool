using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Models
{
    // <summary>
    // Model that maps the output of a module onto a plane.
    // </summary>
    public class Plane
    {
        // <summary>
        // The module from which to retrieve noise.
        // </summary>
        public IModule SourceModule { get; set; }

        // <summary>
        // Initialises a new instance of the Plane class.
        // </summary>
        // <param name="sourceModule">The module from which to retrieve noise.</param>
        public Plane(IModule sourceModule)
        {
            if (sourceModule == null)
                throw new ArgumentNullException("A source module must be provided.");

            SourceModule = sourceModule;
        }

        // <summary>
        // Returns noise mapped to the given location on the plane.
        // </summary>
        public double GetValue(double x, double z)
        {
            if (SourceModule == null)
                throw new NullReferenceException("A source module must be provided.");

            return SourceModule.GetValue(x, 0, z);
        }
    }
}

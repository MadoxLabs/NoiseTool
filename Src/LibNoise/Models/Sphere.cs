using System;
using System.Collections.Generic;
using System.Text;
using LibNoise;

namespace LibNoise.Models
{
    // <summary>
    // Model that maps the output of a module onto a sphere.
    // </summary>
    public class Sphere
    {
        // <summary>
        // The module from which to retrieve noise.
        // </summary>
        public IModule SourceModule { get; set; }

        // <summary>
        // Initialises a new instance of the Sphere class.
        // </summary>
        // <param name="sourceModule">The module from which to retrieve noise.</param>
        public Sphere(IModule sourceModule)
        {
            if (sourceModule == null)
                throw new ArgumentNullException("A source module must be provided.");

            SourceModule = sourceModule;
        }

        // <summary>
        // Returns noise mapped to the given location in the sphere.
        // </summary>
        public double GetValue(double latitude, double longitude)
        {
            if (SourceModule == null)
                throw new NullReferenceException("A source module must be provided.");

            double x=0, y=0, z=0;
            NMath.LatLonToXYZ(latitude, longitude, ref x, ref y, ref z);
            return SourceModule.GetValue(x, y, z);
        }
    }
}

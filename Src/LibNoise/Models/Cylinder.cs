using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Models
{
    // <summary>
    // Model that maps the output of a module onto a cylinder.
    // </summary>
    public class Cylinder
    {
        // <summary>
        // The module from which to retrieve noise.
        // </summary>
        public IModule SourceModule { get; set; }

        // <summary>
        // Initialises a new instance of the Cylinder class.
        // </summary>
        // <param name="sourceModule">The module from which to retrieve noise.</param>
        public Cylinder(IModule sourceModule)
        {
            if (sourceModule == null)
                throw new ArgumentNullException("A source module must be provided.");

            SourceModule = sourceModule;
        }

        // <summary>
        // Returns noise mapped to the given angle and height along the cylinder.
        // Angle is in radians
        // </summary>
        public double GetValue(double angle, double height)
        {
            if (SourceModule == null)
                throw new NullReferenceException("A source module must be provided.");

            double x, y, z;
            x = System.Math.Cos(angle);
            y = height;
            z = System.Math.Sin(angle);
            return SourceModule.GetValue(x, y, z);
        }
    }
}

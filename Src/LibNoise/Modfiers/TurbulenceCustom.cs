using System;
using System.Collections.Generic;
using System.Text;
using LibNoise;

    // @a Turbulence is the pseudo-random displacement of the input value.
    // The GetValue() method randomly displaces the ( @a x, @a y, @a z )
    // coordinates of the input value before retrieving the output value from
    // the source module.  To control the turbulence, an application can
    // modify its frequency, its power, and its roughness.
    //
    // The frequency of the turbulence determines how rapidly the
    // displacement amount changes.  To specify the frequency, call the
    // SetFrequency() method.
    //
    // The power of the turbulence determines the scaling factor that is
    // applied to the displacement amount.  To specify the power, call the
    // SetPower() method.
    //
    // The roughness of the turbulence determines the roughness of the
    // changes to the displacement amount.  Low values smoothly change the
    // displacement amount.  High values roughly change the displacement
    // amount, which produces more "kinky" changes.  To specify the
    // roughness, call the SetRoughness() method.
    //
    // Use of this noise module may require some trial and error.  Assuming
    // that you are using a generator module as the source module, you
    // should first:
    // - Set the frequency to the same frequency as the source module.
    // - Set the power to the reciprocal of the frequency.
    //
    // From these initial frequency and power values, modify these values
    // until this noise module produce the desired changes in your terrain or
    // texture.  For example:
    // - Low frequency (1/8 initial frequency) and low power (1/8 initial
    //   power) produces very minor, almost unnoticeable changes.
    // - Low frequency (1/8 initial frequency) and high power (8 times
    //   initial power) produces "ropey" lava-like terrain or marble-like
    //   textures.
    // - High frequency (8 times initial frequency) and low power (1/8
    //   initial power) produces a noisy version of the initial terrain or
    //   texture.
    // - High frequency (8 times initial frequency) and high power (8 times
    //   initial power) produces nearly pure noise, which isn't entirely
    //   useful.
    //
    // Displacing the input values result in more realistic terrain and
    // textures.  If you are generating elevations for terrain height maps,
    // you can use this noise module to produce more realistic mountain
    // ranges or terrain features that look like flowing lava rock.  If you
    // are generating values for textures, you can use this noise module to
    // produce realistic marble-like or "oily" textures.
    //
    // Internally, there are three noise::module::Perlin noise modules
    // that displace the input value; one for the @a x, one for the @a y,
    // and one for the @a z coordinate.
    // 
namespace LibNoise
{
  public class TurbulenceCustom
        : IModule
    {
        public IModule SourceModule { get; set; }

        public double Power { get; set; }

        public IModule XDistort { get; set; }
        public IModule YDistort { get; set; }
        public IModule ZDistort { get; set; }

        public TurbulenceCustom(IModule sourceModule)
        {
            if (sourceModule == null)
                throw new ArgumentNullException();

            SourceModule = sourceModule;

            XDistort = new Constant(0);
            YDistort = XDistort;
            ZDistort = XDistort;

            Power = 1.0;
        }

        public double GetValue(double x, double y, double z)
        {
            if (SourceModule == null)
                throw new NullReferenceException();

            // Get the values from the three noise::module::Perlin noise modules and
            // add each value to each coordinate of the input value.  There are also
            // some offsets added to the coordinates of the input values.  This prevents
            // the distortion modules from returning zero if the (x, y, z) coordinates,
            // when multiplied by the frequency, are near an integer boundary.  This is
            // due to a property of gradient coherent noise, which returns zero at
            // integer boundaries.
            double x0, y0, z0;
            double x1, y1, z1;
            double x2, y2, z2;
            x0 = x + (12414.0 / 65536.0);
            y0 = y + (65124.0 / 65536.0);
            z0 = z + (31337.0 / 65536.0);
            x1 = x + (26519.0 / 65536.0);
            y1 = y + (18128.0 / 65536.0);
            z1 = z + (60493.0 / 65536.0);
            x2 = x + (53820.0 / 65536.0);
            y2 = y + (11213.0 / 65536.0);
            z2 = z + (44845.0 / 65536.0);
            double xDistort = x + (XDistort.GetValue(x0, y0, z0)
              * Power);
            double yDistort = y + (YDistort.GetValue(x1, y1, z1)
              * Power);
            double zDistort = z + (ZDistort.GetValue(x2, y2, z2)
              * Power);

            // Retrieve the output value at the offsetted input value instead of the
            // original input value.
            return SourceModule.GetValue(xDistort, yDistort, zDistort);
        }
    }
}

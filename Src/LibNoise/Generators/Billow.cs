using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise
{
  // This noise module is nearly identical to noise::module::Perlin except
  // this noise module modifies each octave with an absolute-value
  // function.  See the documentation of noise::module::Perlin for more
  // information.
  public class Billow        : IModule
    {
        public double Frequency { get; set; }
        public double Persistence { get; set; }
        public NoiseQuality NoiseQuality { get; set; }
        public int Seed { get; set; }
        private int mOctaveCount;
        public double Lacunarity { get; set; }

        private const int MaxOctaves = 30;

        public Billow()
        {
            Frequency = 1.0;
            Lacunarity = 2.0;
            OctaveCount = 6;
            Persistence = 0.5;
            NoiseQuality = NoiseQuality.Standard;
            Seed = 0;
        }

        public double GetValue(double x, double y, double z)
        {
            double value = 0.0;
            double signal = 0.0;
            double curPersistence = 1.0;
            double nx, ny, nz;
            long seed;

            x *= Frequency;
            y *= Frequency;
            z *= Frequency;

            for (int currentOctave = 0; currentOctave < OctaveCount; currentOctave++)
            {
                nx = NMath.MakeInt32Range(x);
                ny = NMath.MakeInt32Range(y);
                nz = NMath.MakeInt32Range(z);

                seed = (Seed + currentOctave) & 0xffffffff;
                signal = NMath.GradientCoherentNoise(nx, ny, nz, (int)seed, NoiseQuality);
                signal = 2.0 * System.Math.Abs(signal) - 1.0;
                value += signal * curPersistence;

                x *= Lacunarity;
                y *= Lacunarity;
                z *= Lacunarity;
                curPersistence *= Persistence;
            }

            value += 0.5;

            return value;
        }

        public int OctaveCount
        {
            get { return mOctaveCount; }
            set
            {
              //if (value < 1 || value > MaxOctaves)                 throw new ArgumentException("Octave count must be greater than zero and less than " + MaxOctaves);

                mOctaveCount = value;
            }
        }
    }
}

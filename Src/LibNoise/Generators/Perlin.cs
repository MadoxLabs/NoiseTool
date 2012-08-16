using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise
{
  //
  // Perlin noise is the sum of several coherent-noise functions of
  // ever-increasing frequencies and ever-decreasing amplitudes.
  //
  // An important property of Perlin noise is that a small change in the
  // input value will produce a small change in the output value, while a
  // large change in the input value will produce a random change in the
  // output value.
  //
  // This noise module outputs Perlin-noise values that usually range from
  // -1.0 to +1.0, but there are no guarantees that all output values will
  // exist within that range.
  //
  // For a better description of Perlin noise, see the links in the
  // <i>References and Acknowledgments</i> section.
  //
  // This noise module does not require any source modules.
  
  public class Perlin
        : IModule
    {
        public double Frequency { get; set; }
        public double Persistence { get; set; }
        public NoiseQuality NoiseQuality { get; set; }
        public int Seed { get; set; }
        private int mOctaveCount;
        public double Lacunarity { get; set; }

        private const int MaxOctaves = 30;

        public Perlin()
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
            //double nx, ny, nz;
            long seed;

            x*=Frequency;
            y*=Frequency;
            z*=Frequency;

            for(int currentOctave = 0; currentOctave < OctaveCount; currentOctave++)
            {
                seed = (Seed + currentOctave) & 0xffffffff;
                /*nx = Math.MakeInt32Range(x);
                ny = Math.MakeInt32Range(y);
                nz = Math.MakeInt32Range(z);*/
                signal = NMath.GradientCoherentNoise(x, y, z, (int)seed, NoiseQuality);
                //signal = cachedNoise3(x, y, z);

                value += signal * curPersistence;

                x *= Lacunarity;
                y *= Lacunarity;
                z *= Lacunarity;
                curPersistence *= Persistence;
            }

            return value;
        }

        public int OctaveCount
        {
            get { return mOctaveCount; }
            set
            {
//                if (value < 1 || value > MaxOctaves)                    throw new ArgumentException("Octave count must be greater than zero and less than " + MaxOctaves);

                mOctaveCount = value;
            }
        }
    }
}

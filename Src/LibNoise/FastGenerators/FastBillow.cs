using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise
{
    public class FastBillow
        : FastMath, IModule
    {
        public double Frequency { get; set; }
        public double Persistence { get; set; }
        public NoiseQuality NoiseQuality { get; set; }
        private int mOctaveCount;
        public double Lacunarity { get; set; }

        private const int MaxOctaves = 30;

        public FastBillow()
            : this(0)
        {

        }

        public FastBillow(int seed)
            : base(seed)
        {
            Frequency = 1.0;
            Lacunarity = 2.0;
            OctaveCount = 6;
            Persistence = 0.5;
            NoiseQuality = NoiseQuality.Standard;
        }

        public double GetValue(double x, double y, double z)
        {
            double value = 0.0;
            double signal = 0.0;
            double curPersistence = 1.0;
            long seed;

            x *= Frequency;
            y *= Frequency;
            z *= Frequency;

            for (int currentOctave = 0; currentOctave < OctaveCount; currentOctave++)
            {

                seed = (Seed + currentOctave) & 0xffffffff;
                signal = GradientCoherentNoise(x, y, z, (int)seed, NoiseQuality);
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
                if (value < 1 || value > MaxOctaves)
                    throw new ArgumentException("Octave count must be greater than zero and less than " + MaxOctaves);

                mOctaveCount = value;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise
{
    public class FastRidgedMultifractal
        : FastMath, IModule
    {
        public double Frequency { get; set; }
        public NoiseQuality NoiseQuality { get; set; }
        private int mOctaveCount;
        private double mLacunarity;

        private const int MaxOctaves = 30;

        private double[] SpectralWeights = new double[MaxOctaves];

        public FastRidgedMultifractal()
            : this(0)
        {

        }

        public FastRidgedMultifractal(int seed)
            : base(seed)
        {
            Frequency = 1.0;
            Lacunarity = 2.0;
            OctaveCount = 6;
            NoiseQuality = NoiseQuality.Standard;
        }

        public double GetValue(double x, double y, double z)
        {
            x *= Frequency;
            y *= Frequency;
            z *= Frequency;

            double signal = 0.0;
            double value = 0.0;
            double weight = 1.0;

            // These parameters should be user-defined; they may be exposed in a
            // future version of libnoise.
            double offset = 1.0;
            double gain = 2.0;

            for (int currentOctave = 0; currentOctave < OctaveCount; currentOctave++)
            {
 
                long seed = (Seed + currentOctave) & 0x7fffffff;
                signal = GradientCoherentNoise(x, y, z, (int)seed, NoiseQuality);

                // Make the ridges.
                signal = System.Math.Abs(signal);
                signal = offset - signal;

                // Square the signal to increase the sharpness of the ridges.
                signal *= signal;

                // The weighting from the previous octave is applied to the signal.
                // Larger values have higher weights, producing sharp points along the
                // ridges.
                signal *= weight;

                // Weight successive contributions by the previous signal.
                weight = signal * gain;
                if (weight > 1.0)
                {
                    weight = 1.0;
                }
                if (weight < 0.0)
                {
                    weight = 0.0;
                }

                // Add the signal to the output value.
                value += (signal * SpectralWeights[currentOctave]);

                // Go to the next octave.
                x *= Lacunarity;
                y *= Lacunarity;
                z *= Lacunarity;
            }

            return (value * 1.25) - 1.0;
        }

        public double Lacunarity
        {
            get { return mLacunarity; }
            set
            {
                mLacunarity = value;
                CalculateSpectralWeights();
            }
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

        private void CalculateSpectralWeights()
        {
            double h = 1.0;

            double frequency = 1.0;
            for (int i = 0; i < MaxOctaves; i++)
            {
                // Compute weight for each frequency.
                SpectralWeights[i] = System.Math.Pow(frequency, -h);
                frequency *= mLacunarity;
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

// This noise module, heavily based on the Perlin-noise module, generates
// ridged-multifractal noise.  Ridged-multifractal noise is generated in
// much of the same way as Perlin noise, except the output of each octave
// is modified by an absolute-value function.  Modifying the octave
// values in this way produces ridge-like formations.
//
// Ridged-multifractal noise does not use a persistence value.  This is
// because the persistence values of the octaves are based on the values
// generated from from previous octaves, creating a feedback loop (or
// that's what it looks like after reading the code.)
//
// This noise module outputs ridged-multifractal-noise values that
// usually range from -1.0 to +1.0, but there are no guarantees that all
// output values will exist within that range.
//
// @note For ridged-multifractal noise generated with only one octave,
// the output value ranges from -1.0 to 0.0.
//
// Ridged-multifractal noise is often used to generate craggy mountainous
// terrain or marble-like textures.
//
// This noise module does not require any source modules.

namespace LibNoise
{
    public class RidgedMultifractal
        : IModule
    {
        public double Frequency { get; set; }
        public NoiseQuality NoiseQuality { get; set; }
        public int Seed { get; set; }
        private int mOctaveCount;
        private double mLacunarity;

        private const int MaxOctaves = 30;

        private double[] SpectralWeights = new double[MaxOctaves];

        public RidgedMultifractal()
        {
            Frequency = 1.0;
            Lacunarity = 2.0;
            OctaveCount = 6;
            NoiseQuality = NoiseQuality.Standard;
            Seed = 0;
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
                //double nx, ny, nz;

               /* nx = Math.MakeInt32Range(x);
                ny = Math.MakeInt32Range(y);
                nz = Math.MakeInt32Range(z);*/

                long seed = (Seed + currentOctave) & 0x7fffffff;
                signal = NMath.GradientCoherentNoise(x, y, z, (int)seed, NoiseQuality);

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
                //if (value < 1 || value > MaxOctaves)                    throw new ArgumentException("Octave count must be greater than zero and less than " + MaxOctaves);

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

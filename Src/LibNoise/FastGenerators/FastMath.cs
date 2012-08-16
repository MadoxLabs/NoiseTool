using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise
{
    public class FastMath
    {
        private int[] RandomPermutations = new int[512];
        private int[] SelectedPermutations = new int[512];
        private float[] GradientTable = new float[512];

        private int mSeed;

        public FastMath()
            : this(0)
        {

        }

        public FastMath(int seed)
        {
            if (seed < 0) throw new ArgumentException("Seed must be positive.");

            Seed = seed;
        }

        public double GradientCoherentNoise(double x, double y, double z, int seed, NoiseQuality noiseQuality)
        {
            int x0 = (x > 0.0 ? (int)x : (int)x - 1);
            int y0 = (y > 0.0 ? (int)y : (int)y - 1);
            int z0 = (z > 0.0 ? (int)z : (int)z - 1);

            int X = x0 & 255;
            int Y = y0 & 255;
            int Z = z0 & 255;

            double u = 0, v = 0, w = 0;
            switch (noiseQuality)
            {
                case NoiseQuality.Low:
                    u = (x - x0);
                    v = (y - y0);
                    w = (z - z0);
                    break;
                case NoiseQuality.Standard:
                    u = NMath.SCurve3(x - x0);
                    v = NMath.SCurve3(y - y0);
                    w = NMath.SCurve3(z - z0);
                    break;
                case NoiseQuality.High:
                    u = NMath.SCurve5(x - x0);
                    v = NMath.SCurve5(y - y0);
                    w = NMath.SCurve5(z - z0);
                    break;
            }

            int A = SelectedPermutations[X] + Y, AA = SelectedPermutations[A] + Z, AB = SelectedPermutations[A + 1] + Z,
                B = SelectedPermutations[X + 1] + Y, BA = SelectedPermutations[B] + Z, BB = SelectedPermutations[B + 1] + Z;

            double a = NMath.LinearInterpolate(GradientTable[AA], GradientTable[BA], u);
            double b = NMath.LinearInterpolate(GradientTable[AB], GradientTable[BB], u);
            double c = NMath.LinearInterpolate(a, b, v);
            double d = NMath.LinearInterpolate(GradientTable[AA + 1], GradientTable[BA + 1], u);
            double e = NMath.LinearInterpolate(GradientTable[AB + 1], GradientTable[BB + 1], u);
            double f = NMath.LinearInterpolate(d, e, v);
            return NMath.LinearInterpolate(c, f, w);
        }

        public int Seed
        {
            get { return mSeed; }
            set
            {
                mSeed = value;

                // Generate new random permutations with this seed.
                Random random = new Random(mSeed);
                for (int i = 0; i < 512; i++)
                    RandomPermutations[i] = random.Next(255);
                for (int i = 0; i < 256; i++)
                    SelectedPermutations[256 + i] = SelectedPermutations[i] = RandomPermutations[i];

                // Generate a new gradient table
                float[] kkf = new float[256];
                for (int i = 0; i < 256; i++)
                    kkf[i] = -1.0f + 2.0f * ((float)i / 255.0f);

                for (int i = 0; i < 256; i++)
                    GradientTable[i] = kkf[SelectedPermutations[i]];
                for (int i = 256; i < 512; i++)
                    GradientTable[i] = GradientTable[i & 255];
            }
        }
    }
}

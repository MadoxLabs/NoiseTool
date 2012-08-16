using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
  public class SelectOutput
        : IModule
    {
        public IModule ControlModule { get; set; }
        public IModule SourceModule1 { get; set; }
        public IModule SourceModule2 { get; set; }

        private double mEdgeFalloff;
        public double UpperBound { get; private set; }
        public double LowerBound { get; private set; }

        public SelectOutput(IModule control, IModule source1, IModule source2)
        {
            ControlModule = control;
            SourceModule1 = source1;
            SourceModule2 = source2;

            EdgeFalloff = 0.0;
            LowerBound = -1.0;
            UpperBound = 1.0;
        }

        public double GetValue(double x, double y, double z)
        {
          if (ControlModule == null || SourceModule1 == null || SourceModule2 == null) return 0;

            double controlValue = ControlModule.GetValue(x, y, z);
            double alpha;

            if (EdgeFalloff > 0.0)
            {
                if (controlValue < (LowerBound - EdgeFalloff))
                {
                    // The output value from the control module is below the selector
                    // threshold; return the output value from the first source module.
                    return SourceModule1.GetValue(x, y, z);
                }
                else if (controlValue < (LowerBound + EdgeFalloff))
                {
                    // The output value from the control module is near the lower end of the
                    // selector threshold and within the smooth curve. Interpolate between
                    // the output values from the first and second source modules.
                    double lowerCurve = (LowerBound - EdgeFalloff);
                    double upperCurve = (LowerBound + EdgeFalloff);
                    alpha = NMath.SCurve3((controlValue - lowerCurve) / (upperCurve - lowerCurve));
                    return NMath.LinearInterpolate(SourceModule1.GetValue(x, y, z), SourceModule2.GetValue(x, y, z), alpha);
                }
                else if (controlValue < (UpperBound - EdgeFalloff))
                {
                    // The output value from the control module is within the selector
                    // threshold; return the output value from the second source module.
                    return SourceModule2.GetValue(x, y, z);
                }
                else if (controlValue < (UpperBound + EdgeFalloff))
                {
                    // The output value from the control module is near the upper end of the
                    // selector threshold and within the smooth curve. Interpolate between
                    // the output values from the first and second source modules.
                    double lowerCurve = (UpperBound - EdgeFalloff);
                    double upperCurve = (UpperBound + EdgeFalloff);
                    alpha = NMath.SCurve3((controlValue - lowerCurve) / (upperCurve - lowerCurve));
                    return NMath.LinearInterpolate(SourceModule2.GetValue(x, y, z), SourceModule1.GetValue(x, y, z), alpha);
                }
                else
                {
                    // Output value from the control module is above the selector threshold;
                    // return the output value from the first source module.
                    return SourceModule1.GetValue(x, y, z);
                }
            }
            else
            {
                if (controlValue < LowerBound || controlValue > UpperBound)
                {
                    return SourceModule1.GetValue(x, y, z);
                }
                else
                {
                    return SourceModule2.GetValue(x, y, z);
                }
            }
        }

        public void SetBounds(double lower, double upper)
        {
            if (lower > upper)
                throw new ArgumentException("The lower bounds must be lower than the upper bounds.");

            LowerBound = lower;
            UpperBound = upper;

            // Make sure that the edge falloff curves do not overlap.
            EdgeFalloff = mEdgeFalloff;
        }

        public double EdgeFalloff
        {
            get { return mEdgeFalloff; }
            set
            {
                double boundSize = UpperBound - LowerBound;
                mEdgeFalloff = (value > boundSize / 2) ? boundSize / 2 : value;
            }
        }
    }
}

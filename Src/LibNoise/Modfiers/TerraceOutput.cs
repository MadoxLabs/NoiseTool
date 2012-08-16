using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
  public class TerraceOutput
        : IModule
    {
        public IModule SourceModule { get; set; }
        public List<double> ControlPoints = new List<double>();
        public bool InvertTerraces { get; set; }

        public TerraceOutput(IModule sourceModule)
        {
            SourceModule = sourceModule;
            InvertTerraces = false;
        }

        public double GetValue(double x, double y, double z)
        {
          if (SourceModule == null) return 0;
//                throw new NullReferenceException("A source module must be provided.");
          if (ControlPoints.Count < 2) return 0;
//                throw new Exception("Two or more control points must be specified.");

            // Get the output value from the source module.
            double sourceModuleValue = SourceModule.GetValue(x, y, z);

            int controlPointCount = ControlPoints.Count;

            // Find the first element in the control point array that has a value
            // larger than the output value from the source module.
            int indexPos;
            for (indexPos = 0; indexPos < controlPointCount; indexPos++)
            {
                if (sourceModuleValue < ControlPoints[indexPos])
                {
                    break;
                }
            }

            // Find the two nearest control points so that we can map their values
            // onto a quadratic curve.
            int index0 = NMath.ClampValue(indexPos - 1, 0, controlPointCount - 1);
            int index1 = NMath.ClampValue(indexPos, 0, controlPointCount - 1);

            // If some control points are missing (which occurs if the output value from
            // the source module is greater than the largest value or less than the
            // smallest value of the control point array), get the value of the nearest
            // control point and exit now.
            if (index0 == index1)
            {
                return ControlPoints[index1];
            }

            // Compute the alpha value used for linear interpolation.
            double value0 = ControlPoints[index0];
            double value1 = ControlPoints[index1];
            double alpha = (sourceModuleValue - value0) / (value1 - value0);
            if (InvertTerraces)
            {
                alpha = 1.0 - alpha;
                NMath.SwapValues(ref value0, ref value1);
            }

            // Squaring the alpha produces the terrace effect.
            alpha *= alpha;

            // Now perform the linear interpolation given the alpha value.
            return NMath.LinearInterpolate(value0, value1, alpha);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
  public struct CurveControlPoint
  {
    public double Input;
    public double Output;
  }

  // Since this curve is a cubic spline, an application must add a minimum
  // of four control points to the curve.  If this is not done, the
  // GetValue() method fails.  Each control point can have any input and
  // output value, although no two control points can have the same input
  // value.  There is no limit to the number of control points that can be
  // added to the curve.  
  // 
  public class CurveOutput
      : IModule
  {
    public IModule SourceModule { get; set; }
    public List<CurveControlPoint> ControlPoints = new List<CurveControlPoint>();

    public CurveOutput(IModule sourceModule)
    {
      SourceModule = sourceModule;
    }

    public double GetValue(double x, double y, double z)
    {
      if (SourceModule == null) return 0;
      if (ControlPoints.Count < 4) return 0;

      // Get the output value from the source module.
      double sourceModuleValue = SourceModule.GetValue(x, y, z);

      int controlPointCount = ControlPoints.Count;

      // Find the first element in the control point array that has an input value
      // larger than the output value from the source module.
      int indexPos;
      for (indexPos = 0; indexPos < controlPointCount; indexPos++)
      {
        if (sourceModuleValue < ControlPoints[indexPos].Input)
        {
          break;
        }
      }

      // Find the four nearest control points so that we can perform cubic
      // interpolation.
      int index0 = NMath.ClampValue(indexPos - 2, 0, controlPointCount - 1);
      int index1 = NMath.ClampValue(indexPos - 1, 0, controlPointCount - 1);
      int index2 = NMath.ClampValue(indexPos, 0, controlPointCount - 1);
      int index3 = NMath.ClampValue(indexPos + 1, 0, controlPointCount - 1);

      // If some control points are missing (which occurs if the value from the
      // source module is greater than the largest input value or less than the
      // smallest input value of the control point array), get the corresponding
      // output value of the nearest control point and exit now.
      if (index1 == index2)
      {
        return ControlPoints[index1].Output;
      }

      // Compute the alpha value used for cubic interpolation.
      double input0 = ControlPoints[index1].Input;
      double input1 = ControlPoints[index2].Input;
      double alpha = (sourceModuleValue - input0) / (input1 - input0);

      // Now perform the cubic interpolation given the alpha value.
      return NMath.CubicInterpolate(
        ControlPoints[index0].Output,
        ControlPoints[index1].Output,
        ControlPoints[index2].Output,
        ControlPoints[index3].Output,
        alpha);
    }

    public int FindInsertionPos(double inputValue)
    {
      int insertionPos;
      int controlPointCount = ControlPoints.Count;
      for (insertionPos = 0; insertionPos < controlPointCount; insertionPos++)
      {
        if (inputValue < ControlPoints[insertionPos].Input) {
          // We found the array index in which to insert the new control point.
          // Exit now.
          break;
        } else if (inputValue == ControlPoints[insertionPos].Input) {
          // Each control point is required to contain a unique input value, so
          // throw an exception.
          throw new Exception("Control Point already exists");
        }
      }
      return insertionPos;
    }
  }
}

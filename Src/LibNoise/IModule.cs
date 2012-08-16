using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise
{
  public enum NoiseQuality
  {
    Low, Standard, High
  }

  public enum Axis
  {
    X, Y, Z
  }

  public interface IModule
  {
    double GetValue(double x, double y, double z);
  }
}

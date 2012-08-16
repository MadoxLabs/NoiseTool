using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise
{
    public class Constant
        : IModule
    {
        public double Value { get; set; }

        public Constant(double value)
        {
            Value = value;
        }

        public double GetValue(double x, double y, double z)
        {
            return Value;
        }
    }
}

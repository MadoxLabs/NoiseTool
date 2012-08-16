using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise
{
    public class Checkerboard
        : IModule
    {
        public double GetValue(double x, double y, double z)
        {
           /* x = Math.MakeInt32Range(x);
            y = Math.MakeInt32Range(y);
            z = Math.MakeInt32Range(z);*/

            int x0 = (x > 0.0 ? (int)x : (int)x - 1);
            int y0 = (y > 0.0 ? (int)y : (int)y - 1);
            int z0 = (z > 0.0 ? (int)z : (int)z - 1);

            int result = ((x0 & 1 ^ y0 & 1 ^ z0 & 1));
            if(result > 0) 
                return -1.0;
            else
                return 1.0;
        }
    }
}

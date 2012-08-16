using System;
using System.Collections.Generic;
using System.Text;

namespace LibNoise.Modifiers
{
    public class RotateInput
        : IModule
    {
        public IModule SourceModule { get; set; }

        private double XAngle;
        private double YAngle;
        private double ZAngle;

        // An entry within the 3x3 rotation matrix used for rotating the
        // input value.
        double m_x1Matrix;

        // An entry within the 3x3 rotation matrix used for rotating the
        // input value.
        double m_x2Matrix;

        // An entry within the 3x3 rotation matrix used for rotating the
        // input value.
        double m_x3Matrix;


        // An entry within the 3x3 rotation matrix used for rotating the
        // input value.
        double m_y1Matrix;

        // An entry within the 3x3 rotation matrix used for rotating the
        // input value.
        double m_y2Matrix;

        // An entry within the 3x3 rotation matrix used for rotating the
        // input value.
        double m_y3Matrix;

        // An entry within the 3x3 rotation matrix used for rotating the
        // input value.
        double m_z1Matrix;

        // An entry within the 3x3 rotation matrix used for rotating the
        // input value.
        double m_z2Matrix;

        // An entry within the 3x3 rotation matrix used for rotating the
        // input value.
        double m_z3Matrix;

        public RotateInput(IModule sourceModule, double xAngle, double yAngle, double zAngle)
        {
            SourceModule = sourceModule;
            XAngle = xAngle;
            YAngle = yAngle;
            ZAngle = zAngle;
        }

        public void SetAngles(double xAngle, double yAngle, double zAngle)
        {
            XAngle = xAngle;
            YAngle = yAngle;
            ZAngle = zAngle;

            double xCos, yCos, zCos, xSin, ySin, zSin;
            xCos = System.Math.Cos(xAngle);
            yCos = System.Math.Cos(yAngle);
            zCos = System.Math.Cos(zAngle);
            xSin = System.Math.Sin(xAngle);
            ySin = System.Math.Sin(yAngle);
            zSin = System.Math.Sin(zAngle);

            m_x1Matrix = ySin * xSin * zSin + yCos * zCos;
            m_y1Matrix = xCos * zSin;
            m_z1Matrix = ySin * zCos - yCos * xSin * zSin;
            m_x2Matrix = ySin * xSin * zCos - yCos * zSin;
            m_y2Matrix = xCos * zCos;
            m_z2Matrix = -yCos * xSin * zCos - ySin * zSin;
            m_x3Matrix = -ySin * xCos;
            m_y3Matrix = xSin;
            m_z3Matrix = yCos * xCos;
        }

        public double GetValue(double x, double y, double z)
        {
          if (SourceModule == null) return 0;

            double nx = (m_x1Matrix * x) + (m_y1Matrix * y) + (m_z1Matrix * z);
            double ny = (m_x2Matrix * x) + (m_y2Matrix * y) + (m_z2Matrix * z);
            double nz = (m_x3Matrix * x) + (m_y3Matrix * y) + (m_z3Matrix * z);
            return SourceModule.GetValue(nx, ny, nz);
        }
    }
}

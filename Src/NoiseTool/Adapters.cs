using System;
using System.Collections.ObjectModel;
using LibNoise;
using LibNoise.Modifiers;

namespace NoiseTool
{
  public class Adapter
  {
    public Adapter() { }

    public virtual IModule Module { get { return null; } }
    public virtual void Attach(LinkType type, Adapter a) { }
    public virtual void Attach(LinkType type, IModule a) { }
    public virtual IModule Detatch(LinkType type) { return null; }

    public virtual double GetSeed() { return 0; }

    public virtual void Seed(int s) 
    { 
    }

    public virtual void Seed()
    {
    }

    public virtual void Apply(ObservableCollection<Parameter> param)
    {
    }

    public virtual double GetValue(double x, double y)
    {
      return 0;
    }
  }


  //------------------------------
  // GENERATORS

  public class AdapterPerlin : Adapter
  {
    public Perlin perlin = new Perlin();
    public override IModule Module { get { return perlin; } }

    public AdapterPerlin() : base() { }

    public override double GetSeed() { return perlin.Seed;  }

    public override void Seed(int s)
    {
      perlin.Seed = s;
    }

    public override void Seed()
    {
      perlin.Seed = (int)DateTime.Now.Ticks;
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "Quality")
        {
          if (p.Value == 1) perlin.NoiseQuality = NoiseQuality.Low;
          else if (p.Value == 2) perlin.NoiseQuality = NoiseQuality.Standard;
          else if (p.Value == 3) perlin.NoiseQuality = NoiseQuality.High;
        }
        else if (p.Name == "Octaves") perlin.OctaveCount = (int)p.Value;
        else if (p.Name == "Frequency") perlin.Frequency = p.Value;
        else if (p.Name == "Persistence") perlin.Persistence = p.Value;
        else if (p.Name == "Lacunarity") perlin.Lacunarity = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      return perlin.GetValue(x, 0, y);
    }
  }

  public class AdapterBillow : Adapter
  {
    public Billow billow = new Billow();
    public override IModule Module { get { return billow; } }

    public AdapterBillow() : base() { }

    public override double GetSeed() { return billow.Seed; }
    public override void Seed()
    {
      billow.Seed = (int)DateTime.Now.Ticks;
    }
    public override void Seed(int s)
    {
      billow.Seed = s;
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "Quality")
        {
          if (p.Value == 1) billow.NoiseQuality = NoiseQuality.Low;
          else if (p.Value == 2) billow.NoiseQuality = NoiseQuality.Standard;
          else if (p.Value == 3) billow.NoiseQuality = NoiseQuality.High;
        }
        else if (p.Name == "Octaves") billow.OctaveCount = (int)p.Value;
        else if (p.Name == "Frequency") billow.Frequency = p.Value;
        else if (p.Name == "Persistence") billow.Persistence = p.Value;
        else if (p.Name == "Lacunarity") billow.Lacunarity = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      return billow.GetValue(x, 0, y);
    }
  }

  public class AdapterCheckerboard : Adapter
  {
    public Checkerboard noise = new Checkerboard();
    public override IModule Module { get { return noise; } }

    public AdapterCheckerboard() : base() { }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterConstant : Adapter
  {
    public Constant noise = new Constant(0);
    public override IModule Module { get { return noise; } }

    public AdapterConstant() : base() { }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "Value") noise.Value = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterCylinders : Adapter
  {
    public Cylinders noise = new Cylinders();
    public override IModule Module { get { return noise; } }

    public AdapterCylinders() : base() { }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "Frequency") noise.Frequency = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterSpheres : Adapter
  {
    public Spheres noise = new Spheres();
    public override IModule Module { get { return noise; } }

    public AdapterSpheres() : base() { }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "Frequency") noise.Frequency = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterGradient : Adapter
  {
    public Gradient noise = new Gradient(Axis.X);
    public override IModule Module { get { return noise; } }

    public AdapterGradient() : base() { }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      double low = 0, up = 1;
      foreach (Parameter p in param)
      {
        if (p.Name == "Axis")
        {
          if (p.Value == 1) noise.Axis = Axis.X;
          else if (p.Value == 2) noise.Axis = Axis.Y;
          else if (p.Value == 3) noise.Axis = Axis.Z;
        }
        else if (p.Name == "Lower") low = p.Value;
        else if (p.Name == "Upper") up = p.Value;
      }
      noise.SetBounds(low, up);
    }

    public override double GetValue(double x, double y)
    {
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterRidged : Adapter
  {
    public RidgedMultifractal perlin = new RidgedMultifractal();
    public override IModule Module { get { return perlin; } }

    public AdapterRidged() : base() { }

    public override double GetSeed() { return perlin.Seed; }
    public override void Seed()
    {
      perlin.Seed = (int)DateTime.Now.Ticks;
    }
    public override void Seed(int s)
    {
      perlin.Seed = s;
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "Quality")
        {
          if (p.Value == 1) perlin.NoiseQuality = NoiseQuality.Low;
          else if (p.Value == 2) perlin.NoiseQuality = NoiseQuality.Standard;
          else if (p.Value == 3) perlin.NoiseQuality = NoiseQuality.High;
        }
        else if (p.Name == "Octaves") perlin.OctaveCount = (int)p.Value;
        else if (p.Name == "Frequency") perlin.Frequency = p.Value;
        else if (p.Name == "Lacunarity") perlin.Lacunarity = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      return perlin.GetValue(x, 0, y);
    }
  }

  public class AdapterVoronoi : Adapter
  {
    public Voronoi perlin = new Voronoi();
    public override IModule Module { get { return perlin; } }

    public AdapterVoronoi() : base() { }

    public override double GetSeed() { return perlin.Seed; }
    public override void Seed()
    {
      perlin.Seed = (int)DateTime.Now.Ticks;
    }
    public override void Seed(int s)
    {
      perlin.Seed = s;
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "Distance")
        {
          if (p.Value == 0) perlin.DistanceEnabled = false;
          else if (p.Value == 1) perlin.DistanceEnabled = true;
        }
        else if (p.Name == "Displacement") perlin.Displacement = p.Value;
        else if (p.Name == "Frequency") perlin.Frequency = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      return perlin.GetValue(x, 0, y);
    }
  }


  //------------------------------
  // MODIFIERS
  // 

  public class AdapterTerrace : Adapter
  {
    public TerraceOutput noise = null;
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return; noise.SourceModule = a.Module; }
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return; noise.SourceModule = a; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterTerrace()
      : base()
    {
      noise = new TerraceOutput(null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      noise.ControlPoints.Clear();

      foreach (Parameter p in param)
      {
        if (p.Name == "Invert") noise.InvertTerraces = (p.Value == 0 ? false : true);
        else if (p.Name == "Point") 
        {
          noise.ControlPoints.Add(p.Value);
        }
      }
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterCurve : Adapter
  {
    public CurveOutput noise = null;
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return; noise.SourceModule = a.Module; }
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return; noise.SourceModule = a; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterCurve()
      : base()
    {
      noise = new CurveOutput(null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      noise.ControlPoints.Clear();

      double x = 0;
      double y = 0;
      noise.ControlPoints.Clear();

      foreach (Parameter p in param)
      {
        if (p.Name == "PointX")
        {
          x = p.Value;
        }
        else if (p.Name == "PointY")
        {
          y = p.Value;
          noise.ControlPoints.Add(new CurveControlPoint() { Input = x, Output = y} );
        }
      }
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterAbs : Adapter
  {
    public AbsoluteOutput noise = null;
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return ; noise.SourceModule = a.Module; }
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return ; noise.SourceModule = a; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterAbs() : base() 
    {
      noise = new AbsoluteOutput(null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterClamp : Adapter
  {
    public ClampOutput noise = null;
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return ; noise.SourceModule = a.Module; }
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return ; noise.SourceModule = a; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterClamp() : base() 
    {
      noise = new ClampOutput(null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      double low = 0, up = 1;
      foreach (Parameter p in param)
      {
        if (p.Name == "Lower") low = p.Value;
        else if (p.Name == "Upper") up = p.Value;
      }
      noise.SetBounds(low, up);
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterExponent : Adapter
  {
    public ExponentialOutput noise = null;
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return ; noise.SourceModule = a; }
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return ; noise.SourceModule = a.Module; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterExponent()      : base()
    {
      noise = new ExponentialOutput(null, 1);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "Exponent") noise.Exponent = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterInvert : Adapter
  {
    public InvertOutput noise = null;
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return; noise.SourceModule = a; }
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return; noise.SourceModule = a.Module; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterInvert() : base() 
    {
      noise = new InvertOutput(null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterScaleBias : Adapter
  {
    public ScaleBiasOutput noise = null;
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return; noise.SourceModule = a; }
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return; noise.SourceModule = a.Module; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterScaleBias()
      : base()
    {
      noise = new ScaleBiasOutput(null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "Scale") noise.Scale = p.Value;
        if (p.Name == "Bias") noise.Bias = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  //------------------------------
  // TRANSFORMERS


  public class AdapterDisplace : Adapter
  {
    public DisplaceInput noise = null;
    public override void Attach(LinkType type, IModule a) 
    { 
      if (type == LinkType.In2) noise.SourceModule = a;
      if (type == LinkType.In1) noise.XDisplaceModule = a;
      if (type == LinkType.In3) noise.ZDisplaceModule = a;
      if (type == LinkType.In4) noise.YDisplaceModule = a;
    }
    public override void Attach(LinkType type, Adapter a) 
    {
      if (type == LinkType.In2) noise.SourceModule = a.Module;
      if (type == LinkType.In1) noise.XDisplaceModule = a.Module;
      if (type == LinkType.In3) noise.ZDisplaceModule = a.Module;
      if (type == LinkType.In4) noise.YDisplaceModule = a.Module;
    }
    public override IModule Detatch(LinkType type) 
    { 
      if (type == LinkType.In2) {IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
      if (type == LinkType.In1) { IModule ret = noise.XDisplaceModule; noise.XDisplaceModule = null; return ret; }
      if (type == LinkType.In3) { IModule ret = noise.ZDisplaceModule; noise.ZDisplaceModule = null; return ret; }
      if (type == LinkType.In4) { IModule ret = noise.YDisplaceModule; noise.YDisplaceModule = null; return ret; }
      return null;
    }
    public override IModule Module { get { return noise; } }

    public AdapterDisplace()
      : base()
    {
      noise = new DisplaceInput(null, null, null, null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterInvertInput : Adapter
  {
    public InvertInput noise = null;
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return; noise.SourceModule = a; }
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return; noise.SourceModule = a.Module; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterInvertInput()
      : base()
    {
      noise = new InvertInput(null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterRotate : Adapter
  {
    public RotateInput noise = null;
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return; noise.SourceModule = a; }
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return; noise.SourceModule = a.Module; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterRotate()
      : base()
    {
      noise = new RotateInput(null,0,0,0);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      double x = 0;
      double y = 0;
      double z = 0;
      foreach (Parameter p in param)
      {
        if (p.Name == "X Angle") x = p.Value;
        if (p.Name == "Y Angle") y = p.Value;
        if (p.Name == "Z Angle") z = p.Value;
      }
      noise.SetAngles(x, y, z);
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterScale : Adapter
  {
    public ScaleInput noise = null;
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return; noise.SourceModule = a; }
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return; noise.SourceModule = a.Module; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterScale()
      : base()
    {
      noise = new ScaleInput(null, 0, 0, 0);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "X") noise.X = p.Value;
        if (p.Name == "Y") noise.Y = p.Value;
        if (p.Name == "Z") noise.Z = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterTranslate : Adapter
  {
    public TranslateInput noise = null;
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return; noise.SourceModule = a; }
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return; noise.SourceModule = a.Module; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterTranslate()
      : base()
    {
      noise = new TranslateInput(null, 0, 0, 0);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "X") noise.X = p.Value;
        if (p.Name == "Y") noise.Y = p.Value;
        if (p.Name == "Z") noise.Z = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterTurbulence : Adapter
  {
    public Turbulence noise = null;
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return; noise.SourceModule = a; }
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return; noise.SourceModule = a.Module; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterTurbulence()
      : base()
    {
      noise = new Turbulence(null);
    }

    public override double GetSeed() { return noise.Seed; }
    public override void Seed()
    {
      noise.Seed = (int)DateTime.Now.Ticks;
    }
    public override void Seed(int s)
    {
      noise.Seed = s;
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      foreach (Parameter p in param)
      {
        if (p.Name == "Power") noise.Power = p.Value;
        if (p.Name == "Roughness") noise.Roughness = (int)p.Value;
        if (p.Name == "Frequency") noise.Frequency = p.Value;
      }
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterCache : Adapter
  {
    public CacheOutput noise = null;
    public override void Attach(LinkType type, IModule a) { if (type != LinkType.In1) return; noise.SourceModule = a; }
    public override void Attach(LinkType type, Adapter a) { if (type != LinkType.In1) return; noise.SourceModule = a.Module; }
    public override IModule Detatch(LinkType type) { if (type != LinkType.In1) return null; IModule ret = noise.SourceModule; noise.SourceModule = null; return ret; }
    public override IModule Module { get { return noise; } }

    public AdapterCache()
      : base()
    {
      noise = new CacheOutput(null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  //------------------------------
  // COMBINERS

  public class AdapterAdd : Adapter
  {
    public AddOutput noise = null;
    public override void Attach(LinkType type, IModule a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a;
      if (type == LinkType.In2) noise.SourceModule2 = a;
    }
    public override void Attach(LinkType type, Adapter a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a.Module;
      if (type == LinkType.In2) noise.SourceModule2 = a.Module;
    }
    public override IModule Detatch(LinkType type)
    {
      if (type == LinkType.In1) { IModule ret = noise.SourceModule1; noise.SourceModule1 = null; return ret; }
      if (type == LinkType.In2) { IModule ret = noise.SourceModule2; noise.SourceModule2 = null; return ret; }
      return null;
    }
    public override IModule Module { get { return noise; } }

    public AdapterAdd()
      : base()
    {
      noise = new AddOutput(null, null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterMultiply : Adapter
  {
    public MultiplyOutput noise = null;
    public override void Attach(LinkType type, IModule a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a;
      if (type == LinkType.In2) noise.SourceModule2 = a;
    }
    public override void Attach(LinkType type, Adapter a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a.Module;
      if (type == LinkType.In2) noise.SourceModule2 = a.Module;
    }
    public override IModule Detatch(LinkType type)
    {
      if (type == LinkType.In1) { IModule ret = noise.SourceModule1; noise.SourceModule1 = null; return ret; }
      if (type == LinkType.In2) { IModule ret = noise.SourceModule2; noise.SourceModule2 = null; return ret; }
      return null;
    }
    public override IModule Module { get { return noise; } }

    public AdapterMultiply()
      : base()
    {
      noise = new MultiplyOutput(null, null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterPower : Adapter
  {
    public PowerOutput noise = null;
    public override void Attach(LinkType type, IModule a)
    {
      if (type == LinkType.In1) noise.BaseModule = a;
      if (type == LinkType.In2) noise.PowerModule = a;
    }
    public override void Attach(LinkType type, Adapter a)
    {
      if (type == LinkType.In1) noise.BaseModule = a.Module;
      if (type == LinkType.In2) noise.PowerModule = a.Module;
    }
    public override IModule Detatch(LinkType type)
    {
      if (type == LinkType.In1) { IModule ret = noise.BaseModule; noise.BaseModule = null; return ret; }
      if (type == LinkType.In2) { IModule ret = noise.PowerModule; noise.PowerModule = null; return ret; }
      return null;
    }
    public override IModule Module { get { return noise; } }

    public AdapterPower()
      : base()
    {
      noise = new PowerOutput(null, null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterMax : Adapter
  {
    public LargerOutput noise = null;
    public override void Attach(LinkType type, IModule a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a;
      if (type == LinkType.In2) noise.SourceModule2 = a;
    }
    public override void Attach(LinkType type, Adapter a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a.Module;
      if (type == LinkType.In2) noise.SourceModule2 = a.Module;
    }
    public override IModule Detatch(LinkType type)
    {
      if (type == LinkType.In1) { IModule ret = noise.SourceModule1; noise.SourceModule1 = null; return ret; }
      if (type == LinkType.In2) { IModule ret = noise.SourceModule2; noise.SourceModule2 = null; return ret; }
      return null;
    }
    public override IModule Module { get { return noise; } }

    public AdapterMax()
      : base()
    {
      noise = new LargerOutput(null, null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterMin : Adapter
  {
    public SmallerOutput noise = null;
    public override void Attach(LinkType type, IModule a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a;
      if (type == LinkType.In2) noise.SourceModule2 = a;
    }
    public override void Attach(LinkType type, Adapter a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a.Module;
      if (type == LinkType.In2) noise.SourceModule2 = a.Module;
    }
    public override IModule Detatch(LinkType type)
    {
      if (type == LinkType.In1) { IModule ret = noise.SourceModule1; noise.SourceModule1 = null; return ret; }
      if (type == LinkType.In2) { IModule ret = noise.SourceModule2; noise.SourceModule2 = null; return ret; }
      return null;
    }
    public override IModule Module { get { return noise; } }

    public AdapterMin()
      : base()
    {
      noise = new SmallerOutput(null, null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterBlend : Adapter
  {
    public BlendOutput noise = null;
    public override void Attach(LinkType type, IModule a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a;
      if (type == LinkType.In2) noise.SourceModule2 = a;
      if (type == LinkType.In3) noise.WeightModule = a;
    }
    public override void Attach(LinkType type, Adapter a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a.Module;
      if (type == LinkType.In2) noise.SourceModule2 = a.Module;
      if (type == LinkType.In3) noise.WeightModule = a.Module;
    }
    public override IModule Detatch(LinkType type)
    {
      if (type == LinkType.In1) { IModule ret = noise.SourceModule1; noise.SourceModule1 = null; return ret; }
      if (type == LinkType.In2) { IModule ret = noise.SourceModule2; noise.SourceModule2 = null; return ret; }
      if (type == LinkType.In3) { IModule ret = noise.WeightModule; noise.WeightModule = null; return ret; }
      return null;
    }
    public override IModule Module { get { return noise; } }

    public AdapterBlend()
      : base()
    {
      noise = new BlendOutput(null, null, null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }

  public class AdapterSelect : Adapter
  {
    public SelectOutput noise = null;
    public override void Attach(LinkType type, IModule a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a;
      if (type == LinkType.In2) noise.SourceModule2 = a;
      if (type == LinkType.In3) noise.ControlModule = a;
    }
    public override void Attach(LinkType type, Adapter a)
    {
      if (type == LinkType.In1) noise.SourceModule1 = a.Module;
      if (type == LinkType.In2) noise.SourceModule2 = a.Module;
      if (type == LinkType.In3) noise.ControlModule = a.Module;
    }
    public override IModule Detatch(LinkType type)
    {
      if (type == LinkType.In1) { IModule ret = noise.SourceModule1; noise.SourceModule1 = null; return ret; }
      if (type == LinkType.In2) { IModule ret = noise.SourceModule2; noise.SourceModule2 = null; return ret; }
      if (type == LinkType.In3) { IModule ret = noise.ControlModule; noise.ControlModule = null; return ret; }
      return null;
    }
    public override IModule Module { get { return noise; } }

    public AdapterSelect()
      : base()
    {
      noise = new SelectOutput(null, null, null);
    }

    public override void Seed()
    {
    }

    public override void Apply(ObservableCollection<Parameter> param)
    {
      double up = 0, low = 0;
      foreach (Parameter p in param)
      {
        if (p.Name == "EdgeFalloff") noise.EdgeFalloff = p.Value;
        if (p.Name == "UpperBound") up = p.Value;
        if (p.Name == "LowerBound") low = p.Value;
      }
      noise.SetBounds(low, up);
    }

    public override double GetValue(double x, double y)
    {
      if (noise == null) return 0;
      return noise.GetValue(x, 0, y);
    }
  }
}
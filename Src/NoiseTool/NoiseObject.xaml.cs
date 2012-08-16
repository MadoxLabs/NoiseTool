using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.ComponentModel;
using System.Collections.ObjectModel;
using LibNoise;
using System.Windows.Controls.Primitives;
using System.IO;
using System.Threading;
using System.Text;

namespace NoiseTool
{
  public class Parameter : INotifyPropertyChanged
  {
    public string Name { get; set; }
    public double Min { get; set; }
    public double Max { get; set; }
    public double Incr { get; set; }
    public int Rounding { get; set; }
    public Visibility Typeable { get; set; }

    public Parameter() { Typeable = Visibility.Visible; }

    private double _value;
    public double Value
    {
      get { return _value; }
      set { _value = Math.Round(value, Rounding); RaisePropertyChanged("Value"); RaisePropertyChanged("RawValue"); }
    }
    public double RawValue
    {
      get { return _value; }
      set { _value = value; RaisePropertyChanged("Value"); RaisePropertyChanged("RawValue"); }
    }

    public event PropertyChangedEventHandler PropertyChanged;
    private void RaisePropertyChanged(string propertyName) { if (PropertyChanged != null) PropertyChanged(this, new PropertyChangedEventArgs(propertyName)); }
  }

  public class Tips : INotifyPropertyChanged
  {
    public string In3 { get; set; }
    public string In4 { get; set; }
    public string Out { get; set; }
    public string In1 { get; set; }
    public string In2 { get; set; }

    public void Reset()
    {
      Out = "Output";
      In3 = "";
      In4 = "";
      In1 = "";
      In2 = "";
    }

    public void Signal()
    {
      RaisePropertyChanged("In3");
      RaisePropertyChanged("In4");
      RaisePropertyChanged("In1");
      RaisePropertyChanged("In2");
    }

    public event PropertyChangedEventHandler PropertyChanged;
    private void RaisePropertyChanged(string propertyName) { if (PropertyChanged != null) PropertyChanged(this, new PropertyChangedEventArgs(propertyName)); }
  }

  public class Renderer
  {
    public byte[] pixelData = null;
    public double[] noiseData = null;

    public bool mNormal = false;
    public bool mShadow = false;
    public bool mTile = false;

    double intensity = 0;
    double contrast  = 0;
    double azimuth   = 0;
    double elevation = 0;

    public double min = 0;
    public double max = 0;

    int width = 0;
    int height = 0;

    public bool noDispatch = false;

    public void InitData(double w, double h)
    {
      System.Windows.Media.PixelFormat pf = System.Windows.Media.PixelFormats.Rgb24;
      int rawStride;

      width = (int)w;
      height = (int)h;
      rawStride = width * 3;// (width * pf.BitsPerPixel + 7) / 8;
      pixelData = new byte[rawStride * height];
      noiseData = new double[width * height];
    }

    public void Apply(ObservableCollection<Parameter> Parameters)
    {
      if (!mShadow || Parameters == null || Parameters.Count < 4) return;

      intensity = Parameters[Parameters.Count - 4].Value;
      contrast = Parameters[Parameters.Count - 3].Value;
      azimuth = Parameters[Parameters.Count - 2].Value;
      elevation = Parameters[Parameters.Count - 1].Value;
    }

    private double LinearInterp(double a, double b, double f)
    {
      return (b * f + a * (1 - f));
    }

    public BitmapSource Render(Adapter noise, GradientDef gradient, bool redraw = false)
    {
      if (noise == null) return null;
      if (gradient == null) return null;
      if (pixelData == null) return null;

      // draw the pixels scaled to color range - we need to know min max
      double xInc = (double)Boundary.Object.W / (double)width;
      double yInc = (double)Boundary.Object.H / (double)height;
      double x = Boundary.Object.X;
      double y = Boundary.Object.Y;

      BitmapSource bitmap = null;
      System.Windows.Media.PixelFormat pf = System.Windows.Media.PixelFormats.Rgb24;
      int rawStride;
      rawStride = width * 3;

      if (!mNormal)
      {
        min = 1000000;
        max = -1000000;
      }

      Color c = new Color();

      // n is the index into noiseData
      // i,j are indexes into the bitmap data - range of the widow size
      // x,y are indexes into the noise module to get the value - range of the bounds
      int n = 0;
      for (int j = 0; j < height; ++j)
      {
        int yIndex = j * rawStride;
        for (int i = 0; i < rawStride; i += 3)
        {
          double val = 0;
          if (redraw)
            val = noiseData[n++];
          else
          {
            if (mTile)
            {
              double swValue, seValue, neValue;
              swValue = noise.GetValue(x, y);
              seValue = noise.GetValue(Boundary.Object.W - x, y);
              neValue = noise.GetValue(x, Boundary.Object.H - y);
              double mirrorx = (swValue + seValue) / 2;
              double mirrory = (swValue + neValue) / 2;
              // lerp between mirror and real 
              double xloc = (x - Boundary.Object.X) / Boundary.Object.W;
              double yloc = (y - Boundary.Object.Y) / Boundary.Object.H;
              double factorx = Math.Abs(0.5 - xloc) * 2;
              double factory = Math.Abs(0.5 - yloc) * 2;
              if (Math.Abs(factorx - factory) < 0.1)
              {
                // calculate how much towards x is it
                double factor = ((factorx - factory) / 0.1 + 1) / 2;
                double valx = (mirrorx * factorx + swValue * (1 - factorx));
                double valy = (mirrory * factory + swValue * (1 - factory));
                val = (valx * factor + valy * (1 - factor));
              }
              else
              {
                if (factorx > factory)
                  val = (mirrorx * factorx + swValue * (1 - factorx));
                else
                  val = (mirrory * factory + swValue * (1 - factory));
              }
            }
            else
              val = noise.GetValue(x, y);
            noiseData[n++] = val;
          }

          if (!mNormal)
          {
            if (val < min) min = val;
            if (val > max) max = val;
          }

          if (!mShadow)
          {
            if (mNormal) val = (val - min) / (max - min);
            gradient.GetColor(val, ref c);
            pixelData[i + yIndex] = c.R;
            pixelData[i + yIndex + 1] = c.G;
            pixelData[i + yIndex + 2] = c.B;
          }

          x += xInc;
        }
        y += yInc;
        x = Boundary.Object.X;
      }

      if (!mShadow)
      {
        if (noDispatch)
          bitmap = BitmapSource.Create(width, height, 96, 96, pf, null, pixelData, rawStride);
        else
          Application.Current.Dispatcher.Invoke((Action)(() => { bitmap = BitmapSource.Create(width, height, 96, 96, pf, null, pixelData, rawStride); }));
      }
      else 
        bitmap = Shadow(gradient);

      return bitmap;
    }

    public BitmapSource Shadow(GradientDef gradient)
    {
      if (gradient == null) return null;
      if (pixelData == null) return null;

      double cosAzimuth = Math.Cos(azimuth * 0.0174532925);
      double sinAzimuth = Math.Sin(azimuth * 0.0174532925);
      double cosElev = Math.Cos(elevation * 0.0174532925);
      double sinElev = Math.Sin(elevation * 0.0174532925);

      // draw the pixels scaled to color range - we need to know min max
      double xInc = (double)Boundary.Object.W / (double)width;
      double yInc = (double)Boundary.Object.H / (double)height;
      double x = Boundary.Object.X;
      double y = Boundary.Object.Y;

      System.Windows.Media.PixelFormat pf = System.Windows.Media.PixelFormats.Rgb24;
      int rawStride = width * 3;

      Color c = new Color();

      // n is the index into noiseData
      // i,j are indexes into the bitmap data - range of the widow size
      // x,y are indexes into the noise module to get the value - range of teh bounds
      //      int n = 0;
      for (int j = 0; j < height; ++j)
      {
        int yIndex = j * rawStride;
        int ii = 0;
        for (int i = 0; i < rawStride; i += 3)
        {
          // Calculate the positions of the current point's four-neighbors.
          int xLeftOffset, xRightOffset;
          int yUpOffset, yDownOffset;
          {
            if (ii == 0)
            {
              xLeftOffset = 0;
              xRightOffset = 1;
            }
            else if (ii == (int)width - 1)
            {
              xLeftOffset = -1;
              xRightOffset = 0;
            }
            else
            {
              xLeftOffset = -1;
              xRightOffset = 1;
            }
            if (j == 0)
            {
              yDownOffset = 0;
              yUpOffset = 1;
            }
            else if (j == (int)height - 1)
            {
              yDownOffset = -1;
              yUpOffset = 0;
            }
            else
            {
              yDownOffset = -1;
              yUpOffset = 1;
            }
          }
          yDownOffset *= width;
          yUpOffset *= width;

          // Get the noise value of the current point in the source noise map
          // and the noise values of its four-neighbors.
          double nc = noiseData[j * width + ii];
          double nl = noiseData[j * width + ii + xLeftOffset];
          double nr = noiseData[j * width + ii + xRightOffset];
          double nd = noiseData[j * width + ii + yDownOffset];
          double nu = noiseData[j * width + ii + yUpOffset];

          if (mNormal)
          {
            nc = (nc - min) / (max - min);
            nl = (nl - min) / (max - min);
            nr = (nr - min) / (max - min);
            nd = (nd - min) / (max - min);
            nu = (nu - min) / (max - min);
          }

          // Now do the lighting calculations.
          double lightIntensity;
          {
            double io = 1.0 * 1.41421356 * sinElev / 2.0;
            double ix = (1.0 - io) * contrast * 1.41421356 * cosElev * cosAzimuth;
            double iy = (1.0 - io) * contrast * 1.41421356 * cosElev * sinAzimuth;
            lightIntensity = (ix * (nl - nr) + iy * (nd - nu) + io);
            if (lightIntensity < 0.0) { lightIntensity = 0.0; }
            lightIntensity *= intensity;
          }

          gradient.GetColor(nc, ref c);
          pixelData[i + yIndex] = (byte)NMath.ClampValue((int)(c.R * lightIntensity), 0, 255);
          pixelData[i + yIndex + 1] = (byte)NMath.ClampValue((int)(c.G * lightIntensity), 0, 255);
          pixelData[i + yIndex + 2] = (byte)NMath.ClampValue((int)(c.B * lightIntensity), 0, 255);

          x += xInc;
          ii += 1;
        }
        y += yInc;
        x = Boundary.Object.X;
      }

      BitmapSource bitmap = null;
      if (noDispatch)
        bitmap = BitmapSource.Create(width, height, 96, 96, pf, null, pixelData, rawStride);
      else
        Application.Current.Dispatcher.Invoke((Action)(() => { bitmap = BitmapSource.Create(width, height, 96, 96, pf, null, pixelData, rawStride); }));
      return bitmap;
    }

    public BitmapSource Redraw(Adapter noise, GradientDef grad)
    {
      return mShadow ? Shadow(grad) : Render(noise, grad, true);
    }
  }

  public partial class NoiseObject : UserControl
	{
		protected bool mResize = false;
    protected System.Windows.Point mDragLast;
    protected bool mMove = false;
    protected System.Windows.Point mMoveLoc;
    protected Adapter mNoise;
    private Thread mThread;
    public string mName;

    public GradientDef mGradient = null;
    public Tips LinkTips = new Tips();
    public Adapter Module { get { return mNoise; } }
    public ObservableCollection<Parameter> Parameters { get; set; }

    public int mType;

    public NoiseObject(int type)
		{
			this.InitializeComponent();

      mType = type;
      mName = DateTime.Now.Ticks.ToString();

      switch(type) 
      {
        case 0: xGenerators.Visibility = Visibility.Visible; break;
        case 1: xModifiers.Visibility = Visibility.Visible; break;
        case 2: xTransformers.Visibility = Visibility.Visible; break;
        case 3: xCombiners.Visibility = Visibility.Visible; break;
      }
      xLinks.Init(this);
      xLinks.Link += new EventHandler<LinkEventArgs>(xLinks_Link);
      xLinks.Erase += new EventHandler<LinkEventArgs>(xLinks_Erase);
      render = new Renderer();

      mThread = new Thread(new ThreadStart(this.ThreadMain));
      mThread.Start();
		}

    AutoResetEvent mutexDraw = new AutoResetEvent(false);
    bool threadRedraw = false;
    string threadFilename = null;

    public void ThreadMain()
    {
      while(true)
      {
        mutexDraw.WaitOne();
        if (threadFilename != null)
        {
          int w = 0;
          Dispatcher.Invoke((Action)(() => { try { w = Convert.ToInt32(xRez.Text); } catch (FormatException) { w = 256; } })); 

          Renderer filerender = new Renderer();
          filerender.noDispatch = true;
          filerender.mShadow = render.mShadow;
          filerender.mNormal = render.mNormal;
          filerender.Apply(Parameters);
          filerender.InitData(w, w);
          BitmapSource bitmap = filerender.Render(mNoise, mGradient);
          BitmapPalette myPalette = BitmapPalettes.Halftone256;
          FileStream stream = new FileStream(threadFilename, FileMode.Create);
          PngBitmapEncoder encoder = new PngBitmapEncoder();
          encoder.Interlace = PngInterlaceOption.On;
          encoder.Frames.Add(BitmapFrame.Create(bitmap));
          encoder.Save(stream);
          stream.Close();
          Dispatcher.Invoke((Action)(() =>
          {
            xSaving.Visibility = Visibility.Collapsed;
          }));
        } 
        else
        {
          BitmapSource bitmap = !threadRedraw ? render.Render(mNoise, mGradient) : render.Redraw(mNoise, mGradient);
          Dispatcher.Invoke((Action)(() =>
          {
            xCanvas.Source = bitmap;
//            xCanvas.Visibility = Visibility.Visible;
            xDrawing.Visibility = Visibility.Collapsed;
            Range = "Output Range: " + Math.Round(render.min, 2) + " to " + Math.Round(render.max, 2);
            OnRendered();
          }));
        }
        threadFilename = null;
        threadRedraw = false;
      }
    }

    public void SetGradient(GradientDef g)
    {
      if (!mLocalGradient)
      {
        mGradient = g;
        Redraw();
      }
    }

    public void Select(bool b)
    {
      if (b)
        xBorder.BorderBrush = new SolidColorBrush(Colors.Yellow);
      else
        xBorder.BorderBrush = new SolidColorBrush(Colors.Black);
    }

    public void Attach(LinkType type, Adapter a)
    {
      if (mNoise != null) mNoise.Attach(type, a);
    }

    public void Detatch(LinkType type)
    {
      if (mNoise != null) mNoise.Detatch(type);
    }

    void xLinks_Erase(object sender, LinkEventArgs e)
    {
      OnErase(e);
    }

    void xLinks_Link(object sender, LinkEventArgs e)
    {
      OnLink(e);
    }

    public virtual void OnLink(LinkEventArgs l) { if (Link != null) Link(this, l); }
    public event EventHandler<LinkEventArgs> Link;

    public virtual void OnErase(LinkEventArgs l) { if (Erase != null) Erase(this, l); }
    public event EventHandler<LinkEventArgs> Erase;

    public virtual void OnNeedUpdate() { if (NeedUpdate != null) NeedUpdate(this, new EventArgs()); }
    public event EventHandler<EventArgs> NeedUpdate;

    public virtual void OnNeedApply() { if (NeedApply != null) NeedApply(this, new EventArgs()); }
    public event EventHandler<EventArgs> NeedApply;

    public virtual void OnRaise() { if (Raise != null) Raise(this, new EventArgs()); }
    public event EventHandler<EventArgs> Raise;

    public virtual void OnRendered() { if (Rendered != null) Rendered(this, new EventArgs()); }
    public event EventHandler<EventArgs> Rendered;

    public virtual void OnRelink() { if (Relink != null) Relink(this, new EventArgs()); }
    public event EventHandler<EventArgs> Relink;

    public virtual void OnClose() { if (Close != null) Close(this, new EventArgs()); }
    public event EventHandler<EventArgs> Close;

    private void ResizeGrip_MouseLeftButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e)
		{
      ResizeGrip grip = sender as ResizeGrip;

      OnRaise();
			mResize = true;
      mDragLast = e.MouseDevice.GetPosition(this);
      grip.CaptureMouse();
      xCanvas.Visibility = Visibility.Collapsed;
      e.Handled = true;
    }

		private void ResizeGrip_MouseLeftButtonUp(object sender, System.Windows.Input.MouseButtonEventArgs e)
		{
      ResizeGrip grip = sender as ResizeGrip;
      
      mResize = false;
      grip.ReleaseMouseCapture();
      e.Handled = true;
      if (!mSkip) xCanvas.Visibility = Visibility.Visible;
      InitData();
      Apply();
    }

		private void ResizeGrip_MouseMove(object sender, System.Windows.Input.MouseEventArgs e)
		{
      if (mResize)
      {
        System.Windows.Point current = e.MouseDevice.GetPosition(this);
        Width = NMath.ClampValue(Width + current.X - mDragLast.X,50,5000);
        Height = NMath.ClampValue(Height + current.Y - mDragLast.Y,50,5000);
        mDragLast = current;
        e.Handled = true;

        xLinks.xGrid.Height = xLinks.ActualHeight / 2;
        xExtra.Width = NMath.ClampValue((int)ActualWidth, 100, 200);
        
        OnNeedUpdate();
      }
		}

    private void MoveGrip_MouseLeftButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e)
		{
      OnRaise();
      mMove = true;
      mMoveLoc = e.MouseDevice.GetPosition(this);
      xFrame.CaptureMouse();
      e.Handled = true;
    }

    private void MoveGrip_MouseLeftButtonUp(object sender, System.Windows.Input.MouseButtonEventArgs e)
		{
      mMove = false;
      xFrame.ReleaseMouseCapture();
      e.Handled = true;
    }

    private void MoveGrip_MouseMove(object sender, System.Windows.Input.MouseEventArgs e)
		{
      if (mMove)
      {
        System.Windows.Point current = e.MouseDevice.GetPosition(Parent as IInputElement);
        Canvas.SetLeft(this,  current.X - mMoveLoc.X);
        Canvas.SetTop(this,  current.Y - mMoveLoc.Y);
        e.Handled = true;
        OnNeedUpdate();
      }
    }

    bool mSkip = false;
    string mNoiseType = "none";

    private void ComboBox_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
    {
      ComboBoxItem item = e.AddedItems[0] as ComboBoxItem;
      setModuleType(item.Content as string);
    }

    private void setModuleType(string type)
    {
      Adapter old = mNoise;

      mSkip = false;
      LinkTips.Reset();

      mNoiseType = type;
      if (mNoiseType as string == "Perlin")
      {
        xLinks.SetLinks(0);
        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Quality", Min = 1, Max = 3, Incr = 1, Value = 2, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Octaves", Min = 1, Max = 30, Incr = 1, Value = 6, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Frequency", Min = 1, Max = 16, Incr = 1, Value = 1, Rounding = 0 });
        a.Add(new Parameter() { Name = "Persistence", Min = 0, Max = 1, Incr = 0.01, Rounding = 2, Value = 0.5 });
        a.Add(new Parameter() { Name = "Lacunarity", Min = 1, Max = 4, Incr = 0.1, Value = 2, Rounding = 1 });
        Parameters = a;
        mNoise = new AdapterPerlin();
      }

      else if (mNoiseType as string == "Billow")
      {
        xLinks.SetLinks(0);
        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Quality", Min = 1, Max = 3, Incr = 1, Value = 2, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Octaves", Min = 1, Max = 30, Incr = 1, Value = 6, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Frequency", Min = 1, Max = 16, Incr = 1, Value = 1, Rounding = 0 });
        a.Add(new Parameter() { Name = "Persistence", Min = 0, Max = 1, Incr = 0.01, Rounding = 2, Value = 0.5 });
        a.Add(new Parameter() { Name = "Lacunarity", Min = 1, Max = 4, Incr = 0.1, Value = 2, Rounding = 1 });
        Parameters = a;
        mNoise = new AdapterBillow();
      }

      else if (mNoiseType as string == "Checkerboard")
      {
        xLinks.SetLinks(0);
        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterCheckerboard();
      }

      else if (mNoiseType as string == "Constant")
      {
        xLinks.SetLinks(0);
        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Value", Min = 0, Max = 1, Incr = 0.01, Value = 0, Rounding = 2 });
        Parameters = a;
        mNoise = new AdapterConstant();
      }

      else if (mNoiseType as string == "Cylinders")
      {
        xLinks.SetLinks(0);
        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Frequency", Min = 1, Max = 10, Incr = 0.1, Value = 1, Rounding = 1 });
        Parameters = a;
        mNoise = new AdapterCylinders();
      }
      else if (mNoiseType as string == "Spheres")
      {
        xLinks.SetLinks(0);
        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Frequency", Min = 1, Max = 10, Incr = 0.1, Value = 1, Rounding = 1 });
        Parameters = a;
        mNoise = new AdapterSpheres();
      }

      else if (mNoiseType as string == "Gradient")
      {
        xLinks.SetLinks(0);
        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Axis", Min = 1, Max = 3, Incr = 1, Value = 1, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Lower", Min = 0, Max = 1, Incr = 0.01, Value = 0, Rounding = 2 });
        a.Add(new Parameter() { Name = "Upper", Min = 0, Max = 1, Incr = 0.01, Value = 1, Rounding = 2 });
        Parameters = a;
        mNoise = new AdapterGradient();
      }
      else if (mNoiseType as string == "Ridged Multifractal")
      {
        xLinks.SetLinks(0);

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Quality", Min = 1, Max = 3, Incr = 1, Value = 2, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Octaves", Min = 1, Max = 30, Incr = 1, Value = 6, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Frequency", Min = 1, Max = 16, Incr = 1, Value = 1, Rounding = 0 });
        a.Add(new Parameter() { Name = "Lacunarity", Min = 1, Max = 4, Incr = 0.1, Value = 2, Rounding = 1 });
        Parameters = a;
        mNoise = new AdapterRidged();
      }
      else if (mNoiseType as string == "Voronoi")
      {
        xLinks.SetLinks(0);

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Distance", Min = 0, Max = 1, Incr = 1, Value = 0, Rounding = 0 });
        a.Add(new Parameter() { Name = "Displacement", Min = 1, Max = 30, Incr = 1, Value = 1, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Frequency", Min = 1, Max = 16, Incr = 1, Value = 1, Rounding = 0 });
        Parameters = a;
        mNoise = new AdapterVoronoi();
      }
      else if (mNoiseType as string == "Absolute")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterAbs();
      }
      else if (mNoiseType as string == "Terrace")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Invert", Min = 0, Max = 1, Incr = 1, Value = 0, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Point", Min = -5, Max = 5, Incr = 0.01, Value = 1, Rounding = 2 });
        Parameters = a;
        mNoise = new AdapterTerrace();
      }
      else if (mNoiseType as string == "Curve")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "PointX", Min = -5, Max = 5, Incr = 0.01, Rounding = 2, Value = 0 });
        a.Add(new Parameter() { Name = "PointY", Min = -5, Max = 5, Incr = 0.01, Rounding = 2, Value = 0 });
        a.Add(new Parameter() { Name = "PointX", Min = -5, Max = 5, Incr = 0.01, Rounding = 2, Value = 0.3 });
        a.Add(new Parameter() { Name = "PointY", Min = -5, Max = 5, Incr = 0.01, Rounding = 2, Value = 0.3 });
        a.Add(new Parameter() { Name = "PointX", Min = -5, Max = 5, Incr = 0.01, Rounding = 2, Value = 0.6 });
        a.Add(new Parameter() { Name = "PointY", Min = -5, Max = 5, Incr = 0.01, Rounding = 2, Value = 0.6 });
        a.Add(new Parameter() { Name = "PointX", Min = -5, Max = 5, Incr = 0.01, Rounding = 2, Value = 1 });
        a.Add(new Parameter() { Name = "PointY", Min = -5, Max = 5, Incr = 0.01, Rounding = 2, Value = 1 });
        Parameters = a;
        mNoise = new AdapterCurve();
      }
      else if (mNoiseType as string == "Clamp")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Lower", Min = -5, Max = 5, Incr = 0.01, Value = -1, Rounding = 2 });
        a.Add(new Parameter() { Name = "Upper", Min = -5, Max = 5, Incr = 0.01, Value = 1, Rounding = 2 });
        Parameters = a;
        mNoise = new AdapterClamp();
      }
      else if (mNoiseType as string == "Exponent")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Exponent", Min = 1, Max = 10, Incr = 0.1, Value = 1, Rounding = 1 });
        Parameters = a;
        mNoise = new AdapterExponent();
      }
      else if (mNoiseType as string == "Invert")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterInvert();
      }
      else if (mNoiseType as string == "ScaleBias")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Scale", Min = 0, Max = 10, Incr = 0.1, Value = 1, Rounding = 1 });
        a.Add(new Parameter() { Name = "Bias", Min = -5, Max = 5, Incr = 0.1, Value = 0, Rounding = 1 });
        Parameters = a;
        mNoise = new AdapterScaleBias();
      }
      else if (mNoiseType as string == "Displace")
      {
        xLinks.SetLinks(4);
        LinkTips.In2 = "Source";
        LinkTips.In1 = "X Displace";
        LinkTips.In3 = "Z Displace";
        LinkTips.In4 = "Y Displace";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterDisplace();
      }
      else if (mNoiseType as string == "Invert Input")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterInvertInput();
      }
      else if (mNoiseType as string == "Rotate")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "X Angle", Min = 0, Max = 360, Incr = 1, Value = 0, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Y Angle", Min = 0, Max = 360, Incr = 1, Value = 0, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Z Angle", Min = 0, Max = 360, Incr = 1, Value = 0, Rounding = 0, Typeable = Visibility.Collapsed });
        Parameters = a;
        mNoise = new AdapterRotate();
      }
      else if (mNoiseType as string == "Scale")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "X", Min = -10, Max = 10, Incr = 0.1, Value = 1, Rounding = 1 });
        a.Add(new Parameter() { Name = "Y", Min = -10, Max = 10, Incr = 0.1, Value = 1, Rounding = 1 });
        a.Add(new Parameter() { Name = "Z", Min = -10, Max = 10, Incr = 0.1, Value = 1, Rounding = 1 });
        Parameters = a;
        mNoise = new AdapterScale();
      }
      else if (mNoiseType as string == "Translate")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "X", Min = -10, Max = 10, Incr = 0.1, Value = 0, Rounding = 1 });
        a.Add(new Parameter() { Name = "Y", Min = -10, Max = 10, Incr = 0.1, Value = 0, Rounding = 1 });
        a.Add(new Parameter() { Name = "Z", Min = -10, Max = 10, Incr = 0.1, Value = 0, Rounding = 1 });
        Parameters = a;
        mNoise = new AdapterTranslate();
      }
      else if (mNoiseType as string == "Turbulence")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "Power", Min = 0, Max = 8, Incr = 0.1, Value = 1, Rounding = 1 });
        a.Add(new Parameter() { Name = "Roughness", Min = 1, Max = 30, Incr = 1, Value = 3, Rounding = 0, Typeable = Visibility.Collapsed });
        a.Add(new Parameter() { Name = "Frequency", Min = 0, Max = 8, Incr = 0.1, Value = 1, Rounding = 1 });
        Parameters = a;
        mNoise = new AdapterTurbulence();
      }
      else if (mNoiseType as string == "Add")
      {
        xLinks.SetLinks(2);
        LinkTips.In1 = "Source A";
        LinkTips.In2 = "Source B";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterAdd();
      }
      else if (mNoiseType as string == "Max")
      {
        xLinks.SetLinks(2);
        LinkTips.In1 = "Source A";
        LinkTips.In2 = "Source B";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterMax();
      }
      else if (mNoiseType as string == "Min")
      {
        xLinks.SetLinks(2);
        LinkTips.In1 = "Source A";
        LinkTips.In2 = "Source B";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterMin();
      }
      else if (mNoiseType as string == "Multiply")
      {
        xLinks.SetLinks(2);
        LinkTips.In1 = "Source A";
        LinkTips.In2 = "Source B";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterMultiply();
      }
      else if (mNoiseType as string == "Power")
      {
        xLinks.SetLinks(2);
        LinkTips.In1 = "Base Module";
        LinkTips.In2 = "Power Module";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterPower();
      }
      else if (mNoiseType as string == "Blend")
      {
        xLinks.SetLinks(3);
        LinkTips.In1 = "Source A";
        LinkTips.In2 = "Source B";
        LinkTips.In3 = "Weight Module";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterBlend();
      }
      else if (mNoiseType as string == "Select")
      {
        xLinks.SetLinks(3);
        LinkTips.In1 = "Source A";
        LinkTips.In2 = "Source B";
        LinkTips.In3 = "Control Module";


        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        a.Add(new Parameter() { Name = "EdgeFalloff", Min = 0, Max = 1, Incr = 0.01, Value = 0, Rounding = 2 });
        a.Add(new Parameter() { Name = "UpperBound", Min = -5, Max = 5, Incr = 0.1, Value = 1, Rounding = 1 });
        a.Add(new Parameter() { Name = "LowerBound", Min = -5, Max = 5, Incr = 0.1, Value = -1, Rounding = 1 });
        Parameters = a;
        mNoise = new AdapterSelect();
      }
      else if (mNoiseType as string == "Cache")
      {
        xLinks.SetLinks(1);
        LinkTips.In1 = "Source";

        ObservableCollection<Parameter> a = new ObservableCollection<Parameter>();
        Parameters = a;
        mNoise = new AdapterCache();
        mSkip = true;
      }

      xLinks.DataContext = LinkTips;
      xLinks.xGrid.Height = xLinks.ActualHeight / 2;
      LinkTips.Signal();
      
      if (old != null)
      {
        mNoise.Attach(LinkType.In1, old.Detatch(LinkType.In1));
        mNoise.Attach(LinkType.In2, old.Detatch(LinkType.In2));
        mNoise.Attach(LinkType.In3, old.Detatch(LinkType.In3));
      }

      ShadowParams();

      mNoise.Seed();
      OnRaise();
      OnRelink();
      OnNeedApply();
    }

    public string Range;
    Renderer render;

    private void InitData()
    {
      xCanvas.Width = xFrame.ActualWidth;
      xCanvas.Height = xFrame.ActualHeight;
      render.InitData(xFrame.ActualWidth, xFrame.ActualHeight);
    }

    // this function gathers all the noise data
    // if the draw method is plain, it also draws the image at the same time
    public string Apply() 
    {
      if (mSkip) return "Skipping. No output";
      if (mNoise == null) return "Error: no type";
      if (mGradient == null) return "Error: no gradient";

      if (render.pixelData == null) InitData();
      render.Apply(Parameters);
      mNoise.Apply(Parameters);

      xDrawing.Visibility = Visibility.Visible;
//      xCanvas.Visibility = Visibility.Collapsed;

      render.Apply(Parameters);
      threadRedraw = false;
      mutexDraw.Set();
      return "";

/*
      xCanvas.Source = render.Render(mNoise, mGradient);
      xCanvas.Visibility = Visibility.Visible;

      Range = "Output Range: " + Math.Round(render.min, 2) + " to " + Math.Round(render.max, 2);
      xDrawing.Visibility = Visibility.Collapsed;
      return Range;
*/
    }

    private void xClose_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      OnClose();
    }

    private void xFrame_MouseRightButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e)
    {
      mSkip = !mSkip;
      xCanvas.Visibility = mSkip ? Visibility.Collapsed : Visibility.Visible;
      xNoPic.Visibility = !mSkip ? Visibility.Collapsed : Visibility.Visible;
      if (!mSkip) Apply();
    }

    private void Button_Click(object sender, System.Windows.RoutedEventArgs e)
    {
  		if (xExtra.Visibility == Visibility.Collapsed) xExtra.Visibility = Visibility.Visible;
		  else xExtra.Visibility = Visibility.Collapsed;
    }

    private void xSeed_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      if (mNoise == null) return;
      mNoise.Seed();
      OnNeedApply();
    }

    private void xNormal_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      render.mNormal = !render.mNormal;
      Redraw();
    }

    private void xTile_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      render.mTile = !render.mTile;
      Redraw();
    }

    private void xShadow_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      render.mShadow = !render.mShadow;
      ShadowParams();
      Redraw();
    }

    public void Redraw()
    {
      xDrawing.Visibility = Visibility.Visible;
      render.Apply(Parameters);
      threadRedraw = true;
      mutexDraw.Set();
    }

    private void ShadowParams()
    {
      if (Parameters == null) return;
      if (render.mShadow)
      {
        Parameters.Add(new Parameter() { Name = "Intensity", Min = 0, Max = 5, Incr = 0.1, Value = 2, Rounding = 1 });
        Parameters.Add(new Parameter() { Name = "Contrast", Min = 0, Max = 5, Incr = 0.1, Value = 3, Rounding = 1 });
        Parameters.Add(new Parameter() { Name = "Azimuth", Min = 0, Max = 360, Incr = 1, Rounding = 0, Value = 45 });
        Parameters.Add(new Parameter() { Name = "Elevation", Min = 0, Max = 90, Incr = 0, Value = 45, Rounding = 0 });
      }
      else if (Parameters.Count > 3 && Parameters[Parameters.Count - 1].Name == "Elevation")
      {
        Parameters.RemoveAt(Parameters.Count - 1);
        Parameters.RemoveAt(Parameters.Count - 1);
        Parameters.RemoveAt(Parameters.Count - 1);
        Parameters.RemoveAt(Parameters.Count - 1);
      }
    }

    public bool mLocalGradient = false;

    private void xGradient_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
    {
      mGradient = xGradient.SelectedItem as GradientDef;
      mLocalGradient = true;
      Redraw();
    }

    private void xSave_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      xSaving.Visibility = Visibility.Visible;
      Microsoft.Win32.SaveFileDialog svfd = new Microsoft.Win32.SaveFileDialog();
      svfd.InitialDirectory = "C:\\";
      svfd.Filter = "Image files (*.png)|*.png";
      svfd.RestoreDirectory = true;
      bool? result = svfd.ShowDialog();
      if (result.HasValue && result.Value == true)
      {
        render.Apply(Parameters);
        threadFilename = svfd.FileName.ToString();
        mutexDraw.Set();
      } else
        xSaving.Visibility = Visibility.Collapsed;
    }

    public void UserControl_Unloaded(object sender, System.Windows.RoutedEventArgs e)
    {
      mThread.Abort();
    }

    char[] seperator = new char[] { ' ' };

    public string  Load(StreamReader sr)
    {
      string ret = "";
      String line;
      while ((line = sr.ReadLine()) != null)
      {
        if (line.Length == 0)
          return ret;

        string[] words = line.Split(seperator);
        if (words[0] == "Module")
        {
          setModuleType(words[1]);
          ComboBox combo = null;
          switch (mType)
          {
            case 0: combo = xGenerators    ; break;
            case 1: combo = xModifiers      ; break;
            case 2: combo = xTransformers; break;
            case 3: combo = xCombiners   ; break;
          }
          foreach (ComboBoxItem item in combo.Items) { if ((item.Content as string) == mNoiseType) {combo.SelectedItem = item; break;} }
          mName = words[2];
        }
        else if (words[0] == "Window")
        {
          try {
            Canvas.SetLeft(this,Convert.ToDouble(words[1]));
            Canvas.SetTop(this,Convert.ToDouble(words[2]));
            Width = Convert.ToDouble(words[3]);
            Height = Convert.ToDouble(words[4]);

            xCanvas.Width = Width;
            xCanvas.Height = Height;
            render.InitData(Width, Height);
          }
          catch (Exception) { }
        }
        else if (words[0] == "Parameter")
        {
          foreach (Parameter p in Parameters)
          {
            if (p.Name == words[1]) try { p.RawValue = Convert.ToDouble(words[2]); } catch(Exception) {}
          }
        }
        else if (words[0] == "Extras")
        {
          if (words[1] == "True") { render.mShadow = true; ShadowParams();  xShadow.IsChecked = true; }
          if (words[2] == "True") { render.mNormal = true; xNormal.IsChecked = true; }
          if (words[3] == "True") { render.mTile = true; xTile.IsChecked = true; }
          if (words[4] == "True") xFrame_MouseRightButtonDown(null, null);
          try { 
            xGradient.SelectedIndex = Convert.ToInt32(words[5]);
            mGradient = xGradient.SelectedItem as GradientDef;
            mLocalGradient = true;
          }
          catch (Exception) { }
        }
        else if (words[0] == "Seed")
        {
          try {
            mNoise.Seed(Convert.ToInt32(words[1]));
          } catch(Exception) {}
        }
        else if (words[0] == "Links")
        {
          ret = mName + " " + line + "\n";
        }
      }
      return ret;
    }
    
    public void AddPoint()
    {
      if (mNoiseType == "Terrace")
      {
        Parameters.Add(new Parameter() { Name = "Point", Min = -5, Max = 5, Incr = 0.01, Value = 1, Rounding = 2 });
      }
      if (mNoiseType == "Curve")
      {
        Parameters.Add(new Parameter() { Name = "PointX", Min = -5, Max = 5, Incr = 0.01, Value = 1, Rounding = 2 });
        Parameters.Add(new Parameter() { Name = "PointY", Min = -5, Max = 5, Incr = 0.01, Value = 1, Rounding = 2 });
      }
    }

    public string SaveToString()
    {
      StringBuilder save = new StringBuilder();
      save.AppendLine("Module " + mNoiseType + " " + mName);
      save.AppendLine("Window " + Canvas.GetLeft(this) + " " + Canvas.GetTop(this) + " " + Width + " " + Height);
      save.AppendLine("Extras " + render.mShadow + " " + render.mNormal + " " + render.mTile + " " + mSkip + " " + xGradient.SelectedIndex);
      foreach (Parameter p in Parameters)
        save.AppendLine("Parameter " + p.Name + " " + p.RawValue);
      save.AppendLine("Seed " + mNoise.GetSeed());
      save.AppendLine("Links " + xLinks.SaveToString());
      save.AppendLine();
      return save.ToString();
    }
  }
}

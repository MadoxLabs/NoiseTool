using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.ComponentModel;
using System.Collections.ObjectModel;
using LibNoise;
using System.IO;

namespace NoiseTool
{
  public class GradientPoint : INotifyPropertyChanged
  {
    public string Delete { get { return "X"; } set { OnDelete(); } }
    public double Point { get { return _point; } set { _point = value; RaisePropertyChanged("Point"); } }
    public Color color { get { return _color; } set { _color = value; RaisePropertyChanged("Color"); } }
    public double _point;
    public Color _color;

    public event EventHandler<EventArgs> NeedDelete;
    public void OnDelete() { if (NeedDelete != null) NeedDelete(this, new EventArgs()); }

    public event PropertyChangedEventHandler PropertyChanged;
    public void RaisePropertyChanged(string propertyName) { if (PropertyChanged != null) PropertyChanged(this, new PropertyChangedEventArgs(propertyName)); }
  }
  
  public class GradientDef : INotifyPropertyChanged
  {
    public string Name { get; set; }
    public ObservableCollection<GradientPoint> Points { get; set; }
    public bool Dirty { get; set; }

    public GradientDef()
    {
      Points = new ObservableCollection<GradientPoint>();
    }

    public void AddPoint()
    {
      double val = 0;
      if (Points.Count != 0) val = Points[Points.Count - 1].Point + 1;
      GradientPoint point = new GradientPoint() { Point = val, color = Colors.Black };
      Points.Add(point);
      point.PropertyChanged += new PropertyChangedEventHandler(point_PropertyChanged);
      RaisePropertyChanged("Points");
      point.NeedDelete += new EventHandler<EventArgs>(point_NeedDelete);
    }

    void point_NeedDelete(object sender, EventArgs e)
    {
      GradientPoint p = sender as GradientPoint;
      Points.Remove(p);
      RaisePropertyChanged("Points");
    }

    void point_PropertyChanged(object sender, PropertyChangedEventArgs e)
    {
      RaisePropertyChanged("Points");
    }

    public event PropertyChangedEventHandler PropertyChanged;
    public void RaisePropertyChanged(string propertyName) { Dirty = true;  if (PropertyChanged != null) PropertyChanged(this, new PropertyChangedEventArgs(propertyName)); }

    public double LowPoint()
    {
      double min = 10000;
      foreach (GradientPoint g in Points)
      {
        if (g.Point < min) min = g.Point;
      }
      return min;
    }

    public double HighPoint()
    {
      double max = -10000;
      foreach (GradientPoint g in Points)
      {
        if (g.Point > max) max = g.Point;
      }
      return max;
    }

    public void GetColor(double p, ref Color c)
    {
      GradientPoint a = null;
      GradientPoint b = null;

      // find the 2 points we are between
      foreach (GradientPoint g in Points)
      {
        // if exactly a point return it
        if (p == g.Point) { c = g.color; return; }
        if (g.Point < p)
        {
          // candidate for point a
          if (a == null || (p - a.Point > p - g.Point)) a = g;
        } 
        else
        {
          // candidate for point b
          if (b == null || (b.Point - p > g.Point - p)) b = g;
        }
      }
      // off the deep end?
      if (a == null && b == null) { c = Colors.Black; return; } // huh?
      if (a == null) { c = b.color; return; }
      if (b == null) { c = a.color; return; }

      // lerp that shit
      double ratio = (p - a.Point) / (b.Point - a.Point);
      c.R = (byte)((double)a.color.R * (1 - ratio) + (double)b.color.R * ratio);
      c.G = (byte)((double)a.color.G * (1 - ratio) + (double)b.color.G * ratio);
      c.B = (byte)((double)a.color.B * (1 - ratio) + (double)b.color.B * ratio);
    }
  }

  public partial class Gradients : UserControl
	{
    public ObservableCollection<GradientDef> GradientDefs { get; set; }
    public GradientDef CurrentDef = null;

    public Gradients()
		{
			this.InitializeComponent();
      GradientDefs = new ObservableCollection<GradientDef>();

      // create default
      GradientDef def = new GradientDef();
      def.Name = "Default Greyscale";
      def.AddPoint();
      def.AddPoint();
      def.Points[0].color = Colors.Black;
      def.Points[1].color = Colors.White;
      def.Points[0].Point = 0;
      def.Points[1].Point = 1;
      def.PropertyChanged += new PropertyChangedEventHandler(def_PropertyChanged);
      GradientDefs.Add(def);

      xDefList.ItemsSource = GradientDefs;
		}

    char[] seperator = new char[] { ' ' };

    public void Load(StreamReader sr)
    {
      GradientDef g = new GradientDef();
      String line;
      while ((line = sr.ReadLine()) != null)
      {
        if (line.Length == 0)
        {
          GradientDefs.Add(g);
          return;
        }

        string[] words = line.Split(seperator);
        if (words[0] == "Gradient")
        {
          string name = "";
          for (int i = 1; i < words.Length; ++i) name += (i == 1 ? "" : " ") + words[i];
          g.Name = name;
        }
        else if (words[0] == "Point")
        {
          try
          {
            GradientPoint point = new GradientPoint()
            {
              Point = Convert.ToDouble(words[1]),
              color = new Color()
              {
                R = Convert.ToByte(words[2]),
                G = Convert.ToByte(words[3]),
                B = Convert.ToByte(words[4]),
                A = 255
              }
            };
            g.Points.Add(point);
          }
          catch (Exception) { }
        }
      }
    }

    public string SaveToString()
    {
      StringBuilder save = new StringBuilder();
      foreach (GradientDef g in GradientDefs)
      {
        save.AppendLine("Gradient");
        save.AppendLine("Gradient " + g.Name);
        foreach (GradientPoint p in g.Points)
          save.AppendLine("Point " + p.Point + " " + p.color.R + " " + p.color.G + " " + p.color.B);
        save.AppendLine();
      }
      return save.ToString();
    }

    private void Button_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      string name = "Gradient " + GradientDefs.Count;
      GradientDef def = new GradientDef() { Name = name };
      GradientDefs.Add(def);
      xDefList.SelectedIndex = GradientDefs.Count-1;
      def.PropertyChanged += new PropertyChangedEventHandler(def_PropertyChanged);
    }

    void def_PropertyChanged(object sender, PropertyChangedEventArgs e)
    {
      DrawImage();
    }

    private void xDefList_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
    {
      CurrentDef = xDefList.SelectedItem as GradientDef;
      xEditor.DataContext = CurrentDef;
      xPoints.DataContext = CurrentDef.Points;
      CurrentDef.RaisePropertyChanged("Points");
    }

    private void xName_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
    {
      if (CurrentDef != null)
      {
        CurrentDef.Name = xName.Text;
        CurrentDef.RaisePropertyChanged("Name");
//        xDefList.ItemsSource = GradientDefs;
      }
    }

    private void xAdd_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      if (CurrentDef == null) return;
      CurrentDef.AddPoint();
    }

    byte[] pixelData = null;

    private void InitBitmap()
    {
      System.Windows.Media.PixelFormat pf = System.Windows.Media.PixelFormats.Rgb24;
      int width, height, rawStride;

      width = (int)xImage.Width;
      height = (int)xImage.Height;
      rawStride = width * 3;// (width * pf.BitsPerPixel + 7) / 8;
      pixelData = new byte[rawStride * height];
    }

    private void DrawImage()
    {
      if (CurrentDef == null) return;
      if (CurrentDef.Points.Count == 1) return;
      if (pixelData == null) InitBitmap();

      BitmapSource bitmap;
      System.Windows.Media.PixelFormat pf = System.Windows.Media.PixelFormats.Rgb24;
      int width, height, rawStride;

      width = (int)xImage.Width;
      height = (int)xImage.Height;
      rawStride = width * 3; // (width * pf.BitsPerPixel + 7) / 8;

      Color c = new Color();
      double x = CurrentDef.LowPoint();
      double range = CurrentDef.HighPoint() - x;
      double step = range / height;

      for (int j = 0; j < height; ++j)
      {
        int yIndex = j * rawStride;
        CurrentDef.GetColor(x, ref c);

        for (int i = 0; i < rawStride; i += 3)
        {
          pixelData[i + yIndex] = c.R;
          pixelData[i + yIndex + 1] = c.G;
          pixelData[i + yIndex + 2] = c.B;
        }
        x += step;
      }
      bitmap = BitmapSource.Create(width, height, 96, 96, pf, null, pixelData, rawStride);
      xImage.Source = bitmap;
    }

    public GradientDef GetGradient(string name)
    {
      foreach (GradientDef g in GradientDefs)
      {
        if (g.Name == name) return g;
      }
      return null;
    }
	}
}
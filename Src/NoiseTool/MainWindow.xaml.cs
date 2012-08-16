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
using System.Windows.Shapes;
using System.ComponentModel;
using System.IO;

namespace NoiseTool
{
  public class Boundary : INotifyPropertyChanged
  {
    public static Boundary Object = new Boundary();
    int _X;
    int _Y;
    int _W;
    int _H;

    public int X { get { return _X; } set { _X = value; RaisePropertyChanged("_X"); } }
    public int Y { get { return _Y; } set { _Y = value; RaisePropertyChanged("_Y"); } }
    public int W { get { return _W; } set { _W = value; RaisePropertyChanged("_W"); } }
    public int H { get { return _H; } set { _H = value; RaisePropertyChanged("_H"); } }

    public string SaveToString()
    {
      return "" + X + " " + Y + " " + W + " " + H;
    }

    public Boundary() { _X = 0; _Y = 0; _H = 1; _W = 1; }

    public event PropertyChangedEventHandler PropertyChanged;
    private void RaisePropertyChanged(string propertyName) { if (PropertyChanged != null) PropertyChanged(this, new PropertyChangedEventArgs(propertyName)); }
  }

  public class LinkLine
  {
    protected Canvas mCanvas;
    protected Link mStart;
    protected Link mEnd;
    protected LinkType mEndType;
    protected Line mLine;

    public LinkType EndType { get { return mEndType; } }
    public NoiseObject Source { get { return mStart == null ? null : mStart.Object; } }
    public NoiseObject Target { get { return mEnd == null ? null : mEnd.Object; } }
    public Link SourceLink { get { return mStart; } }
    public Link TargetLink { get { return mEnd; } }

    public LinkLine(Canvas c, LinkType type, Link s)
    {
      Point p;
      mCanvas = c;
      if (type != LinkType.Out)
      {
        mStart = null;
        mEnd = s;
        mEndType = type;
        try { p = mEnd.TransformToAncestor(mCanvas).Transform(new Point(0, 0)); } catch (Exception) { p = new Point(0, 0); }
      } 
      else
      {
        mStart = s;
        mEnd = null;
        try { p = mStart.TransformToAncestor(mCanvas).Transform(new Point(0, 0)); } catch (Exception) { p = new Point(0, 0); }
      }

      mLine = new Line()
      {
        Stroke = new SolidColorBrush(Colors.Green),
        StrokeThickness = 2,
        X1 = p.X+14,
        Y1 = p.Y +8,
        X2 = p.X+14,
        Y2 = p.Y+8
      };
      mCanvas.Children.Add(mLine);
      Canvas.SetZIndex(mLine, 0);
    }

    public void Erase()
    {
      mCanvas.Children.Remove(mLine);
      if (mStart != null) mStart.Connection = null;
      if (mEnd != null) { mEnd.Connection = null; mEnd.Object.Detatch(mEndType); }
    }
                    
    public void Update(Point p)
    {
      if (mEnd == null)
      {
        mLine.X2 = p.X-2;
        mLine.Y2 = p.Y-2;
      }
      else if (mStart == null)
      {
        mLine.X1 = p.X - 2;
        mLine.Y1 = p.Y - 2;
      }
    }

    public void Update()
    {
      Point p;
      try { p = mStart.TransformToAncestor(mCanvas).Transform(new Point(0, 0)); } catch (Exception) { p = new Point(0, 0); }
      mLine.X1 = p.X + 16;
      mLine.Y1 = p.Y+8;
      if (mEnd != null)
      {
        try { p = mEnd.TransformToAncestor(mCanvas).Transform(new Point(0, 0)); }  catch (Exception) { p = new Point(0, 0); }
        mLine.X2 = p.X;
        mLine.Y2 = p.Y+8;
      }
    }

    public void EndLink(LinkType type, Link e)
    {
      if (mEnd == null) { mEndType = type; mEnd = e; }
      else mStart = e;
      mStart.Connection = mEnd.Object;
      mEnd.Connection = mStart.Object;
      Update();

      mEnd.Object.Attach(mEndType, mStart.Object.Module);
      mEnd.Object.Apply();
    }
  }

  public class LoadEventArgs : EventArgs
  {
    public string lines;

    public LoadEventArgs(string s)
      : base()
    {
      lines = s;
    }
  }

	/// <summary>
	/// Interaction logic for MainWindow.xaml
	/// </summary>
	public partial class MainWindow : Window
	{
    protected Point mCreateAt = new Point(0, 0);
    protected List<LinkLine> mLines = new List<LinkLine>();
    protected LinkLine mCurrentLine = null;
    protected List<NoiseObject> mObjects = new List<NoiseObject>();
    protected NoiseObject mCurrentObj = null;

    public MainWindow()
		{
			this.InitializeComponent();
      xBoundary.DataContext = Boundary.Object;
      Boundary.Object.PropertyChanged += new PropertyChangedEventHandler(Object_PropertyChanged);
      this.Load += new EventHandler<LoadEventArgs>(MainWindow_Load);
		}

    void Object_PropertyChanged(object sender, PropertyChangedEventArgs e)
    {
      foreach (NoiseObject obj in mObjects)
        obj.Apply();
    }

		private void MenuItem_Click(object sender, System.Windows.RoutedEventArgs e)
		{
      xLogo.Visibility = Visibility.Collapsed;

      mCreateAt.Y += 50;
      if (mCreateAt.Y > Height - 100) 
      {
        mCreateAt.Y = 50;
        mCreateAt.X += 50;
      }

      MenuItem item = e.Source as MenuItem;
      int type = 0;
      if (item.Header       as string == "New Generator") type = 0;
      else if (item.Header  as string == "New In Modifier") type = 2;
      else if (item.Header  as string == "New Out Modifier") type = 1;
      else if (item.Header  as string == "New Combiner") type = 3;

      NoiseObject obj = new NoiseObject(type);
      obj.Width = 200;
      obj.Height = 200;
      xBoard.Children.Add(obj);
      Canvas.SetLeft(obj, mCreateAt.X);
      Canvas.SetTop(obj, mCreateAt.Y);
      Canvas.SetZIndex(obj, 1);
      mObjects.Add(obj);
      Canvas.SetZIndex(obj, 2);

      GradientDef def = xGradientPicker.SelectedItem as GradientDef;
      obj.SetGradient(def);

      obj.xGradient.ItemsSource = xGradient.GradientDefs;
      obj.xGradient.SelectedItem = def;
      obj.mLocalGradient = false;

      obj.Raise += new EventHandler<EventArgs>(obj_Raise);
      obj.Link += new EventHandler<LinkEventArgs>(obj_Link);
      obj.Erase += new EventHandler<LinkEventArgs>(obj_Erase);
      obj.NeedUpdate += new EventHandler<EventArgs>(obj_Move);
      obj.NeedApply += new EventHandler<EventArgs>(obj_NeedApply);
      obj.Relink += new EventHandler<EventArgs>(obj_Relink);
      obj.Close += new EventHandler<EventArgs>(obj_Close);
      obj.Rendered += new EventHandler<EventArgs>(obj_Rendered);
    }

    void obj_Rendered(object sender, EventArgs e)
    {
      NoiseObject obj = sender as NoiseObject;
      if (obj == mCurrentObj) xRange.Text = mCurrentObj.Range;
    }

    void obj_Close(object sender, EventArgs e)
    {
      NoiseObject obj = sender as NoiseObject;
      for (int i = mLines.Count - 1; i >= 0; --i )
      {
        LinkLine l = mLines[i];
        if (l.Source == obj || l.Target == obj)
        {
          l.Erase();
          mLines.RemoveAt(i);
        }
      }
      xBoard.Children.Remove(obj);
      mObjects.Remove(obj);
    }

    void obj_Relink(object sender, EventArgs e)
    {
      NoiseObject obj = sender as NoiseObject;
      foreach (LinkLine l in mLines)
      {
        if (l.Source == obj)
        {
          l.Target.Attach(l.EndType, l.Source.Module);
        }
      }
    }

    void obj_NeedApply(object sender, EventArgs e)
    {
      NoiseObject obj = sender as NoiseObject;
      xRange.Text = obj.Apply();
      Cascade(obj);
    }

    void Cascade(NoiseObject obj)
    {
      foreach (LinkLine l in mLines)
      {
        if (l.Source == obj)
        {
          l.Target.Apply();
          Cascade(l.Target);
        }
      }
    }

    void obj_Erase(object sender, LinkEventArgs e)
    {
      obj_Erase(e.id);
    }

    void obj_Erase(Link id)
    {
      foreach (LinkLine line in mLines)
      {
        if (line.SourceLink == id || line.TargetLink == id)
        {
          line.Erase();
          mLines.Remove(line);
          break;
        }
      }
    }

    void obj_Move(object sender, EventArgs e)
    {
      foreach (LinkLine l in mLines)
        l.Update();
    }

    void obj_Link(object sender, LinkEventArgs e)
    {
      NoiseObject obj = sender as NoiseObject;

      // set line begin - line end is mouse
      if (mCurrentLine == null)
      {
        if (e.type != LinkType.Out && e.id.Connection != null) obj_Erase(sender, e);
        mCurrentLine = new LinkLine(xBoard, e.type, e.id);
      }
      // set line end
      else
      {
        if (mCurrentLine.Source != null && sender == mCurrentLine.Source) { mCurrentLine.Erase(); mCurrentLine = null; }
        else if (mCurrentLine.Target != null && sender == mCurrentLine.Target) { mCurrentLine.Erase(); mCurrentLine = null; }
        else if (mCurrentLine.TargetLink == null && e.type == LinkType.Out) { mCurrentLine.Erase(); mCurrentLine = null; }
        else if (mCurrentLine.SourceLink == null && e.type != LinkType.Out) { mCurrentLine.Erase(); mCurrentLine = null; }
        else if (obj.Module == null) { mCurrentLine.Erase(); mCurrentLine = null; }
        else
        {
          if (e.id.Connection != null) obj_Erase(sender, e); 
          mCurrentLine.EndLink(e.type, e.id);
          mLines.Add(mCurrentLine);
          mCurrentLine = null;
        }
      }
    }

    void obj_Raise(object sender, EventArgs e)
    {
      NoiseObject el = sender as NoiseObject;

      foreach (NoiseObject child in mObjects)
      {
        Canvas.SetZIndex(child, 1);
        child.Select(false);
      }
      Canvas.SetZIndex(el, 2);
      el.Select(true);

      xParameters.DataContext = el.Parameters;
      mCurrentObj = el;
      xRange.Text = el.Range;
    }

    private void Window_MouseMove(object sender, System.Windows.Input.MouseEventArgs e)
    {
      if (mCurrentLine != null)
      {
        Point p = e.MouseDevice.GetPosition(xBoard);
        mCurrentLine.Update(p);
      }
    }

    private void Window_MouseLeftButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e)
    {
      if (mCurrentLine != null)
      {
        mCurrentLine.Erase();
        mLines.Remove(mCurrentLine);
        mCurrentLine = null;
        e.Handled = true;
      }
    }

    private void xApply_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      if (mCurrentObj != null) { xRange.Text = mCurrentObj.Apply(); Cascade(mCurrentObj); }
    }

    private void Window_Loaded(object sender, System.Windows.RoutedEventArgs e)
    {
      xGradientPicker.ItemsSource = xGradient.GradientDefs;
      xGradientPicker.SelectedItem = xGradient.GradientDefs[0];
    }

    private void xGradientPicker_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
    {
      GradientDef def = xGradientPicker.SelectedItem as GradientDef;
      foreach (NoiseObject obj in mObjects)
        obj.SetGradient(def);
    }

    private void xEdit_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      foreach (GradientDef g in xGradient.GradientDefs)
        g.Dirty = false;
    }

    private void xDone_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      foreach (NoiseObject obj in mObjects)
      {
        if (obj.mGradient.Dirty)
        {
          obj.Redraw();
        }
      }
    }

    private void Window_Closed(object sender, System.EventArgs e)
    {
      foreach (NoiseObject obj in mObjects) obj.UserControl_Unloaded(null, null);
    }

    private void xSave_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      Microsoft.Win32.SaveFileDialog svfd = new Microsoft.Win32.SaveFileDialog();
      svfd.InitialDirectory = "C:\\";
      svfd.Filter = "NoiseTool files (*.nzt)|*.nzt|C# sourcecode (*.cs)|*.cs|C++ sourcecode (*.cpp)|*.cpp";
      svfd.RestoreDirectory = true;
      bool? result = svfd.ShowDialog();
      if (result.HasValue && result.Value == true)
      {
        StringBuilder save = new StringBuilder();
        save.Append(xGradient.SaveToString());

        GradientDef def = xGradientPicker.SelectedItem as GradientDef;
        save.AppendLine("App " + Boundary.Object.SaveToString() + " " + def.Name);
        save.AppendLine();

        foreach (NoiseObject obj in mObjects)
        {
          save.AppendLine("Object " + obj.mType);
          save.Append(obj.SaveToString());
        }

        using (StreamWriter outfile = new StreamWriter(svfd.FileName))
        {
          outfile.Write(save.ToString());
          outfile.Close();
        }
      }
    }

    char[] seperator = new char[] { ' ' };
    char[] seperator2 = new char[] { '\n' };

    NoiseObject GetObjectByName(string name)
    {
      foreach (NoiseObject o in mObjects) if (o.mName == name) return o;
      return null;
    }

    public virtual void OnLoad(string l) { if (Load != null) Load(this, new LoadEventArgs(l)); }
    public event EventHandler<LoadEventArgs> Load;

    void MainWindow_Load(object sender, LoadEventArgs e)
    {
      foreach (NoiseObject o in mObjects) { obj_Raise(o, null); obj_Relink(o, null);  }
      foreach (NoiseObject o in mObjects) o.Apply();
    }

    private void xLoad_Click(object sender, System.Windows.RoutedEventArgs e)
    {
      Microsoft.Win32.OpenFileDialog svfd = new Microsoft.Win32.OpenFileDialog();
      svfd.InitialDirectory = "C:\\";
      svfd.Filter = "NoiseTool files (*.nzt)|*.nzt";
      svfd.RestoreDirectory = true;
      bool? result = svfd.ShowDialog();
      if (result.HasValue && result.Value == true)
      {
        while(mObjects.Count > 0) obj_Close(mObjects[0], null);
        xGradient.GradientDefs.Clear();

        try
        {
          using (StreamReader sr = new StreamReader(svfd.FileName))
          {
            String links = "";
            String line;
            while ((line = sr.ReadLine()) != null)
            {
              string[] words = line.Split(seperator);
              if (words[0] == "App") 
              {
                try { 
                  Boundary.Object.X = Convert.ToInt32(words[1]); 
                  Boundary.Object.Y = Convert.ToInt32(words[2]); 
                  Boundary.Object.W = Convert.ToInt32(words[3]);
                  Boundary.Object.H = Convert.ToInt32(words[4]);
                }
                catch (Exception) { }
                xBoundary.DataContext = null;
                xBoundary.DataContext = Boundary.Object;

                string name = "";
                for (int i = 5; i < words.Length; ++i) name += (i == 5 ? "" : " ") + words[i];
                xGradientPicker.SelectedItem = xGradient.GetGradient(name);
              }

              else if (words[0] == "Gradient") 
                xGradient.Load(sr);

              else if (words[0] == "Object")
              {
                int type = 0;
                try { type = Convert.ToInt32(words[1]); } catch (Exception) { type = 0; }

                NoiseObject obj = new NoiseObject(type);
                obj.Width = 200;
                obj.Height = 200;
                xBoard.Children.Add(obj);
                Canvas.SetLeft(obj, mCreateAt.X);
                Canvas.SetTop(obj, mCreateAt.Y);
                Canvas.SetZIndex(obj, 1);
                mObjects.Add(obj);
                Canvas.SetZIndex(obj, 2);
                  
                obj.xGradient.ItemsSource = xGradient.GradientDefs;
          
                obj.Raise += new EventHandler<EventArgs>(obj_Raise);
                obj.Link += new EventHandler<LinkEventArgs>(obj_Link);
                obj.Erase += new EventHandler<LinkEventArgs>(obj_Erase);
                obj.NeedUpdate += new EventHandler<EventArgs>(obj_Move);
                obj.NeedApply += new EventHandler<EventArgs>(obj_NeedApply);
                obj.Relink += new EventHandler<EventArgs>(obj_Relink);
                obj.Close += new EventHandler<EventArgs>(obj_Close);
                obj.Rendered += new EventHandler<EventArgs>(obj_Rendered);

                links += obj.Load(sr);
              }
            }
            sr.Close();

            string[] objlinks = links.Split(seperator2);
            foreach (string link in objlinks)
            {
              if (link.Length == 0) continue;
              string[] ids = link.Split(seperator);
              if (ids.Length != 6) continue;
              NoiseObject target = GetObjectByName(ids[0]);
              NoiseObject in1 = GetObjectByName(ids[2]);
              if (in1 != null)
              {
                obj_Link(in1, new LinkEventArgs(LinkType.Out, in1.xLinks.xOut));
                obj_Link(target, new LinkEventArgs(LinkType.In1, target.xLinks.xIn1));
              }
              NoiseObject in2 = GetObjectByName(ids[3]);
              if (in2 != null)
              {
                obj_Link(in2, new LinkEventArgs(LinkType.Out, in2.xLinks.xOut));
                obj_Link(target, new LinkEventArgs(LinkType.In2, target.xLinks.xIn2));
              }
              NoiseObject in3 = GetObjectByName(ids[4]);
              if (in3 != null)
              {
                obj_Link(in3, new LinkEventArgs(LinkType.Out, in3.xLinks.xOut));
                obj_Link(target, new LinkEventArgs(LinkType.In3, target.xLinks.xIn3));
              }
              NoiseObject in4 = GetObjectByName(ids[5]);
              if (in4 != null)
              {
                obj_Link(in4, new LinkEventArgs(LinkType.Out, in4.xLinks.xOut));
                obj_Link(target, new LinkEventArgs(LinkType.In4, target.xLinks.xIn4));
              }
            }
            OnLoad("");
          }
        }
        catch (Exception )
        {
        }
      }
    }

    private void textBlock_MouseLeftButtonUp(object sender, System.Windows.Input.MouseButtonEventArgs e)
    {
      if (mCurrentObj != null) mCurrentObj.AddPoint();
    }
	}
}
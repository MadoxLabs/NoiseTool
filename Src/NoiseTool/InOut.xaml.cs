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

namespace NoiseTool
{
  public enum LinkType { Out, In1, In2, In3, In4 };

  public class LinkEventArgs : EventArgs
  {
    public LinkType type;
    public Link id;

    public LinkEventArgs(LinkType t, Link i)
      : base()
    {
      type = t;
      id = i;
    }
  }
  
  /// <summary>
	/// Interaction logic for InOut.xaml
	/// </summary>
	public partial class InOut : UserControl
	{
		public InOut()
		{
			this.InitializeComponent();

      xIn1.Click += new EventHandler<EventArgs>(xIn1_Click);
      xIn2.Click += new EventHandler<EventArgs>(xIn2_Click);
      xIn3.Click += new EventHandler<EventArgs>(xIn3_Click);
      xIn4.Click += new EventHandler<EventArgs>(xIn4_Click);
      xOut.Click += new EventHandler<EventArgs>(xOut_Click);
      xIn1.Erase += new EventHandler<EventArgs>(xIn1_Erase);
      xIn2.Erase += new EventHandler<EventArgs>(xIn2_Erase);
      xIn3.Erase += new EventHandler<EventArgs>(xIn3_Erase);
      xIn4.Erase += new EventHandler<EventArgs>(xIn4_Erase);
      xOut.Erase += new EventHandler<EventArgs>(xOut_Erase);
      SetLinks(0);
    }

    public void Init(NoiseObject obj)
    {
      xIn1.Object = obj;
      xIn2.Object = obj;
      xIn3.Object = obj;
      xIn4.Object = obj;
      xOut.Object = obj;
    }

    public void SetLinks(int num)
    {
      xIn3.Visibility = Visibility.Visible;
      xIn2.Visibility = Visibility.Visible;
      xIn1.Visibility = Visibility.Visible;
      xIn4.Visibility = Visibility.Visible;
      if (num < 4) xIn4.Visibility = Visibility.Collapsed;
      if (num < 3) xIn3.Visibility = Visibility.Collapsed;
      if (num < 2) xIn2.Visibility = Visibility.Collapsed;
      if (num < 1) xIn1.Visibility = Visibility.Collapsed;
    }

    public string SaveToString()
    {
      string ret = "";
      if (xIn1.Connection == null) ret += "none";
      else ret += xIn1.Connection.mName;
      ret += " ";
      if (xIn2.Connection == null) ret += "none";
      else ret += xIn2.Connection.mName;
      ret += " ";
      if (xIn3.Connection == null) ret += "none";
      else ret += xIn3.Connection.mName;
      ret += " ";
      if (xIn4.Connection == null) ret += "none";
      else ret += xIn4.Connection.mName;
      return ret;
    }

    void xOut_Click(object sender, EventArgs e)
    {
      OnLink(LinkType.Out, xOut);
    }

    void xIn2_Click(object sender, EventArgs e)
    {
      OnLink(LinkType.In2, xIn2);
    }

    void xIn3_Click(object sender, EventArgs e)
    {
      OnLink(LinkType.In3, xIn3);
    }

    void xIn1_Click(object sender, EventArgs e)
    {
      OnLink(LinkType.In1, xIn1);
    }

    void xOut_Erase(object sender, EventArgs e)
    {
      OnErase(LinkType.Out, xOut);
    }

    void xIn4_Click(object sender, EventArgs e)
    {
      OnLink(LinkType.In4, xIn4);
    }

    void xIn4_Erase(object sender, EventArgs e)
    {
      OnErase(LinkType.In4, xIn4);
    }

    void xIn2_Erase(object sender, EventArgs e)
    {
      OnErase(LinkType.In2, xIn2);
    }

    void xIn3_Erase(object sender, EventArgs e)
    {
      OnErase(LinkType.In3, xIn3);
    }

    void xIn1_Erase(object sender, EventArgs e)
    {
      OnErase(LinkType.In1, xIn1);
    }

    public virtual void OnLink(LinkType t, Link l) { if (Link != null) Link(this, new LinkEventArgs(t, l)); }
    public event EventHandler<LinkEventArgs> Link;
    public virtual void OnErase(LinkType t, Link l) { if (Erase != null) Erase(this, new LinkEventArgs(t, l)); }
    public event EventHandler<LinkEventArgs> Erase;
  }
}
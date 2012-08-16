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
	/// <summary>
	/// Interaction logic for Link.xaml
	/// </summary>
	public partial class Link : UserControl
	{
		public Link()
		{
			this.InitializeComponent();
		}

    public NoiseObject Object = null;
    public NoiseObject Connection = null;

    protected bool mDown = false;
    protected bool mRDown = false;

    public virtual void OnClick() { if (Click != null) Click(this, new EventArgs()); }
    public event EventHandler<EventArgs> Click;
    public virtual void OnErase() { if (Erase != null) Erase(this, new EventArgs()); }
    public event EventHandler<EventArgs> Erase;
    
    private void UserControl_MouseLeftButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e)
		{
      mDown = true;
      e.Handled = true;
		}

		private void UserControl_MouseLeftButtonUp(object sender, System.Windows.Input.MouseButtonEventArgs e)
		{
      if (mDown) OnClick();
      mDown = false;
      e.Handled = true;
    }

		private void UserControl_MouseLeave(object sender, System.Windows.Input.MouseEventArgs e)
		{
			mDown = false;
      e.Handled = true;
    }

		private void UserControl_MouseRightButtonDown(object sender, System.Windows.Input.MouseButtonEventArgs e)
		{
      mRDown = true;
      e.Handled = true;
    }

		private void UserControl_MouseRightButtonUp(object sender, System.Windows.Input.MouseButtonEventArgs e)
		{
      if (mRDown) OnErase();
      mRDown = false;
      e.Handled = true;
    }
	}
}
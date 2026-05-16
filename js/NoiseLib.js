LibNoise = {};
LibNoise.NMath = {};
LibNoise.NMath.PI = 3.1415926535897932385;
LibNoise.NMath.Sqrt2 = 1.4142135623730950488;
LibNoise.NMath.Sqrt3 = 1.7320508075688772935;
LibNoise.NMath.DEG_TO_RAD = LibNoise.NMath.PI / 180.0;
LibNoise.NMath.RAD_TO_DEG = 1.0 / LibNoise.NMath.DEG_TO_RAD;

LibNoise.NMath.XNoiseGen = 1619;
LibNoise.NMath.YNoiseGen = 31337;
LibNoise.NMath.ZNoiseGen = 6971;
LibNoise.NMath.SeedNoiseGen = 1013;
LibNoise.NMath.ShiftNoiseGen = 8;

LibNoise.NMath.RandomVectors = 
      [
        -0.763874, -0.596439, -0.246489, 0.0,
        0.396055, 0.904518, -0.158073, 0.0,
        -0.499004, -0.8665, -0.0131631, 0.0,
        0.468724, -0.824756, 0.316346, 0.0,
        0.829598, 0.43195, 0.353816, 0.0,
        -0.454473, 0.629497, -0.630228, 0.0,
        -0.162349, -0.869962, -0.465628, 0.0,
        0.932805, 0.253451, 0.256198, 0.0,
        -0.345419, 0.927299, -0.144227, 0.0,
        -0.715026, -0.293698, -0.634413, 0.0,
        -0.245997, 0.717467, -0.651711, 0.0,
        -0.967409, -0.250435, -0.037451, 0.0,
        0.901729, 0.397108, -0.170852, 0.0,
        0.892657, -0.0720622, -0.444938, 0.0,
        0.0260084, -0.0361701, 0.999007, 0.0,
        0.949107, -0.19486, 0.247439, 0.0,
        0.471803, -0.807064, -0.355036, 0.0,
        0.879737, 0.141845, 0.453809, 0.0,
        0.570747, 0.696415, 0.435033, 0.0,
        -0.141751, -0.988233, -0.0574584, 0.0,
        -0.58219, -0.0303005, 0.812488, 0.0,
        -0.60922, 0.239482, -0.755975, 0.0,
        0.299394, -0.197066, -0.933557, 0.0,
        -0.851615, -0.220702, -0.47544, 0.0,
        0.848886, 0.341829, -0.403169, 0.0,
        -0.156129, -0.687241, 0.709453, 0.0,
        -0.665651, 0.626724, 0.405124, 0.0,
        0.595914, -0.674582, 0.43569, 0.0,
        0.171025, -0.509292, 0.843428, 0.0,
        0.78605, 0.536414, -0.307222, 0.0,
        0.18905, -0.791613, 0.581042, 0.0,
        -0.294916, 0.844994, 0.446105, 0.0,
        0.342031, -0.58736, -0.7335, 0.0,
        0.57155, 0.7869, 0.232635, 0.0,
        0.885026, -0.408223, 0.223791, 0.0,
        -0.789518, 0.571645, 0.223347, 0.0,
        0.774571, 0.31566, 0.548087, 0.0,
        -0.79695, -0.0433603, -0.602487, 0.0,
        -0.142425, -0.473249, -0.869339, 0.0,
        -0.0698838, 0.170442, 0.982886, 0.0,
        0.687815, -0.484748, 0.540306, 0.0,
        0.543703, -0.534446, -0.647112, 0.0,
        0.97186, 0.184391, -0.146588, 0.0,
        0.707084, 0.485713, -0.513921, 0.0,
        0.942302, 0.331945, 0.043348, 0.0,
        0.499084, 0.599922, 0.625307, 0.0,
        -0.289203, 0.211107, 0.9337, 0.0,
        0.412433, -0.71667, -0.56239, 0.0,
        0.87721, -0.082816, 0.47291, 0.0,
        -0.420685, -0.214278, 0.881538, 0.0,
        0.752558, -0.0391579, 0.657361, 0.0,
        0.0765725, -0.996789, 0.0234082, 0.0,
        -0.544312, -0.309435, -0.779727, 0.0,
        -0.455358, -0.415572, 0.787368, 0.0,
        -0.874586, 0.483746, 0.0330131, 0.0,
        0.245172, -0.0838623, 0.965846, 0.0,
        0.382293, -0.432813, 0.81641, 0.0,
        -0.287735, -0.905514, 0.311853, 0.0,
        -0.667704, 0.704955, -0.239186, 0.0,
        0.717885, -0.464002, -0.518983, 0.0,
        0.976342, -0.214895, 0.0240053, 0.0,
        -0.0733096, -0.921136, 0.382276, 0.0,
        -0.986284, 0.151224, -0.0661379, 0.0,
        -0.899319, -0.429671, 0.0812908, 0.0,
        0.652102, -0.724625, 0.222893, 0.0,
        0.203761, 0.458023, -0.865272, 0.0,
        -0.030396, 0.698724, -0.714745, 0.0,
        -0.460232, 0.839138, 0.289887, 0.0,
        -0.0898602, 0.837894, 0.538386, 0.0,
        -0.731595, 0.0793784, 0.677102, 0.0,
        -0.447236, -0.788397, 0.422386, 0.0,
        0.186481, 0.645855, -0.740335, 0.0,
        -0.259006, 0.935463, 0.240467, 0.0,
        0.445839, 0.819655, -0.359712, 0.0,
        0.349962, 0.755022, -0.554499, 0.0,
        -0.997078, -0.0359577, 0.0673977, 0.0,
        -0.431163, -0.147516, -0.890133, 0.0,
        0.299648, -0.63914, 0.708316, 0.0,
        0.397043, 0.566526, -0.722084, 0.0,
        -0.502489, 0.438308, -0.745246, 0.0,
        0.0687235, 0.354097, 0.93268, 0.0,
        -0.0476651, -0.462597, 0.885286, 0.0,
        -0.221934, 0.900739, -0.373383, 0.0,
        -0.956107, -0.225676, 0.186893, 0.0,
        -0.187627, 0.391487, -0.900852, 0.0,
        -0.224209, -0.315405, 0.92209, 0.0,
        -0.730807, -0.537068, 0.421283, 0.0,
        -0.0353135, -0.816748, 0.575913, 0.0,
        -0.941391, 0.176991, -0.287153, 0.0,
        -0.154174, 0.390458, 0.90762, 0.0,
        -0.283847, 0.533842, 0.796519, 0.0,
        -0.482737, -0.850448, 0.209052, 0.0,
        -0.649175, 0.477748, 0.591886, 0.0,
        0.885373, -0.405387, -0.227543, 0.0,
        -0.147261, 0.181623, -0.972279, 0.0,
        0.0959236, -0.115847, -0.988624, 0.0,
        -0.89724, -0.191348, 0.397928, 0.0,
        0.903553, -0.428461, -0.00350461, 0.0,
        0.849072, -0.295807, -0.437693, 0.0,
        0.65551, 0.741754, -0.141804, 0.0,
        0.61598, -0.178669, 0.767232, 0.0,
        0.0112967, 0.932256, -0.361623, 0.0,
        -0.793031, 0.258012, 0.551845, 0.0,
        0.421933, 0.454311, 0.784585, 0.0,
        -0.319993, 0.0401618, -0.946568, 0.0,
        -0.81571, 0.551307, -0.175151, 0.0,
        -0.377644, 0.00322313, 0.925945, 0.0,
        0.129759, -0.666581, -0.734052, 0.0,
        0.601901, -0.654237, -0.457919, 0.0,
        -0.927463, -0.0343576, -0.372334, 0.0,
        -0.438663, -0.868301, -0.231578, 0.0,
        -0.648845, -0.749138, -0.133387, 0.0,
        0.507393, -0.588294, 0.629653, 0.0,
        0.726958, 0.623665, 0.287358, 0.0,
        0.411159, 0.367614, -0.834151, 0.0,
        0.806333, 0.585117, -0.0864016, 0.0,
        0.263935, -0.880876, 0.392932, 0.0,
        0.421546, -0.201336, 0.884174, 0.0,
        -0.683198, -0.569557, -0.456996, 0.0,
        -0.117116, -0.0406654, -0.992285, 0.0,
        -0.643679, -0.109196, -0.757465, 0.0,
        -0.561559, -0.62989, 0.536554, 0.0,
        0.0628422, 0.104677, -0.992519, 0.0,
        0.480759, -0.2867, -0.828658, 0.0,
        -0.228559, -0.228965, -0.946222, 0.0,
        -0.10194, -0.65706, -0.746914, 0.0,
        0.0689193, -0.678236, 0.731605, 0.0,
        0.401019, -0.754026, 0.52022, 0.0,
        -0.742141, 0.547083, -0.387203, 0.0,
        -0.00210603, -0.796417, -0.604745, 0.0,
        0.296725, -0.409909, -0.862513, 0.0,
        -0.260932, -0.798201, 0.542945, 0.0,
        -0.641628, 0.742379, 0.192838, 0.0,
        -0.186009, -0.101514, 0.97729, 0.0,
        0.106711, -0.962067, 0.251079, 0.0,
        -0.743499, 0.30988, -0.592607, 0.0,
        -0.795853, -0.605066, -0.0226607, 0.0,
        -0.828661, -0.419471, -0.370628, 0.0,
        0.0847218, -0.489815, -0.8677, 0.0,
        -0.381405, 0.788019, -0.483276, 0.0,
        0.282042, -0.953394, 0.107205, 0.0,
        0.530774, 0.847413, 0.0130696, 0.0,
        0.0515397, 0.922524, 0.382484, 0.0,
        -0.631467, -0.709046, 0.313852, 0.0,
        0.688248, 0.517273, 0.508668, 0.0,
        0.646689, -0.333782, -0.685845, 0.0,
        -0.932528, -0.247532, -0.262906, 0.0,
        0.630609, 0.68757, -0.359973, 0.0,
        0.577805, -0.394189, 0.714673, 0.0,
        -0.887833, -0.437301, -0.14325, 0.0,
        0.690982, 0.174003, 0.701617, 0.0,
        -0.866701, 0.0118182, 0.498689, 0.0,
        -0.482876, 0.727143, 0.487949, 0.0,
        -0.577567, 0.682593, -0.447752, 0.0,
        0.373768, 0.0982991, 0.922299, 0.0,
        0.170744, 0.964243, -0.202687, 0.0,
        0.993654, -0.035791, -0.106632, 0.0,
        0.587065, 0.4143, -0.695493, 0.0,
        -0.396509, 0.26509, -0.878924, 0.0,
        -0.0866853, 0.83553, -0.542563, 0.0,
        0.923193, 0.133398, -0.360443, 0.0,
        0.00379108, -0.258618, 0.965972, 0.0,
        0.239144, 0.245154, -0.939526, 0.0,
        0.758731, -0.555871, 0.33961, 0.0,
        0.295355, 0.309513, 0.903862, 0.0,
        0.0531222, -0.91003, -0.411124, 0.0,
        0.270452, 0.0229439, -0.96246, 0.0,
        0.563634, 0.0324352, 0.825387, 0.0,
        0.156326, 0.147392, 0.976646, 0.0,
        -0.0410141, 0.981824, 0.185309, 0.0,
        -0.385562, -0.576343, -0.720535, 0.0,
        0.388281, 0.904441, 0.176702, 0.0,
        0.945561, -0.192859, -0.262146, 0.0,
        0.844504, 0.520193, 0.127325, 0.0,
        0.0330893, 0.999121, -0.0257505, 0.0,
        -0.592616, -0.482475, -0.644999, 0.0,
        0.539471, 0.631024, -0.557476, 0.0,
        0.655851, -0.027319, -0.754396, 0.0,
        0.274465, 0.887659, 0.369772, 0.0,
        -0.123419, 0.975177, -0.183842, 0.0,
        -0.223429, 0.708045, 0.66989, 0.0,
        -0.908654, 0.196302, 0.368528, 0.0,
        -0.95759, -0.00863708, 0.288005, 0.0,
        0.960535, 0.030592, 0.276472, 0.0,
        -0.413146, 0.907537, 0.0754161, 0.0,
        -0.847992, 0.350849, -0.397259, 0.0,
        0.614736, 0.395841, 0.68221, 0.0,
        -0.503504, -0.666128, -0.550234, 0.0,
        -0.268833, -0.738524, -0.618314, 0.0,
        0.792737, -0.60001, -0.107502, 0.0,
        -0.637582, 0.508144, -0.579032, 0.0,
        0.750105, 0.282165, -0.598101, 0.0,
        -0.351199, -0.392294, -0.850155, 0.0,
        0.250126, -0.960993, -0.118025, 0.0,
        -0.732341, 0.680909, -0.0063274, 0.0,
        -0.760674, -0.141009, 0.633634, 0.0,
        0.222823, -0.304012, 0.926243, 0.0,
        0.209178, 0.505671, 0.836984, 0.0,
        0.757914, -0.56629, -0.323857, 0.0,
        -0.782926, -0.339196, 0.52151, 0.0,
        -0.462952, 0.585565, 0.665424, 0.0,
        0.61879, 0.194119, -0.761194, 0.0,
        0.741388, -0.276743, 0.611357, 0.0,
        0.707571, 0.702621, 0.0752872, 0.0,
        0.156562, 0.819977, 0.550569, 0.0,
        -0.793606, 0.440216, 0.42, 0.0,
        0.234547, 0.885309, -0.401517, 0.0,
        0.132598, 0.80115, -0.58359, 0.0,
        -0.377899, -0.639179, 0.669808, 0.0,
        -0.865993, -0.396465, 0.304748, 0.0,
        -0.624815, -0.44283, 0.643046, 0.0,
        -0.485705, 0.825614, -0.287146, 0.0,
        -0.971788, 0.175535, 0.157529, 0.0,
        -0.456027, 0.392629, 0.798675, 0.0,
        -0.0104443, 0.521623, -0.853112, 0.0,
        -0.660575, -0.74519, 0.091282, 0.0,
        -0.0157698, -0.307475, -0.951425, 0.0,
        -0.603467, -0.250192, 0.757121, 0.0,
        0.506876, 0.25006, 0.824952, 0.0,
        0.255404, 0.966794, 0.00884498, 0.0,
        0.466764, -0.874228, -0.133625, 0.0,
        0.475077, -0.0682351, -0.877295, 0.0,
        -0.224967, -0.938972, -0.260233, 0.0,
        -0.377929, -0.814757, -0.439705, 0.0,
        -0.305847, 0.542333, -0.782517, 0.0,
        0.26658, -0.902905, -0.337191, 0.0,
        0.0275773, 0.322158, -0.946284, 0.0,
        0.0185422, 0.716349, 0.697496, 0.0,
        -0.20483, 0.978416, 0.0273371, 0.0,
        -0.898276, 0.373969, 0.230752, 0.0,
        -0.00909378, 0.546594, 0.837349, 0.0,
        0.6602, -0.751089, 0.000959236, 0.0,
        0.855301, -0.303056, 0.420259, 0.0,
        0.797138, 0.0623013, -0.600574, 0.0,
        0.48947, -0.866813, 0.0951509, 0.0,
        0.251142, 0.674531, 0.694216, 0.0,
        -0.578422, -0.737373, -0.348867, 0.0,
        -0.254689, -0.514807, 0.818601, 0.0,
        0.374972, 0.761612, 0.528529, 0.0,
        0.640303, -0.734271, -0.225517, 0.0,
        -0.638076, 0.285527, 0.715075, 0.0,
        0.772956, -0.15984, -0.613995, 0.0,
        0.798217, -0.590628, 0.118356, 0.0,
        -0.986276, -0.0578337, -0.154644, 0.0,
        -0.312988, -0.94549, 0.0899272, 0.0,
        -0.497338, 0.178325, 0.849032, 0.0,
        -0.101136, -0.981014, 0.165477, 0.0,
        -0.521688, 0.0553434, -0.851339, 0.0,
        -0.786182, -0.583814, 0.202678, 0.0,
        -0.565191, 0.821858, -0.0714658, 0.0,
        0.437895, 0.152598, -0.885981, 0.0,
        -0.92394, 0.353436, -0.14635, 0.0,
        0.212189, -0.815162, -0.538969, 0.0,
        -0.859262, 0.143405, -0.491024, 0.0,
        0.991353, 0.112814, 0.0670273, 0.0,
        0.0337884, -0.979891, -0.196654, 0.0
        ];

LibNoise.NMath.ClampValue = function(value, lowerBound, upperBound)
{
  if (value < lowerBound)    return lowerBound;
  else if (value > upperBound)    return upperBound;
  else  return value;
}

LibNoise.NMath.GetSmaller = function(a,  b)
{
  return (a < b ? a : b);
}

LibNoise.NMath.GetLarger = function( a,  b)
{
  return (a > b ? a : b);
}

LibNoise.NMath.LatLonToXYZ = function( lat,  lon)
{
  var ret = {};

  var r = Math.cos(LibNoise.NMath.DEG_TO_RAD * lat);
  ret.x = r * Math.cos(LibNoise.NMath.DEG_TO_RAD * lon);
  ret.y = Math.sin(LibNoise.NMath.DEG_TO_RAD * lat);
  ret.z = r * Math.sin(LibNoise.NMath.DEG_TO_RAD * lon);
  return ret;
}

LibNoise.NMath.CubicInterpolate = function( n0,  n1,  n2,  n3,  a)
{
  var p = (n3 - n2) - (n0 - n1);
  var q = (n0 - n1) - p;
  var r = n2 - n0;
  var s = n1;
  return p * a * a * a + q * a * a + r * a + s;
}

LibNoise.NMath.LinearInterpolate = function(n0, n1, a)
{
  return ((1.0 - a) * n0) + (a * n1);
}

LibNoise.NMath.SCurve3 = function( a)
{
  return (a * a * (3.0 - 2.0 * a));
}

LibNoise.NMath.SCurve5 = function( a)
{
  var a3 = a * a * a;
  var a4 = a3 * a;
  var a5 = a4 * a;
  return (6.0 * a5) - (15.0 * a4) + (10.0 * a3);
}

LibNoise.NMath.GradientCoherentNoise = function( x,  y,  z,  seed,  noiseQuality)
{
  // Create a unit-length cube aligned along an integer boundary.  This cube
  // surrounds the input point.
  var x0 = (x > 0.0 ? x : x - 1) | 0;
  var y0 = (y > 0.0 ? y : y - 1) | 0;
  var z0 = (z > 0.0 ? z : z - 1) | 0;
  var x1 = x0 + 1;
  var y1 = y0 + 1;
  var z1 = z0 + 1;
  
  // Map the difference between the coordinates of the input value and the
  // coordinates of the cube's outer-lower-left vertex onto an S-curve.
  var xs = 0, ys = 0, zs = 0;
  switch (noiseQuality)
  {
    case LibNoise.NoiseQuality.Low:
      xs = (x - x0);
      ys = (y - y0);
      zs = (z - z0);
      break;
    case LibNoise.NoiseQuality.Standard:
      xs = LibNoise.NMath.SCurve3(x - x0);
      ys = LibNoise.NMath.SCurve3(y - y0);
      zs = LibNoise.NMath.SCurve3(z - z0);
      break;
    case LibNoise.NoiseQuality.High:
      xs = LibNoise.NMath.SCurve5(x - x0);
      ys = LibNoise.NMath.SCurve5(y - y0);
      zs = LibNoise.NMath.SCurve5(z - z0);
      break;
  }

  // Now calculate the noise values at each vertex of the cube.  To generate
  // the coherent-noise value at the input point, interpolate these eight
  // noise values using the S-curve value as the interpolant (trilinear
  // interpolation.)
  var n0, n1, ix0, ix1, iy0, iy1;
  n0  = LibNoise.NMath.GradientNoise(x, y, z, x0, y0, z0, seed);
  n1  = LibNoise.NMath.GradientNoise(x, y, z, x1, y0, z0, seed);
  ix0 = LibNoise.NMath.LinearInterpolate(n0, n1, xs);
  n0  = LibNoise.NMath.GradientNoise(x, y, z, x0, y1, z0, seed);
  n1  = LibNoise.NMath.GradientNoise(x, y, z, x1, y1, z0, seed);
  ix1 = LibNoise.NMath.LinearInterpolate(n0, n1, xs);
  iy0 = LibNoise.NMath.LinearInterpolate(ix0, ix1, ys);
  
  n0  = LibNoise.NMath.GradientNoise(x, y, z, x0, y0, z1, seed);
  n1  = LibNoise.NMath.GradientNoise(x, y, z, x1, y0, z1, seed);
  ix0 = LibNoise.NMath.LinearInterpolate(n0, n1, xs);
  n0  = LibNoise.NMath.GradientNoise(x, y, z, x0, y1, z1, seed);
  n1  = LibNoise.NMath.GradientNoise(x, y, z, x1, y1, z1, seed);
  ix1 = LibNoise.NMath.LinearInterpolate(n0, n1, xs);
  iy1 = LibNoise.NMath.LinearInterpolate(ix0, ix1, ys);
  
  return LibNoise.NMath.LinearInterpolate(iy0, iy1, zs);
}

LibNoise.NMath.GradientNoise = function(fx, fy, fz, ix, iy, iz, seed)
{
  // Randomly generate a gradient vector given the integer coordinates of the
  // input value.  This implementation generates a random number and uses it
  // as an index into a normalized-vector lookup table.
  var vectorIndex = (
                        LibNoise.NMath.XNoiseGen * ix
                      + LibNoise.NMath.YNoiseGen * iy
                      + LibNoise.NMath.ZNoiseGen * iz
                      + LibNoise.NMath.SeedNoiseGen * seed)
  & 0xffffffff;
  vectorIndex ^= (vectorIndex >> LibNoise.NMath.ShiftNoiseGen);
  vectorIndex &= 0xff;

  var xvGradient = LibNoise.NMath.RandomVectors[(vectorIndex << 2)];
  var yvGradient = LibNoise.NMath.RandomVectors[(vectorIndex << 2) + 1];
  var zvGradient = LibNoise.NMath.RandomVectors[(vectorIndex << 2) + 2];

  // Set up us another vector equal to the distance between the two vectors
  // passed to this function.
  var xvPoint = (fx - ix);
  var yvPoint = (fy - iy);
  var zvPoint = (fz - iz);

  // Now compute the dot product of the gradient vector with the distance
  // vector.  The resulting value is gradient noise.  Apply a scaling value
  // so that this noise value ranges from -1.0 to 1.0.
  return ((xvGradient * xvPoint)  + (yvGradient * yvPoint)  + (zvGradient * zvPoint)) * 2.12;
}

LibNoise.NMath.IntValueNoise = function( x,  y,  z,  seed)
{
  // All constants are primes and must remain prime in order for this noise
  // function to work correctly.
  var n = (
             LibNoise.NMath.XNoiseGen * x
           + LibNoise.NMath.YNoiseGen * y
           + LibNoise.NMath.ZNoiseGen * z
           + LibNoise.NMath.SeedNoiseGen * seed)
           & 0x7fffffff;
  n = (n >> 13) ^ n;
  return (n * (n * n * 60493 + 19990303) + 1376312589) & 0x7fffffff;
}

LibNoise.NMath.ValueCoherentNoise = function( x,  y,  z,  seed,  noiseQuality)
{
  // Create a unit-length cube aligned along an integer boundary.  This cube
  // surrounds the input point.
  var x0 = (x > 0.0 ? x : x - 1)|0;
  var x1 = x0 + 1;
  var y0 = (y > 0.0 ? y : y - 1)|0;
  var y1 = y0 + 1;
  var z0 = (z > 0.0 ? z : z - 1)|0;
  var z1 = z0 + 1;

  // Map the difference between the coordinates of the input value and the
  // coordinates of the cube's outer-lower-left vertex onto an S-curve.
  var xs = 0, ys = 0, zs = 0;
  switch (noiseQuality)
  {
    case LibNoise.NoiseQuality.Low:
      xs = (x - x0);
      ys = (y - y0);
      zs = (z - z0);
      break;
    case LibNoise.NoiseQuality.Standard:
      xs = SCurve3(x - x0);
      ys = SCurve3(y - y0);
      zs = SCurve3(z - z0);
      break;
    case LibNoise.NoiseQuality.High:
      xs = SCurve5(x - x0);
      ys = SCurve5(y - y0);
      zs = SCurve5(z - z0);
      break;
  }

  // Now calculate the noise values at each vertex of the cube.  To generate
  // the coherent-noise value at the input point, interpolate these eight
  // noise values using the S-curve value as the interpolant (trilinear
  // interpolation.)
  var n0, n1, ix0, ix1, iy0, iy1;
  n0  = LibNoise.NMath.ValueNoise(x0, y0, z0, seed);
  n1  = LibNoise.NMath.ValueNoise(x1, y0, z0, seed);
  ix0 = LibNoise.NMath.LinearInterpolate(n0, n1, xs);
  n0  = LibNoise.NMath.ValueNoise(x0, y1, z0, seed);
  n1  = LibNoise.NMath.ValueNoise(x1, y1, z0, seed);
  ix1 = LibNoise.NMath.LinearInterpolate(n0, n1, xs);
  iy0 = LibNoise.NMath.LinearInterpolate(ix0, ix1, ys);

  n0  = LibNoise.NMath.ValueNoise(x0, y0, z1, seed);
  n1  = LibNoise.NMath.ValueNoise(x1, y0, z1, seed);
  ix0 = LibNoise.NMath.LinearInterpolate(n0, n1, xs);
  n0  = LibNoise.NMath.ValueNoise(x0, y1, z1, seed);
  n1  = LibNoise.NMath.ValueNoise(x1, y1, z1, seed);
  ix1 = LibNoise.NMath.LinearInterpolate(n0, n1, xs);
  iy1 = LibNoise.NMath.LinearInterpolate(ix0, ix1, ys);
  
  return LibNoise.NMath.LinearInterpolate(iy0, iy1, zs);
}

LibNoise.NMath.ValueNoise = function(x,  y,  z, seed)
{
  if (seed === undefined) seed = 0;
  return 1.0 - LibNoise.NMath.IntValueNoise(x, y, z, seed) / 1073741824.0;
}

// this is someone else's random number code, converted into an object, from globals

function ARC4(key, w, m)
{
  var width = w, mask = m;
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width)
  {
    s[i] = i++;
  }
  for (i = 0; i < width; i++)
  {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function (count)
  {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--)
    {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability discard an initial batch of values.
    // See http://www.rsa.com/rsalabs/node.asp?id=2009
  })(width);
}


function mxRand()
{
  this.pool = [];     // pool: entropy pool starts empty
  this.width = 256;    // width: each RC4 output is 0 <= x < 256
  this.chunks = 6;      // chunks: at least six RC4 outputs for each double
  this.digits = 52;      // digits: there are 52 significant digits in a double

  this.curseed = 0;
  this.startdenom = Math.pow(this.width, this.chunks);
  this.significance = Math.pow(2, this.digits);
  this.overflow = this.significance * 2;
  this.mask = this.width - 1;

  this.mixkey(Math.random(), this.pool);
  this.seed(Math.random(), false);
}

mxRand.prototype.flatten = function(obj, depth)
{
  var result = [], typ = (typeof obj)[0], prop;
  if (depth && typ == 'o')
  {
    for (prop in obj)
    {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) { }
    }
  }
  return (result.length ? result : typ == 's' ? obj : obj + '\0');
}

mxRand.prototype.mixkey = function(seed, key)
{
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length)
  {
    key[this.mask & j] =
      this.mask & ((smear ^= key[this.mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return this.tostring(key);
}

mxRand.prototype.seed = function(seed, use_entropy)
{
  this.curseed = seed;

  var key = [];

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = this.mixkey(this.flatten(use_entropy ? [seed, this.tostring(this.pool)] : 0 in arguments ? seed : this.autoseed(), 3), key);

  // Use the seed to initialize an ARC4 generator.
  this.arc4 = new ARC4(key, this.width, this.mask);

  // Mix the randomness into accumulated entropy.
  this.mixkey(this.tostring(this.arc4.S), this.pool);

  return shortseed;
}

mxRand.prototype.reset = function ()
{
  this.seed(this.curseed);
}

mxRand.prototype.popInt = function (val)
{
  return Math.floor(this.pop() * val);
}

mxRand.prototype.pop = function ()
{
  var n = this.arc4.g(this.chunks),             // Start with a numerator n < 2 ^ 48
      d = this.startdenom,                 //   and denominator d = 2 ^ 48.
      x = 0;                          //   and no 'extra last byte'.
  while (n < this.significance)
  {          // Fill up all significant digits by
    n = (n + x) * this.width;              //   shifting numerator and
    d *= this.width;                       //   denominator and generating a
    x = this.arc4.g(1);                    //   new least-significant-byte.
  }
  while (n >= this.overflow)
  {             // To avoid rounding up, before adding
    n /= 2;                           //   last byte, shift everything
    d /= 2;                           //   right using integer math until
    x >>>= 1;                         //   we have exactly the desired bits.
  }
  return (n + x) / d;                 // Form the number within [0, 1).
}

mxRand.prototype.autoseed = function (seed)
{
  try {
    this.crypto.getRandomValues(seed = new Uint8Array(width));
    return tostring(seed);
  } catch (e) {
    return [];
  }
}

mxRand.prototype.tostring = function (a)
{
  return String.fromCharCode.apply(0, a);
}

LibNoise.NoiseQuality = { Low: 1, Standard: 2, High: 3 };
LibNoise.Axis = { X: 1, Y: 2, Z: 3 };

function getNone(i) { return null; }
function setNone(i, mod) { }

function getOne(i)
{
  if (i == 0) return this.SourceModule;
  return null;
}
function setOne(i, mod)
{
  if (i == 0) this.SourceModule = mod;
}


function getTwo(i)
{
  if (i == 0) return this.SourceModule1;
  if (i == 1) return this.SourceModule2;
  return null;
}
function setTwo(i, mod)
{
  if (i == 0) this.SourceModule1 = mod;
  if (i == 1) this.SourceModule2 = mod;
}
LibNoise.FastBillow = function(seed)
{
  extend(this, new LibNoise.FastMath(seed));
  this.Frequency  = 1.0;
  this.Persistence = 0.5;
  this.Quality = LibNoise.NoiseQuality.Standard;
  this.Lacunarity = 2.0;
  this.MaxOctaves = 30;

  var Octaves = 6;
  this.__defineGetter__("Octaves", function () { return Octaves; });
  this.__defineSetter__("Octaves", function (value) { Octaves = LibNoise.NMath.ClampValue(value, 1, this.MaxOctaves); });
}

LibNoise.FastBillow.prototype.GetValue = function( x,  y,  z)
{
    var value = 0.0;
    var signal = 0.0;
    var curPersistence = 1.0;
    var seed;

    x *= this.Frequency;
    y *= this.Frequency;
    z *= this.Frequency;

    for (var currentOctave = 0; currentOctave < this.Octaves; currentOctave++)
    {

      seed = (this.Seed + currentOctave) & 0xffffffff;
      signal = this.GradientCoherentNoise(x, y, z, seed, this.Quality);
      signal = 2.0 * Math.abs(signal) - 1.0;
      value += signal * curPersistence;

      x *= this.Lacunarity;
      y *= this.Lacunarity;
      z *= this.Lacunarity;
      curPersistence *= this.Persistence;
    }
    value += 0.5;
    return value;
}


LibNoise.FastMath = function(seed) 
{
  if (seed === undefined) seed = 0;
  if (seed < 0) seed = 0;
  this.RandomPermutations = [];
  this.SelectedPermutations = [];
  this.GradientTable = [];
  this.SetSeed(seed);
};

LibNoise.FastMath.prototype.GradientCoherentNoise = function( x,  y,  z,  seed,  noiseQuality)
{
    var x0 = (x > 0.0 ? x : x - 1)|0;
    var y0 = (y > 0.0 ? y : y - 1)|0;
    var z0 = (z > 0.0 ? z : z - 1)|0;
    
    var X = x0 & 255;
    var Y = y0 & 255;
    var Z = z0 & 255;

    var u = 0, v = 0, w = 0;
    switch (noiseQuality)
    {
        case LibNoise.NoiseQuality.Low:
        u = (x - x0);
        v = (y - y0);
        w = (z - z0);
        break;
      case LibNoise.NoiseQuality.Standard:
        u = LibNoise.NMath.SCurve3(x - x0);
        v = LibNoise.NMath.SCurve3(y - y0);
        w = LibNoise.NMath.SCurve3(z - z0);
        break;
      case LibNoise.NoiseQuality.High:
        u = LibNoise.NMath.SCurve5(x - x0);
        v = LibNoise.NMath.SCurve5(y - y0);
        w = LibNoise.NMath.SCurve5(z - z0);
        break;
    }

    var A = this.SelectedPermutations[X] + Y;
    var AA = this.SelectedPermutations[A] + Z;
    var AB = this.SelectedPermutations[A + 1] + Z;
    var B = this.SelectedPermutations[X + 1] + Y;
    var BA = this.SelectedPermutations[B] + Z;
    var BB = this.SelectedPermutations[B + 1] + Z;

    var a = LibNoise.NMath.LinearInterpolate(this.GradientTable[AA], this.GradientTable[BA], u);
    var b = LibNoise.NMath.LinearInterpolate(this.GradientTable[AB], this.GradientTable[BB], u);
    var c = LibNoise.NMath.LinearInterpolate(a, b, v);
    var d = LibNoise.NMath.LinearInterpolate(this.GradientTable[AA + 1], this.GradientTable[BA + 1], u);
    var e = LibNoise.NMath.LinearInterpolate(this.GradientTable[AB + 1], this.GradientTable[BB + 1], u);
    var f = LibNoise.NMath.LinearInterpolate(d, e, v);
    return 　LibNoise.NMath.LinearInterpolate(c, f, w);
}

LibNoise.FastMath.prototype.SetSeed = function(value)
{
    this.Seed = value;

    // Generate new random permutations with this seed.
    var random = new mxRand();
    random.seed(this.Seed, true);

    for (var i = 0; i < 512; i++)        this.RandomPermutations[i] = random.popInt(255);
    for (var i = 0; i < 256; i++)        { this.SelectedPermutations[256 + i] = this.RandomPermutations[i]; this.SelectedPermutations[i] = this.RandomPermutations[i]; }

    // Generate a new gradient table
    var kkf = []
    for (var i = 0; i < 256; i++)        kkf[i] = -1.0 + 2.0 * (i / 255.0);

    for (var i = 0; i < 256; i++)        this.GradientTable[i] = kkf[this.SelectedPermutations[i]];
    for (var i = 256; i < 512; i++)      this.GradientTable[i] = this.GradientTable[i & 255];
}


LibNoise.FastPerlin = function(seed)
{
  extend(this, new LibNoise.FastMath(seed));
  this.Frequency  = 1.0;
  this.Persistence = 0.5;
  this.Quality = LibNoise.NoiseQuality.Standard;
  this.Lacunarity = 2.0;
  this.MaxOctaves = 30;

  var Octaves = 6;
  this.__defineGetter__("Octaves", function () { return Octaves; });
  this.__defineSetter__("Octaves", function (value) { Octaves = LibNoise.NMath.ClampValue(value, 1, this.MaxOctaves); });
}

LibNoise.FastPerlin.prototype.GetValue = function( x,  y,  z)
{
  var value = 0.0;
  var signal = 0.0;
  var curPersistence = 1.0;
  var seed;

  x *= this.Frequency;
  y *= this.Frequency;
  z *= this.Frequency;

  for (var currentOctave = 0; currentOctave < this.Octaves; currentOctave++)
  {
    seed = (this.Seed + currentOctave) & 0xffffffff;
    signal = this.GradientCoherentNoise(x, y, z, seed, this.Quality);
    value += signal * curPersistence;

    x *= this.Lacunarity;
    y *= this.Lacunarity;
    z *= this.Lacunarity;
    curPersistence *= this.Persistence;
  }

  return value;
}

LibNoise.FastRidgedMultifractal = function(seed)
{
  extend(this, new LibNoise.FastMath(seed));
  this.Frequency  = 1.0;
  this.Quality = LibNoise.NoiseQuality.Standard;
  this.MaxOctaves = 30;
  this.SpectralWeights = [];

  var Lacunarity = 2.0;
  this.__defineGetter__("Lacunarity", function () { return Lacunarity; });
  this.__defineSetter__("Lacunarity", function (value) { Lacunarity = value; this.CalculateSpectralWeights(); });

  var Octaves = 6;
  this.__defineGetter__("Octaves", function () { return Octaves; });
  this.__defineSetter__("Octaves", function (value) { Octaves = LibNoise.NMath.ClampValue(value, 1, this.MaxOctaves); });

  this.CalculateSpectralWeights();
}

LibNoise.FastRidgedMultifractal.prototype.GetValue = function (x, y, z)
{
  x *= this.Frequency;
  y *= this.Frequency;
  z *= this.Frequency;

  var signal = 0.0;
  var value = 0.0;
  var weight = 1.0;

  // These parameters should be user-defined; they may be exposed in a
  // future version of libnoise.
  var offset = 1.0;
  var gain = 2.0;

  for (var currentOctave = 0; currentOctave < this.Octaves; currentOctave++)
  {

    var seed = (this.Seed + currentOctave) & 0x7fffffff;
    signal = this.GradientCoherentNoise(x, y, z, seed, this.Quality);

    // Make the ridges.
    signal = Math.abs(signal);
    signal = offset - signal;

    // Square the signal to increase the sharpness of the ridges.
    signal *= signal;

    // The weighting from the previous octave is applied to the signal.
    // Larger values have higher weights, producing sharp points along the
    // ridges.
    signal *= weight;

    // Weight successive contributions by the previous signal.
    weight = signal * gain;
    if (weight > 1.0) weight = 1.0;
    if (weight < 0.0) weight = 0.0;

    // Add the signal to the output value.
    value += (signal * this.SpectralWeights[currentOctave]);

    // Go to the next octave.
    x *= this.Lacunarity;
    y *= this.Lacunarity;
    z *= this.Lacunarity;
  }

  return (value * 1.25) - 1.0;
}

LibNoise.FastRidgedMultifractal.prototype.CalculateSpectralWeights = function()
{
    var h = 1.0;

    var frequency = 1.0;
    for (var i = 0; i < this.MaxOctaves; i++)
    {
        // Compute weight for each frequency.
        this.SpectralWeights[i] = Math.pow(frequency, -h);
        frequency *= this.Lacunarity;
    }
}


LibNoise.FastTurbulence = function(source)
{
  this.SourceModule = source;
  this.Power = 1.0;
  this.XDistort = new LibNoise.FastPerlin();
  this.YDistort = new LibNoise.FastPerlin();
  this.ZDistort = new LibNoise.FastPerlin();

  this.__defineGetter__("Frequency", function () { return this.XDistort.Frequency; });
  this.__defineSetter__("Frequency", function (value) { this.XDistort.Frequency = value; this.YDistort.Frequency = value; this.ZDistort.Frequency = value; });

  this.__defineGetter__("Roughness", function () { return this.XDistort.Octaves; });
  this.__defineSetter__("Roughness", function (value) { this.XDistort.Octaves = value; this.YDistort.Octaves = value; this.ZDistort.Octaves = value; });

  this.__defineGetter__("Seed", function () { return this.XDistort.Seed; });
  this.__defineSetter__("Seed", function (value) { this.XDistort.Seed = value; this.YDistort.Seed = value+1; this.ZDistort.Seed = value+2; });

  this.Roughness = 3;
  this.Seed = 0;
}

LibNoise.FastTurbulence.prototype.GetValue = function (x, y, z)
{
  var x0, y0, z0;
  var x1, y1, z1;
  var x2, y2, z2;
  x0 = x + (12414.0 / 65536.0);
  y0 = y + (65124.0 / 65536.0);
  z0 = z + (31337.0 / 65536.0);
  x1 = x + (26519.0 / 65536.0);
  y1 = y + (18128.0 / 65536.0);
  z1 = z + (60493.0 / 65536.0);
  x2 = x + (53820.0 / 65536.0);
  y2 = y + (11213.0 / 65536.0);
  z2 = z + (44845.0 / 65536.0);
  var xDistort = x + (this.XDistort.GetValue(x0, y0, z0) * Power);
  var yDistort = y + (this.YDistort.GetValue(x1, y1, z1) * Power);
  var zDistort = z + (this.ZDistort.GetValue(x2, y2, z2) * Power);

  return this.SourceModule.GetValue(xDistort, yDistort, zDistort);
}

LibNoise.Billow = function()
{
  this.Seed = 0;
  this.Frequency  = 1.0;
  this.Persistence = 0.5;
  this.Quality = LibNoise.NoiseQuality.Standard;
  this.Lacunarity = 2.0;
  this.MaxOctaves = 30;
  this.Name = "LibNoise.Billow";

  var Octaves = 6;
  this.__defineGetter__("Octaves", function () { return Octaves; });
  this.__defineSetter__("Octaves", function (value) { Octaves = LibNoise.NMath.ClampValue(value, 1, this.MaxOctaves); });
}

LibNoise.Billow.prototype.getInput = getNone;
LibNoise.Billow.prototype.setInput = setNone;

LibNoise.Billow.prototype.GetValue = function( x,  y,  z)
{
  var value = 0.0;
  var signal = 0.0;
  var curPersistence = 1.0;
  var seed;

  x *= this.Frequency;
  y *= this.Frequency;
  z *= this.Frequency;

  for (var currentOctave = 0; currentOctave < this.Octaves; currentOctave++)
  {

    seed = (this.Seed + currentOctave) & 0xffffffff;
    signal = LibNoise.NMath.GradientCoherentNoise(x, y, z, seed, this.Quality);
    signal = 2.0 * Math.abs(signal) - 1.0;
    value += signal * curPersistence;

    x *= this.Lacunarity;
    y *= this.Lacunarity;
    z *= this.Lacunarity;
    curPersistence *= this.Persistence;
  }
  value += 0.5;
  return value;
}

LibNoise.Checkerboard = function()
{
  this.Name = "LibNoise.Checkerboard";
}

LibNoise.Checkerboard.prototype.getInput = getNone;
LibNoise.Checkerboard.prototype.setInput = setNone;

LibNoise.Checkerboard.prototype.GetValue = function(x,y,z)
{
  var x0 = Math.floor(x > 0.0 ? x : x - 1);
  var y0 = Math.floor(y > 0.0 ? y : y - 1);
  var z0 = Math.floor(z > 0.0 ? z : z - 1);

  var result = ((x0 & 1 ^ y0 & 1 ^ z0 & 1));
  if (result > 0) 
    return -1.0;
  else
    return 1.0;
}

LibNoise.Constant = function(value)
{
  this.Value = value;
  this.Name = "LibNoise.Constant";
}

LibNoise.Constant.prototype.getInput = getNone;
LibNoise.Constant.prototype.setInput = setNone;

LibNoise.Constant.prototype.GetValue = function (x, y, z)
{
  return this.Value;
}

LibNoise.Cylinders = function()
{
  this.Frequency = 1.0;
  this.Name = "LibNoise.Cylinders";
}

LibNoise.Cylinders.prototype.getInput = getNone;
LibNoise.Cylinders.prototype.setInput = setNone;

LibNoise.Cylinders.prototype.GetValue = function (x, z,y)
{
  x *= this.Frequency;
  y *= this.Frequency;
  
  var distFromCenter = Math.sqrt(x * x + y * y);
  var distFromCenter0 = Math.floor(distFromCenter > 0.0 ? distFromCenter : distFromCenter - 1);
  var distFromSmallerSphere = distFromCenter - distFromCenter0;
  var distFromLargerSphere = 1.0 - distFromSmallerSphere;
  var nearestDist = LibNoise.NMath.GetSmaller(distFromSmallerSphere, distFromLargerSphere);
  return 1.0 - (nearestDist * 4.0);
}


LibNoise.Gradient = function(a)
{
  this.Axis = a;
  this.Lower = 0;
  this.Upper = 0.99;
  this.Name = "LibNoise.Gradient";

}

LibNoise.Gradient.prototype.getInput = getNone;
LibNoise.Gradient.prototype.setInput = setNone;

LibNoise.Gradient.prototype.GetValue = function (x, y, z)
{
  var val = x;
  if (this.Axis == LibNoise.Axis.Y) val = y;
  else if (this.Axis == LibNoise.Axis.Z) val = z;

  if (val < this.Lower) val = this.Lower;
  if (val > this.Upper) val = this.Upper;
  return (val - Math.floor(val)) * 2.0 - 1.0;
}

LibNoise.Perlin = function(seed)
{
  this.Frequency  = 1.0;
  this.Persistence = 0.5;
  this.Quality = LibNoise.NoiseQuality.Standard;
  this.Lacunarity = 2.0;
  this.MaxOctaves = 30;
  this.Seed = 0;
  this.Name = "LibNoise.Perlin";

  var Octaves = 6;
  this.__defineGetter__("Octaves", function () { return Octaves; });
  this.__defineSetter__("Octaves", function (value) { Octaves = LibNoise.NMath.ClampValue(value, 1, this.MaxOctaves); });
}

LibNoise.Perlin.prototype.getInput = getNone;
LibNoise.Perlin.prototype.setInput = setNone;

LibNoise.Perlin.prototype.GetValue = function( x,  y,  z)
{
  var value = 0.0;
  var signal = 0.0;
  var curPersistence = 1.0;
  var seed;

  x *= this.Frequency;
  y *= this.Frequency;
  z *= this.Frequency;

  for (var currentOctave = 0; currentOctave < this.Octaves; currentOctave++)
  {
    seed = (this.Seed + currentOctave) & 0xffffffff;
    signal = LibNoise.NMath.GradientCoherentNoise(x, y, z, seed, this.Quality);
    value += signal * curPersistence;

    x *= this.Lacunarity;
    y *= this.Lacunarity;
    z *= this.Lacunarity;
    curPersistence *= this.Persistence;
  }

  return value;
}
LibNoise.RidgedMultifractal = function(seed)
{
  this.Frequency  = 1.0;
  this.Quality = LibNoise.NoiseQuality.Standard;
  this.MaxOctaves = 30;
  this.SpectralWeights = [];
  this.Seed = 0;
  this.Name = "LibNoise.RidgedMultifractal";

  var Lacunarity = 2.0;
  this.__defineGetter__("Lacunarity", function () { return Lacunarity; });
  this.__defineSetter__("Lacunarity", function (value) { Lacunarity = value; this.CalculateSpectralWeights(); });

  var Octaves = 6;
  this.__defineGetter__("Octaves", function () { return Octaves; });
  this.__defineSetter__("Octaves", function (value) { Octaves = LibNoise.NMath.ClampValue(value, 1, this.MaxOctaves); });

  this.CalculateSpectralWeights();
}

LibNoise.RidgedMultifractal.prototype.getInput = getNone;
LibNoise.RidgedMultifractal.prototype.setInput = setNone;

LibNoise.RidgedMultifractal.prototype.GetValue = function (x, y, z)
{
  x *= this.Frequency;
  y *= this.Frequency;
  z *= this.Frequency;

  var signal = 0.0;
  var value = 0.0;
  var weight = 1.0;

  // These parameters should be user-defined; they may be exposed in a
  // future version of libnoise.
  var offset = 1.0;
  var gain = 2.0;

  for (var currentOctave = 0; currentOctave < this.Octaves; currentOctave++)
  {

    var seed = (this.Seed + currentOctave) & 0x7fffffff;
    signal = LibNoise.NMath.GradientCoherentNoise(x, y, z, seed, this.Quality);

    // Make the ridges.
    signal = Math.abs(signal);
    signal = offset - signal;

    // Square the signal to increase the sharpness of the ridges.
    signal *= signal;

    // The weighting from the previous octave is applied to the signal.
    // Larger values have higher weights, producing sharp points along the
    // ridges.
    signal *= weight;

    // Weight successive contributions by the previous signal.
    weight = signal * gain;
    if (weight > 1.0) weight = 1.0;
    if (weight < 0.0) weight = 0.0;

    // Add the signal to the output value.
    value += (signal * this.SpectralWeights[currentOctave]);

    // Go to the next octave.
    x *= this.Lacunarity;
    y *= this.Lacunarity;
    z *= this.Lacunarity;
  }

  return (value * 1.25) - 1.0;
}

LibNoise.RidgedMultifractal.prototype.CalculateSpectralWeights = function()
{
  var h = 1.0;

  var frequency = 1.0;
  for (var i = 0; i < this.MaxOctaves; i++)
  {
    // Compute weight for each frequency.
    this.SpectralWeights[i] = Math.pow(frequency, -h);
    frequency *= this.Lacunarity;
  }
}
LibNoise.Spheres = function()
{
  this.Frequency = 1.0;
  this.Name = "LibNoise.Spheres";
}

LibNoise.Spheres.prototype.getInput = getNone;
LibNoise.Spheres.prototype.setInput = setNone;

LibNoise.Spheres.prototype.GetValue = function (x, y, z)
{
  x *= this.Frequency;
  y *= this.Frequency;
  z *= this.Frequency;

  var distFromCenter = Math.sqrt(x * x + y * y + z * z);
  var distFromCenter0 = Math.floor(distFromCenter > 0.0 ? distFromCenter : distFromCenter - 1);
  var distFromSmallerSphere = distFromCenter - distFromCenter0;
  var distFromLargerSphere = 1.0 - distFromSmallerSphere;
  var nearestDist = LibNoise.NMath.GetSmaller(distFromSmallerSphere, distFromLargerSphere);
  return 1.0 - (nearestDist * 4.0);
}

LibNoise.Voronoi = function()
{
  this.Frequency  = 1.0;
  this.Displacement = 1.0;
  this.Distance = 0;
  this.Seed = 0;
  this.Name = "LibNoise.Voronoi";
}

LibNoise.Voronoi.prototype.getInput = getNone;
LibNoise.Voronoi.prototype.setInput = setNone;

LibNoise.Voronoi.prototype.GetValue = function( x,  y,  z)
{
  x *= this.Frequency;
  y *= this.Frequency;
  z *= this.Frequency;

  var xInt = Math.floor(x > 0.0 ? x : x - 1);
  var yInt = Math.floor(y > 0.0 ? y : y - 1);
  var zInt = Math.floor(z > 0.0 ? z : z - 1);

  var minDist = 2147483647.0;
  var xCandidate = 0;
  var yCandidate = 0;
  var zCandidate = 0;

  // Inside each unit cube, there is a seed point at a random position.  Go
  // through each of the nearby cubes until we find a cube with a seed point
  // that is closest to the specified position.
  for (var zCur = zInt - 2; zCur <= zInt + 2; zCur++)
  {
    for (var yCur = yInt - 2; yCur <= yInt + 2; yCur++)
    {
      for (var xCur = xInt - 2; xCur <= xInt + 2; xCur++)
      {
        // Calculate the position and distance to the seed point inside of
        // this unit cube.
        var xPos = xCur + LibNoise.NMath.ValueNoise(xCur, yCur, zCur, this.Seed);
        var yPos = yCur + LibNoise.NMath.ValueNoise(xCur, yCur, zCur, this.Seed + 1);
        var zPos = zCur + LibNoise.NMath.ValueNoise(xCur, yCur, zCur, this.Seed + 2);
        var xDist = xPos - x;
        var yDist = yPos - y;
        var zDist = zPos - z;
        var dist = xDist * xDist + yDist * yDist + zDist * zDist;

        if (dist < minDist)
        {
          // This seed point is closer to any others found so far, so record
          // this seed point.
          minDist = dist;
          xCandidate = xPos;
          yCandidate = yPos;
          zCandidate = zPos;
        }
      }
    }
  }

  var value;
  if (this.Distance)
  {
    // Determine the distance to the nearest seed point.
    var xDist = xCandidate - x;
    var yDist = yCandidate - y;
    var zDist = zCandidate - z;
    value = (Math.sqrt(xDist * xDist + yDist * yDist + zDist * zDist) ) * LibNoise.NMath.Sqrt3 - 1.0;
  }
  else
  {
    value = 0.0;
  }

  var x0 = Math.floor(xCandidate > 0.0 ? xCandidate : xCandidate - 1);
  var y0 = Math.floor(yCandidate > 0.0 ? yCandidate : yCandidate - 1);
  var z0 = Math.floor(zCandidate > 0.0 ? zCandidate : zCandidate - 1);

  // Return the calculated distance with the displacement value applied.
  return value + (this.Displacement * LibNoise.NMath.ValueNoise(x0, y0, z0));
}

LibNoise.Cylinder = function(source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.Cylinder";
}

LibNoise.Cylinder.prototype.GetValue = function (angle, height)
{
  if (!this.SourceModule) return 0;
  var x, y, z;
  x = Math.cos(angle);
  y = height;
  z = Math.sin(angle);
  return this.SourceModule.GetValue(x, y, z);
}

LibNoise.Cylinder.prototype.getInput = getOne;
LibNoise.Cylinder.prototype.setInput = setOne;

LibNoise.Line = function(source)
{
  this.SourceModule = source;
  this.Attenuate = true;
  this.m_x0 = 0.0;
  this.m_x1 = 1.0;
  this.m_y0 = 0.0;
  this.m_y1 = 1.0;
  this.m_z0 = 0.0;
  this.m_z1 = 1.0;
  this.Name = "LibNoise.Line";
}

LibNoise.Line.prototype.GetValue = function (p)
{
  if (!this.SourceModule) return 0;
  var x = (this.m_x1 - this.m_x0) * p + this.m_x0;
  var y = (this.m_y1 - this.m_y0) * p + this.m_y0;
  var z = (this.m_z1 - this.m_z0) * p + this.m_z0;
  var value = this.SourceModule.GetValue(x, y, z);

  if (this.Attenuate)  return p * (1.0 - p) * 4 * value;
  else                 return value;
}

LibNoise.Line.prototype.SetStartPoint = function(x,y,z)
{
  this.m_x0 = x;
  this.m_y0 = y;
  this.m_z0 = z;
}

LibNoise.Line.prototype.SetEndPoint = function(x,y,z)
{
  this.m_x1 = x;
  this.m_y1 = y;
  this.m_z1 = z;
}

LibNoise.Line.prototype.getInput = getOne;
LibNoise.Line.prototype.setInput = setOne;

LibNoise.Plane = function(source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.Plane";
}

LibNoise.Plane.prototype.GetValue = function (x, z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x, 0, z);
}

LibNoise.Plane.prototype.getInput = getOne;
LibNoise.Plane.prototype.setInput = setOne;

LibNoise.Sphere = function(source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.Sphere";
}

LibNoise.Sphere.prototype.GetValue = function (latitude, longitude)
{
  if (!this.SourceModule) return 0;
  var x = 0, y = 0, z = 0;
  var coords = LibNoise.NMath.LatLonToXYZ(latitude, longitude);
  return this.SourceModule.GetValue(coords.x, coords.y, coords.z);
}

LibNoise.Sphere.prototype.getInput = getOne;
LibNoise.Sphere.prototype.setInput = setOne;

LibNoise.SmallerOutput = function (s1, s2)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.Name = "LibNoise.SmallerOutput";
}

LibNoise.SmallerOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule1 && !this.SourceModule2) return 0;
  if (!this.SourceModule1) return this.SourceModule2.GetValue(x, y, z);
  if (!this.SourceModule2) return this.SourceModule1.GetValue(x, y, z);
  return LibNoise.NMath.GetSmaller(this.SourceModule1.GetValue(x, y, z), this.SourceModule2.GetValue(x, y, z));
}

LibNoise.SmallerOutput.prototype.getInput = getTwo;
LibNoise.SmallerOutput.prototype.setInput = setTwo;


LibNoise.CacheOutput = function (s1)
{
  this.SourceModule = s1;
  this.cacheX = 0;
  this.cacheY = 0;
  this.cacheZ = 0;
  this.cacheVal = 0;
  this.cached = false;
  this.Name = "LibNoise.CacheOutput";
}

LibNoise.CacheOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  if (this.cached && this.cacheX == x && this.cacheY == y && this.cacheZ == z) return this.cacheVal;

  this.cacheVal = this.SourceModule.GetValue(x, y, z);
  this.cacheX = x;
  this.cacheY = y;
  this.cacheZ = z;
  this.cached = true;
  return this.cacheVal;}

LibNoise.CacheOutput.prototype.getInput = getOne;
LibNoise.CacheOutput.prototype.setInput = setOne;



LibNoise.LargerOutput = function (s1, s2)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.Name = "LibNoise.LargerOutput";
}

LibNoise.LargerOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule1 && !this.SourceModule2) return 0;
  if (!this.SourceModule1) return this.SourceModule2.GetValue(x, y, z);
  if (!this.SourceModule2) return this.SourceModule1.GetValue(x, y, z);
  return LibNoise.NMath.GetLarger(this.SourceModule1.GetValue(x, y, z), this.SourceModule2.GetValue(x, y, z));
}

LibNoise.LargerOutput.prototype.getInput = getTwo;
LibNoise.LargerOutput.prototype.setInput = setTwo;





LibNoise.SelectOutput = function (s1, s2, c)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.ControlModule = c;
  this.Name = "LibNoise.SelectOutput";

  var EdgeFalloff = 0.0;
  this.__defineGetter__("EdgeFalloff", function () { return EdgeFalloff; });
  this.__defineSetter__("EdgeFalloff", function (value) {
    var boundSize = this.UpperBound - this.LowerBound;
    EdgeFalloff = (value > boundSize / 2) ? boundSize / 2 : value;
  });
  var LowerBound = -1.0;
  this.__defineGetter__("LowerBound", function () { return LowerBound; });
  this.__defineSetter__("LowerBound", function (value) { LowerBound = value; this.EdgeFalloff = EdgeFalloff; });
  var UpperBound = 1.0;
  this.__defineGetter__("UpperBound", function () { return UpperBound; });
  this.__defineSetter__("UpperBound", function (value) { UpperBound = value; this.EdgeFalloff = EdgeFalloff; });
}

LibNoise.SelectOutput.prototype.getInput = function (i)
{
  if (i == 0) return this.SourceModule1;
  if (i == 1) return this.SourceModule2;
  if (i == 2) return this.ControlModule;
  return null;
}
LibNoise.SelectOutput.prototype.setInput = function (i, mod)
{
  if (i == 0) this.SourceModule1 = mod;
  if (i == 1) this.SourceModule2 = mod;
  if (i == 2) this.ControlModule = mod;
}


LibNoise.SelectOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule1 || !this.SourceModule2 || !this.ControlModule) return 0;
  var controlValue = this.ControlModule.GetValue(x, y, z);
  var alpha;

  if (this.EdgeFalloff > 0.0)
  {
    if (controlValue < (this.LowerBound - this.EdgeFalloff))
    {
      // The output value from the control module is below the selector
      // threshold; return the output value from the first source module.
      return this.SourceModule1.GetValue(x, y, z);
    }
    else if (controlValue < (this.LowerBound + this.EdgeFalloff))
    {
      // The output value from the control module is near the lower end of the
      // selector threshold and within the smooth curve. Interpolate between
      // the output values from the first and second source modules.
      var lowerCurve = (this.LowerBound - this.EdgeFalloff);
      var upperCurve = (this.LowerBound + this.EdgeFalloff);
      alpha = LibNoise.NMath.SCurve3((controlValue - lowerCurve) / (upperCurve - lowerCurve));
      return LibNoise.NMath.LinearInterpolate(this.SourceModule1.GetValue(x, y, z), this.SourceModule2.GetValue(x, y, z), alpha);
    }
    else if (controlValue < (this.UpperBound - this.EdgeFalloff))
    {
      // The output value from the control module is within the selector
      // threshold; return the output value from the second source module.
      return this.SourceModule2.GetValue(x, y, z);
    }
    else if (controlValue < (this.UpperBound + this.EdgeFalloff))
    {
      // The output value from the control module is near the upper end of the
      // selector threshold and within the smooth curve. Interpolate between
      // the output values from the first and second source modules.
      var lowerCurve = (this.UpperBound - this.EdgeFalloff);
      var upperCurve = (this.UpperBound + this.EdgeFalloff);
      alpha = LibNoise.NMath.SCurve3((controlValue - lowerCurve) / (upperCurve - lowerCurve));
      return LibNoise.NMath.LinearInterpolate(this.SourceModule2.GetValue(x, y, z), this.SourceModule1.GetValue(x, y, z), alpha);
    }
    else
    {
      // Output value from the control module is above the selector threshold;
      // return the output value from the first source module.
      return this.SourceModule1.GetValue(x, y, z);
    }
  }
  else
  {
    if (controlValue < this.LowerBound || controlValue > this.UpperBound)
    {
      return this.SourceModule1.GetValue(x, y, z);
    }
    else
    {
      return this.SourceModule2.GetValue(x, y, z);
    }
  }
}

LibNoise.SelectOutput.prototype.FixFalloff = function (value)
{
  var boundSize = this.UpperBound - this.LowerBound;
  if (this.EdgeFalloff) this.EdgeFalloff = (value > boundSize / 2) ? boundSize / 2 : value;
}
LibNoise.AddOutput = function(s1, s2)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.Name = "LibNoise.AddOutput";
}

LibNoise.AddOutput.prototype.GetValue = function(x, y, z)
{
  if (!this.SourceModule1 && !this.SourceModule2) return 0;
  return (this.SourceModule1 ? this.SourceModule1.GetValue(x, y, z) : 0) + ( this.SourceModule2 ? this.SourceModule2.GetValue(x, y, z) : 0);
}

LibNoise.AddOutput.prototype.getInput = getTwo;
LibNoise.AddOutput.prototype.setInput = setTwo;


LibNoise.MultiplyOutput = function(s1, s2)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.Name = "LibNoise.MultiplyOutput";
}

LibNoise.MultiplyOutput.prototype.GetValue = function(x, y, z)
{
  if (!this.SourceModule1 && !this.SourceModule2) return 0;
  return (this.SourceModule1 ? this.SourceModule1.GetValue(x, y, z) : 1) * (this.SourceModule2 ? this.SourceModule2.GetValue(x, y, z) : 1);
}

LibNoise.MultiplyOutput.prototype.getInput = getTwo;
LibNoise.MultiplyOutput.prototype.setInput = setTwo;



LibNoise.PowerOutput = function (s1, s2)
{
  this.BaseModule = s1;
  this.PowerModule = s2;
  this.Name = "LibNoise.PowerOutput";
}

LibNoise.PowerOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.BaseModule || !this.PowerModule) return 0;
  return Math.pow(this.BaseModule.GetValue(x, y, z), this.PowerModule.GetValue(x, y, z));
}

LibNoise.PowerOutput.prototype.getInput = function (i)
{
  if (i == 0) return this.BaseModule;
  if (i == 1) return this.PowerModule;
  return null;
}
LibNoise.PowerOutput.prototype.setInput = function (i, mod)
{
  if (i == 0) this.BaseModule = mod;
  if (i == 1) this.PowerModule = mod;
}




LibNoise.BlendOutput = function (s1, s2, w)
{
  this.SourceModule1 = s1;
  this.SourceModule2 = s2;
  this.WeightModule = w;
  this.Name = "LibNoise.BlendOutput";
}

LibNoise.BlendOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule1 || !this.SourceModule2 || !this.WeightModule) return 0;
  return LibNoise.NMath.LinearInterpolate(this.SourceModule1.GetValue(x, y, z), this.SourceModule2.GetValue(x, y, z), (this.WeightModule.GetValue(x, y, z) + 1.0) / 2.0);
}

LibNoise.BlendOutput.prototype.getInput = function (i)
{
  if (i == 0) return this.SourceModule1;
  if (i == 1) return this.SourceModule2;
  if (i == 2) return this.WeightModule;
  return null;
}
LibNoise.BlendOutput.prototype.setInput = function (i, mod)
{
  if (i == 0) this.SourceModule1 = mod;
  if (i == 1) this.SourceModule2 = mod;
  if (i == 2) this.WeightModule = mod;
}

LibNoise.CurveOutput = function(s1)
{
  this.SourceModule = s1;
  this.ControlPoints = [];
  this.Name = "LibNoise.CurveOutput";
}

LibNoise.CurveOutput.prototype.getInput = getOne;
LibNoise.CurveOutput.prototype.setInput = setOne;

LibNoise.CurveOutput.prototype.GetValue = function(x, y, z)
{
  if (!this.SourceModule) return 0;
  // Get the output value from the source module.
  var sourceModuleValue = this.SourceModule.GetValue(x, y, z);

  var controlPointCount = this.ControlPoints.length;

  // Find the first element in the control point array that has an input value
  // larger than the output value from the source module.
  var indexPos;
  for (indexPos = 0; indexPos < controlPointCount; indexPos++)
  {
    if (sourceModuleValue < this.ControlPoints[indexPos].Input)
    {
      break;
    }
  }

  // Find the four nearest control points so that we can perform cubic
  // interpolation.
  var index0 = LibNoise.NMath.ClampValue(indexPos - 2, 0, controlPointCount - 1);
  var index1 = LibNoise.NMath.ClampValue(indexPos - 1, 0, controlPointCount - 1);
  var index2 = LibNoise.NMath.ClampValue(indexPos, 0, controlPointCount - 1);
  var index3 = LibNoise.NMath.ClampValue(indexPos + 1, 0, controlPointCount - 1);

  // If some control points are missing (which occurs if the value from the
  // source module is greater than the largest input value or less than the
  // smallest input value of the control point array), get the corresponding
  // output value of the nearest control point and exit now.
  if (index1 == index2)
  {
    return this.ControlPoints[index1].Output;
  }

  // Compute the alpha value used for cubic interpolation.
  var input0 = this.ControlPoints[index1].Input;
  var input1 = this.ControlPoints[index2].Input;
  var alpha = (sourceModuleValue - input0) / (input1 - input0);

  // Now perform the cubic interpolation given the alpha value.
  return LibNoise.NMath.CubicInterpolate(
    this.ControlPoints[index0].Output,
    this.ControlPoints[index1].Output,
    this.ControlPoints[index2].Output,
    this.ControlPoints[index3].Output,
    alpha);
}

LibNoise.CurveOutput.prototype.FindInsertionPos = function(inputValue)
{
  var insertionPos;
  var controlPointCount = this.ControlPoints.length;
  for (insertionPos = 0; insertionPos < controlPointCount; insertionPos++)
  {
    if (inputValue < this.ControlPoints[insertionPos].Input) {
      // We found the array index in which to insert the new control point.
      // Exit now.
      break;
    } else if (inputValue == this.ControlPoints[insertionPos].Input) {
      // Each control point is required to contain a unique input value, so
      // throw an exception.
      break;
    }
  }
  return insertionPos;
}

LibNoise.DisplaceInput = function(source, xmod, ymod, zmod)
{
  this.SourceModule = source;
  this.XDisplaceModule = xmod;
  this.YDisplaceModule = ymod;
  this.ZDisplaceModule = zmod;
  this.Name = "LibNoise.DisplaceInput";
}

LibNoise.DisplaceInput.prototype.GetValue = function(x,y,z)
{
  if (!this.SourceModule) return 0;
  x += this.XDisplaceModule != null ? this.XDisplaceModule.GetValue(x, y, z) : 0;
  y += this.YDisplaceModule != null ? this.YDisplaceModule.GetValue(x, y, z) : 0;
  z += this.ZDisplaceModule != null ? this.ZDisplaceModule.GetValue(x, y, z) : 0;

  return this.SourceModule.GetValue(x, y, z);
}

LibNoise.DisplaceInput.prototype.getInput = function (i)
{
  if (i == 1) return this.SourceModule;
  if (i == 0) return this.XDisplaceModule;
  if (i == 3) return this.YDisplaceModule;
  if (i == 2) return this.ZDisplaceModule;
  return null;
}
LibNoise.DisplaceInput.prototype.setInput = function (i, mod)
{
  if (i == 1) this.SourceModule = mod;
  if (i == 0) this.XDisplaceModule = mod;
  if (i == 3) this.YDisplaceModule = mod;
  if (i == 2) this.ZDisplaceModule = mod;
}



LibNoise.TranslateInput = function (source)
{
  this.SourceModule = source;
  this.X = 0;
  this.Y = 0;
  this.Z = 0;
  this.Name = "LibNoise.TranslateInput";
}

LibNoise.TranslateInput.prototype.getInput = getOne;
LibNoise.TranslateInput.prototype.setInput = setOne;


LibNoise.TranslateInput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x + this.X, y + this.Y, z + this.Z);
}




LibNoise.RotateInput = function (source)
{
  this.SourceModule = source;
  this.XAngle = 0;
  this.YAngle = 0;
  this.ZAngle = 0;
  this.SetAngles();
  this.Name = "LibNoise.RotateInput";
}

LibNoise.RotateInput.prototype.getInput = getOne;
LibNoise.RotateInput.prototype.setInput = setOne;

LibNoise.RotateInput.prototype.SetAngles = function()
{
  var xCos, yCos, zCos, xSin, ySin, zSin;
  xCos = Math.cos(this.XAngle);
  yCos = Math.cos(this.YAngle);
  zCos = Math.cos(this.ZAngle);
  xSin = Math.sin(this.XAngle);
  ySin = Math.sin(this.YAngle);
  zSin = Math.sin(this.ZAngle);

  this.m_x1Matrix = ySin * xSin * zSin + yCos * zCos;
  this.m_y1Matrix = xCos * zSin;
  this.m_z1Matrix = ySin * zCos - yCos * xSin * zSin;
  this.m_x2Matrix = ySin * xSin * zCos - yCos * zSin;
  this.m_y2Matrix = xCos * zCos;
  this.m_z2Matrix = -yCos * xSin * zCos - ySin * zSin;
  this.m_x3Matrix = -ySin * xCos;
  this.m_y3Matrix = xSin;
  this.m_z3Matrix = yCos * xCos;
}

LibNoise.RotateInput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  var nx = (this.m_x1Matrix * x) + (this.m_y1Matrix * y) + (this.m_z1Matrix * z);
  var ny = (this.m_x2Matrix * x) + (this.m_y2Matrix * y) + (this.m_z2Matrix * z);
  var nz = (this.m_x3Matrix * x) + (this.m_y3Matrix * y) + (this.m_z3Matrix * z);
  return this.SourceModule.GetValue(nx, ny, nz);
}





LibNoise.BiasOutput = function (source, b)
{
  this.SourceModule = source;
  this.Bias = b;
  this.Name = "LibNoise.BiasOutput";
}

LibNoise.BiasOutput.prototype.getInput = getOne;
LibNoise.BiasOutput.prototype.setInput = setOne;

LibNoise.BiasOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x, y, z) + this.Bias;
}





LibNoise.ClampOutput = function (source)
{
  this.SourceModule = source;
  this.Lower = -1;
  this.Upper = 1;
  this.Name = "LibNoise.ClampOutput";
}

LibNoise.ClampOutput.prototype.getInput = getOne;
LibNoise.ClampOutput.prototype.setInput = setOne;

LibNoise.ClampOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  var value = this.SourceModule.GetValue(x, y, z);
  if (value < this.Lower) return this.Lower;
  else if (value > this.Upper) return this.Upper;
  else    return value;
}





LibNoise.AbsoluteOutput = function (source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.AbsoluteOutput";
}

LibNoise.AbsoluteOutput.prototype.getInput = getOne;
LibNoise.AbsoluteOutput.prototype.setInput = setOne;

LibNoise.AbsoluteOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return Math.abs(this.SourceModule.GetValue(x, y, z));
}






LibNoise.ExponentialOutput = function (source, exponent)
{
  this.SourceModule = source;
  this.Exponent = exponent ? exponent : 1;
  this.Name = "LibNoise.ExponentialOutput";
}

LibNoise.ExponentialOutput.prototype.getInput = getOne;
LibNoise.ExponentialOutput.prototype.setInput = setOne;

LibNoise.ExponentialOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return (Math.pow(Math.abs((this.SourceModule.GetValue(x, y, z) + 1.0) / 2.0), this.Exponent) * 2.0 - 1.0);
}





LibNoise.InvertInput = function(source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.InvertInput";
}

LibNoise.InvertInput.prototype.GetValue = function(x,y,z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(-x, -y, -z);
}

LibNoise.InvertInput.prototype.getInput = getOne;
LibNoise.InvertInput.prototype.setInput = setOne;




LibNoise.InvertOutput = function(source)
{
  this.SourceModule = source;
  this.Name = "LibNoise.InvertOutput";
}

LibNoise.InvertOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return -this.SourceModule.GetValue(x, y, z);
}

LibNoise.InvertOutput.prototype.getInput = getOne;
LibNoise.InvertOutput.prototype.setInput = setOne;

LibNoise.ScaleOutput = function(source, scale)
{
  this.SourceModule = source;
  this.Scale = scale;
  this.Name = "LibNoise.ScaleOutput";
}

LibNoise.ScaleOutput.prototype.getInput = getOne;
LibNoise.ScaleOutput.prototype.setInput = setOne;

LibNoise.ScaleOutput.prototype.GetValue = function(x,y,z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x, y, z) * this.Scale;
}




LibNoise.ScaleInput = function (source)
{
  this.SourceModule = source;
  this.X = 1;
  this.Y = 1;
  this.Z = 1;
  this.Name = "LibNoise.ScaleInput";
}

LibNoise.ScaleInput.prototype.getInput = getOne;
LibNoise.ScaleInput.prototype.setInput = setOne;

LibNoise.ScaleInput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x * this.X, y * this.Y, z * this.Z);
}







LibNoise.ScaleBiasOutput = function (source)
{
  this.SourceModule = source;
  this.Scale = 1.0;
  this.Bias = 0.0;
  this.Name = "LibNoise.ScaleBiasOutput";
}

LibNoise.ScaleBiasOutput.prototype.getInput = getOne;
LibNoise.ScaleBiasOutput.prototype.setInput = setOne;

LibNoise.ScaleBiasOutput.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  return this.SourceModule.GetValue(x, y, z) * this.Scale + this.Bias;
}

LibNoise.TerraceOutput = function(s1)
{
  this.SourceModule = s1;
  this.Invert = 0;
  this.ControlPoints = [];
  this.Name = "LibNoise.TerraceOutput";
}

LibNoise.TerraceOutput.prototype.getInput = getOne;
LibNoise.TerraceOutput.prototype.setInput = setOne;

LibNoise.TerraceOutput.prototype.GetValue = function(x, y, z)
{
  if (!this.SourceModule) return 0;
  // Get the output value from the source module.
  var sourceModuleValue = this.SourceModule.GetValue(x, y, z);

  var controlPointCount = this.ControlPoints.length;

  // Find the first element in the control point array that has a value
  // larger than the output value from the source module.
  var indexPos;
  for (indexPos = 0; indexPos < controlPointCount; indexPos++)
  {
    if (sourceModuleValue < this.ControlPoints[indexPos])
    {
      break;
    }
  }

  // Find the two nearest control points so that we can map their values
  // onto a quadratic curve.
  var index0 = LibNoise.NMath.ClampValue(indexPos - 1, 0, controlPointCount - 1);
  var index1 = LibNoise.NMath.ClampValue(indexPos, 0, controlPointCount - 1);

  // If some control points are missing (which occurs if the output value from
  // the source module is greater than the largest value or less than the
  // smallest value of the control point array), get the value of the nearest
  // control point and exit now.
  if (index0 == index1)
  {
    return this.ControlPoints[index1];
  }

  // Compute the alpha value used for linear interpolation.
  var value0 = this.ControlPoints[index0];
  var value1 = this.ControlPoints[index1];
  var alpha = (sourceModuleValue - value0) / (value1 - value0);
  if (this.Invert)
  {
    alpha = 1.0 - alpha;

    //swaap
    var tmp = value1;
    value1 = value0;
    value0 = tmp;
  }

  // Squaring the alpha produces the terrace effect.
  alpha *= alpha;

  // Now perform the linear interpolation given the alpha value.
  return LibNoise.NMath.LinearInterpolate(value0, value1, alpha);
}

LibNoise.Turbulence = function (source)
{
  this.SourceModule = source;
  this.Power = 1.0;
  this.XDistort = new LibNoise.Perlin();
  this.YDistort = new LibNoise.Perlin();
  this.ZDistort = new LibNoise.Perlin();
  this.Name = "LibNoise.Turbulence";

  this.__defineGetter__("Frequency", function () { return this.XDistort.Frequency; });
  this.__defineSetter__("Frequency", function (value) { this.XDistort.Frequency = value; this.YDistort.Frequency = value; this.ZDistort.Frequency = value; });

  this.__defineGetter__("Roughness", function () { return this.XDistort.Octaves; });
  this.__defineSetter__("Roughness", function (value) { this.XDistort.Octaves = value; this.YDistort.Octaves = value; this.ZDistort.Octaves = value; });

  this.__defineGetter__("Seed", function () { return this.XDistort.Seed; });
  this.__defineSetter__("Seed", function (value) { this.XDistort.Seed = value; this.YDistort.Seed = value + 1; this.ZDistort.Seed = value + 2; });

  this.Roughness = 3;
  this.Seed = 0;
}

LibNoise.Turbulence.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  var x0, y0, z0;
  var x1, y1, z1;
  var x2, y2, z2;
  x0 = x + (12414.0 / 65536.0);
  y0 = y + (65124.0 / 65536.0);
  z0 = z + (31337.0 / 65536.0);
  x1 = x + (26519.0 / 65536.0);
  y1 = y + (18128.0 / 65536.0);
  z1 = z + (60493.0 / 65536.0);
  x2 = x + (53820.0 / 65536.0);
  y2 = y + (11213.0 / 65536.0);
  z2 = z + (44845.0 / 65536.0);
  var xDistort = x + (this.XDistort.GetValue(x0, y0, z0) * this.Power);
  var yDistort = y + (this.YDistort.GetValue(x1, y1, z1) * this.Power);
  var zDistort = z + (this.ZDistort.GetValue(x2, y2, z2) * this.Power);

  return this.SourceModule.GetValue(xDistort, yDistort, zDistort);
}

LibNoise.Turbulence.prototype.getInput = getOne;
LibNoise.Turbulence.prototype.setInput = setOne;



LibNoise.TurbulenceCustom = function (source)
{
  this.SourceModule = source;
  this.Power = 1.0;
  this.XDistort = new LibNoise.Constant(0);
  this.YDistort = this.XDistort;
  this.ZDistort = this.XDistort;
  this.Name = "LibNoise.TurbulenceCustom";

}

LibNoise.TurbulenceCustom.prototype.GetValue = function (x, y, z)
{
  if (!this.SourceModule) return 0;
  var x0, y0, z0;
  var x1, y1, z1;
  var x2, y2, z2;
  x0 = x + (12414.0 / 65536.0);
  y0 = y + (65124.0 / 65536.0);
  z0 = z + (31337.0 / 65536.0);
  x1 = x + (26519.0 / 65536.0);
  y1 = y + (18128.0 / 65536.0);
  z1 = z + (60493.0 / 65536.0);
  x2 = x + (53820.0 / 65536.0);
  y2 = y + (11213.0 / 65536.0);
  z2 = z + (44845.0 / 65536.0);
  var xDistort = x + (this.XDistort.GetValue(x0, y0, z0) * Power);
  var yDistort = y + (this.YDistort.GetValue(x1, y1, z1) * Power);
  var zDistort = z + (this.ZDistort.GetValue(x2, y2, z2) * Power);
  return this.SourceModule.GetValue(xDistort, yDistort, zDistort);
}

LibNoise.TurbulenceCustom.prototype.getInput = getOne;
LibNoise.TurbulenceCustom.prototype.setInput = setOne;

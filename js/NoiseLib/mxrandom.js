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

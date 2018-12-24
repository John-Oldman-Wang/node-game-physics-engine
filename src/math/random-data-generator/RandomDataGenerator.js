var Class = require('../../utils/Class');

var RandomDataGenerator = new Class({
  initialize: function RandomDataGenerator(seeds) {
    if (seeds === undefined) {
      seeds = [(Date.now() * Math.random()).toString()];
    }

    this.c = 1;

    this.s0 = 0;

    this.s1 = 0;

    this.s2 = 0;

    this.n = 0;

    this.signs = [-1, 1];

    if (seeds) {
      this.init(seeds);
    }
  },

  rnd: function() {
    var t = 2091639 * this.s0 + this.c * 2.3283064365386963e-10; // 2^-32

    this.c = t | 0;
    this.s0 = this.s1;
    this.s1 = this.s2;
    this.s2 = t - this.c;

    return this.s2;
  },

  hash: function(data) {
    var h;
    var n = this.n;

    data = data.toString();

    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }

    this.n = n;

    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  },

  init: function(seeds) {
    if (typeof seeds === 'string') {
      this.state(seeds);
    } else {
      this.sow(seeds);
    }
  },

  sow: function(seeds) {
    // Always reset to default seed
    this.n = 0xefc8249d;
    this.s0 = this.hash(' ');
    this.s1 = this.hash(' ');
    this.s2 = this.hash(' ');
    this.c = 1;

    if (!seeds) {
      return;
    }

    // Apply any seeds
    for (var i = 0; i < seeds.length && seeds[i] != null; i++) {
      var seed = seeds[i];

      this.s0 -= this.hash(seed);
      this.s0 += ~~(this.s0 < 0);
      this.s1 -= this.hash(seed);
      this.s1 += ~~(this.s1 < 0);
      this.s2 -= this.hash(seed);
      this.s2 += ~~(this.s2 < 0);
    }
  },

  integer: function() {
    // 2^32
    return this.rnd() * 0x100000000;
  },

  frac: function() {
    // 2^-53
    return this.rnd() + ((this.rnd() * 0x200000) | 0) * 1.1102230246251565e-16;
  },

  real: function() {
    return this.integer() + this.frac();
  },

  integerInRange: function(min, max) {
    return Math.floor(this.realInRange(0, max - min + 1) + min);
  },

  between: function(min, max) {
    return Math.floor(this.realInRange(0, max - min + 1) + min);
  },

  realInRange: function(min, max) {
    return this.frac() * (max - min) + min;
  },

  normal: function() {
    return 1 - 2 * this.frac();
  },

  uuid: function() {
    var a = '';
    var b = '';

    for (b = a = ''; a++ < 36; b += ~a % 5 | ((a * 3) & 4) ? (a ^ 15 ? 8 ^ (this.frac() * (a ^ 20 ? 16 : 4)) : 4).toString(16) : '-') {
      // eslint-disable-next-line no-empty
    }

    return b;
  },

  pick: function(array) {
    return array[this.integerInRange(0, array.length - 1)];
  },

  sign: function() {
    return this.pick(this.signs);
  },

  weightedPick: function(array) {
    return array[~~(Math.pow(this.frac(), 2) * (array.length - 1) + 0.5)];
  },

  timestamp: function(min, max) {
    return this.realInRange(min || 946684800000, max || 1577862000000);
  },

  angle: function() {
    return this.integerInRange(-180, 180);
  },

  rotation: function() {
    return this.realInRange(-3.1415926, 3.1415926);
  },

  state: function(state) {
    if (typeof state === 'string' && state.match(/^!rnd/)) {
      state = state.split(',');

      this.c = parseFloat(state[1]);
      this.s0 = parseFloat(state[2]);
      this.s1 = parseFloat(state[3]);
      this.s2 = parseFloat(state[4]);
    }

    return ['!rnd', this.c, this.s0, this.s1, this.s2].join(',');
  },

  shuffle: function(array) {
    var len = array.length - 1;

    for (var i = len; i > 0; i--) {
      var randomIndex = Math.floor(this.frac() * (len + 1));
      var itemAtIndex = array[randomIndex];

      array[randomIndex] = array[i];
      array[i] = itemAtIndex;
    }

    return array;
  }
});

module.exports = RandomDataGenerator;

/**
 * BlueDyeJS Alpha v1.2.1
 * by Yazid SLILA (@yokgs)
 * MIT License
 */
 (function (r, e) { typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = e() : typeof define === 'function' && define.amd ? define(e) : (r.bluedye = e()); }(this, (function () {
    'use strict';
    var rgb = (r, g, b) => [r, g, b, 1],
        rgba = (r, g, b, a) => [r, g, b, a],
        _E=Math.floor,
        _N=Math.min,
        _X=Math.max,
        _H = a => ((a > 15 ? '' : '0') + Math.floor(a).toString(16)),
        fromHex = a => {
            if (a.length == 4) return parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16) * 17;
            return parseInt(a.substr(1), 16);
        },
        _c= a => _X(0, _N(_E(a), 255)),
        _ac = a => _X(0, _N(a, 1));
    var _d= (a, b) => (1 - b / 10) * a,
        _l= (a, b) => (a + (1 - b / 10) * (255 - a));

    var bluedye = function (c) {
        return new localBD.c(c);
    };
    let localBD = bluedye.prototype = {
        c: function (c) {
            //default values
            var s = [0, 0, 0, 1];
            if (typeof c == 'undefined') s[3] = 0;
            if (typeof c == "string") {
                if (/^#[0-1a-fA-F]+/.test(c)) {
                    c = fromHex(c);
                } else {
                    try {
                        s = eval(c);
                    } catch (_) { };
                }
            }
            if (typeof c == "number") {
                for (let i = 2; i >= 0; i--) {
                    s[i] = _E(c) % 256;
                    c /= 256;
                }
            }
            if (typeof c == 'object' && c.length) {
                s = c;
                if (s.length == 3) s[3] = 1;
                else if (s.length < 3) s = [0, 0, 0, 0];
            }
            if (typeof c == 'boolean' && c) s = [255, 255, 255, 1];
            this.R = _c(s[0]);
            this.G = _c(s[1]);
            this.B = _c(s[2]);
            this.A = _ac(s[3]);
            this.tag = null;
            return this;
        },
        red: function (r) {
            if (typeof r == 'number') this.R = r;
            return this;
        },
        green: function (g) {
            if (typeof g == 'number') this.G = g;
            return this;
        },
        blue: function (b) {
            if (typeof b == 'number') this.B = b;
            return this;
        },
        alpha: function (a) {
            this.A = _ac(alpha);
            return this;
        },
        rgb: function (r, g, b) {
            return this.red(r).green(g).blue(b);
        },
        rgba: function (r, g, b, a) {
            return this.rgb(r, g, b).alpha(a);
        },
        dark: function (l = 1) {
            l = _N(_X(l, 0), 10);
            [this.R,this.G,this.B]=this.toArray().map(x=>_d(x, l));
            return this;
        },
        light: function (l = 1) {
            l = _N(_X(l, 0), 10);
            [this.R,this.G,this.B]=this.toArray().map(x=>_l(x, l));
            return this;
        },
        negative: function () {
            [this.R,this.G,this.B]=this.toArray().map(x=>(255-x));
            return this;
        },
        redToBlue: function () {
            [this.R,this.G,this.B]=[this.G,this.B,this.R];
            return this;
        },
        blueToRed: function () {
            [this.R,this.G,this.B]=[this.B,this.R,this.G];
            return this;
        },
        gray: function () {
            var y = _E((this.R + this.G + this.B) / 3);
            this.R = this.G = this.B = y;
            return this;
        },
        grey: function () {
            return this.gray();
        },
        random: function () {
            [this.R,this.G,this.B]=this.toArray().map(()=>(Math.random() * 256));
            return this;
        },
        css: function () {
            if (this.A === 1) return `rgb(${this.R},${this.G},${this.B})`;
            return `rgba(${this.R},${this.G},${this.B},${this.A})`;
        },
        hex: function () {
            return `#${_H(this.R)}${_H(this.G)}${_H(this.B)}`;
        },
        number: function () {
            return ((this.R * 256) + this.G) * 256 + this.B;
        },
        toArray:function(){
            return [this.R, this.G, this.B];
        },
        correct:function(){
            [this.R,this.G,this.B]=this.toArray().map(_c);
            this.A=_ac(this.A);
            return this;
        }
    }
    localBD.c.prototype = localBD;
    bluedye.add = function (obj, ow) {
        for (let k in obj) {
            var t = k in bluedye ? ow : !ow;
            if (t) bluedye[k] = obj[k];
        }
        return bluedye;
    };
    bluedye.add({
        version: [1, 2, 1],
        alpha: true,
        rgb: function (r, g, b) {
            return bluedye(`rgb(${r},${g},${b})`);
        },
        rgba: function (r, g, b, a) {
            return bluedye(`rgba(${r},${g},${b},${a})`);
        }
    })
    return bluedye;
})));

export class Pixel {
  r = 0;
  g = 0;
  b = 0;
  a = 0;

  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  asHSV() {
    const r = this.r / 255;
    const g = this.g / 255;
    const b = this.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return {
      h: h * 360,
      s: s * 100,
      v: v * 100,
    };
  }

  static fromHSV(hsvPixel) {
    const h = hsvPixel.h / 360;
    const s = hsvPixel.s / 100;
    const v = hsvPixel.v / 100;

    let red, green, blue;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        red = v;
        green = t;
        blue = p;
        break;
      case 1:
        red = q;
        green = v;
        blue = p;
        break;
      case 2:
        red = p;
        green = v;
        blue = t;
        break;
      case 3:
        red = p;
        green = q;
        blue = v;
        break;
      case 4:
        red = t;
        green = p;
        blue = v;
        break;
      case 5:
        red = v;
        green = p;
        blue = q;
        break;
    }

    const newPixel = new Pixel(255 * red, 255 * green, 255 * blue, 255);

    // console.log(hsvPixel);
    // console.log(newPixel);

    return newPixel;
  }
}

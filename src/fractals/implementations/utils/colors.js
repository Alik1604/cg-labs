export function getColor(ti) {
    const t = Math.abs(ti) % 1.0 * 100
    const bin = 255

    const a = { f: 0.5, s: 0.5, t: 0.5 };
    const b = { f: 0.5, s: 0.5, t: 0.5 };
    const c = { f: 1, s: 1, t: 1 };
    const d = { f: 0.1, s: 0.15, t: 0.3 };

    var red = 0
    var green = 0
    var blue = 0

    if (t < 33) {
        red = bin * (b.f * Math.cos(6.28318 * (c.f * t + d.f)) + a.f) / 2 - 50
        green = bin * (b.s * Math.cos(6.28318 * (c.s * t + d.s)) + a.s) / 2 - 100
        blue = bin * (b.t * Math.cos(6.28318 * (c.t * t + d.t)) + a.t)

    } else if (t < 66) {
        red = bin * (b.f * Math.cos(6.28318 * (c.f * t + d.f)) + a.f) / 2
        green = bin * (b.s * Math.cos(6.28318 * (c.s * t + d.s)) + a.s) / 1.5 - 50
        blue = bin * (b.t * Math.cos(6.28318 * (c.t * t + d.t)) + a.t)

    } else {
        red = bin * (b.f * Math.cos(6.28318 * (c.f * t + d.f)) + a.f) - 50
        green = bin * (b.s * Math.cos(6.28318 * (c.s * t + d.s)) + a.s) / 1.5 - 50
        blue = bin * (b.t * Math.cos(6.28318 * (c.t * t + d.t)) + a.t)

    }

    return `rgb(${red}, ${green}, ${blue})`;
}

export function hsvToRgb(n, iterations, z) {
    // const ti = Math.abs(n - Math.log2(Math.log2(modz(z)))) / iterations
    const ti = n / iterations
    // console.log("" + ti + " " + (n - Math.log2(Math.log2(modz(z)))) / iterations)
    const tin = 1 - ti
    // const h = Math.pow((n / iterations) * 360, 1.5) % 360
    // const h = Math.pow(((n - Math.log2(modz(z))) / iterations) * 360, 1.5) % 360
    // const h = n - Math.log2(Math.abs(Math.log10(Math.abs(modz(z)))/Math.log10(iterations)))
    // const sexp = 1.5
    // const h = Math.pow(Math.pow(n / iterations, sexp) * iterations, 1.5) % iterations
    // const h = ti * Math.pow(tin, 10 / tin) * 360
    const h = -ti * Math.pow(tin, 1.5) + 200 / 360 //* Math.pow(ti, 5)
    const s = 1
    const v = 0.6 + Math.pow(tin, 1.5)

    // console.log(h)

    const rbin = 255
    const gbin = 255
    const bbin = 255
    let red, green, blue;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    // console.log("" + i + " | " + f + " | " + p + " | " + q + " | " + t)

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

    const alpha = 1

    // console.log("" + red * rbin + " " + green * gbin + " " + blue * bbin)
    return `rgb(${green * rbin * alpha}, ${red * gbin * alpha}, ${blue * bbin * alpha})`
}

export function getAlgebraicColor(n, iterations) {
    const a = 10
    const bx = n / iterations * a
    // const x = n / iterations
    let x = bx > 0.8 ? 1 - bx : bx
    x = x > 1 ? 1 : x
    x = x < 0 ? 0 : x

    const red = 255 * (Math.sqrt(x) + 0.55)
    const green = 160 * 2.5 / Math.sqrt(2 * Math.PI) * Math.pow(Math.E, -Math.pow(x - 0.25, 2) * 6)
    const blue = 255 * (0.5 - Math.log2(x + 0.2))

    console.log("x: " + x + " red: " + red + " green: " + green + " blue: " + blue)

    return `rgb(${red}, ${green}, ${blue})`
}
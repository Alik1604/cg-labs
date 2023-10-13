import { fillTriangle, getSides } from "./utils/triangle.js";
import { Point } from "./utils/point.js"

export function drawGeometrical(ctx, triangleSize, canvasWidth, canvasHeight, iterations, scale, dx, dy, triangleRotation) {
    const centerX = canvasWidth / 2 + canvasWidth * dx / 20000 * scale;
    const centerY = canvasHeight / 2 + canvasHeight * dy / 20000 * scale;

    const rTSize = triangleSize * scale / 100

    const v = new Point(0, rTSize * Math.sqrt(3) / 6)

    const triangle = fillTriangle({
        center: new Point(centerX, centerY),
        v1: v.rotateVector(0 + triangleRotation),
        v2: v.rotateVector(120 + triangleRotation),
        v3: v.rotateVector(240 + triangleRotation),
        vx1: new Point(),
        vx2: new Point(),
        vx3: new Point(),
    })

    ctx.fillStyle = "#b5b40a"
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.strokeStyle = "black"
    ctx.lineWidth = 1

    const sides = getSides(triangle)

    geomIterate(ctx, sides.s1, iterations)
    geomIterate(ctx, sides.s2, iterations)
    geomIterate(ctx, sides.s3, iterations)
}

function geomIterate(ctx, side, iterations) {
    if (iterations == 0) {
        ctx.beginPath()
        ctx.moveTo(side.vx.x, side.vx.y)
        ctx.lineTo(side.vx.x + side.v.x, side.vx.y + side.v.y)
        ctx.stroke()
    } else {
        geomIterate(ctx, {
            vx: new Point(side.vx.x, side.vx.y),
            v: new Point(side.v.x / 2, side.v.y / 2)
        }, iterations - 1)

        const tempSide1 = getTempSide(side, -120) 
        const tempAntiSide1 = getTempAntiSide(tempSide1)

        geomIterate(ctx, tempSide1, iterations - 1)
        geomIterate(ctx, tempAntiSide1, iterations - 1)

        const tempSide2 = getTempSide(side, -60) 
        const tempAntiSide2 = getTempAntiSide(tempSide2)

        geomIterate(ctx, tempSide2, iterations - 1)
        geomIterate(ctx, tempAntiSide2, iterations - 1)

        geomIterate(ctx, {
            vx: new Point(side.vx.x + side.v.x / 2, side.vx.y + side.v.y / 2),
            v: new Point(side.v.x / 2, side.v.y / 2)
        }, iterations - 1)
    }
}

function getTempSide(side, rotation) {
    return {
        vx: new Point(side.vx.x + side.v.x / 2, side.vx.y + side.v.y / 2),
        v: new Point(side.v.x / 4, side.v.y / 4).rotateVector(rotation)
    }
}

function getTempAntiSide(tempSide) {
    return {
        vx: new Point(tempSide.vx.x + tempSide.v.x, tempSide.vx.y + tempSide.v.y),
        v: new Point(-tempSide.v.x, -tempSide.v.y)
    }
}
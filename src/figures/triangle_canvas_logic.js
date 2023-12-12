import {Point} from "@/fractals/implementations/utils/point";

export function drawTriangle(canvasRef, canvasConfigs, inputPoints) {
    const canvas = canvasRef.current
    if (canvas === null) return

    const ctx = canvas.getContext("2d")

    const {originX, originY, oneLengthX, oneLengthY} = canvasConfigs
    const points = {
        a: new Point(originX + inputPoints.a.x * oneLengthX, originY - inputPoints.a.y * oneLengthY),
        b: new Point(originX + inputPoints.b.x * oneLengthX, originY - inputPoints.b.y * oneLengthY),
        c: new Point(originX + inputPoints.c.x * oneLengthX, originY - inputPoints.c.y * oneLengthY),
    }

    // console.log(inputPoints, canvasConfigs, points)

    ctx.beginPath();

    ctx.moveTo(points.a.x, points.a.y);
    ctx.lineTo(points.b.x, points.b.y);

    ctx.moveTo(points.b.x, points.b.y);
    ctx.lineTo(points.c.x, points.c.y);

    ctx.moveTo(points.c.x, points.c.y);
    ctx.lineTo(points.a.x, points.a.y);

    ctx.strokeStyle = "#000000";
    ctx.stroke();

    const offset = 12
    const center = new Point((points.a.x + points.b.x + points.c.x) / 3, (points.a.y + points.b.y + points.c.y) / 3)
    const ap = points.a.add(center, -offset)
    const bp = points.b.add(center, -offset)
    const cp = points.c.add(center, -offset)

    ctx.fillText("A", ap.x, ap.y);
    ctx.fillText("B", bp.x, bp.y);
    ctx.fillText("C", cp.x, cp.y);
}
import {Point} from "@/fractals/implementations/utils/point";

export const drawCanvas = (canvasRef, inputs) => {
    const canvas = canvasRef.current;
    if (canvas === null) return

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // console.log(canvas.width + " " + canvas.height + " " + originX + " " + originY)

    ctx.clearRect(0, 0, width, height);

    let scaleX = inputs.scaleX
    let scaleY = inputs.scaleY

    if (scaleX > 10) {
        scaleX = 10
    } else if (scaleX < 0.1) {
        scaleX = 0.1
    }

    if (scaleY > 10) {
        scaleY = 10
    } else if (scaleY < 0.1) {
        scaleY = 0.1
    }

    const defaultOneLengthPx = 15

    let oneLengthX = Math.abs(defaultOneLengthPx * scaleX);
    if (oneLengthX === 0) oneLengthX = defaultOneLengthPx

    let oneLengthY = Math.abs(defaultOneLengthPx * scaleY);
    if (oneLengthY === 0) oneLengthY = defaultOneLengthPx

    const originX = width / 2 + +inputs.x * oneLengthX;
    const originY = height / 2 + +inputs.y * oneLengthY;

    console.log(1)

    drawCanvasGrid(ctx, originX, originY, width, height, oneLengthX, oneLengthY)
    console.log(2)

    drawCanvasTexts(ctx, originX, originY, width, height, oneLengthX, oneLengthY, scaleX, scaleY)
    console.log(3)

    return {
        originX,
        originY,
        oneLengthX,
        oneLengthY
    }
};

function drawCanvasGrid(ctx, originX, originY, width, height, oneLengthX, oneLengthY) {
    ctx.beginPath();

    for (let x = originX; x <= width; x += oneLengthX) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }
    for (let x = originX; x >= 0; x -= oneLengthX) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }

    for (let y = originY; y <= height; y += oneLengthY) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }
    for (let y = originY; y >= 0; y -= oneLengthY) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }

    let y = originY
    for (let x = originX; x <= width; x += oneLengthX) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + oneLengthX, y - oneLengthY);
        y -= oneLengthY
    }
    y = originY
    for (let x = originX; x >= 0; x -= oneLengthX) {
        ctx.moveTo(x, y);
        ctx.lineTo(x - oneLengthX, y + oneLengthY);
        y += oneLengthY
    }

    ctx.strokeStyle = "#b8daba";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
}

function drawCanvasTexts(ctx, originX, originY, width, height, oneLengthX, oneLengthY, scaleX, scaleY) {
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const defaultMultiplier = 4
    const multiplierX = defaultMultiplier / scaleX > 0.5 ? Math.round(defaultMultiplier / scaleX) : 1
    const multiplierY = defaultMultiplier / scaleY > 0.5 ? Math.round(defaultMultiplier / scaleY) : 1
    const offset = 12

    let i = multiplierX
    for (let x = originX; x <= width; x += oneLengthX * multiplierX) {
        if (x === originX) continue

        const label = i;
        ctx.fillText(label.toString(), x, originY + offset);
        i += multiplierX
    }
    i = multiplierX
    for (let x = originX; x >= 0; x -= oneLengthX * multiplierX) {
        if (x === originX) continue

        const label = i;
        ctx.fillText(label.toString(), x, originY + offset);
        i -= multiplierX
    }

    ctx.fillText("X", width / 2 - offset, offset);

    i = multiplierY
    for (let y = originY; y <= height; y += oneLengthY * multiplierY) {
        if (y === originY) continue

        const label = i;
        ctx.fillText(label.toString(), originX + offset, y);
        i -= multiplierY
    }

    i = multiplierY
    for (let y = originY; y >= 0; y -= oneLengthY * multiplierY) {
        if (y === originY) continue

        const label = i;
        ctx.fillText(label.toString(), originX + offset, y);
        i += multiplierY
    }

    ctx.fillText("Y", width - offset, height / 2 - offset);
}
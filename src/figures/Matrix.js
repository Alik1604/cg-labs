import {Point} from "../fractals/implementations/utils/point";

function multiply(a, b) {
    const aNumRows = a.length, aNumCols = a[0].length,
        bNumRows = b.length, bNumCols = b[0].length,
        m = new Array(aNumRows);
    for (let r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols);
        for (let c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;
            for (let i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}

const translationMatrix = (x, y) => {
    return [
        [1, 0, 0],
        [0, 1, 0],
        [x, y, 1]
    ]
}

const scaleMatrix = (scaleX, scaleY) => {
    return [
        [scaleX, 0, 0],
        [0, scaleY, 0],
        [0, 0, 1]
    ]
}

const mirrorMatrix = () => {
    return [
        [0, 1, 0],
        [1, 0, 0],
        [0, 0, 1],
    ]
}

const getResultMatrix = (x, y, scaleX, scaleY, isMirrored) => {
    return !isMirrored ? multiply(
        multiply(
            translationMatrix(x, y),
            scaleMatrix(scaleX, scaleY)
        ),
        mirrorMatrix()
    ) : multiply(
        multiply(
            translationMatrix(y, x),
            scaleMatrix(scaleX, scaleY)
        ),
        mirrorMatrix()
    )
}

export function getNewTriangle(points, x, y, scaleX, scaleY, isMirrored) {
    const triangleMatrix = [
        [points.a.x, points.a.y, 1],
        [points.b.x, points.b.y, 1],
        [points.c.x, points.c.y, 1]
    ]

    const mulResult = multiply(triangleMatrix, getResultMatrix(x, y, scaleX, scaleY, isMirrored))

    return {
        a: new Point(mulResult[0][0], mulResult[0][1]),
        b: new Point(mulResult[1][0], mulResult[1][1]),
        c: new Point(mulResult[2][0], mulResult[2][1]),
    }
}
import { Point } from "./point.js"

export function fillTriangle(triangle) {
    triangle.vx1 = new Point(triangle.center.x + 2 * triangle.v1.x, triangle.center.y + 2 * triangle.v1.y)
    triangle.vx2 = new Point(triangle.center.x + 2 * triangle.v2.x, triangle.center.y + 2 * triangle.v2.y)
    triangle.vx3 = new Point(triangle.center.x + 2 * triangle.v3.x, triangle.center.y + 2 * triangle.v3.y)

    return triangle
}

export function getSides(triangle) {
    return {
        s1: {
            vx: triangle.vx1,
            v: new Point(triangle.vx2.x - triangle.vx1.x, triangle.vx2.y - triangle.vx1.y)
        },
        s2: {
            vx: triangle.vx2,
            v: new Point(triangle.vx3.x - triangle.vx2.x, triangle.vx3.y - triangle.vx2.y)
        },
        s3: {
            vx: triangle.vx3,
            v: new Point(triangle.vx1.x - triangle.vx3.x, triangle.vx1.y - triangle.vx3.y)
        }
    }
}
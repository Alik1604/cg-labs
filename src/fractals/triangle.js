export function rotateVector(vector, degrees) {
    const rads = degrees * Math.PI / 180
    return {
        x: vector.x * Math.cos(rads) - vector.y * Math.sin(rads),
        y: vector.x * Math.sin(rads) + vector.y * Math.cos(rads)
    }
}

export function fillTriangle(triangle) {
    triangle.vx1 = {
        x: triangle.center.x + 2 * triangle.v1.x,
        y: triangle.center.y + 2 * triangle.v1.y
    } 

    triangle.vx2 = {
        x: triangle.center.x + 2 * triangle.v2.x,
        y: triangle.center.y + 2 * triangle.v2.y
    } 

    triangle.vx3 = {
        x: triangle.center.x + 2 * triangle.v3.x,
        y: triangle.center.y + 2 * triangle.v3.y
    } 

    return triangle
}

export function getSides(triangle) {
    return {
        s1: {
            vx: triangle.vx1,
            v: {
                x: triangle.vx2.x - triangle.vx1.x,
                y: triangle.vx2.y - triangle.vx1.y
            }
        },
        s2: {
            vx: triangle.vx2,
            v: {
                x: triangle.vx3.x - triangle.vx2.x,
                y: triangle.vx3.y - triangle.vx2.y
            }
        },
        s3: {
            vx: triangle.vx3,
            v: {
                x: triangle.vx1.x - triangle.vx3.x,
                y: triangle.vx1.y - triangle.vx3.y
            }
        }
    }
}
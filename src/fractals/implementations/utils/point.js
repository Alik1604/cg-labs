export class Point {

    x = 0
    y = 0

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    rotateVector(degrees) {
        const rads = degrees * Math.PI / 180
        return new Point(this.x * Math.cos(rads) - this.y * Math.sin(rads), this.x * Math.sin(rads) + this.y * Math.cos(rads))
    }

    shorten(sub) {
        return new Point(this.x / sub, this.y / sub)
    }
}
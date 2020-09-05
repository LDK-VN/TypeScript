interface Point {
    x: number;
    y: number;
}

function printPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`)
}

class VirtualPoint {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

const newPoint = new VirtualPoint(13, 56);
console.log(newPoint)
printPoint(newPoint); // prints "13, 56"
function printPoint(p) {
    console.log(p.x + ", " + p.y);
}
var VirtualPoint = /** @class */ (function () {
    function VirtualPoint(x, y) {
        this.x = x;
        this.y = y;
    }
    return VirtualPoint;
}());
var newPoint = new VirtualPoint(13, 56);
console.log(newPoint);
printPoint(newPoint); // prints "13, 56"

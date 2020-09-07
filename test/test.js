var mySearch;
mySearch = function (src, sub) {
    var result = src.search(sub);
    console.log(result);
    return result > -1;
};
console.log(mySearch("leduy", "leduy"));

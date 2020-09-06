function reverse(s: string): string {
    return s.split("").reverse().join("");
}

let result = reverse("hello world");
console.log(result);
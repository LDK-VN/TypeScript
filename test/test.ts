type User = {
    name: string
}

const x: User = {name: 'khanhld'};
x.name = 'hoangld';
console.log(x);

type User2 = {
    readonly name: string
}

const y: User2 = {name: 'hoangld'};
y.name = 'tamlh';
console.log(y);
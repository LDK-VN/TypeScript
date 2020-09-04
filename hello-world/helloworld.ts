interface User{
    name: string;
    id: number,
}

class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

const user: User = new UserAccount("KhanhLD",1);
console.log(user)
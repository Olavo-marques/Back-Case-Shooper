export enum Role {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: Role = Role.NORMAL
    ) { }

    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }
    public getEmail(): string {
        return this.email;
    }
    public setEmail(value: string) {
        this.email = value;
    }
    public getName(): string {
        return this.name;
    }
    public setName(value: string) {
        this.name = value;
    }
    public getPassword(): string {
        return this.password;
    }
    public setPassword(value: string) {
        this.password = value;
    }
    public getRole(): Role {
        return this.role;
    }
    public setRole(value: Role) {
        this.role = value;
    }
}

export interface ISignupInputDTO {
    name: string,
    email: string,
    password: string
}

export interface ISignupOutputDTO {
    token: string,
    message: string
}

export interface ILoginInputDTO {
    email: string,
    password: string
}

export interface ILoginOutputDTO {
    token: string
}

export interface IUserModelDataBaseDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
}

export interface IUserOutputDataBaseDTO {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
}
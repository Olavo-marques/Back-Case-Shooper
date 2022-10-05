import { BaseError } from "./BaseError"

export class EmailAlreadyExists extends BaseError {
    constructor() {
        super('Email já cadastrado', 409)
    }
}
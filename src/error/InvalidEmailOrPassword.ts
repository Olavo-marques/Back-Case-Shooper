import { BaseError } from "./BaseError";

export class InvalidEmailOrPassword extends BaseError {
    constructor() {
        super('E-mail ou senha invalida', 401)
    }
}
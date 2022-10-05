import { BaseError } from "./BaseError";

export class InvalidEmailFormat extends BaseError {
    constructor() {
        super('Formato do e-mail invalido', 401)
    }
}
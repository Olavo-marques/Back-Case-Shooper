import { BaseError } from "./BaseError";

export class MissingInformation extends BaseError {
    constructor() {
        super('Preencha todos os campos', 401)
    }
}
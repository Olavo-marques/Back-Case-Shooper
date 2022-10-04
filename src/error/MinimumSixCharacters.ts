import { BaseError } from "./BaseError";

export class MinimumSixCharacters extends BaseError {
    constructor() {
        super('Mínimo de 6  para password', 401)
    }
}
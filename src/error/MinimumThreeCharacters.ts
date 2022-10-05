import { BaseError } from "./BaseError";

export class MinimumThreeCharacters extends BaseError {
    constructor() {
        super('Mínimo de 3  para name', 401)
    }
}
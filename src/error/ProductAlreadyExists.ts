import { BaseError } from "./BaseError";


export class ProductAlreadyExists extends BaseError {
    constructor() {
        super('Produto já cadastrado', 409)
    }
}
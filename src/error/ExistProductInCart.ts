import { BaseError } from "./BaseError";

export class ExistProductInCart extends BaseError {
    constructor() {
        super('Produto Já Adicionado', 409)
    }
}
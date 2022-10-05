import { BaseError } from "./BaseError";

export class ProductNotFound extends BaseError {
    constructor() {
        super('Error no servidor', 409)
    }
}
import { BaseError } from "./BaseError";

export class NotFound extends BaseError {
    constructor() {
        super('Usuário não encontrado', 404)
    }
}
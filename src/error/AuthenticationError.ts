import { BaseError } from "./BaseError";

export class AuthenticationError extends BaseError {
    constructor(
    ) {
        super("Credenciais inválidas", 401)
    }

}
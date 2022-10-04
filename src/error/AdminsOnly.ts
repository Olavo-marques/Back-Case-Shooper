import { BaseError } from "./BaseError"

export class AdminsOnly extends BaseError {
    constructor() {
        super('Somente admins podem executar essa função.', 401)
    }
}
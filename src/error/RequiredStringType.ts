import { BaseError } from "./BaseError";

export class RequiredStringType extends BaseError {
    constructor() {
        super('Campo name, email e password deve ser do tipo string', 401)
    }
}
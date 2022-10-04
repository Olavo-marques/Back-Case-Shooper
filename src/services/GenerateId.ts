import { v4 } from "uuid"

export class GenerateId {
    public generateId = () => {
        return v4()
    }
}
import { ILoginInputDTO, ILoginOutputDTO, IProfileInputDTO, ISignupInputDTO, ISignupOutputDTO, Role, User } from "../model/User";
import { InvalidEmailOrPassword } from "../error/InvalidEmailOrPassword";
import { Authenticator, IdTokenPayload } from "../services/Authenticator";
import { MinimumThreeCharacters } from "../error/MinimumThreeCharacters";
import { MinimumSixCharacters } from "../error/MinimumSixCharacters";
import { EmailAlreadyExists } from "../error/EmailAlreadyExists";
import { InvalidEmailFormat } from "../error/InvalidEmailFormat";
import { MissingInformation } from "../error/MissingInformation";
import { RequiredStringType } from "../error/RequiredStringType";
import { UserDataBase } from "../dataBase/UserDataBase";
import { HashManager } from "../services/HashManager";
import { GenerateId } from "../services/GenerateId";
import { AuthenticationError } from "../error/AuthenticationError";
import { NOTFOUND } from "dns";
import { NotFound } from "../error/NotFound";

export class UserBusiness {
    constructor(
        private hashManager: HashManager,
        private generateId: GenerateId,
        private userDataBase: UserDataBase,
        private authenticator: Authenticator
    ) { }

    public signup = async (input: ISignupInputDTO) => {

        const { name, email, password } = input

        if (!name || !email || !password) {
            throw new MissingInformation()
        }
        if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
            throw new RequiredStringType()
        }
        if (name.length < 3) {
            throw new MinimumThreeCharacters()
        }
        if (password.length < 6) {
            throw new MinimumSixCharacters()
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new InvalidEmailFormat()
        }

        const emailExist = await this.userDataBase.selectUserByEmail(email)

        if (emailExist) {
            throw new EmailAlreadyExists()
        }

        const passwordHash = await this.hashManager.hash(password)

        const idUser = this.generateId.generateId()

        const newUser = new User(idUser, name, email, passwordHash, Role.NORMAL)

        await this.userDataBase.insertUser(newUser)

        const payload: IdTokenPayload = {
            id: newUser.getId(),
            role: newUser.getRole()
        }

        const token = this.authenticator.generateToken(payload)

        const response: ISignupOutputDTO = {
            token,
            message: `Parabéns ${newUser.getName()}, você criou sua conta.`
        }

        return response
    }

    public login = async (input: ILoginInputDTO) => {

        const { email, password } = input

        if (!email || !password) {
            throw new MissingInformation()
        }
        if (typeof email !== "string" || typeof password !== "string") {
            throw new RequiredStringType()
        }
        if (password.length < 6) {
            throw new MinimumSixCharacters()
        }
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            throw new InvalidEmailFormat()
        }

        const emailExist = await this.userDataBase.selectUserByEmail(email)

        if (!emailExist) {
            throw new InvalidEmailOrPassword()
        }

        const passwordValid = await this.hashManager.compare(password, emailExist.password)

        if (passwordValid !== true) {
            throw new InvalidEmailOrPassword()
        }

        const payload: IdTokenPayload = {
            id: emailExist.id,
            role: emailExist.role as Role
        }

        const token = this.authenticator.generateToken(payload)

        const response: ILoginOutputDTO = {
            token
        }

        return response
    }

    public profile = async (input: IProfileInputDTO) => {

        const { token } = input

        if (!token) {
            throw new AuthenticationError()
        }

        const payload = this.authenticator.verifyToken(token)

        const userDataBase = await this.userDataBase.selectUserById(payload.id)

        if (!userDataBase.length) {
            throw new NotFound()
        }

        return userDataBase
    }
}
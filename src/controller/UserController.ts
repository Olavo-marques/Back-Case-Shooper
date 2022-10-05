import { ILoginInputDTO, IProfileInputDTO, ISignupInputDTO } from "../model/User"
import { Request, Response } from "express"
import { UserBusiness } from "../bussiness/UserBusiness"

export class UserController {
    constructor(
        private userBusiness: UserBusiness
    ) { }

    public signup = async (req: Request, res: Response) => {
        try {
            const input: ISignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            const response = await this.userBusiness.signup(input)

            res.status(201).send(response)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const input: ILoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const response = await this.userBusiness.login(input)

            res.status(200).send(response)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public profile = async (req: Request, res: Response) => {
        try {
            const input: IProfileInputDTO = {
                token: req.headers.authorization as string,
            }

            const userDataBase = await this.userBusiness.profile(input)

            res.status(200).send(userDataBase)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

}
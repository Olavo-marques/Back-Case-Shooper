import { UserController } from "../controller/UserController"
import { Authenticator } from "../services/Authenticator"
import { UserBusiness } from "../bussiness/UserBusiness"
import { UserDataBase } from "../dataBase/UserDataBase"
import { HashManager } from "../services/HashManager"
import { GenerateId } from "../services/GenerateId"
import { Router } from "express"

export const userRouter = Router()

const userController = new UserController(
    new UserBusiness(
        new HashManager,
        new GenerateId,
        new UserDataBase,
        new Authenticator
    )
)

userRouter.get("/profile", userController.profile)

userRouter.post("/signup", userController.signup)

userRouter.post("/login", userController.login)


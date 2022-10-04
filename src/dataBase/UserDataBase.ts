import { IUserModelDataBaseDTO, IUserOutputDataBaseDTO, User } from "../model/User";
import BaseDataBase from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {
    public static TABLE_USERS = "Shooper_Users"

    public userModelDataBase = async (user: User) => {
        const userDataBase: IUserModelDataBaseDTO = {
            id: user.getId(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword(),
            role: user.getRole(),
        }
        return userDataBase
    }

    public insertUser = async (user: User) => {
        const newUser = await this.userModelDataBase(user)
        const tableUsers = UserDataBase.TABLE_USERS

        await this.getConnection()
            .insert(newUser)
            .into(tableUsers)
    }

    public selectUserByEmail = async (email: string): Promise<IUserOutputDataBaseDTO | undefined> => {
        const tableUsers = UserDataBase.TABLE_USERS

        const emailFound: IUserOutputDataBaseDTO[] = await this.getConnection()
            .select("*")
            .into(tableUsers)
            .where({ email })

        return emailFound[0]
    }

    public selectUserById = async (id: string): Promise<IUserOutputDataBaseDTO | undefined> => {
        const tableUsers = UserDataBase.TABLE_USERS

        const emailFound: IUserOutputDataBaseDTO[] = await this.getConnection()
            .select("*")
            .into(tableUsers)
            .where({ id })

        return emailFound[0]
    }
}
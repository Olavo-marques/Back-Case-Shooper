import { IAllProductInputDTO, ICreateProductInputDTO, ICreateProductOutputDTO, Product } from "../model/Product";
import { ProductAlreadyExists } from "../error/ProductAlreadyExists";
import { AuthenticationError } from "../error/AuthenticationError";
import { MissingInformation } from "../error/MissingInformation";
import { ProductDataBase } from "../dataBase/ProductDataBase";
import { Authenticator } from "../services/Authenticator";
import { GenerateId } from "../services/GenerateId";
import { Role } from "../model/User";
import { AdminsOnly } from "../error/AdminsOnly";
import { ProductNotFound } from "../error/ProductNotFound";

export class ProductBusiness {
    constructor(
        private productDataBase: ProductDataBase,
        private generateId: GenerateId,
        private authenticator: Authenticator
    ) { }

    public createProduct = async (input: ICreateProductInputDTO) => {
        console.log("entrei createProduct ProductBusiness")

        const { token, name, price, qtyStock } = input


        if (!name || !price || !qtyStock) {
            throw new MissingInformation()
        }
        if (!token) {
            throw new AuthenticationError()
        }

        const payload = this.authenticator.verifyToken(token)

        if (payload.role !== Role.ADMIN) {
            throw new AdminsOnly()
        }

        const productExist = await this.productDataBase.getProductByName(name)

        if (productExist) {
            throw new ProductAlreadyExists()
        }

        const idProduct = this.generateId.generateId()

        const newProduct = new Product(idProduct, name, price, qtyStock)

        await this.productDataBase.insertProduct(newProduct)

        const response: ICreateProductOutputDTO = {
            message: "Produto cadastrado"
        }

        return response
    }

    public allProduct = async (input: IAllProductInputDTO) => {

        const { token } = input

        if (!token) {
            throw new AuthenticationError()
        }

        const AllProductsBataBase = await this.productDataBase.selectAllProduct()

        if (!AllProductsBataBase.length) {
            throw new ProductNotFound()
        }

        return AllProductsBataBase
    }
}
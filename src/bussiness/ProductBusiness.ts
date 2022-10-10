import { IAddProductCartInputDTO, IAddProductCartOutputDTO, IAllProductInputDTO, ICreateProductInputDTO, ICreateProductOutputDTO, INewAddProductCartDTO, INewRequestOutputDTO, INewRquestDTO, IRequestInputDTO, Product } from "../model/Product";
import { ProductAlreadyExists } from "../error/ProductAlreadyExists";
import { MissingInformation } from "../error/MissingInformation";
import { ExistProductInCart } from "../error/ExistProductInCart";
import { ProductDataBase } from "../dataBase/ProductDataBase";
import { ProductNotFound } from "../error/ProductNotFound";
import { GenerateId } from "../services/GenerateId";

export class ProductBusiness {
    constructor(
        private productDataBase: ProductDataBase,
        private generateId: GenerateId,
    ) { }

    public createProduct = async (input: ICreateProductInputDTO) => {
        console.log("entrei createProduct ProductBusiness")

        const { name, price, qtyStock } = input


        if (!name || !price || !qtyStock) {
            throw new MissingInformation()
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

    public allProduct = async () => {

        const AllProductsBataBase = await this.productDataBase.selectAllProduct()

        if (!AllProductsBataBase.length) {
            throw new ProductNotFound()
        }

        return AllProductsBataBase
    }

    public addProductCart = async (input: IAddProductCartInputDTO) => {

        const { idProduct, nameProduct, price, qtyStock } = input

        console.log("body", input)

        if (!idProduct || !nameProduct || !price || !qtyStock) {
            throw new MissingInformation()
        }

        const allProductsInartawait = await this.productDataBase.selectProductsInCartById(idProduct)

        if (allProductsInartawait) {
            throw new ExistProductInCart()
        }

        const idAddProduct = this.generateId.generateId()

        const newAddProduct: INewAddProductCartDTO = {
            id: idAddProduct,
            idProduct: idProduct,
            name: nameProduct,
            price: price,
            qtyStock: qtyStock
        }

        await this.productDataBase.insertProductCart(newAddProduct)


        const response: IAddProductCartOutputDTO = {
            message: "Produto adicionado"
        }

        return response
    }

    public request = async (input: IRequestInputDTO) => {

        const { deliveryDate, totalPrice, quantity } = input

        if (!deliveryDate || !totalPrice || !quantity) {
            throw new MissingInformation()
        }

        const id = this.generateId.generateId()

        const newRquest: INewRquestDTO = {
            id,
            deliveryDate,
            totalPrice,
            quantity
        }

        await this.productDataBase.insertRequest(newRquest)

        const response: INewRequestOutputDTO = {
            message: "Pedido criado"
        }

        return response
    }

    public productsInCart = async () => {

        const allProductsInartawait = this.productDataBase.selectProductsInCart()

        // const allProductsInartawait = await this.productDataBase.selectSumAllProductsInCart()

        return allProductsInartawait
    }
}
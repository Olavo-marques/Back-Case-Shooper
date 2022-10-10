import { count } from "console";
import { IAddCartDataBaseDTO, INewAddProductCartDTO, INewRequestInputDTO, INewRquestDTO, IProductDTO, IProductsInartOutputDTO, Product } from "../model/Product";
import BaseDataBase from "./BaseDataBase";

export class ProductDataBase extends BaseDataBase {
    private static TABLE_PRODUCTS = "Shooper_Products"
    private static TABLE_ADD_PRODUCT = "Shooper_Add_Product"

    private productModel = (product: Product) => {

        const productDataBAse: IProductDTO = {
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
            qty_stock: product.getQtyStock()
        }

        return productDataBAse
    }
    private newRequestModel = (newRquest: INewRquestDTO) => {

        const productDataBase: INewRequestInputDTO = {
            id: newRquest.id,
            delivery_date: newRquest.deliveryDate,
            total_price: newRquest.totalPrice,
            quantity: newRquest.quantity
        }

        return productDataBase
    }

    private addProductCartModel = (addCart: INewAddProductCartDTO) => {

        const addCartDataBase: IAddCartDataBaseDTO = {
            id: addCart.id,
            id_product: addCart.idProduct,
            name: addCart.name,
            price: addCart.price,
            qty_stock: addCart.qtyStock
        }

        return addCartDataBase
    }

    public insertProduct = async (product: Product) => {

        const newProduct = this.productModel(product)

        await this.getConnection()
            .insert(newProduct)
            .into(ProductDataBase.TABLE_PRODUCTS)
    }

    public getProductByName = async (name: string) => {

        const productFound = await this.getConnection()
            .select("*")
            .from(ProductDataBase.TABLE_PRODUCTS)
            .where({ name })

        return productFound[0]
    }

    public selectAllProduct = async (): Promise<IProductDTO[]> => {

        const allProduct: IProductDTO[] = await this.getConnection()
            .select("*")
            .from(ProductDataBase.TABLE_PRODUCTS)

        return allProduct
    }

    public insertProductCart = async (addCart: INewAddProductCartDTO) => {
        const newProductCart = this.addProductCartModel(addCart)

        await this.getConnection()
            .insert(newProductCart)
            .into(ProductDataBase.TABLE_ADD_PRODUCT)
    }

    public insertRequest = async (newRquest: INewRquestDTO) => {
        const newProductCart = this.newRequestModel(newRquest)

        await this.getConnection()
            .insert(newProductCart)
            .into(ProductDataBase.TABLE_ADD_PRODUCT)

    }

    public selectProductsInCart = async (): Promise<IProductsInartOutputDTO[]> => {

        const productsInart: IProductsInartOutputDTO[] = await this.getConnection()
            .select("*")
            // .count("id as Id")
            .from(ProductDataBase.TABLE_ADD_PRODUCT)

        return productsInart

    }

    public selectProductsInCartById = async (idProduct: string): Promise<IProductsInartOutputDTO | undefined> => {

        const test: IProductsInartOutputDTO[] = await this.getConnection()
            .select("*")
            .from(ProductDataBase.TABLE_ADD_PRODUCT)
            .where({ id_product: idProduct })

        return test[0]

    }

    public selectSumAllProductsInCart = async () => {

        const test = await this.getConnection()
            .from(ProductDataBase.TABLE_ADD_PRODUCT)
            .sum("price")

        return test

    }
}


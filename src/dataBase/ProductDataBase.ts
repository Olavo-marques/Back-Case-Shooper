import { IProductDTO, Product } from "../model/Product";
import BaseDataBase from "./BaseDataBase";

export class ProductDataBase extends BaseDataBase {
    private static TABLE_PRODUCTS = "Shooper_Products"

    private productModel = (product: Product) => {

        const productDataBAse: IProductDTO = {
            id: product.getId(),
            name: product.getName(),
            price: product.getPrice(),
            qty_stock: product.getQtyStock()
        }

        return productDataBAse
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
}
import { Request, Response } from "express";
import { ProductBusiness } from "../bussiness/ProductBusiness";
import { IAddProductCartInputDTO, IAllProductInputDTO, ICreateProductInputDTO } from "../model/Product";

export class ProductController {
    constructor(
        private productBusiness: ProductBusiness
    ) { }

    public createProduct = async (req: Request, res: Response) => {
        try {
            const input: ICreateProductInputDTO = {
                token: req.headers.authorization as string,
                name: req.body.name,
                price: req.body.price,
                qtyStock: req.body.qtyStock
            }

            const response = await this.productBusiness.createProduct(input)

            res.status(201).send(response)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public allProduct = async (req: Request, res: Response) => {
        try {
            const input: IAllProductInputDTO = {
                token: req.headers.authorization as string,
            }

            const allProducts = await this.productBusiness.allProduct(input)

            res.status(200).send(allProducts)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public addProductCart = async (req: Request, res: Response) => {
        try {
            const input: IAddProductCartInputDTO = {
                token: req.headers.authorization as string,
                quantity: req.body.quantity,
                idProduct: req.body.idProduct
            }

            await this.productBusiness.addProductCart(input)

            res.status(200).send("Produto adicionado")

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

}
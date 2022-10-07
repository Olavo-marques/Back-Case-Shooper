import { Request, Response } from "express";
import { ProductBusiness } from "../bussiness/ProductBusiness";
import { IAddProductCartInputDTO, IAllProductInputDTO, ICreateProductInputDTO, IRequestInputDTO } from "../model/Product";

export class ProductController {
    constructor(
        private productBusiness: ProductBusiness
    ) { }

    public createProduct = async (req: Request, res: Response) => {
        try {
            const input: ICreateProductInputDTO = {
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
            const allProducts = await this.productBusiness.allProduct()

            res.status(200).send(allProducts)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public addProductCart = async (req: Request, res: Response) => {
        try {
            const input: IAddProductCartInputDTO = {
                idProduct: req.body.idProduct,
                name: req.body.name,
                price: req.body.price,
                qtyStock: req.body.qtyStock
            }

            const response = await this.productBusiness.addProductCart(input)

            res.status(200).send(response)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }


    public request = async (req: Request, res: Response) => {
        try {
            const input: IRequestInputDTO = {
                deliveryDate: req.body.deliveryDate,
                totalPrice: req.body.totalPrice,
                quantity: req.body.quantity,
            }

            const response = await this.productBusiness.request(input)

            res.status(200).send(response)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

    public productsInart = async (req: Request, res: Response) => {
        try {
            
            const allProductsInart = await this.productBusiness.productsInart()

            res.status(200).send(allProductsInart)

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message })
        }
    }

}
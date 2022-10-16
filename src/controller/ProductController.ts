import { IArrayDTO, INewRequestInputDTO } from "../model/Product";
import { ProductBusiness } from "../bussiness/ProductBusiness";
import { IAllProductInputDTO } from "../model/Product";
import { Request, Response } from "express";

export class ProductController {
  constructor(
    private productBusiness: ProductBusiness
  ) { }

  public allProduct = async (req: Request, res: Response) => {
    try {
      let input: IAllProductInputDTO = {
        search: req.query.search as string,
        nameOrPrice: req.query.nameOrPrice as string,
        order: req.query.order as string,
      };

      const allProducts = await this.productBusiness.allProduct(input);

      res.status(200).send(allProducts[0]);
    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };

  public addRequest = async (req: Request, res: Response) => {
    try {
      const input: INewRequestInputDTO = {
        nameUser: req.body.nameUser,
        deliveryDate: req.body.deliveryDate,
        totalPrice: req.body.totalPrice,
        productList: req.body.productList
      };

      const productList: IArrayDTO[] = req.body.productList

      const response = await this.productBusiness.addRequest(input, productList);

      res.status(201).send(response);

    } catch (error: any) {
      res.status(error.statusCode || 500).send({ message: error.message });
    }
  };
}
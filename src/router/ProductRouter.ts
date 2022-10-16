import { ProductController } from "../controller/ProductController"
import { ProductBusiness } from "../bussiness/ProductBusiness"
import { ProductDataBase } from "../dataBase/ProductDataBase"
import { GenerateId } from "../services/GenerateId"
import { Router } from "express"

export const productRouter = Router()

const productController = new ProductController(
    new ProductBusiness(
        new ProductDataBase,
        new GenerateId
    )
)

productRouter.get("/product", productController.allProduct)

productRouter.post("/product/request", productController.addRequest)


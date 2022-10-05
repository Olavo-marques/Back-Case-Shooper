import { ProductController } from "../controller/ProductController"
import { ProductBusiness } from "../bussiness/ProductBusiness"
import { ProductDataBase } from "../dataBase/ProductDataBase"
import { Authenticator } from "../services/Authenticator"
import { GenerateId } from "../services/GenerateId"
import { Router } from "express"

export const productRouter = Router()

const productController = new ProductController(
    new ProductBusiness(
        new ProductDataBase,
        new GenerateId,
        new Authenticator
    )
)

productRouter.post("/adm/product", productController.createProduct)

productRouter.get("/product", productController.allProduct)

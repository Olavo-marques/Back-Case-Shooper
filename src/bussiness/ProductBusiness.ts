import { IArrayDTO, INewRequestInputDTO } from "../model/Product";
import { MissingInformation } from "../error/MissingInformation";
import { ProductDataBase } from "../dataBase/ProductDataBase";
import { GenerateId } from "../services/GenerateId";
import {
  IAddProductCartOutputDTO,
  IQtyStockAndIdProductDTO,
  IAllProductInputDTO,
  INewProductListDTO,
  INewRquestDTO
} from "../model/Product";

export class ProductBusiness {
  constructor(
    private productDataBase: ProductDataBase,
    private generateId: GenerateId
  ) { }

  public allProduct = async (input: IAllProductInputDTO) => {
    let { search, nameOrPrice, order } = input;

    if (!search) {
      search = "a";
    }
    if (!nameOrPrice) {
      nameOrPrice = "name";
    }
    if (!order) {
      order = "ASC";
    }

    const inputNewValue: IAllProductInputDTO = {
      search,
      nameOrPrice,
      order,
    };

    const allProductsBataBase = await this.productDataBase.selectAllProduct(inputNewValue);

    return allProductsBataBase;
  };

  public addRequest = async (input: INewRequestInputDTO, productList: IArrayDTO[]) => {

    const { nameUser, deliveryDate, totalPrice } = input;

    if (!nameUser || !deliveryDate || !totalPrice) {
      throw new MissingInformation();
    }

    for (let product of productList) {
      const productFound = await this.productDataBase.selectProductById(product.id);

      const soldAmount: number = 1;

      const remainingAmount = productFound.qty_stock - soldAmount;

      const qtyStockAndIdProduct: IQtyStockAndIdProductDTO = {
        idProduct: product.id,
        qtyStock: remainingAmount,
      };

      await this.productDataBase.updateQtyStock(qtyStockAndIdProduct);
    }

    const idRequest = this.generateId.generateId();

    const newRquest: INewRquestDTO = {
      id: idRequest,
      name: nameUser,
      deliveryDate: deliveryDate,
      totalPrice: totalPrice,
    };

    await this.productDataBase.insertRequest(newRquest);

    for (let product of productList) {
      const idNewList = this.generateId.generateId();

      const newProduct: INewProductListDTO = {
        id: idNewList,
        idProduct: product.id,
        name: product.name,
        price: product.price,
        idRequest: idRequest,
      };

      await this.productDataBase.insertProductList(newProduct);
    }

    const response: IAddProductCartOutputDTO = {
      message: `${nameUser} Sua lista de compra foi recebida, agradecemos por ser nosso cliente`,
    };

    return response;
  };
}

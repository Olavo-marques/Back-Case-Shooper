import BaseDataBase from "./BaseDataBase";
import {
  IQtyStockAndIdProductDTO,
  INewAddProductCartDTO,
  IAllProductInputDTO,
  IAddCartDataBaseDTO,
  INewProductListDTO,
  INewRequestDbDTO,
  INewRquestDTO,
  IProductDTO
} from "../model/Product";

export class ProductDataBase extends BaseDataBase {
  private static TABLE_PRODUCTS = "Shooper_Products";
  private static TABLE_REQUEST = "Shooper_Request";
  private static TABLE_ADD_PRODUCT = "Shooper_Add_Product";


  private newRequestModel = (newRquest: INewRquestDTO) => {
    const productDataBase: INewRequestDbDTO = {
      id: newRquest.id,
      name: newRquest.name,
      delivery_date: newRquest.deliveryDate,
      total_price: newRquest.totalPrice
    };

    return productDataBase;
  };

  private addProductListModel = (addCart: INewAddProductCartDTO) => {
    
    const addProductListDataBase: IAddCartDataBaseDTO = {
      id: addCart.id,
      id_product: addCart.idProduct,
      name: addCart.name,
      price: addCart.price,
      id_request: addCart.idRequest
    };

    return addProductListDataBase;
  };


  public selectAllProduct = async (input: IAllProductInputDTO): Promise<IProductDTO[]> => {

    const allProduct: IProductDTO[] = await this.getConnection().raw(`
      SELECT * FROM ${ProductDataBase.TABLE_PRODUCTS} WHERE name LIKE "%${input.search}%" ORDER BY ${input.nameOrPrice} ${input.order}
    `);

    return allProduct;
  };

  public insertRequest = async (newRquest: INewRquestDTO):Promise<void> => {  

    const newProductCart = this.newRequestModel(newRquest);

    await this.getConnection()
      .insert(newProductCart)
      .into(ProductDataBase.TABLE_REQUEST);
  };

  public insertProductList = async (addCart: INewProductListDTO) => {

    const newProductList = this.addProductListModel(addCart);

    await this.getConnection()
      .insert(newProductList)
      .into(ProductDataBase.TABLE_ADD_PRODUCT);
  };

  public selectProductById = async (idProduct: string): Promise<IProductDTO> => {

    const productFound: IProductDTO[] = await this.getConnection()
      .select("*")
      .from(ProductDataBase.TABLE_PRODUCTS)
      .where({ id: idProduct });

    return productFound[0];
  };

  public updateQtyStock = async (qtyStockAndIdProduct: IQtyStockAndIdProductDTO): Promise<void> => {

    await this.getConnection().raw(`
        UPDATE ${ProductDataBase.TABLE_PRODUCTS} SET qty_stock = ${qtyStockAndIdProduct.qtyStock} WHERE id ='${qtyStockAndIdProduct.idProduct}' 
    `);
  };
}

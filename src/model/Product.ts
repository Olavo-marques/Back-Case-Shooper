export class Product {
  constructor(
    private id: string,
    private name: string,
    private price: number,
    private qtyStock: number
  ) {}

}

export interface ICreateProductInputDTO {
  name: string;
  price: number;
  qtyStock: number;
}

export interface ICreateProductOutputDTO {
  message: string;
}

export interface IAllProductInputDTO {
  search: string;
  nameOrPrice: string;
  order: string;
}

export interface IProductDTO {
  id: string;
  name: string;
  price: number;
  qty_stock: number;
}

export interface INewAddProductCartDTO {
  id: string;
  idProduct: string;
  name: string;
  price: number;
  idRequest: string;
}
 
export interface INewRquestDTO {
  id: string;
  name: string;
  deliveryDate: Date;
  totalPrice: number;
}

export interface INewProductListDTO {
  id: string;
  idProduct: string;
  name: string;
  price: number;
  idRequest: string;
}

export interface IAddCartDataBaseDTO {
  id: string;
  id_product: string;
  name: string;
  price: number;
  id_request: string;
}

export interface IAddProductCartOutputDTO {
  message: string;
}

export interface INewRequestDbDTO {
  id: string;
  name: string;
  delivery_date: Date;
  total_price: number;
}

export interface IQtyStockAndIdProductDTO {
  idProduct: string;
  qtyStock: number;
}

export interface INewRequestInputDTO {
  nameUser: string,
  deliveryDate: Date
  totalPrice: number
  productList: IArrayDTO[]
}

export interface IArrayDTO {
  id: string,
  name: string
  price: number
  qtyStock: number
}

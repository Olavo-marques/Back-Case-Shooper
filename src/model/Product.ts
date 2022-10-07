export class Product {
    constructor(
        private id: string,
        private name: string,
        private price: number,
        private qtyStock: number
    ) { }

    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }
    public getName(): string {
        return this.name;
    }
    public setName(value: string) {
        this.name = value;
    }
    public getPrice(): number {
        return this.price;
    }
    public setPrice(value: number) {
        this.price = value;
    }
    public getQtyStock(): number {
        return this.qtyStock;
    }
    public setQtyStock(value: number) {
        this.qtyStock = value;
    }
}

export interface ICreateProductInputDTO {
    token: string,
    name: string,
    price: number,
    qtyStock: number
}
export interface ICreateProductOutputDTO {
    message: string
}
export interface IAllProductInputDTO {
    token: string
}
export interface IAddProductCartInputDTO {
    token: string,
    quantity: number,
    idProduct: string
}
export interface IProductDTO {
    id: string,
    name: string,
    price: number,
    qty_stock: number
}
export interface INewAddProductCartDTO {
    id: string,
    quantity: number,
    idProduct: string,
    idUser: string
}
export interface IAddCartDataBaseDTO {
    id: string,
    quantity: number,
    id_product: string,
    id_user: string
}
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
    idProduct: string
    name: string,
    price: number,
    qtyStock: number
}
export interface IProductDTO {
    id: string,
    name: string,
    price: number,
    qty_stock: number
}
export interface INewAddProductCartDTO {
    id: string
    idProduct: string,
}
export interface IProductsInartOutputDTO {
    id: string
    idProduct: string,
}
export interface INewRquestDTO {
    id: string,
    deliveryDate: Date,
    totalPrice: number,
    quantity: number
}
export interface IAddCartDataBaseDTO {
    id: string,
    id_product: string
}
export interface IAddProductCartOutputDTO {
    message: string
}
export interface IRequestInputDTO {
    deliveryDate: Date,
    totalPrice: number,
    quantity: number,
}
export interface INewRequestInputDTO {
    id: string,
    delivery_date: Date,
    total_price: number,
    quantity: number
}
export interface INewRequestOutputDTO {
    message: string
}
export interface INewRequestOutputDTO {
    message: string
}
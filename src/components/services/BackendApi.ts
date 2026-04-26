import { IOrder, OrderSuccess, IApi, ProductList } from "../../types";

export class BackendApi {

    private _api: IApi;

    constructor(api: IApi) {
        this._api = api;
    }

    /** Метод отправки GET запроса на сервер для получения данных о списке продуктов */
    async getProducts(): Promise<ProductList> {
        return await this._api.get<ProductList>("/product");
    }

    /** Метод для отправки POST запроса на сервер для создания заказа */
    async createOrder(order: IOrder): Promise<OrderSuccess> {
        return await this._api.post<OrderSuccess>("/order", order);
    }
}